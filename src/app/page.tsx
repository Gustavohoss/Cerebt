
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 text-center space-y-6 md:space-y-8 max-w-4xl mx-auto overflow-hidden">
      <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary shadow-[0_0_30px_rgba(147,45,204,0.4)]">
          <Zap className="h-6 w-6 md:h-7 md:w-7 text-white" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-headline">
          MindFlow <span className="text-primary">AI</span>
        </h1>
      </div>
      
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <h2 className="text-xl md:text-3xl text-white font-medium max-w-2xl mx-auto leading-relaxed px-4">
          A fronteira do conhecimento em <span className="text-primary">Inteligência Artificial</span> começa aqui.
        </h2>
        <p className="text-muted-foreground text-sm md:text-lg max-w-xl mx-auto px-4">
          Plataforma exclusiva para membros. Acesse conteúdos de alto nível, workshops e frameworks para dominar a era da IA.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full sm:w-auto px-6">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 text-base md:text-lg rounded-full w-full sm:w-auto">
          <Link href="/login">
            Acessar Área de Membros <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </Button>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(147,45,204,0.15),transparent_50%)]" />
    </div>
  );
}
