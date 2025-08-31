// 文章列表页面

"use client"
import React, { useEffect, useState } from "react"
import { ArticleCard } from "@/components/article-card"
import { SiteHeader } from "@/components/site-header"

type ArticleMeta = {
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

    useEffect(() => {
        async function loadArticles() {
            try {
                const articlesData = await import(`@/data/article/articles.json`);
                setArticles(articlesData.default);
            } catch (error) {
                console.error("加载文章数据失败:", error)
            }
        }
        loadArticles();
    }, [])

    return (
        <>
            <SiteHeader now="读书课" />
            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {articles.map((article, idx) => (
                    <ArticleCard
                        key={article.title + idx}
                        {...article}
                        url={`/article/${encodeURIComponent(article.title)}`}
                    />
                ))}
            </div>
        </>
    )
}