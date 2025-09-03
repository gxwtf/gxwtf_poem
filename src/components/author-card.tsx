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
import { Skeleton } from "@/components/ui/skeleton"

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

export function SkeletonAuthorCard() {
    return (
        <Card className="border-0 shadow-none">
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/6" />
            </CardContent>
            <CardFooter className="mt-auto pt-2">
                <Skeleton className="h-4 w-2/3" />
            </CardFooter>
        </Card>
    )
}