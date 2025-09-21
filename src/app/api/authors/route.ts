import { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')

    try {
        const authors = await prisma.author.findMany({
            where: {
                ...(tag && {
                    tags: {
                        has: tag
                    }
                })
            }
        })
        return Response.json(authors)
    } catch (error) {
        console.error('Error fetching authors:', error)
        return Response.json(
            { error: '获取作者数据失败' }, 
            { status: 500 }
        )
    }
}