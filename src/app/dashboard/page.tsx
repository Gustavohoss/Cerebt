'use client';

import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlayCircle, CheckCircle2, Clock, Sparkles, BookOpen, ChevronRight, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const SINGLE_COURSE = {
  id: '1',
  title: 'Cerebro: Strategic AI Blueprint',
  description: 'O guia definitivo para dominar a inteligência artificial estratégica e transformar processos de negócio.',
  image: PlaceHolderImages[0]?.imageUrl || 'https://picsum.photos/seed/ai1/1200/600',
  progress: 45,
  modules: [
    {
      title: 'Módulo 1: Fundamentos & Mindset',
      lessons: [
        { id: 'l1', title: 'A Nova Era da Inteligência', duration: '12:45', completed: true },
        { id: 'l2', title: 'Arquitetura do Pensamento Estratégico', duration: '15:20', completed: true },
        { id: 'l3', title: 'O Ecossistema Cerebro', duration: '10:10', completed: false },
      ]
    },
    {
      title: 'Módulo 2: Engenharia de Comando (Prompting)',
      lessons: [
        { id: 'l4', title: 'Frameworks de Prompting Avançado', duration: '18:30', completed: false },
        { id: 'l5', title: 'Contextualização e Variáveis', duration: '22:15', completed: false },
        { id: 'l6', title: 'Iteração e Refinamento de Output', duration: '30:45', completed: false },
      ]
    },
    {
      title: 'Módulo 3: Implementação e Escala',
      lessons: [
        { id: 'l7', title: 'Automação de Workflows complexos', duration: '25:00', completed: false },
        { id: 'l8', title: 'IA Generativa no Mundo Real', duration: '20:15', completed: false },
      ]
    }
  ]
};

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#050505]">
        <header className="flex h-20 shrink-0 items-center justify-between gap-4 border-b border-white/5 px-8">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              Treinamento Ativo
              <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold py-0 px-2 h-5">
                ELITE
              </Badge>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
               <Trophy className="h-4 w-4 text-primary" />
               Progresso Geral: {SINGLE_COURSE.progress}%
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-10">
            
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1025] via-[#0A0A0B] to-[#050505] border border-white/5 p-10 group shadow-2xl">
               <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="relative h-64 w-full md:w-[450px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <Image 
                      src={SINGLE_COURSE.image} 
                      alt={SINGLE_COURSE.title} 
                      fill 
                      className="object-cover transition-transform group-hover:scale-105 duration-1000 opacity-90"
                      data-ai-hint="futuristic intelligence"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                       <Badge className="bg-primary text-white border-none text-[10px] font-black uppercase px-3 py-1">
                         Acesso Vitalício
                       </Badge>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6 z-10 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.4em]">
                      <Sparkles className="h-4 w-4" />
                      Strategic Masterclass
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-none tracking-tighter">
                      {SINGLE_COURSE.title}
                    </h2>
                    <p className="text-muted-foreground text-base max-w-xl font-medium leading-relaxed">
                      {SINGLE_COURSE.description}
                    </p>
                    
                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest px-8 h-14 rounded-xl shadow-[0_0_20px_rgba(147,45,204,0.3)] transition-all">
                        Continuar Assistindo
                      </Button>
                      <Button variant="outline" size="lg" className="border-white/10 text-white bg-white/5 font-black uppercase text-xs tracking-widest px-8 h-14 rounded-xl hover:bg-white/10 transition-all">
                        Ver Ementa Completa
                      </Button>
                    </div>
                  </div>
               </div>
               
               {/* Background Glow */}
               <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            </div>

            {/* Modules Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Grade Curricular
                </h3>
              </div>

              <div className="grid gap-6">
                {SINGLE_COURSE.modules.map((module, mIdx) => (
                  <div key={mIdx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div className="space-y-1">
                        <h4 className="text-white font-bold text-lg flex items-center gap-2">
                          <span className="text-primary text-sm font-black">0{mIdx + 1}</span>
                          {module.title}
                        </h4>
                        <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                          <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {module.lessons.length} aulas</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 1h 24min</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-white/10 text-muted-foreground uppercase text-[10px] px-3">
                        Módulo Desbloqueado
                      </Badge>
                    </div>

                    <div className="grid gap-3">
                      {module.lessons.map((lesson, lIdx) => (
                        <Link 
                          key={lesson.id} 
                          href={`/courses/${SINGLE_COURSE.id}/lessons/${lesson.id}`}
                          className="group flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${lesson.completed ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-muted-foreground'}`}>
                              {lesson.completed ? <CheckCircle2 className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{lesson.title}</p>
                              <span className="text-[10px] text-muted-foreground font-medium">{lesson.duration}</span>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>

      {/* Global Background Glows */}
      <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />
    </SidebarProvider>
  );
}
