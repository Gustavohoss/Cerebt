
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser, useDoc, useFirestore, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');

  // Protect route
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  // Memoize the document reference to user profile
  const userRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, 'users', user.uid);
  }, [db, user?.uid]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(userRef);

  // Sync state with profile data
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setBio(profile.bio || '');
    }
  }, [profile]);

  const handleSave = () => {
    if (!userRef) return;

    updateDocumentNonBlocking(userRef, {
      firstName,
      lastName,
      bio,
      updatedAt: new Date().toISOString()
    });

    toast({
      title: "Perfil atualizado",
      description: "Suas alterações foram salvas com sucesso.",
    });
  };

  if (isUserLoading || isProfileLoading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-black">
          <div className="p-6 space-y-6 max-w-3xl">
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (!user) return null;

  const registrationDate = profile?.registrationDate 
    ? new Date(profile.registrationDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    : 'Recentemente';

  // Fallback initial based on first name or email
  const initial = firstName ? firstName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || '?';

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-black">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/5 px-6">
          <h1 className="text-xl font-headline font-semibold text-white">Configurações de Perfil</h1>
        </header>
        <main className="flex-1 overflow-auto p-6 max-w-3xl">
          <div className="space-y-6">
             {/* Header Section */}
             <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-[#0C0C0E] rounded-[2rem] border border-white/5 shadow-2xl">
                <Avatar className="h-28 w-28 ring-4 ring-primary/10">
                  <AvatarImage src="" alt={firstName} />
                  <AvatarFallback className="bg-primary/20 text-primary text-3xl font-black uppercase font-headline">
                    {initial}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center sm:text-left">
                  <h2 className="text-3xl font-black text-white font-headline">
                    {firstName && lastName ? `${firstName} ${lastName}` : user.email}
                  </h2>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold">
                    Membro desde {registrationDate}
                  </p>
                  <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 text-[10px] uppercase tracking-widest font-black mt-2 h-9 px-6 rounded-xl">
                    Alterar Avatar
                  </Button>
                </div>
             </div>

             {/* Personal Info Form */}
             <Card className="bg-[#0C0C0E] border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
               <CardHeader className="p-8 pb-4">
                 <CardTitle className="text-2xl font-black text-white uppercase tracking-tight font-headline">Informações Pessoais</CardTitle>
                 <CardDescription className="text-muted-foreground font-medium">Atualize seus dados de contato e preferências.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-8 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="first-name" className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Nome</Label>
                      <Input 
                        id="first-name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Gustavo"
                        className="bg-black/40 border-white/5 focus:border-primary/50 transition-all h-14 rounded-xl px-6 font-medium text-white" 
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="last-name" className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Sobrenome</Label>
                      <Input 
                        id="last-name" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Henrique"
                        className="bg-black/40 border-white/5 focus:border-primary/50 transition-all h-14 rounded-xl px-6 font-medium text-white" 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">E-mail de Acesso</Label>
                    <Input 
                      id="email" 
                      value={user.email || ''} 
                      disabled 
                      className="bg-black/20 border-white/5 text-muted-foreground cursor-not-allowed h-14 rounded-xl px-6" 
                    />
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">O e-mail não pode ser alterado diretamente.</p>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="bio" className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Bio / Objetivo na IA</Label>
                    <textarea 
                      id="bio" 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full min-h-[160px] bg-black/40 border border-white/5 rounded-[1.5rem] p-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-white font-medium resize-none"
                      placeholder="Conte um pouco sobre sua jornada com Inteligência Artificial..."
                    />
                  </div>
               </CardContent>
               <CardFooter className="flex justify-between items-center bg-white/[0.01] border-t border-white/5 p-8">
                  <Button variant="ghost" className="text-muted-foreground hover:text-white font-bold" onClick={() => router.back()}>
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleSave}
                    className="bg-primary hover:bg-primary/90 text-white px-10 font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl shadow-[0_10px_20px_rgba(147,45,204,0.3)] transition-all"
                  >
                    Salvar Alterações
                  </Button>
               </CardFooter>
             </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
