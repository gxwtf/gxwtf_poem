"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useRouter } from "next/navigation";
import Link from "next/link"

interface AuthorCardProps {
    name: string
    epithet?: string
    intro?: string
    quote?: string
    tags?: string[]
    url: string
}

export function AuthorCard({
    name,
    epithet,
    intro,
    quote,
    tags,
    url
}: AuthorCardProps) {
    const router = useRouter()
    return (
        <Card onClick={(e) => {
            if (!(e.target as HTMLElement).closest('.no-navigate')) {
                router.push(url)
            }
        }}
        >
            <CardHeader>
                <CardTitle className="text-[var(--theme-color)] font-bold text-xl cursor-pointer">{name}</CardTitle>
                <CardDescription className="flex flex-col gap-1">
                    {epithet && (
                        <span>
                            {epithet}
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="line-clamp-3">{intro}</div>
            </CardContent>

            <CardFooter className="mt-auto pt-2">
                <div className="text-l text-[var(--theme-color)]">
                    {quote}
                </div>
            </CardFooter>
        </Card>
    )
}