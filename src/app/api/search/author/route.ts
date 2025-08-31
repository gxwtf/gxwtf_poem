import { NextRequest } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"

const prisma = new PrismaClient()

interface SearchResult {
	name: string
	dynasty: string
	epithet: string
	tags: string[]
	matchType: 'name' | 'dynasty' | 'epithet' | 'tags'
	avatar?: string
}

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const query = searchParams.get('q')

	if (!query || query.trim() === '') {
		return Response.json({ results: [] })
	}

	try {
		// 搜索作者名
		const nameResults = await prisma.author.findMany({
			where: {
				name: {
					contains: query,
					mode: 'insensitive'
				}
			},
			take: 10
		})

		// 搜索朝代
		const dynastyResults = await prisma.author.findMany({
			where: {
				dynasty: {
					contains: query,
					mode: 'insensitive'
				}
			},
			take: 10
		})

		// 搜索称号
		const epithetResults = await prisma.author.findMany({
			where: {
				epithet: {
					contains: query,
					mode: 'insensitive'
				}
			},
			take: 10
		})

		// 搜索标签
		const tagResults = await prisma.author.findMany({
			where: {
				tags: {
					has: query
				}
			},
			take: 10
		})

		// 合并结果并按优先级排序
		const allResults = [
			...nameResults.map(author => ({
				...author,
				matchType: 'name' as const
			})),
			...dynastyResults.map(author => ({
				...author,
				matchType: 'dynasty' as const
			})),
			...epithetResults.map(author => ({
				...author,
				matchType: 'epithet' as const
			})),
			...tagResults.map(author => ({
				...author,
				matchType: 'tags' as const
			}))
		]

		// 去重并排序（名称 > 朝代 > 称号 > 标签）
		const uniqueResults = Array.from(
			new Map(allResults.map(item => [item.id, item])).values()
		).sort((a, b) => {
			const priority = { name: 1, dynasty: 2, epithet: 3, tags: 4 }
			return priority[a.matchType] - priority[b.matchType]
		})

		// 格式化结果
		const formattedResults: SearchResult[] = uniqueResults.map(author => ({
			name: author.name,
			dynasty: author.dynasty || '',
			epithet: author.epithet || '',
			tags: author.tags,
			matchType: author.matchType,
			avatar: author.avatar || undefined // 添加头像字段
		}))

		return Response.json({ results: formattedResults })
	} catch (error) {
		console.error('Author search error:', error)
		return Response.json({ error: '作者搜索失败' }, { status: 500 })
	}
}