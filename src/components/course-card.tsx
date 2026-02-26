import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Play, Clock, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  lessons: number;
}

export function CourseCard({ id, title, description, image, progress, lessons }: CourseCardProps) {
  return (
    <Card className="group relative overflow-hidden border-white/5 bg-[#0F0F10] hover:border-primary/40 transition-all duration-500 shadow-2xl">
      <div className="relative aspect-video overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform group-hover:scale-110 duration-700 opacity-80 group-hover:opacity-100"
          data-ai-hint="course cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-transparent to-transparent opacity-90" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
           <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_30px_rgba(147,45,204,0.4)] backdrop-blur-md border border-white/20">
             <Play className="h-7 w-7 text-white fill-white ml-1" />
           </div>
        </div>

        <div className="absolute top-3 left-3 flex gap-2">
           <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-[10px] font-bold uppercase tracking-wider py-1">
             <BookOpen className="h-3 w-3 mr-1 text-primary" />
             {lessons} aulas
           </Badge>
        </div>
      </div>

      <CardHeader className="p-6 pb-2 space-y-2">
        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 font-medium leading-relaxed">
          {description}
        </p>
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.1em]">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              Status do curso
            </span>
            <span className="text-primary">{progress}% completo</span>
          </div>
          <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
             <div 
               className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/80 to-primary shadow-[0_0_15px_rgba(147,45,204,0.5)] transition-all duration-1000 ease-out" 
               style={{ width: `${progress}%` }}
             />
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-white/[0.03] hover:bg-primary hover:text-white border border-white/10 hover:border-primary text-white font-black text-xs uppercase tracking-widest transition-all duration-300 rounded-xl py-6 group-hover:shadow-[0_0_20px_rgba(147,45,204,0.2)]">
          <Link href={`/courses/${id}`}>
            {progress > 0 ? 'Continuar Assistindo' : 'Iniciar Treinamento'}
          </Link>
        </Button>
      </CardFooter>
      
      {/* Decorative corner glow */}
      <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-primary/10 blur-[40px] rounded-full group-hover:bg-primary/20 transition-all duration-500" />
    </Card>
  );
}
