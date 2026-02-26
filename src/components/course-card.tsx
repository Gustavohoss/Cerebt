import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play } from 'lucide-react';

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
    <Card className="overflow-hidden border-white/5 bg-white/5 hover:border-primary/50 transition-all group purple-glow">
      <div className="relative aspect-video overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform group-hover:scale-105 duration-500"
          data-ai-hint="course cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
             <Play className="h-6 w-6 text-white fill-white" />
           </div>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <h3 className="text-lg font-semibold text-white line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted-foreground">{lessons} aulas</span>
          <span className="text-primary font-medium">{progress}% completo</span>
        </div>
        <Progress value={progress} className="h-1.5 bg-white/10" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link 
          href={`/courses/${id}`} 
          className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-md text-sm font-medium text-center transition-colors"
        >
          {progress > 0 ? 'Continuar Assistindo' : 'Começar Agora'}
        </Link>
      </CardFooter>
    </Card>
  );
}