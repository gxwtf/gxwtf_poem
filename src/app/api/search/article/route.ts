import { NextRequest } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"

const prisma = new PrismaClient()

interface SearchResult {
    title: string
    author: string
    abstract: string
    content: string
    matchType: 'title' | 'author' | 'abstract' | 'content'
    snippet?: string
}

// 智能片段提取函数 - 找到关键词第一个出现位置，从前面的标点符号开始截取50个字符
function extractContextSnippet(content: string, query: string) {
    const queryIndex = content.toLowerCase().indexOf(query.toLowerCase())

    if (queryIndex === -1) {
        return null
    }

    // 查找前面的标点符号（句号、逗号、分号、感叹号、省略号、问号）
    const punctuationRegex = /[。，；！…？]/g
    let lastPunctuationIndex = -1
    let match

    while ((match = punctuationRegex.exec(content.substring(0, queryIndex))) !== null) {
        lastPunctuationIndex = match.index
    }

    // 如果没有找到标点符号，从关键词位置开始
    const startIndex = lastPunctuationIndex !== -1 ? lastPunctuationIndex + 1 : queryIndex

    // 截取50个字符
    const endIndex = Math.min(content.length, startIndex + 50)
    let snippet = content.slice(startIndex, endIndex)

    // 如果截取的内容不包含完整的关键词，调整起始位置
    if (!snippet.includes(query)) {
        snippet = content.slice(queryIndex, Math.min(content.length, queryIndex + 50))
    }

    return snippet
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.trim() === '') {
        return Response.json({ results: [] })
    }

    try {
        // 使用单个查询搜索所有相关字段
        const results = await prisma.article.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { author: { contains: query, mode: 'insensitive' } },
                    { abstract: { contains: query, mode: 'insensitive' } },
                    { content: { contains: query, mode: 'insensitive' } }
                ]
            },
            take: 20
        })

        // 确定匹配类型并排序
        const formattedResults: SearchResult[] = results.map(article => {
            let matchType: 'title' | 'author' | 'abstract' | 'content' = 'content'

            if (article.title.toLowerCase().includes(query.toLowerCase())) {
                matchType = 'title'
            } else if (article.author?.toLowerCase().includes(query.toLowerCase())) {
                matchType = 'author'
            } else if (article.abstract?.toLowerCase().includes(query.toLowerCase())) {
                matchType = 'abstract'
            }

            // 为内容匹配的结果提取智能片段
            let snippet: string | undefined = undefined
            if (matchType === 'content') {
                const extractedSnippet = extractContextSnippet(article.content || '', query)
                if (extractedSnippet) {
                    snippet = extractedSnippet
                }
            }

            return {
                title: article.title,
                author: article.author || '',
                abstract: article.abstract || '',
                content: article.content || '',
                matchType,
                snippet
            }
        })

        // 按优先级排序（标题 > 作者 > 摘要 > 内容）
        formattedResults.sort((a, b) => {
            const priority = { title: 1, author: 2, abstract: 3, content: 4 }
            return priority[a.matchType] - priority[b.matchType]
        })

        return Response.json({ results: formattedResults })
    } catch (error) {
        console.error('Article search error:', error)
        return Response.json({ error: '读书课搜索失败' }, { status: 500 })
    }
}