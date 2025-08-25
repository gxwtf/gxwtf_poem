import {
    CardTitle,
} from "@/components/ui/card"

import Link from "next/link"


export function PoemTinyCard({
    title,
    version
}:
    {
        title: string,
        version?: string
    }) {
    return (
        <div
            className="
        p-4 rounded-md border
        transition-all duration-300 ease-in-out 
        cursor-pointer no-underline
        hover:-translate-y-1 hover:shadow-md hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]
      "
        >
            <CardTitle className="text-primary">
                <Link
                    href={`/poem-preview/${version}/${title}`}
                    className="hover:text-[var(--theme-color)]"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {title}
                </Link>
            </CardTitle>
        </div>
    )
}
