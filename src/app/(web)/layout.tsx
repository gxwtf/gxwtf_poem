// 包含了一个侧边栏和一个顶部导航栏的layout

import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import React from "react";

export default function SidebarLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider className="[--header-height:calc(--spacing(12))]">
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}