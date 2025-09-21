// 文章列表页面

"use client"
import React, { useEffect, useState } from "react"
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

export default function ArticlesPage() {
    const [articles, setArticles] = useState<ArticleMeta[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadArticles() {
            setLoading(true)
            try {
                const response = await fetch('/api/articles')
                if (response.ok) {
                    const data = await response.json()
                    setArticles(data)
                } else {
                    console.error('Failed to fetch articles:', response.statusText)
                }
            } catch (error) {
                console.error('Error fetching articles:', error)
            } finally {
                setLoading(false)
            }
        }
        loadArticles()
    }, [])

    const skeletonCount = 6

    if (loading) {
        return (
            <>
                <SiteHeader now="读书课" />
                <div className="p-2 sm:p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <SkeletonArticleCard key={index} />
                    ))}
                </div>
            </>
        )
    }

    return (
        <>
            <SiteHeader now="读书课" />
            <div className="p-2 sm:p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
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