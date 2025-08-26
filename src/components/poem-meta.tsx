// 古诗文基本信息组件

"use client"

import Link from "next/link"

export function Meta({
    title,
    author,
    dynasty,
}: {
    title: string
    author: string
    dynasty?: string
}) {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="mt-6 text-lg text-muted-foreground">
                {dynasty ? `【${dynasty}】` : ""}
                <Link
                    href={`/author-preview/${author}`}
                    className="hover:underline underline-offset-4"
                >
                    {author}
                </Link>
            </div>
        </div>
    )
}