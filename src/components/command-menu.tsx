"use client"

import * as React from "react"
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from "lucide-react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { DialogTitle } from "@/components/ui/dialog"

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <DialogTitle className="sr-only">命令菜单</DialogTitle>
            <CommandInput placeholder="输入命令或搜索..." />
            <CommandList>
                <CommandEmpty>找不到结果。</CommandEmpty>
                <CommandGroup heading="建议">
                    <CommandItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>日历</span>
                    </CommandItem>
                    <CommandItem>
                        <Smile className="mr-2 h-4 w-4" />
                        <span>搜索表情</span>
                    </CommandItem>
                    <CommandItem>
                        <Calculator className="mr-2 h-4 w-4" />
                        <span>计算器</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="设置">
                    <CommandItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>个人资料</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>账单</span>
                        <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>设置</span>
                        <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}