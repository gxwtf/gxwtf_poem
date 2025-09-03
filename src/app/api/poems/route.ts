import { NextRequest } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const version = searchParams.get('version')
    const tag = searchParams.get('tag')

    try {
        const poems = await prisma.poem.findMany({
            where: {
                version: version || undefined,
                ...(tag && {
                    tags: {
                        has: tag
                    }
                })
            }
        })

        return Response.json(poems)
    } catch (error) {
        console.error('Error fetching poems:', error)
        return Response.json(
            { error: '获取古诗文数据失败' }, 
            { status: 500 }
        )
    }
}