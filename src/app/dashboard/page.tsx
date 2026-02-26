import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { CourseCard } from '@/components/course-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const COURSES = [
  {
    id: '1',
    title: 'Fundamentos de IA Generativa',
    description: 'Aprenda os conceitos básicos por trás dos grandes modelos de linguagem e como eles funcionam.',
    image: PlaceHolderImages[0].imageUrl,
    progress: 45,
    lessons: 12,
  },
  {
    id: '2',
    title: 'Dominando o Prompt Engineering',
    description: 'Técnicas avançadas para extrair o máximo de performance de IAs como GPT-4 e Claude.',
    image: PlaceHolderImages[1].imageUrl,
    progress: 80,
    lessons: 8,
  },
  {
    id: '3',
    title: 'Visão Computacional na Prática',
    description: 'Implemente sistemas de reconhecimento de imagem e processamento de vídeo em tempo real.',
    image: PlaceHolderImages[2].imageUrl,
    progress: 10,
    lessons: 15,
  }
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#050505]">
        <header className="flex h-20 shrink-0 items-center justify-between gap-4 border-b border-white/5 px-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              Meus Cursos
              <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold py-0 px-2 h-5">
                PRO
              </Badge>
            </h1>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Sua jornada de evolução contínua</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 w-80 group focus-within:border-primary/50 transition-all">
                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Pesquisar por treinamento..." 
                  className="bg-transparent border-none outline-none text-xs text-white placeholder:text-muted-foreground/50 w-full font-medium"
                />
             </div>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all">
                <SlidersHorizontal className="h-4 w-4 text-white" />
             </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Filter Tabs */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8 border-b border-white/5 w-full">
                 <button className="text-xs font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-4 -mb-[1px] transition-all">
                   Todos os Cursos
                 </button>
                 <button className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-white pb-4 -mb-[1px] transition-all">
                   Em Andamento
                 </button>
                 <button className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-white pb-4 -mb-[1px] transition-all">
                   Finalizados
                 </button>
                 <button className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-white pb-4 -mb-[1px] transition-all">
                   Favoritos
                 </button>
              </div>
            </div>

            {/* Featured Section Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1025] to-[#0A0A0B] border border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6 group">
               <div className="space-y-4 z-10">
                  <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em]">
                    <Sparkles className="h-3 w-3" />
                    Novidade na plataforma
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white uppercase leading-tight">
                    Workshop Intensivo: <br /> <span className="text-primary">IA para Negócios 2024</span>
                  </h2>
                  <p className="text-muted-foreground text-sm max-w-md font-medium">
                    Domine as estratégias de implementação de IA que estão revolucionando o mercado corporativo este ano.
                  </p>
                  <button className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all">
                    Garantir minha vaga
                  </button>
               </div>
               <div className="relative h-48 w-48 md:h-64 md:w-64 opacity-20 md:opacity-100 transition-transform group-hover:scale-110 duration-1000">
                  <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full" />
                  <Sparkles className="h-full w-full text-primary" />
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
              {COURSES.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
        </main>
      </SidebarInset>

      {/* Global Background Glows */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
    </SidebarProvider>
  );
}
