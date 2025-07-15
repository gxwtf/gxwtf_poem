"use client"

import * as React from "react"
import { useVersion } from "@/components/version-provider";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
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

const data = {
  user: {
    name: "小广",
    email: "gxwtf@gxwtf.cn",
    avatar: "https://gxwtf.cn/gytb.png",
  },
  navMain: [
    {
      title: "古诗文",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "概览",
          url: "/overview",
        },
        {
          title: "预览(Example)",
          url: "/preview",
        },
        {
          title: "预习",
          url: "#",
        },
        {
          title: "复习",
          url: "#",
        },
      ],
    },
    {
      title: "积累",
      url: "#",
      icon: Bot,
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
      icon: BookOpen,
      items: [
        {
          title: "概览",
          url: "#",
        },
        {
          title: "简介(Example)",
          url: "/apreview",
        },
        {
          title: "文常测试",
          url: "#",
        },
      ],
    },
    {
      title: "游戏",
      url: "#",
      icon: Settings2,
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
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
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
              <a href="/dashboard">
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
              </a>
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
