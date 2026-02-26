'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function RegisterPage() {
  const router = useRouter();
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName) {
      toast({
        variant: "destructive",
        title: "Dados incompletos",
        description: "Por favor, preencha seu nome e sobrenome.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "As senhas não coincidem!",
      });
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Create UserProfile in Firestore with initial names
      await setDoc(doc(db, 'users', newUser.uid), {
        id: newUser.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        registrationDate: new Date().toISOString(),
        createdAt: serverTimestamp(),
      });

      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: error.message || "Verifique seus dados e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <CardTitle className="text-xl md:text-2xl font-bold text-white text-center">Criar sua conta</CardTitle>
            <CardDescription className="text-muted-foreground text-center text-sm">
              Preencha os dados abaixo para começar sua jornada
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4 px-6 md:px-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white/80">Nome</Label>
                  <Input 
                    id="firstName" 
                    type="text" 
                    placeholder="João" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-black/50 border-white/10 focus:border-primary/50 transition-colors h-11 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white/80">Sobrenome</Label>
                  <Input 
                    id="lastName" 
                    type="text" 
                    placeholder="Silva" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-black/50 border-white/10 focus:border-primary/50 transition-colors h-11 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-black/50 border-white/10 focus:border-primary/50 transition-colors h-11 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-black/50 border-white/10 focus:border-primary/50 transition-colors h-11 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-white/80">Confirmar Senha</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-black/50 border-white/10 focus:border-primary/50 transition-colors h-11 text-white"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 p-6 md:p-8">
              <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest h-12 rounded-xl shadow-[0_5px_15px_rgba(147,45,204,0.3)]">
                {isLoading ? "Criando conta..." : "Criar Minha Conta"}
              </Button>
              <p className="text-xs md:text-sm text-center text-muted-foreground">
                Já tem uma conta? <Link href="/login" className="text-primary hover:underline font-bold">Entrar</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
      
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(147,45,204,0.1),transparent_50%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(51,51,153,0.1),transparent_50%)]" />
    </div>
  );
}
