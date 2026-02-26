import React from 'react';
import Link from 'next/link';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, PlayCircle, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const COURSE_CONTENT = {
  id: '1',
  title: 'Fundamentos de IA Generativa',
  modules: [
    {
      title: 'Módulo 1: Introdução ao Universo da IA',
      lessons: [
        { id: 'l1', title: 'O que é IA Generativa?', duration: '12:45', completed: true },
        { id: 'l2', title: 'Breve história do Deep Learning', duration: '15:20', completed: true },
        { id: 'l3', title: 'Arquitetura Transformer explicada', duration: '25:10', completed: false },
      ]
    },
    {
      title: 'Módulo 2: Modelos de Linguagem (LLMs)',
      lessons: [
        { id: 'l4', title: 'GPT, Claude e Gemini: Diferenças fundamentais', duration: '18:30', completed: false },
        { id: 'l5', title: 'Tokenização e Vetores latentes', duration: '22:15', completed: false },
        { id: 'l6', title: 'Parâmetros e Fine-tuning', duration: '30:45', completed: false },
      ]
    }
  ]
};

export default function CoursePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-black">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/5 px-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm">Voltar para o Dashboard</span>
          </Link>
        </header>
        <main className="flex-1 overflow-auto p-6 max-w-5xl mx-auto w-full">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-3">CURSO COMPLETO</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-headline">{COURSE_CONTENT.title}</h1>
              <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
                Neste curso você vai mergulhar nas entranhas da inteligência artificial moderna, entendendo desde a matemática base até a implementação de modelos de ponta.
              </p>
            </div>

            <Separator className="bg-white/5" />

            <div className="space-y-10">
              {COURSE_CONTENT.modules.map((module, idx) => (
                <div key={idx} className="space-y-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="text-primary">#</span> {module.title}
                  </h2>
                  <div className="grid gap-2">
                    {module.lessons.map((lesson) => (
                      <Link 
                        key={lesson.id} 
                        href={`/courses/${COURSE_CONTENT.id}/lessons/${lesson.id}`}
                        className="group flex items-center justify-between p-4 bg-white/5 rounded-xl border border-transparent hover:border-primary/30 hover:bg-white/[0.08] transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${lesson.completed ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>
                            {lesson.completed ? <CheckCircle2 className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="text-white font-medium group-hover:text-primary transition-colors">{lesson.title}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <Clock className="h-3 w-3" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                          Assistir Aula
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}