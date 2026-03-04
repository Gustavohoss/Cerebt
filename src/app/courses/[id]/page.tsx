'use client';

import React from 'react';
import Link from 'next/link';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, PlayCircle, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

const COURSE_CONTENT = {
  id: '1',
  title: 'Cerebro: AI Web Mastery',
  modules: [
    {
      title: 'Ecossistema Clickify: Escala com IA',
      lessons: [
        { id: 'l1', title: 'Ferramenta de capturar Leads', duration: '08:45' },
        { id: 'l2', title: 'Como Abordar Empresas', duration: '15:20' },
        { id: 'l3', title: 'Criar Site - Parte 1', duration: '22:15' },
        { id: 'l4', title: 'Criar Site - Parte 2', duration: '18:40' },
      ]
    }
  ]
};

export default function CoursePage() {
  const { user } = useUser();
  const db = useFirestore();

  const completionsRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return collection(db, 'users', user.uid, 'lessonCompletions');
  }, [db, user?.uid]);

  const { data: completions } = useCollection(completionsRef);
  const isLessonCompleted = (id: string) => completions?.some(c => c.lessonId === id);

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
                Domine a criação de sites de alta conversão com Inteligência Artificial e construa uma agência lucrativa vendendo para clientes de elite.
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
                    {module.lessons.map((lesson) => {
                      const completed = isLessonCompleted(lesson.id);
                      return (
                        <Link 
                          key={lesson.id} 
                          href={`/courses/${COURSE_CONTENT.id}/lessons/${lesson.id}`}
                          className="group flex items-center justify-between p-4 bg-white/5 rounded-xl border border-transparent hover:border-primary/30 hover:bg-white/[0.08] transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${completed ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>
                              {completed ? <CheckCircle2 className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                            </div>
                            <div>
                              <p className={`font-medium transition-colors ${completed ? 'text-green-500/80' : 'text-white group-hover:text-primary'}`}>
                                {lesson.title}
                              </p>
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
                      );
                    })}
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
