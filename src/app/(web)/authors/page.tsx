// 作者列表页面

"use client"
import React, { useEffect, useState } from "react"
import { AuthorCard, SkeletonAuthorCard } from "@/components/author-card"
import { SiteHeader } from "@/components/site-header"

type AuthorMeta = {
    id: string
    name: string
    dynasty?: string
    epithet?: string
    intro?: string
    quote?: string
    tags?: string[]
}

export default function AuthorsPage() {
    const [authors, setAuthors] = useState<AuthorMeta[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadAuthors() {
            setLoading(true)
            try {
                const response = await fetch('/api/authors')
                if (response.ok) {
                    const data = await response.json()
                    setAuthors(data)
                } else {
                    console.error('Failed to fetch authors:', response.statusText)
                }
            } catch (error) {
                console.error('Error fetching authors:', error)
            } finally {
                setLoading(false)
            }
        }
        loadAuthors()
    }, [])

    const skeletonCount = 6

    if (loading) {
        return (
            <>
                <SiteHeader now="作者" />
                <div className="p-2 sm:p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <SkeletonAuthorCard key={index} />
                    ))}
                </div>
            </>
        )
    }

    return (
        <>
            <SiteHeader now="作者" />
            <div className="p-2 sm:p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                {authors.map((author) => (
                    <AuthorCard 
                        key={author.id}
                        name={author.name}
                        epithet={author.epithet}
                        intro={author.intro}
                        quote={author.quote}
                        tags={author.tags}
                        url={`/author/${author.name}`} 
                    />
                ))}
            </div>
        </>
    )
}