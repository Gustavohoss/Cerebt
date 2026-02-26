'use client';

import React from 'react';
import Link from 'next/link';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, PlayCircle, CheckCircle2, ListChecks } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const COURSE_DATA = {
  id: '1',
  title: 'Cerebro: Strategic AI Blueprint',
  modules: [
    {
      id: 'm1',
      title: 'Explicando ferramentas da Clickify',
      lessons: [
        { id: 'l1', title: 'Ferramenta de capturar Leads', videoId: 'OLNP1xzmpY8', duration: '08:45' },
      ]
    }
  ]
};

export default function LessonPage({ params }: { params: { id: string, lessonId: string } }) {
  // Encontrar a aula atual
  const allLessons = COURSE_DATA.modules.flatMap(m => m.lessons);
  const currentLesson = allLessons.find(l => l.id === params.lessonId) || allLessons[0];
  const currentModule = COURSE_DATA.modules.find(m => m.lessons.some(l => l.id === params.lessonId)) || COURSE_DATA.modules[0];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-black">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-white/5 px-6 bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span className="text-xs font-black uppercase tracking-widest">Voltar ao Hub</span>
          </Link>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end">
               <span className="text-[10px] font-black text-primary uppercase tracking-tighter">{currentModule.title}</span>
               <span className="text-[11px] font-bold text-white">{currentLesson.title}</span>
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-black">
          <div className="flex flex-col lg:flex-row h-full">
            {/* Player Section */}
            <div className="flex-1 p-4 md:p-8 space-y-6">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl relative">
                {currentLesson.videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${currentLesson.videoId}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <PlayCircle className="h-16 w-16 text-primary/40" />
                    <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Aula em breve</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter font-headline">
                  {currentLesson.title}
                </h1>
                <div className="flex items-center gap-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30 font-black uppercase text-[10px] px-3 py-1">
                    Aula {allLessons.indexOf(currentLesson) + 1}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{currentLesson.duration} de duração</span>
                </div>
                <Separator className="bg-white/5" />
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-4xl">
                  Nesta aula, exploramos como utilizar a Ferramenta de Capturar Leads da Clickify para otimizar suas conversões e organizar seu funil de vendas estratégico.
                </p>
              </div>
            </div>

            {/* Sidebar Lessons List */}
            <div className="w-full lg:w-96 border-l border-white/5 bg-[#080808] overflow-auto">
              <div className="p-6 border-b border-white/5">
                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  Conteúdo do Curso
                </h3>
              </div>
              <div className="p-4 space-y-8">
                {COURSE_DATA.modules.map((module) => (
                  <div key={module.id} className="space-y-3">
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-2">
                      {module.title}
                    </h4>
                    <div className="space-y-1">
                      {module.lessons.map((lesson) => {
                        const isActive = lesson.id === params.lessonId;
                        return (
                          <Link 
                            key={lesson.id} 
                            href={`/courses/${COURSE_DATA.id}/lessons/${lesson.id}`}
                            className={`
                              flex items-center gap-3 p-3 rounded-xl transition-all group
                              ${isActive ? 'bg-primary/10 border border-primary/20' : 'hover:bg-white/5 border border-transparent'}
                            `}
                          >
                            <div className={`
                              h-8 w-8 rounded-lg flex items-center justify-center shrink-0
                              ${isActive ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground group-hover:text-white'}
                            `}>
                              {isActive ? <PlayCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className={`text-[11px] font-bold truncate ${isActive ? 'text-primary' : 'text-white/80'}`}>
                                {lesson.title}
                              </span>
                              <span className="text-[9px] font-medium text-muted-foreground uppercase">{lesson.duration}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </div>
  );
}