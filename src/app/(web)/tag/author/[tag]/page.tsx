"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import { AuthorCard, SkeletonAuthorCard } from "@/components/author-card"
import { SiteHeader } from "@/components/site-header"
import { useVersion } from "@/components/version-provider"

type AuthorMeta = {
    id: string
    name: string
    dynasty?: string
    epithet?: string
    intro?: string
    quote?: string
    tags?: string[]
}

export default function Page() {
    const params = useParams()
    const tag = decodeURIComponent(params.tag as string)
    const { version } = useVersion()
    const [authors, setAuthors] = useState<AuthorMeta[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadAuthorsByTag() {
            setLoading(true)
            try {
                const response = await fetch(`/api/authors?version=${version}&tag=${tag}`)
                if (response.ok) {
                    const data = await response.json()
                    setAuthors(data)
                } else {
                    console.error('Failed to fetch authors by tag:', response.statusText)
                }
            } catch (error) {
                console.error('Error fetching authors by tag:', error)
            } finally {
                setLoading(false)
            }
        }
        loadAuthorsByTag()
    }, [version, tag])

    const skeletonCount = 6

    if (loading) {
        return (
            <>
                <SiteHeader now={`标签: ${tag}`} />
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <SkeletonAuthorCard key={index} />
                    ))}
                </div>
            </>
        )
    }

    return (
        <>
            <SiteHeader 
                now={`${tag}`}
                data={[ { name: "作者", href: "/authors" }, { name: "作者标签", href: "/tag/author" }]}
            />
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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