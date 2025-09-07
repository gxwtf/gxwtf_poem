"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cake, PillBottle, CalendarDays } from "lucide-react"

interface EventData {
    id: string
    year: number
    month: number
    type: 'birth' | 'death' | 'event'
    importance: number
    data: string
}

export function TodayInHistory() {
    const [events, setEvents] = useState<EventData[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const today = new Date()
            const response = await fetch(`/api/events?date=${today.toISOString()}`)
            const data = await response.json()
            setEvents(data)
        } catch (error) {
            console.error('获取历史事件失败:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'birth':
                return <Cake className="mr-2 h-4 w-4" />
            case 'death':
                return <PillBottle className="mr-2 h-4 w-4 rotate-180" />
            default:
                return <CalendarDays className="mr-2 h-4 w-4" />
        }
    }

    if (isLoading) {
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

    return (
        <Card className="h-full">
            <CardContent className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="text-lg font-bold text-[var(--theme-color)] flex items-center justify-center">
                    {events.length === 0 ? '兹日波澜不惊，诸事平宁' : events[0].data}
                </div>

                {events.length > 0 && (
                    <div className="space-y-2 overflow-y-auto max-h-52 w-full">
                        {events.slice(1).map((event, index) => (
                            <div key={index} className="flex items-start text-sm text-muted-foreground w-full">
                                <div className="mt-0.5">
                                    {getEventIcon(event.type)}
                                </div>
                                <span className="text-left whitespace-normal break-words ml-2">{event.data}</span>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}