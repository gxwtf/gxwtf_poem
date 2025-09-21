"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PoemCard, SkeletonPoemCard } from "@/components/poem-card"
import { SiteHeader } from "@/components/site-header"
import { useVersion } from "@/components/version-provider"

type PoemMeta = {
    id: string
    title: string
    author: string
    dynasty: string
    content: string
    tags?: string[]
    version: string
}

export default function Page() {
    const params = useParams()
    const tag = decodeURIComponent(params.tag as string)
    const { version } = useVersion()
    const [poems, setPoems] = useState<PoemMeta[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPoemsByTag() {
            setLoading(true)
            try {
                const response = await fetch(`/api/poems?version=${version}&tag=${tag}`)
                if (response.ok) {
                    const data = await response.json()
                    console.log("data",data)
                    setPoems(data)
                } else {
                    console.error('Failed to fetch poems by tag:', response.statusText)
                }
            } catch (error) {
                console.error('Error fetching poems by tag:', error)
            } finally {
                setLoading(false)
            }
        }
        loadPoemsByTag()
    }, [version, tag])

    const skeletonCount = 8

    if (loading) {
        return (
            <>
                <SiteHeader
                    now={`${tag}`}
                    data={[ { name: "古诗文", href: "/overview" }, { name: "标签", href: "/tag/poem" }]}
                />
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <SkeletonPoemCard key={index} />
                    ))}
                </div>
            </>
        )
    }

    return (
        <>
            <SiteHeader 
                now={`${tag}`}
                data={[ { name: "古诗文", href: "/overview" }, { name: "标签", href: "/tag/poem" }]}
            />
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {poems.map((poem) => (
                    <PoemCard 
                        key={poem.id} 
                        title={poem.title}
                        author={poem.author}
                        dynasty={poem.dynasty}
                        content={poem.content}
                        tags={poem.tags}
                        url={`/poem/${version}/${poem.title}`}
                        id={poem.id}
                    />
                ))}
            </div>
        </>
    )
}