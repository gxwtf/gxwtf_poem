import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// 计算重要度加分的辅助函数
function calculateImportanceBonus(year: number, currentYear: number): number {
    const yearsDiff = currentYear - year
    let bonus = 0
    
    if (yearsDiff % 1000 === 0 && yearsDiff !== 0) {
        bonus += 10
    } else if (yearsDiff % 100 === 0 && yearsDiff !== 0) {
        bonus += 5
    } else if (yearsDiff % 10 === 0 && yearsDiff !== 0) {
        bonus += 3
    } else if (yearsDiff % 5 === 0 && yearsDiff !== 0) {
        bonus += 1
    }
    
    return bonus
}

// 格式化年份显示
function formatYear(year: number): string {
    if (year < 0) {
        return `公元前${-year}`
    }
    return year.toString()
}

// 格式化显示内容的辅助函数
function formatEventDisplay(event: any, currentYear: number): string {
    const yearsDiff = currentYear - event.year
    
    if (event.type === 'birth') {
        return `今乃${event.figure} ${Math.abs(yearsDiff)} 载诞辰`
    } else if (event.type === 'death') {
        return `${event.figure}仙去，${Math.abs(yearsDiff)} 秋矣`
    } else {
        return `${formatYear(event.year)} 年之是日，${event.data}`
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const dateParam = searchParams.get('date')
        
        let now: Date
        
        if (dateParam) {
            now = new Date(dateParam)
        } else {
            now = new Date()
        }
        
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        let day = now.getDate()
        
        // 查询数据库中的事件
        const events = await prisma.event.findMany({
            where: {
                month: month,
                day: day
            }
        })
        
        // 处理事件数据
        const processedEvents = events.map(event => {
            const importanceBonus = calculateImportanceBonus(event.year, year)
            const data = formatEventDisplay(event, year)
            
            return {
                // id: event.id,
                year: event.year,
                month: event.month,
                type: event.type,
                importance: event.importance + importanceBonus,
                data: data
            }
        })
        
        // 排序：按重要度降序，重要度相同时按类型优先级排序
        processedEvents.sort((a, b) => {
            if (b.importance !== a.importance) {
                return b.importance - a.importance
            }
            
            // 类型优先级：birth > death > event
            const typePriority: Record<string, number> = {
                'birth': 3,
                'death': 2,
                'event': 1
            }
            
            return typePriority[b.type] - typePriority[a.type]
        })
        
        return NextResponse.json(processedEvents)
        
    } catch (error) {
        console.error('Error fetching events:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}