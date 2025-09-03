import { NextRequest } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const articles = await prisma.article.findMany()
        return Response.json(articles)
    } catch (error) {
        console.error('Error fetching articles:', error)
        return Response.json(
            { error: '获取文章数据失败' }, 
            { status: 500 }
        )
    }
}