
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
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

  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl;

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
             <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                  <AvatarImage src={userAvatar} alt={user.email || 'User'} />
                  <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold uppercase">
                    {user.email?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-white">
                    {firstName && lastName ? `${firstName} ${lastName}` : user.email}
                  </h2>
                  <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">
                    Membro desde {registrationDate}
                  </p>
                  <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/10 mt-2">
                    Alterar Avatar
                  </Button>
                </div>
             </div>

             {/* Personal Info Form */}
             <Card className="bg-white/5 border-white/10 overflow-hidden">
               <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                 <CardTitle className="text-white">Informações Pessoais</CardTitle>
                 <CardDescription className="text-muted-foreground">Atualize seus dados de contato e preferências.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-white/70">Nome</Label>
                      <Input 
                        id="first-name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Seu nome"
                        className="bg-black/50 border-white/10 focus:border-primary/50 transition-colors h-11" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-white/70">Sobrenome</Label>
                      <Input 
                        id="last-name" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Seu sobrenome"
                        className="bg-black/50 border-white/10 focus:border-primary/50 transition-colors h-11" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/70">E-mail de Acesso</Label>
                    <Input 
                      id="email" 
                      value={user.email || ''} 
                      disabled 
                      className="bg-black/30 border-white/5 text-muted-foreground cursor-not-allowed h-11" 
                    />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">O e-mail não pode ser alterado diretamente.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white/70">Bio / Objetivo na IA</Label>
                    <textarea 
                      id="bio" 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full min-h-[120px] bg-black/50 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-white"
                      placeholder="Conte um pouco sobre sua jornada com Inteligência Artificial..."
                    />
                  </div>
               </CardContent>
               <CardFooter className="flex justify-end gap-3 bg-white/[0.02] border-t border-white/5 p-6">
                  <Button variant="ghost" className="text-muted-foreground hover:text-white" onClick={() => router.back()}>
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleSave}
                    className="bg-primary hover:bg-primary/90 text-white px-8 font-bold uppercase text-[10px] tracking-widest h-12 rounded-xl shadow-[0_5px_15px_rgba(147,45,204,0.3)] transition-all"
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
