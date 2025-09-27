import { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// 简单随机推荐算法
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const version = searchParams.get('version')

    // 获取古诗文推荐（随机6首，根据版本筛选）
    const poems = await prisma.poem.findMany({
      take: 4,
      where: {
        version: version || undefined
      },
      orderBy: {
        id: 'desc'
      }
    })

    // 获取作者推荐（随机4位）
    const authors = await prisma.author.findMany({
      take: 3,
      orderBy: {
        id: 'desc'
      }
    })

    // 获取文章推荐（随机4篇）
    const articles = await prisma.article.findMany({
      take: 3,
      orderBy: {
        id: 'desc'
      }
    })

    // 处理古诗文内容
    const processedPoems = poems.map(poem => ({
      ...poem,
      content: poem.content ? poem.content.replace(/[#\/]/g, '') : poem.content
    }))

    return Response.json({
      poems: processedPoems,
      authors,
      articles
    })

  } catch (error) {
    console.error('Error fetching recommends:', error)
    return Response.json(
      { error: '获取推荐数据失败' }, 
      { status: 500 }
    )
  }
}