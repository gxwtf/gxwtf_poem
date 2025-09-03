import { NextRequest } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const authors = await prisma.author.findMany()
        return Response.json(authors)
    } catch (error) {
        console.error('Error fetching authors:', error)
        return Response.json(
            { error: '获取作者数据失败' }, 
            { status: 500 }
        )
    }
}