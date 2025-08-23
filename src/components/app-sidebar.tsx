"use client"

import * as React from "react"
import { useVersion } from "@/components/version-provider";
import {
  BookOpen,
  CircleUserRound,
  Command,
  Cpu,
  Frame,
  Gamepad2,
  LifeBuoy,
  Map,
  Megaphone,
  Send,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";

const data = {
  user: {
    name: "小广",
    email: "gxwtf@gxwtf.cn",
    avatar: "https://gxwtf.cn/gytb.png",
  },
  navMain: [
    {
      title: "古诗文",
      url: "/dashboard",
      icon: BookOpen,
      items: [
        {
          title: "概览",
          url: "/overview",
        },
        {
          title: "预览",
          url: "/poem-preview/junior/次北固山下",
        },
        {
          title: "知识梳理",
          url: "/comb/junior/次北固山下",
        },
        {
          title: "学习",
          url: "#",
        },
      ],
    },
    {
      title: "积累",
      url: "#",
      icon: Cpu,
      items: [
        {
          title: "古诗文积累",
          url: "#",
        },
        {
          title: "每日积累",
          url: "#",
        },
        {
          title: "文常积累",
          url: "#",
        },
      ],
    },
    {
      title: "作者",
      url: "#",
      icon: CircleUserRound,
      items: [
        {
          title: "概览",
          url: "#",
        },
        {
          title: "简介",
          url: "/author-preview/李白",
        },
        {
          title: "文常学习",
          url: "#",
        },
      ],
    },
    {
      title: "游戏",
      url: "#",
      icon: Gamepad2,
      items: [
        {
          title: "句读知不知",
          url: "#",
        },
        {
          title: "不背文言",
          url: "#",
        },
        {
          title: "诗词九宫格",
          url: "#",
        },
        {
          title: "诗文连句",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "帮助",
      url: "https://github.com/gxwtf/gxwtf-poem-react/blob/main/README.md",
      icon: LifeBuoy,
    },
    {
      title: "反馈",
      url: "https://github.com/gxwtf/gxwtf-poem-react/issues",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "前端设计",
      url: "https://op.gxwtf.cn/projects/gxwtf-poem/",
      icon: Frame,
    },
    {
      name: "后端开发",
      url: "https://op.gxwtf.cn/projects/gxwtf-poem/",
      icon: SquareTerminal,
    },
    {
      name: "网站推广",
      url: "https://op.gxwtf.cn/projects/gxwtf/",
      icon: Megaphone,
    },
    {
      name: "行万里路",
      url: "https://github.gxwtf.cn/",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { version } = useVersion();
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">广学古诗文</span>
                  {version === 'senior' ? (
                    <span className="truncate text-xs">高中版</span>
                  ) : (
                    <span className="truncate text-xs">初中版</span>
                  )}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
