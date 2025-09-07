"use client"

import * as React from "react"
import { useVersion } from "@/components/version-provider";
import {
    Gamepad2,
    LifeBuoy,
    Send,
    Tag,
    UserPen,
	BookOpenText
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
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
import useSession from "@/lib/use-session";
import { Icon } from "@/components/icon";

const data = {
    navMain: [
        {
            title: "古诗文",
            url: "/overview",
            icon: Icon,
            items: [
                {
                    title: "概览",
                    url: "/overview",
                },
                {
                    title: "知识梳理[Demo]",
                    url: "/comb/junior/次北固山下",
                },
                {
                    title: "标签",
                    url: "/tag/poem",
                },
            ],
        },
        {
            title: "作者",
            url: "/authors",
            icon: UserPen,
            items: [
                {
                    title: "概览",
                    url: "/authors",
                },
                {
                    title: "标签",
                    url: "/tag/author",
                },
            ],
        },
        {
            title: "读书课",
            url: "/articles",
            icon: BookOpenText,
            items: [
                {
                    title: "概览",
                    url: "/articles",
                },
                {
                    title: "标签",
                    url: "/tag/article",
                },
            ],
        },
        {
            title: "标签",
            url: "/tag/poem",
            icon: Tag,
            items: [
                {
                    title: "古诗文标签",
                    url: "/tag/poem",
                },
                {
                    title: "作者标签",
                    url: "/tag/author",
                },
                {
                    title: "读书课标签",
                    url: "/tag/article",
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
            url: "https://docs.gxwtf.cn/",
            icon: LifeBuoy,
        },
        {
            title: "反馈",
            url: "https://docs.gxwtf.cn/#/community/",
            icon: Send,
        },
    ],
	projects: []
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { version } = useVersion();
    const { session } = useSession();
    return (
        <Sidebar collapsible="icon"
            {...props}
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Icon className="size-4" />
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
                {/* {session?.isLoggedIn && (
                    <NavProjects projects={data.projects} />
                )} */}
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                {session?.isLoggedIn && (
                    <NavUser user={{ name: session?.username, email: session?.email, avatar: `https://gxwtf.cn/avatar?userId=${session?.userid}` }} />
                )}
                {!session?.isLoggedIn && (
                    <NavUser user={{ name: "游客", email: "", avatar: "#" }} />
                )}
            </SidebarFooter>
        </Sidebar>
    )
}
