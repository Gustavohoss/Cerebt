'use client';

import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlayCircle, CheckCircle2, Clock, Sparkles, BookOpen, ChevronRight, Trophy, Layout } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const SINGLE_COURSE = {
  id: '1',
  title: 'Cerebro: Strategic AI Blueprint',
  description: 'O guia definitivo para dominar a inteligência artificial estratégica e transformar processos de negócio de ponta a ponta.',
  image: PlaceHolderImages[0]?.imageUrl || 'https://picsum.photos/seed/ai1/1200/600',
  progress: 45,
  modules: [
    {
      title: 'Fundamentos & Mindset',
      description: 'Prepare sua mente para a nova era da automação e inteligência estratégica.',
      lessons: [
        { id: 'l1', title: 'A Nova Era da Inteligência', duration: '12:45', completed: true },
        { id: 'l2', title: 'Arquitetura do Pensamento Estratégico', duration: '15:20', completed: true },
        { id: 'l3', title: 'O Ecossistema Cerebro', duration: '10:10', completed: false },
      ]
    },
    {
      title: 'Engenharia de Comando (Prompting)',
      description: 'Domine as técnicas de comunicação com LLMs para extrair o máximo de performance.',
      lessons: [
        { id: 'l4', title: 'Frameworks de Prompting Avançado', duration: '18:30', completed: false },
        { id: 'l5', title: 'Contextualização e Variáveis', duration: '22:15', completed: false },
        { id: 'l6', title: 'Iteração e Refinamento de Output', duration: '30:45', completed: false },
      ]
    },
    {
      title: 'Implementação e Escala',
      description: 'Como integrar IA em workflows complexos e escalar resultados reais.',
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
            <h1 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2 font-headline">
              Dashboard de Treinamento
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] font-bold py-0 px-2 h-5">
                ELITE ACCESS
              </Badge>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:flex flex-col items-end">
               <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Seu Progresso Atual</span>
               <div className="flex items-center gap-3 mt-1">
                 <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                   <div className="h-full bg-primary" style={{ width: `${SINGLE_COURSE.progress}%` }} />
                 </div>
                 <span className="text-sm font-black text-white">{SINGLE_COURSE.progress}%</span>
               </div>
             </div>
             <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
               <Trophy className="h-5 w-5 text-primary" />
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Main Course Hero */}
            <div className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#121214] to-[#050505] border border-white/5 shadow-2xl">
               <div className="flex flex-col lg:flex-row gap-0">
                  <div className="relative h-72 lg:h-auto lg:w-2/5 overflow-hidden">
                    <Image 
                      src={SINGLE_COURSE.image} 
                      alt={SINGLE_COURSE.title} 
                      fill 
                      className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                      data-ai-hint="futuristic intelligence"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#121214] via-transparent to-transparent hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121214] to-transparent lg:hidden" />
                  </div>

                  <div className="flex-1 p-8 lg:p-14 space-y-8 relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.4em]">
                        <Sparkles className="h-4 w-4" />
                        Acesso Masterclass
                      </div>
                      <h2 className="text-4xl lg:text-6xl font-black text-white uppercase leading-none tracking-tighter font-headline">
                        {SINGLE_COURSE.title}
                      </h2>
                      <p className="text-muted-foreground text-lg max-w-2xl font-medium leading-relaxed">
                        {SINGLE_COURSE.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest px-10 h-16 rounded-2xl shadow-[0_0_30px_rgba(147,45,204,0.3)] transition-all">
                        Continuar de onde parou
                      </Button>
                      <div className="flex items-center gap-6 px-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Duração Total</span>
                          <span className="text-white font-bold">14h 45min</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Nível</span>
                          <span className="text-primary font-bold">ESTRATÉGICO</span>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
               {/* Decorative Glow */}
               <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
            </div>

            {/* Modules Grid */}
            <div className="space-y-8">
              <div className="flex items-center justify-between border-l-4 border-primary pl-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter font-headline">Grade Curricular</h3>
                  <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">8 módulos • 42 aulas • Material de apoio</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SINGLE_COURSE.modules.map((module, mIdx) => (
                  <div key={mIdx} className="group relative bg-[#0C0C0E] border border-white/5 rounded-[2rem] p-8 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    <div className="space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <span className="text-xl font-black font-headline">0{mIdx + 1}</span>
                        </div>
                        <Badge variant="outline" className="border-white/10 text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3">
                          Unidade {mIdx + 1}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors font-headline">
                          {module.title}
                        </h4>
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                          {module.description}
                        </p>
                      </div>

                      <div className="space-y-3 pt-4">
                        {module.lessons.map((lesson, lIdx) => (
                          <Link 
                            key={lesson.id} 
                            href={`/courses/${SINGLE_COURSE.id}/lessons/${lesson.id}`}
                            className="flex items-center justify-between group/lesson py-2 border-b border-white/[0.03] last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <PlayCircle className="h-4 w-4 text-muted-foreground group-hover/lesson:text-primary transition-colors" />
                              )}
                              <span className="text-xs font-bold text-white/80 group-hover/lesson:text-white transition-colors">{lesson.title}</span>
                            </div>
                            <span className="text-[10px] font-medium text-muted-foreground">{lesson.duration}</span>
                          </Link>
                        ))}
                      </div>

                      <Button className="w-full bg-white/5 hover:bg-primary text-white border border-white/10 hover:border-primary font-black uppercase text-[10px] tracking-widest h-12 rounded-xl transition-all duration-300">
                        Começar Módulo
                      </Button>
                    </div>
                    {/* Background Detail */}
                    <div className="absolute bottom-4 right-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none">
                       <Layout className="h-24 w-24 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>

      {/* Global Aesthetics */}
      <div className="fixed top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-[800px] h-[800px] bg-secondary/5 blur-[180px] rounded-full pointer-events-none" />
    </SidebarProvider>
  );
}
