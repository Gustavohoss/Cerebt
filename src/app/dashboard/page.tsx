import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { CourseCard } from '@/components/course-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
      <SidebarInset className="bg-black">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/5 px-6">
          <h1 className="text-xl font-headline font-semibold text-white">Meus Cursos</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}