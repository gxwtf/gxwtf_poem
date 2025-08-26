// 作者列表页面

"use client"
import React, { useEffect, useState } from "react"
import { AuthorCard } from "@/components/author-card"
import { SiteHeader } from "@/components/site-header"

type AuthorMeta = {
    name: string
    dynasty?: string
    epithet?: string
    intro?: string
    quote?: string
    tags?: string[]
}

export default function AuthorsPage() {
    const [authors, setAuthors] = useState<AuthorMeta[]>([])

    useEffect(() => {
        async function loadAuthors() {
            try {
                const authorsData = await import(`@/author/authors.json`);
                setAuthors(authorsData.default);
            } catch (error) {
                console.error("加载作者数据失败:", error)
            }
        }
        loadAuthors();
    })

    return (
        <>
            <SiteHeader now="作者" />
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {authors.map((author, idx) => (
                    <AuthorCard
                        key={author.name + idx}
                        {...author}
                        url={`/author/${author.name}`}
                    />
                ))}
            </div>
        </>
    )
}