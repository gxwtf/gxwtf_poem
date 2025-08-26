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
                        <Tag key={tag} text={tag} />
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
}