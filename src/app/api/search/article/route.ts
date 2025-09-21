import { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface SearchResult {
    title: string
    author: string
    matchType: 'title' | 'author' | 'abstract' | 'content'
    snippet: string
}

// 智能片段提取函数 - 找到关键词第一个出现位置，从前面的标点符号开始截取指定长度的字符
function extractContextSnippet(content: string, query: string, snippetLength: number = 30) {
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

    // 如果没有找到标点符号，说明关键词在字符串的第一句话中，从头开始即可
    const startIndex = lastPunctuationIndex !== -1 ? lastPunctuationIndex + 1 : 0

    // 截取指定长度的字符
    const endIndex = Math.min(content.length, startIndex + snippetLength)
    let snippet = content.slice(startIndex, endIndex)

    // 如果截取的内容不包含完整的关键词，调整起始位置
    if (!snippet.includes(query)) {
        snippet = content.slice(queryIndex, Math.min(content.length, queryIndex + snippetLength))
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
            let snippet = ''

            if (article.title.toLowerCase().includes(query.toLowerCase())) {
                matchType = 'title'
                snippet = article.title
            } else if (article.author?.toLowerCase().includes(query.toLowerCase())) {
                matchType = 'author'
                snippet = article.author || ''
            } else if (article.abstract?.toLowerCase().includes(query.toLowerCase())) {
                matchType = 'abstract'
                const extractedSnippet = extractContextSnippet(article.abstract || '', query, 50)
                if (extractedSnippet) {
                    snippet = extractedSnippet
                } else {
                    return null
                }
            } else {
                matchType = 'content'
                const extractedSnippet = extractContextSnippet(article.content || '', query, 50)
                if (extractedSnippet) {
                    snippet = extractedSnippet
                } else {
                    return null
                }
            }

            // 内容匹配优先级处理：如果同时匹配到内容和摘要，优先返回内容snippet
            const contentMatch = article.content?.toLowerCase().includes(query.toLowerCase())
            const abstractMatch = article.abstract?.toLowerCase().includes(query.toLowerCase())
            
            if (contentMatch && abstractMatch) {
                // 同时匹配到内容和摘要，优先返回内容snippet
                const contentSnippet = extractContextSnippet(article.content || '', query, 50)
                if (contentSnippet) {
                    snippet = contentSnippet
                    matchType = 'content'
                }
            }

            return {
                title: article.title,
                author: article.author || '',
                matchType,
                snippet
            }
        })

        .filter((result): result is SearchResult => result !== null)

        // 按优先级排序（标题 > 作者 > 内容 > 摘要）
        formattedResults.sort((a, b) => {
            const priority = { title: 1, author: 2, content: 3, abstract: 4 }
            return priority[a.matchType] - priority[b.matchType]
        })

        return Response.json({ results: formattedResults })
    } catch (error) {
        console.error('Article search error:', error)
        return Response.json({ error: '读书课搜索失败' }, { status: 500 })
    }
}