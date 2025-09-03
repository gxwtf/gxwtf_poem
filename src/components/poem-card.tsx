"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Tag } from "@/components/tag"
import { useRouter } from "next/navigation";
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"


interface PoemCardProps {
    title: string
    author: string
    dynasty?: string
    content: string
    tags?: string[]
    url: string
}

export function PoemCard({
    title,
    author,
    dynasty,
    content,
    tags,
    url
}: PoemCardProps) {
    const router = useRouter()
    return (
        <Card onClick={(e) => {
            if (!(e.target as HTMLElement).closest('.no-navigate')) {
                router.push(url)
            }
        }}>
            <CardHeader>
                <CardTitle className="text-[var(--theme-color)] font-bold text-xl cursor-pointer">{title}</CardTitle>
                <CardDescription>
                    {dynasty ? `【${dynasty}】` : ""}
                    <Link
                        href={`/author/${author}`}
                        className="hover:underline underline-offset-4 no-navigate"
                    >
                        {author}
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="line-clamp-4">{content}</div>
            </CardContent>
            <CardFooter className="mt-auto">
                <div className="flex gap-2 overflow-x-hidden">
                    {tags?.slice(0, 3).map(tag => (
                        <Tag key={tag} text={tag} href={`/tag/poem/${tag}`} />
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
}

export function SkeletonPoemCard() {
    return (
        <Card className="border-0 shadow-none">
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/6 mb-2" />
                <Skeleton className="h-4 w-3/6" />
            </CardContent>
            <CardFooter className="mt-auto">
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-12 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                </div>
            </CardFooter>
        </Card>
    )
}