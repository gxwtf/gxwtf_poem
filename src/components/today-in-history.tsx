"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
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
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadEvents() {
			setLoading(true)
			try {
				const today = new Date()
				const response = await fetch(`/api/events?date=${today.toISOString()}`)
				if (response.ok) {
					const data = await response.json()
					setEvents(data)

				} else {
					console.error('Failed to fetch events:', response.statusText)
				}
			} catch (error) {
				console.error('Error fetching events:', error)
			} finally {
				setLoading(false)
			}
		}
		loadEvents()
	}, [])

	if (loading) {
		return (
			<Card className="h-full">
				<CardContent className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[256px]">
					<Skeleton className="h-6 w-3/4 mb-4" />
					<div className="space-y-2 w-full">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
						<Skeleton className="h-4 w-4/6" />
						<Skeleton className="h-4 w-3/6" />
					</div>
				</CardContent>
			</Card>
		)
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

	return (
		<Card className="h-full">
			<CardContent className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[256px]">
				<div className="text-lg font-bold text-[var(--theme-color)] flex items-center justify-center">
					{events.length === 0 ? '兹日波澜不惊，诸事平宁' : events[0].data}
				</div>

				{events.length > 0 && (
					<div className="space-y-2 overflow-y-auto max-h-52 w-full max-w-full">
						{events.slice(1).map((event, index) => (
							<div key={index} className="flex items-start text-sm text-muted-foreground w-full">
								<div className="mt-0.5">
									{getEventIcon(event.type)}
								</div>
								<span className="text-left whitespace-normal break-words">{event.data}</span>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	)
}