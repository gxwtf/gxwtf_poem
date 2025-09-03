import { NextRequest } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const version = searchParams.get('version')

    try {
        const poems = await prisma.poem.findMany({
            where: {
                version: version || undefined
            }
        })

        return Response.json(poems)
    } catch (error) {
        console.error('Error fetching poems:', error)
        return Response.json(
            { error: '获取诗歌数据失败' }, 
            { status: 500 }
        )
    }
}