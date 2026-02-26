"use client"

import * as React from "react"
import { 
  BookOpen, 
  LayoutDashboard, 
  Settings, 
  User, 
  LogOut,
  Zap,
  PlayCircle
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Link from "next/link"

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Todos os Cursos",
    url: "/dashboard",
    icon: BookOpen,
  },
  {
    title: "Continuar Assistindo",
    url: "/dashboard",
    icon: PlayCircle,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-white/5 sidebar-gradient">
      <SidebarHeader className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-headline">MindFlow <span className="text-primary">AI</span></span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-4 py-2">
          {navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-primary/10 hover:text-primary transition-colors py-6">
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarSeparator className="bg-white/5 mb-4" />
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton asChild className="hover:bg-primary/10 py-6">
                <Link href="/profile" className="flex items-center gap-3">
                   <Avatar className="h-8 w-8">
                     <AvatarImage src={PlaceHolderImages[3].imageUrl} />
                     <AvatarFallback>JD</AvatarFallback>
                   </Avatar>
                   <div className="flex flex-col items-start text-xs">
                     <span className="font-medium text-white">João Dantas</span>
                     <span className="text-muted-foreground">Premium Member</span>
                   </div>
                </Link>
             </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-400 hover:text-red-300 hover:bg-red-950/20 py-6">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}