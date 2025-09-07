"use client"

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { useRouter } from "next/navigation";

interface PoemQuoteCardProps {
    title: string
    version: string
    author: string
    dynasty?: string
    quote: string
}

export function PoemQuoteCard({
    title,
    version,
    author,
    dynasty,
    quote
}: PoemQuoteCardProps) {
    const router = useRouter()
    return (
        <Card
            className="border-l-4 border-l-[var(--theme-color)]"
            onClick={(e) => {
                if (!(e.target as HTMLElement).closest('.no-navigate')) {
                    router.push(`../${version}/${title}`)
                }
            }}
        >
            <CardContent className="truncate text-lg">{quote}</CardContent>
            <CardFooter className="truncate text-sm text-muted-foreground mt-auto justify-end">
                ——{dynasty ? `【${dynasty}】` : ""}{author}《{title}》
            </CardFooter>
        </Card>
    )
}

export function SkeletonPoemQuoteCard() {
    return (
        <Card className="border-l-4 border-l-[var(--theme-color)]">
            <CardContent>
                <div className="h-4 w-full bg-muted rounded mb-2" />
                <div className="h-4 w-5/6 bg-muted rounded mb-2" />
                <div className="h-4 w-4/6 bg-muted rounded" />
            </CardContent>
            <CardFooter className="text-right">
                <div className="h-4 w-2/3 bg-muted rounded" />
            </CardFooter>
        </Card>
    )
}