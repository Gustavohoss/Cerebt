import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-black">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/5 px-6">
          <h1 className="text-xl font-headline font-semibold text-white">Configurações de Perfil</h1>
        </header>
        <main className="flex-1 overflow-auto p-6 max-w-3xl">
          <div className="space-y-6">
             <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                  <AvatarImage src={PlaceHolderImages[3].imageUrl} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">João Dantas</h2>
                  <p className="text-muted-foreground">Membro desde Outubro de 2023</p>
                  <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/10">
                    Alterar Avatar
                  </Button>
                </div>
             </div>

             <Card className="bg-white/5 border-white/10">
               <CardHeader>
                 <CardTitle>Informações Pessoais</CardTitle>
                 <CardDescription>Atualize seus dados de contato e preferências.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Nome</Label>
                      <Input id="first-name" defaultValue="João" className="bg-black border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Sobrenome</Label>
                      <Input id="last-name" defaultValue="Dantas" className="bg-black border-white/10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" defaultValue="joao.dantas@mindflow.ai" className="bg-black border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio" 
                      className="w-full min-h-[100px] bg-black border border-white/10 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Fale um pouco sobre você..."
                    />
                  </div>
               </CardContent>
               <CardFooter className="flex justify-end gap-3 border-t border-white/5 pt-6">
                  <Button variant="ghost">Cancelar</Button>
                  <Button className="bg-primary hover:bg-primary/90 text-white">Salvar Alterações</Button>
               </CardFooter>
             </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}