"use client"

import { useState, useEffect } from "react"
import useSession from "@/lib/use-session"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Lunar } from "lunar-typescript"

interface CheckInData {
    streak: number
    todayQuote: {
        title: string
        quote: string
        author: string
        dynasty?: string
    }
    hasCheckedIn: boolean
}

export function CheckIn() {
    const { session, isLoading } = useSession();
    const [checkInData, setCheckInData] = useState<CheckInData | null>(null)
    const [hasCheckedInToday, setHasCheckedInToday] = useState(false)
    const [isDataLoading, setIsDataLoading] = useState(true)

    useEffect(() => {
        if (!isLoading && session?.isLoggedIn) {
            fetchCheckInData()
        } else if (!isLoading) {
            setIsDataLoading(false)
        }
    }, [session, isLoading])

    const fetchCheckInData = async () => {
        try {
            const response = await fetch('/api/check-in')
            if (response.ok) {
                const data = await response.json()
                setCheckInData(data)
                setHasCheckedInToday(data.hasCheckedIn)
            } else {
                console.error('Failed to fetch check-in data:', response.statusText)
            }
        } catch (error) {
            console.error('Error fetching check-in data:', error)
        } finally {
            setIsDataLoading(false)
        }
    }

    const handleCheckIn = async () => {
        try {
            const response = await fetch('/api/check-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                setHasCheckedInToday(true)
                fetchCheckInData()
            } else {
                const error = await response.json()
                console.error('Failed to check in:', error)
            }
        } catch (error) {
            console.error('Error checking in', error)
        }
    }

    if (isLoading || isDataLoading) {
        return (
            <Card className="h-full">
                <CardContent className="h-full flex flex-col items-center justify-center text-center">
                    <div className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-1/2 mb-4 mx-auto" />
                        <div className="h-20 bg-muted rounded mb-4" />
                        <div className="h-8 bg-muted rounded w-1/3 mx-auto" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    const getLunarDate = () => {
        const d = Lunar.fromDate(new Date())
        const year = d.getYearInGanZhi() + '年'
        const month = d.getMonthInChinese() + '月'

        let day = d.getJieQi()
        if (!day) {
            const yueXiang = d.getYueXiang()
            if (["朔", "既朔", "望", "既望", "晦"].includes(yueXiang)) {
                day = yueXiang + '日'
            } else {
                day = d.getDayInChinese()
            }
        }

        return { year, month, day }
    }

    return (
        <Card className="h-full">
            <CardContent className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div>
                    <div className="text-sm text-muted-foreground mb-2">
                        {getLunarDate().year} {getLunarDate().month}
                    </div>
                    <div className="text-2xl font-bold text-[var(--theme-color)]">
                        {getLunarDate().day}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                        {new Date().toLocaleDateString('zh-CN')}
                    </div>
                </div>

                {/* 只有当session加载完成后再显示内容 */}
                {!session?.isLoggedIn ? (
                    <Link href="/login?back=/dashboard">
                        <Button>登录后画卯</Button>
                    </Link>
                ) : (
                    <>
                        {/* 画卯按钮 */}
                        <div>
                            {hasCheckedInToday ? (
                                <Button disabled variant="outline">
                                    今日已画卯
                                </Button>
                            ) : (
                                <Button onClick={handleCheckIn}>
                                    画卯
                                </Button>
                            )}
                        </div>

                        {/* 画卯后显示的内容 */}
                        {hasCheckedInToday && checkInData && (
                            <>
                                {/* 今日赠言 - 简化样式 */}
                                <div className="leading-relaxed">
                                    <p className="text-lg mb-4 truncate text-[var(--theme-color)]">{checkInData.todayQuote.quote}</p>
                                    <p className="text-sm text-muted-foreground text-right mt-2 truncate">
                                        ———{checkInData.todayQuote.dynasty ? `【${checkInData.todayQuote.dynasty}】` : ""}
                                        {checkInData.todayQuote.author}《{checkInData.todayQuote.title}》`
                                    </p>
                                </div>

                                {/* 连续画卯天数 */}
                                <p className="text-sm text-muted-foreground">
                                    你已经连续打卡 {checkInData.streak} 天
                                </p>
                            </>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    )
}