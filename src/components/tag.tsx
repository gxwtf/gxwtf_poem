"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useVersion } from "@/components/version-provider"

interface TagProps {
    text: string
    href?: string
    className?: string
    size?: string
}

export function Tag({ text, href, size="sm"}: TagProps) {
    if (href) {
        return (
            <Button size={size} asChild variant="outline">
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
        <Button size={size} variant="outline">
            {text}
        </Button>
    )
}

interface TagsProps {
    tags: string[]
    type: "poem" | "author" | "article"
    className?: string
    size?: string
}

export function Tags({ tags, type, className = "", size="sm" }: TagsProps) {
    return (
        <div className={`text-primary flex flex-wrap gap-2`+className}>
            {tags.map((tag, index) => (
                <Tag
                    key={index}
                    text={tag}
                    href={`/tag/${type}/${tag}`}
                    size={size}
                />
            ))}
        </div>
    )
}

interface GradeTagsProps {
    className?: string
    size?: string
}

export function GradeTags({className="", size="sm" }: GradeTagsProps) {
    const { version } = useVersion();

    if (version === 'junior') {
        return (
            <Tags type="poem" className={className} size={size} tags={["七上", "七下", "八上", "八下", "九上", "九下"]} />
        )
    } else {
        return (
            <Tags type="poem" className={className} size={size} tags={["必修上", "必修下", "选必上", "选必中", "选必下"]} />
        )
    }
}