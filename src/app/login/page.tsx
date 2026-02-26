
import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-black relative overflow-hidden">
      <div className="w-full max-w-md space-y-6 md:space-y-8 relative z-10">
        <div className="flex flex-col items-center space-y-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white font-headline">MindFlow <span className="text-primary">AI</span></span>
          </Link>
        </div>

        <Card className="bg-white/5 border-white/10 glass-panel shadow-2xl">
          <CardHeader className="space-y-1 p-6 md:p-8">
            <CardTitle className="text-xl md:text-2xl font-bold text-white text-center">Bem-vindo de volta</CardTitle>
            <CardDescription className="text-muted-foreground text-center text-sm">
              Insira suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-6 md:px-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                className="bg-black/50 border-white/10 focus:border-primary/50 transition-colors h-11 text-white"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white/80">Senha</Label>
                <Link href="#" className="text-[10px] md:text-xs text-primary hover:underline font-bold uppercase tracking-wider">Esqueceu?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                className="bg-black/50 border-white/10 focus:border-primary/50 transition-colors h-11 text-white"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 p-6 md:p-8">
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest h-12 rounded-xl shadow-[0_5px_15px_rgba(147,45,204,0.3)]">
              <Link href="/dashboard">Entrar Agora</Link>
            </Button>
            <p className="text-xs md:text-sm text-center text-muted-foreground">
              Não tem uma conta? <Link href="#" className="text-primary hover:underline font-bold">Contato</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(147,45,204,0.1),transparent_50%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(51,51,153,0.1),transparent_50%)]" />
    </div>
  );
}
