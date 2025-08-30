import { NextRequest } from "next/server"
import { PrismaClient } from "../../../../app/generated/prisma"

const prisma = new PrismaClient()

interface SearchResult {
  title: string
  author: string
  snippet: string
  matchType: 'title' | 'author' | 'content' | 'tags'
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  
  if (!query || query.trim() === '') {
    return Response.json({ results: [] })
  }

  try {
    // 搜索古诗名
    const titleResults = await prisma.poem.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive'
        }
      },
      take: 10
    })

    // 搜索作者
    const authorResults = await prisma.poem.findMany({
      where: {
        author: {
          contains: query,
          mode: 'insensitive'
        }
      },
      take: 10
    })

    // 搜索内容
    const contentResults = await prisma.poem.findMany({
      where: {
        content: {
          contains: query,
          mode: 'insensitive'
        }
      },
      take: 10
    })

    // 搜索标签
    const tagResults = await prisma.poem.findMany({
      where: {
        tags: {
          has: query
        }
      },
      take: 10
    })

    // 合并结果并按优先级排序
    const allResults = [
      ...titleResults.map(poem => ({
        ...poem,
        matchType: 'title' as const,
        snippet: findFirstMatchingSentence(poem.content, query)
      })),
      ...authorResults.map(poem => ({
        ...poem,
        matchType: 'author' as const,
        snippet: findFirstMatchingSentence(poem.content, query)
      })),
      ...contentResults.map(poem => ({
        ...poem,
        matchType: 'content' as const,
        snippet: findFirstMatchingSentence(poem.content, query)
      })),
      ...tagResults.map(poem => ({
        ...poem,
        matchType: 'tags' as const,
        snippet: findFirstMatchingSentence(poem.content, query)
      }))
    ]

    // 去重并排序（标题 > 作者 > 内容 > 标签）
    const uniqueResults = Array.from(
      new Map(allResults.map(item => [item.id, item])).values()
    ).sort((a, b) => {
      const priority = { title: 1, author: 2, content: 3, tags: 4 }
      return priority[a.matchType] - priority[b.matchType]
    })

    // 格式化结果
    const formattedResults: SearchResult[] = uniqueResults.map(poem => ({
      title: poem.title,
      version: poem.version,
      author: poem.author,
      snippet: poem.snippet || '',
      matchType: poem.matchType
    }))

    return Response.json({ results: formattedResults })
  } catch (error) {
    console.error('Search error:', error)
    return Response.json({ error: '搜索失败' }, { status: 500 })
  }
}

// 查找第一个包含搜索词的句子
function findFirstMatchingSentence(content: string, query: string): string {
  // 按段落分割（#分隔符）
  const paragraphs = content.split('#')
  
  for (const paragraph of paragraphs) {
    // 按句子分割（/分隔符）
    const sentences = paragraph.split('/')
    
    for (const sentence of sentences) {
      if (sentence.includes(query)) {
        return sentence.trim()
      }
    }
  }
  
  return ''
}