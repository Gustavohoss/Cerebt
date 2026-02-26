"use client"

import * as React from "react"
import { 
  LayoutGrid, 
  Library, 
  MessageSquare, 
  User, 
  Globe,
  Brain,
  Zap
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
import Link from "next/link"
import { usePathname } from "next/navigation"

const navMain = [
  {
    title: "Área de Membros",
    url: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Biblioteca Hub",
    url: "#",
    icon: Library,
  },
  {
    title: "Mentoria Direta",
    url: "#",
    icon: MessageSquare,
  },
  {
    title: "Meu Perfil",
    url: "/profile",
    icon: User,
  },
  {
    title: "Comunidade Black",
    url: "#",
    icon: Globe,
  },
]

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-white/5 bg-[#0A0A0B]">
      <SidebarHeader className="p-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-[0_0_20px_rgba(147,45,204,0.3)]">
            <Brain className="h-7 w-7 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white uppercase leading-none">Cerebro</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mt-1">Strategic Hub</span>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarMenu className="gap-2">
          {navMain.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  className={`
                    group relative py-7 px-4 transition-all duration-300 rounded-xl
                    ${isActive 
                      ? "bg-white/5 text-primary border border-white/10 shadow-[inset_0_0_20px_rgba(147,45,204,0.1)]" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <Link href={item.url}>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[2px_0_10px_rgba(147,45,204,0.5)]" />
                    )}
                    <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : "group-hover:text-white"}`} />
                    <span className="font-semibold text-[15px]">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-6">
        <div className="rounded-2xl bg-gradient-to-br from-[#1A1025] to-[#0A0A0B] p-5 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Zap className="h-12 w-12 text-primary" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Acesso Liberado</p>
            <h4 className="text-sm font-black text-white uppercase tracking-tight">Visitante Elite</h4>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
