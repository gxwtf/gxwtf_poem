import { Search } from "lucide-react"
import * as React from "react"

import { Label } from "@/components/ui/label"
import { SidebarInput } from "@/components/ui/sidebar"
import { useIsMac } from "@/hooks/use-is-mac"
import { CommandMenuKbd } from "./command-menu-kbd"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const isMac = useIsMac()
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // 触发CommandMenu的打开事件
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: isMac,
      ctrlKey: !isMac,
      bubbles: true
    })
    document.dispatchEvent(event)
  }
  
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="搜索古诗文、作者..."
          className="h-8 pl-7 pr-20 cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={handleClick}
          readOnly
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        
        <div className="absolute top-1.5 right-1.5 hidden sm:flex items-center gap-1">
          <CommandMenuKbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>K
          </CommandMenuKbd>
        </div>
      </div>
    </form>
  )
}
