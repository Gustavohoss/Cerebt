
'use client';

import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlayCircle, CheckCircle2, Trophy, Sparkles, Clock, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';

const SINGLE_COURSE = {
  id: '1',
  title: 'Cerebro: AI Web Mastery',
  description: 'Domine a criação de sites de alta conversão com Inteligência Artificial e construa uma agência lucrativa vendendo para clientes de elite.',
  image: PlaceHolderImages.find(img => img.id === 'course-hero')?.imageUrl || 'https://picsum.photos/seed/ai1/1200/600',
  modules: [
    {
      id: 'm1',
      title: 'Ecossistema Clickify: Escala com IA',
      description: 'Aprenda a utilizar o poder da Clickify para criar landing pages que vendem e automatizar a captura de clientes de alto ticket.',
      image: 'https://s3.typebot.io/public/workspaces/cmle51dfd000olg04rs1yp52y/typebots/cmm2j9e2d000j04i50i8b9y6c/blocks/wdwea65n235yiik5t4jn8iqt?v=1772071752504',
      lessons: [
        { id: 'l1', title: 'Ferramenta de capturar Leads', duration: '08:45' },
        { id: 'l2', title: 'Como Abordar Empresas', duration: '15:20' },
        { id: 'l3', title: 'Criar Site - Parte 1', duration: '22:15' },
        { id: 'l4', title: 'Criar Site - Parte 2', duration: '18:40' },
      ]
    }
  ]
};

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();

  // Load User Profile to check approval
  const userRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, 'users', user.uid);
  }, [db, user?.uid]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(userRef);

  const completionsRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return collection(db, 'users', user.uid, 'lessonCompletions');
  }, [db, user?.uid]);

  const { data: completions } = useCollection(completionsRef);

  const totalLessons = SINGLE_COURSE.modules.flatMap(m => m.lessons).length;
  const completedCount = completions?.length || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const isLessonCompleted = (id: string) => completions?.some(c => c.lessonId === id);

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Pending Approval State
  if (profile && profile.isApproved === false) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="w-full max-w-lg bg-white/5 border-white/10 glass-panel shadow-2xl overflow-hidden">
          <div className="h-2 bg-primary animate-pulse" />
          <div className="p-8 md:p-12 text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-[2rem] bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_40px_rgba(147,45,204,0.15)]">
                <Lock className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter font-headline">Acesso em Análise</h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                Olá, <strong>{profile.firstName}</strong>! Sua solicitação de acesso está sendo processada. Logo você terá acesso total ao Ecossistema Cerebro.
              </p>
            </div>
            <div className="flex flex-col gap-3">
               <div className="flex items-center justify-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                 <Clock className="h-4 w-4" />
                 Status: Aguardando Liberação
               </div>
               <Button asChild variant="ghost" className="text-muted-foreground hover:text-white text-xs font-bold">
                 <Link href="/login">Sair da Conta</Link>
               </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#050505]">
        <header className="flex h-16 md:h-20 shrink-0 items-center justify-between gap-4 border-b border-white/5 px-4 md:px-8 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-50">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden text-white" />
            <div className="flex flex-col">
              <h1 className="text-sm md:text-xl font-black text-white uppercase tracking-tight flex items-center gap-2 font-headline">
                Dashboard
                <Badge className="bg-primary/20 text-primary border-primary/30 text-[8px] md:text-[10px] font-bold py-0 px-2 h-4 md:h-5">
                  ELITE
                </Badge>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
             <div className="hidden sm:flex flex-col items-end">
               <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Progresso Total</span>
               <div className="flex items-center gap-3 mt-1">
                 <div className="w-24 md:w-32 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                   <div className="h-full bg-primary transition-all duration-700 ease-out" style={{ width: `${progressPercent}%` }} />
                 </div>
                 <span className="text-xs md:text-sm font-black text-white">{progressPercent}%</span>
               </div>
             </div>
             <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
               <Trophy className="h-4 w-4 md:h-5 md:w-5 text-primary" />
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
            
            <div className="relative group overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#121214] to-[#050505] border border-white/5 shadow-2xl">
               <div className="flex flex-col lg:flex-row">
                  <div className="relative h-48 md:h-72 lg:h-auto lg:w-2/5 overflow-hidden">
                    <Image 
                      src={SINGLE_COURSE.image} 
                      alt={SINGLE_COURSE.title} 
                      fill 
                      className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#121214] via-transparent to-transparent hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121214] to-transparent lg:hidden" />
                  </div>

                  <div className="flex-1 p-6 md:p-14 space-y-6 md:space-y-8 relative z-10">
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center gap-2 text-primary font-bold text-[8px] md:text-[10px] uppercase tracking-[0.4em]">
                        <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                        Treinamento Master
                      </div>
                      <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white uppercase leading-none tracking-tighter font-headline">
                        {SINGLE_COURSE.title}
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-lg max-w-2xl font-medium leading-relaxed">
                        {SINGLE_COURSE.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
                      <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest px-6 md:px-10 h-12 md:h-16 rounded-xl md:rounded-2xl shadow-[0_0_30px_rgba(147,45,204,0.3)] transition-all">
                        <Link href={`/courses/${SINGLE_COURSE.id}/lessons/${SINGLE_COURSE.modules[0].lessons[0].id}`}>
                          {progressPercent > 0 ? 'Continuar Assistindo' : 'Começar Agora'}
                        </Link>
                      </Button>
                      <div className="flex items-center justify-around sm:justify-start gap-4 md:gap-6 px-2">
                        <div className="flex flex-col">
                          <span className="text-[8px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">Aulas</span>
                          <span className="text-white font-bold text-xs md:text-base">{totalLessons} Aulas</span>
                        </div>
                        <div className="w-px h-6 md:h-8 bg-white/10" />
                        <div className="flex flex-col">
                          <span className="text-[8px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">Nível</span>
                          <span className="text-primary font-bold text-xs md:text-base">MASTER</span>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center justify-between border-l-4 border-primary pl-4 md:pl-6">
                <div className="space-y-1">
                  <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tighter font-headline">Estrutura do Curso</h3>
                  <p className="text-[10px] md:text-sm text-muted-foreground font-medium uppercase tracking-widest">Clique nos módulos para ver as aulas</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {SINGLE_COURSE.modules.map((module, mIdx) => (
                  <div key={mIdx} className="group relative bg-[#0C0C0E] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col">
                    
                    <div className="relative h-44 w-full overflow-hidden">
                       <Image 
                        src={module.image} 
                        alt={module.title}
                        fill
                        className="object-cover opacity-100 group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                       />
                       <div className="absolute top-4 left-4 h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                          <span className="text-base md:text-xl font-black text-white font-headline">0{mIdx + 1}</span>
                       </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-4 md:space-y-6 flex-1">
                      <div className="space-y-2">
                        <h4 className="text-lg md:text-xl font-black text-primary uppercase tracking-tight font-headline">
                          {module.title}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed line-clamp-2">
                          {module.description}
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        {module.lessons.map((lesson) => {
                          const completed = isLessonCompleted(lesson.id);
                          return (
                            <Link 
                              key={lesson.id} 
                              href={`/courses/${SINGLE_COURSE.id}/lessons/${lesson.id}`}
                              className="flex items-center justify-between group/lesson py-2 border-b border-white/[0.03] last:border-0"
                            >
                              <div className="flex items-center gap-3">
                                {completed ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                  <PlayCircle className="h-4 w-4 text-muted-foreground group-hover/lesson:text-primary transition-colors" />
                                )}
                                <span className={`text-xs font-bold transition-colors line-clamp-1 ${completed ? 'text-green-500/80' : 'text-white/80 group-hover/lesson:text-white'}`}>
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">{lesson.duration}</span>
                            </Link>
                          );
                        })}
                      </div>

                      <Button asChild className="w-full bg-white/5 hover:bg-primary text-white border border-white/10 hover:border-primary font-black uppercase text-[10px] tracking-widest h-12 rounded-xl transition-all duration-300">
                        <Link href={`/courses/${SINGLE_COURSE.id}/lessons/${module.lessons[0].id}`}>
                          Ver Conteúdo
                        </Link>
                      </Button>
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
