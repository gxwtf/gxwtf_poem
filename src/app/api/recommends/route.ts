import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { SessionData, sessionOptions } from '@/lib/iron'

const prisma = new PrismaClient();

// 判断当前是上学期还是下学期的函数
function getCurrentSemester() {
	const now = new Date();
	const currentMonth = now.getMonth() + 1; // JavaScript月份从0开始
	const currentDay = now.getDate();

	// 判断是否在9月1日及以后，或者在次年春节之前
	if ((currentMonth > 9) || (currentMonth === 9 && currentDay >= 1)) {
		// 9月1日及以后，是上学期
		return 'first';
	} else if (currentMonth <= 2) {
		// 1-2月，通常在春节前后，视为上学期
		return 'first';
	} else {
		// 3-8月，是下学期
		return 'second';
	}
}

// 根据年级和学期获取对应的tag
function getGradeTag(grade: number): string | null {
	// 检查年级是否在有效范围内
	if (grade < 7 || grade > 12) {
		return null;
	}

	const semester = getCurrentSemester();

	switch (grade) {
		case 7:
			return semester === 'first' ? '七上' : '七下';
		case 8:
			return semester === 'first' ? '八上' : '八下';
		case 9:
			return semester === 'first' ? '九上' : '九下';
		case 10:
			return semester === 'first' ? '必修上' : '必修下';
		case 11:
			return semester === 'first' ? '选必上' : '选必中';
		case 12:
			return semester === 'first' ? '选必下' : 'senior'; // 特殊处理：12年级下学期返回全部senior
		default:
			return null;
	}
}

// 基于年级的推荐算法
export async function GET(request: NextRequest) {
	try {
		const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
        const { searchParams } = new URL(request.url);
		const grade = session.grade || 0;
		let tagFilter: string | null = null;
		let isSeniorAll = false;

		// 判断年级是否在[7,12]区间内
		if (typeof grade === 'number' && grade >= 7 && grade <= 12) {
			tagFilter = getGradeTag(grade);
			// 特殊处理：12年级下学期
			if (tagFilter === 'senior') {
				isSeniorAll = true;
				tagFilter = null;
			}
		}

		// 构建查询条件
		const poemWhereClause = isSeniorAll
			? { version: 'senior' }
			: (tagFilter ? { tags: { has: tagFilter } } : {});

		// 首先获取所有符合条件的古诗文
		const allPoems = await prisma.poem.findMany({
			where: poemWhereClause,
		});

		// 在应用层随机选择6首古诗文
		const shuffledPoems = [...allPoems].sort(() => Math.random() - 0.5);
		const poems = shuffledPoems.slice(0, 6);

		// 从推荐的诗文中获取作者名称列表（根据实际模型，author是string类型）
		const authorNames = [...new Set(poems.map(poem => poem.author).filter((author): author is string => !!author))];

		// 获取作者推荐（从推荐的诗文中的作者名称随机选择）
		let authors = [];
		if (authorNames.length > 0) {
			// 首先获取所有符合条件的作者
			const allMatchingAuthors = await prisma.author.findMany({
				where: {
					name: { in: authorNames }
				}
			});
			
			// 在应用层随机选择4位作者
			const shuffledAuthors = [...allMatchingAuthors].sort(() => Math.random() - 0.5);
			authors = shuffledAuthors.slice(0, 4);
		} else {
			// 如果没有推荐的作者，先获取所有作者
			const allAuthors = await prisma.author.findMany();
			
			// 在应用层随机选择4位作者
			const shuffledAuthors = [...allAuthors].sort(() => Math.random() - 0.5);
			authors = shuffledAuthors.slice(0, 4);
		}

		// 首先获取所有文章
		const allArticles = await prisma.article.findMany();
		
		// 在应用层随机选择4篇文章
		const shuffledArticles = [...allArticles].sort(() => Math.random() - 0.5);
		const articles = shuffledArticles.slice(0, 4);

		// 处理古诗文内容
		const processedPoems = poems.map(poem => ({
			...poem,
			content: poem.content ? poem.content.replace(/[#\/]/g, '') : poem.content
		}));

		return Response.json({
			poems: processedPoems,
			authors,
			articles
		});

	} catch (error) {
		console.error('Error fetching recommends:', error);
		return Response.json(
			{ error: '获取推荐数据失败' },
			{ status: 500 }
		);
	}
}