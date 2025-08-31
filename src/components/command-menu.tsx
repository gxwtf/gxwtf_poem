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
import Link from "next/link"
import { useDebounce } from "@react-hook/debounce"
import { useIsMac } from "@/hooks/use-is-mac"

interface SearchResult {
    title: string
    version: string
    author: string
    snippet: string
    matchType: 'title' | 'author' | 'content' | 'tags'
}

interface AuthorSearchResult {
    name: string
    dynasty: string
    epithet: string
    tags: string[]
    matchType: 'name' | 'dynasty' | 'epithet' | 'tags'
}

interface ArticleSearchResult {
    title: string
    author: string
    snippet: string
    matchType: 'title' | 'author' | 'abstract' | 'content'
}

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')
    const [searchQuery, setSearchQuery] = useDebounce(searchValue, 500)
    const [searchResults, setSearchResults] = React.useState<SearchResult[]>([])
    const [authorResults, setAuthorResults] = React.useState<AuthorSearchResult[]>([])
    const [articleResults, setArticleResults] = React.useState<ArticleSearchResult[]>([])
    const [isSearching, setIsSearching] = React.useState(false)
    const isMac = useIsMac()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (isMac && e.metaKey || !isMac && e.ctrlKey)) {
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

    // 搜索古诗文、作者和文章
    React.useEffect(() => {
        const searchAll = async () => {
            if (!searchQuery.trim()) {
                setSearchResults([])
                setAuthorResults([])
                setArticleResults([])
                setIsSearching(false)
                return
            }

            setIsSearching(true)
            try {
                // 并行搜索古诗文、作者和文章
                const [poemResponse, authorResponse, articleResponse] = await Promise.all([
                    fetch(`/api/search/poem?q=${encodeURIComponent(searchQuery)}`),
                    fetch(`/api/search/author?q=${encodeURIComponent(searchQuery)}`),
                    fetch(`/api/search/article?q=${encodeURIComponent(searchQuery)}`)
                ])

                if (poemResponse.ok) {
                    const poemData = await poemResponse.json()
                    setSearchResults(poemData.results)
                }

                if (authorResponse.ok) {
                    const authorData = await authorResponse.json()
                    setAuthorResults(authorData.results)
                }

                if (articleResponse.ok) {
                    const articleData = await articleResponse.json()
                    setArticleResults(articleData.results)
                }
            } catch (error) {
                console.error('搜索失败:', error)
                setSearchResults([])
                setAuthorResults([])
                setArticleResults([])
            } finally {
                setIsSearching(false)
            }
        }
        searchAll()
    }, [searchQuery])

    // HTML 内联高亮函数
    const HighlightedText = ({ text, query }: { text: string; query: string }) => {
        if (!query) return <span>{text}</span>

        const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
        const parts = text.split(regex)
        const matches = text.match(regex) || []

        return (
            <span>
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                        {part}
                        {matches[index] && (
                            <span className="text-[var(--theme-color)]">
                                {matches[index]}
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </span>
        )
    }

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="搜索古诗文、作者、文章、标签..."
                value={searchValue}
                onValueChange={setSearchValue}
            />
            <CommandList>
                {searchValue ? (
                    <>
                        {isSearching ? (
                            <CommandEmpty>搜索中...</CommandEmpty>
                        ) : (
                            <>
                                {/* 作者搜索结果 */}
                                {authorResults.length > 0 && (
                                    <CommandGroup
                                        forceMount={true}
                                        heading="作者搜索结果"
                                    >
                                        {authorResults.map((result, index) => {
                                            const displayText = `${result.name}｜${result.dynasty}｜${result.epithet}`
                                            return (
                                                <CommandItem key={index} className="text-primary">
                                                    <Link
                                                        href={`/author/${encodeURIComponent(result.name)}`}
                                                        className="flex items-center w-full"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <Search className="text-[var(--theme-color)] mr-2 h-4 w-4" />
                                                        <span className="truncate">
                                                            <HighlightedText
                                                                text={displayText}
                                                                query={searchQuery}
                                                            />
                                                        </span>
                                                    </Link>
                                                </CommandItem>
                                            )
                                        })}
                                    </CommandGroup>
                                )}

                                {/* 古诗文搜索结果 */}
                                {searchResults.length > 0 && (
                                    <CommandGroup
                                        forceMount={true}
                                        heading="古诗文搜索结果"
                                    >
                                        {searchResults.map((result, index) => {
                                            const displayText = `${result.title}｜${result.author}` + (result.snippet ? `｜${result.snippet}` : '')
                                            return (
                                                <CommandItem key={index} className="text-primary">
                                                    <Link
                                                        href={`/poem/${encodeURIComponent(result.version)}/${encodeURIComponent(result.title)}`}
                                                        className="flex items-center w-full"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <Search className="text-[var(--theme-color)] mr-2 h-4 w-4" />
                                                        <span className="truncate">
                                                            <HighlightedText
                                                                text={displayText}
                                                                query={searchQuery}
                                                            />
                                                        </span>
                                                    </Link>
                                                </CommandItem>
                                            )
                                        })}
                                    </CommandGroup>
                                )}

                                {/* 文章搜索结果 */}
                                {articleResults.length > 0 && (
                                    <CommandGroup
                                        forceMount={true}
                                        heading="文章搜索结果"
                                    >
                                        {articleResults.map((result, index) => {
                                            const displayText = `${result.title}｜${result.author}｜${result.snippet}`
                                            return (
                                                <CommandItem key={index} className="text-primary">
                                                    <Link
                                                        href={`/article/${encodeURIComponent(result.title)}`}
                                                        className="flex items-center w-full"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <Search className="text-[var(--theme-color)] mr-2 h-4 w-4" />
                                                        <span className="truncate">
                                                            <HighlightedText
                                                                text={displayText}
                                                                query={searchQuery}
                                                            />
                                                        </span>
                                                    </Link>
                                                </CommandItem>
                                            )
                                        })}
                                    </CommandGroup>
                                )}

                                {searchResults.length === 0 && authorResults.length === 0 && articleResults.length === 0 && (
                                    <CommandEmpty>找不到相关结果</CommandEmpty>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <CommandEmpty>找不到结果。</CommandEmpty>
                        <CommandGroup heading="建议">
                            <CommandItem className="text-primary">
                                <Calendar className="mr-2 h-4 w-4" />
                                <Link
                                    href={`/overview`}
                                    className="flex items-center w-full"
                                    onClick={() => setOpen(false)}
                                >
                                    古诗文
                                </Link>
                            </CommandItem>
                            <CommandItem className="text-primary">
                                <Smile className="mr-2 h-4 w-4" />
                                <Link
                                    href={`/authors`}
                                    className="flex items-center w-full"
                                    onClick={() => setOpen(false)}
                                >
                                    作者
                                </Link>
                            </CommandItem>
                            <CommandItem className="text-primary">
                                <Calculator className="mr-2 h-4 w-4" />
                                <Link
                                    href={`/articles`}
                                    className="flex items-center w-full"
                                    onClick={() => setOpen(false)}
                                >
                                    读书课
                                </Link>
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