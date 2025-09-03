"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import { ArticleCard, SkeletonArticleCard } from "@/components/article-card"
import { SiteHeader } from "@/components/site-header"

type ArticleMeta = {
    id: string
    title: string
    author?: string
    dynasty?: string
    views?: number
    abstract?: string
    img?: string
    tags?: string[]
}

export default function Page() {
    const params = useParams()
    const tag = decodeURIComponent(params.tag as string)
    const [articles, setArticles] = useState<ArticleMeta[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadArticlesByTag() {
            setLoading(true)
            try {
                const response = await fetch(`/api/articles?tag=${tag}`)
                if (response.ok) {
                    const data = await response.json()
                    setArticles(data)
                } else {
                    console.error('Failed to fetch articles by tag:', response.statusText)
                }
            } catch (error) {
                console.error('Error fetching articles by tag:', error)
            } finally {
                setLoading(false)
            }
        }
        loadArticlesByTag()
    }, [tag])

    const skeletonCount = 6

    if (loading) {
        return (
            <>
                <SiteHeader now={`标签: ${tag}`} />
                <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <SkeletonArticleCard key={index} />
                    ))}
                </div>
            </>
        )
    }

    if (articles.length === 0) {
        notFound()
    }

    return (
        <>
            <SiteHeader 
                now={`${tag}`}
                data={[ { name: "读书课", href: "/articles" }, { name: "文章标签", href: "/tag/article" }]}
            />
            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <ArticleCard 
                        key={article.id}
                        title={article.title}
                        author={article.author}
                        dynasty={article.dynasty}
                        views={article.views}
                        abstract={article.abstract}
                        img={article.img}
                        tags={article.tags}
                        url={`/article/${encodeURIComponent(article.title)}`} 
                    />
                ))}
            </div>
        </>
    )
}