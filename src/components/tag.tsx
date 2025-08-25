import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TagProps {
    text: string
    href?: string
}

export function Tag({ text, href }: TagProps) {
    if (href) {
        return (
            <Button asChild size="sm" variant="outline">
                <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                >{text}
                </Link>
            </Button>
        )
    }
    return (
        <Button size="sm" variant="outline">
            {text}
        </Button>
    )
}

interface TagsProps {
    tags: string[]
    className?: string
}

export function Tags({ tags, className = "" }: TagsProps) {
    return (
        <div className={`text-primary flex flex-wrap gap-2 ${className}`}>
            {tags.map((tag, index) => (
                <Tag
                    key={index}
                    text={tag}
                    href={`/tag/${tag}`}
                />
            ))}
        </div>
    )
}