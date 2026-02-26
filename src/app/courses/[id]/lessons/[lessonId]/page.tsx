'use client';

import React from 'react';
import Link from 'next/link';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, PlayCircle, CheckCircle2 } from 'lucide-react';
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

export default function LessonPage({ params }: { params: Promise<{ id: string, lessonId: string }> }) {
  const resolvedParams = React.use(params);
  const { lessonId } = resolvedParams;

  // Encontrar a aula atual
  const allLessons = COURSE_DATA.modules.flatMap(m => m.lessons);
  const currentLesson = allLessons.find(l => l.id === lessonId) || allLessons[0];
  const currentModule = COURSE_DATA.modules.find(m => m.lessons.some(l => l.id === lessonId)) || COURSE_DATA.modules[0];

  return (
    <SidebarProvider defaultOpen={false}>
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
            <div className="flex-1 p-4 md:p-12 space-y-8">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl relative group">
                {currentLesson.videoId ? (
                  <>
                    <iframe
                      src={`https://www.youtube.com/embed/${currentLesson.videoId}?modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&color=white`}
                      className="w-full h-full pointer-events-auto"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    {/* Top Mask to hide YouTube title/share */}
                    <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* Corner Mask for Logo */}
                    <div className="absolute bottom-12 right-0 w-24 h-12 bg-black/40 blur-md pointer-events-none" />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <PlayCircle className="h-16 w-16 text-primary/40" />
                    <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Aula em breve</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter font-headline">
                  {currentLesson.title}
                </h1>
                <div className="flex items-center gap-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30 font-black uppercase text-[10px] px-4 py-1.5">
                    Aula {allLessons.indexOf(currentLesson) + 1}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground font-black uppercase tracking-[0.2em]">{currentLesson.duration} de duração</span>
                </div>
                <Separator className="bg-white/5" />
                <p className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-4xl font-medium">
                  Nesta aula, exploramos como utilizar a Ferramenta de Capturar Leads da Clickify para otimizar suas conversões e organizar seu funil de vendas estratégico.
                </p>
              </div>
            </div>

            {/* Sidebar Lessons List */}
            <div className="w-full lg:w-96 border-l border-white/5 bg-[#050505] overflow-auto h-full">
              <div className="p-8 border-b border-white/5">
                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Conteúdo do Curso
                </h3>
              </div>
              <div className="p-6 space-y-10">
                {COURSE_DATA.modules.map((module) => (
                  <div key={module.id} className="space-y-4">
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] px-2 flex items-center gap-2">
                      {module.title}
                    </h4>
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => {
                        const isActive = lesson.id === lessonId;
                        return (
                          <Link 
                            key={lesson.id} 
                            href={`/courses/${COURSE_DATA.id}/lessons/${lesson.id}`}
                            className={`
                              flex items-center gap-4 p-4 rounded-2xl transition-all group border
                              ${isActive 
                                ? 'bg-primary/10 border-primary/30 shadow-[0_0_20px_rgba(147,45,204,0.1)]' 
                                : 'hover:bg-white/5 border-transparent'}
                            `}
                          >
                            <div className={`
                              h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
                              ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-muted-foreground group-hover:text-white'}
                            `}>
                              {isActive ? <PlayCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className={`text-xs font-black uppercase tracking-tight truncate ${isActive ? 'text-primary' : 'text-white/80 group-hover:text-white'}`}>
                                {lesson.title}
                              </span>
                              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{lesson.duration}</span>
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
