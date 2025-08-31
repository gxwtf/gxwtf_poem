"use client"

import * as React from "react"
import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Sun
                        className="h-[1.2rem] w-[1.2rem] block transition-all dark:hidden" />
                    <Moon
                        className="h-[1.2rem] w-[1.2rem] hidden transition-all dark:block" />
                    <span className="sr-only">切换主题</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="text-primary" />
                    明亮
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="text-primary" />
                    暗黑
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <SunMoon className="text-primary" />
                    跟随系统
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
