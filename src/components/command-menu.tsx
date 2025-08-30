"use client"

import * as React from "react"
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Search,
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

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDebounce } from "@react-hook/debounce"

interface SearchResult {
    title: string
    version: string
    author: string
    snippet: string
    matchType: 'title' | 'author' | 'content' | 'tags'
}

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')
    const [searchQuery, setSearchQuery] = useDebounce(searchValue, 500)
    const [searchResults, setSearchResults] = React.useState<SearchResult[]>([])
    const [isSearching, setIsSearching] = React.useState(false)
    const router = useRouter()

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

    React.useEffect(() => {
        setSearchQuery(searchValue)
    }, [searchValue])

    React.useEffect(() => {
        console.log('isSearching:', isSearching)
    }, [isSearching])

    // 搜索古诗文
    React.useEffect(() => {
        const searchPoems = async () => {
            if (!searchQuery.trim()) {
                setSearchResults([])
                setIsSearching(false)
                return
            }

            setIsSearching(true)
            try {
                const response = await fetch(`/api/search/poem?q=${encodeURIComponent(searchQuery)}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                setSearchResults(data.results)
            } catch (error) {
                console.error('搜索失败:', error)
                setSearchResults([])
            } finally {
                setIsSearching(false)
            }
        }

        console.log('bac',isSearching);

        searchPoems()
    }, [searchQuery])

    // HTML 内联高亮函数
    const highlightHTML = (text: string, query: string) => {
        if (!query) return text
        const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
        return text.replace(regex, (match) =>
            `<span style="color: var(--theme-color); font-weight: bold">${match}</span>`
        )
    }

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <DialogTitle className="sr-only">命令菜单</DialogTitle>
            <CommandInput
                placeholder="搜索古诗文..."
                value={searchValue}
                onValueChange={setSearchValue}
            />
            <CommandList>
                {searchValue ? (
                    <>
                        {isSearching ? (
                            <CommandEmpty>搜索中...</CommandEmpty>
                        ) : searchResults.length > 0 ? (
                            <CommandGroup className="block" heading="古诗文搜索结果">
                                {
                                    searchResults.map((result, index) => {
                                    console.log("jijijijijijijiji")
                                    // Only include title, author, snippet (no version)
                                    const displayText = `${result.title}｜${result.author}` + (result.snippet ? `｜${result.snippet}` : '')
                                    console.log(displayText)
                                    return (
                                        <CommandItem key={index}>
                                            <Link
                                                href={`/poem/${encodeURIComponent(result.version)}/${encodeURIComponent(result.title)}`}
                                                className="flex items-center w-full"
                                                onClick={() => setOpen(false)}
                                            >
                                                <Search className="mr-2 h-4 w-4" />
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: highlightHTML(displayText, searchQuery)
                                                    }}
                                                />
                                            </Link>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        ) : (
                            <CommandEmpty>找不到相关古诗文</CommandEmpty>
                        )}
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </CommandList>
        </CommandDialog>
    )
}