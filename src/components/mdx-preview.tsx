'use client'

import { TableOfContents } from '@/components/toc'
import { SiteHeader } from '@/components/site-header'
import { Toc } from '@/lib/toc'
import React from 'react'

export interface MDXPreviewProps {
    mdxContent: React.ReactNode
    toc: Toc
    headerData?: { name: string; href: string }[]
    now: string
    title?: string
}

export function MDXPreview({
    mdxContent,
    toc,
    headerData = [],
    now,
    title
}: MDXPreviewProps) {
    return (
        <>
            <SiteHeader data={headerData} now={now} />
            {title && <h1 className="text-3xl font-bold text-center p-8">{title}</h1>}
            <div className="flex">
                <div className="flex-1 p-8">
                    {mdxContent}
                </div>
                <aside className="hidden md:inline-block w-64 p-6 sticky top-20 h-screen overflow-auto">
                    <TableOfContents toc={toc.items} />
                </aside>
            </div>
        </>
    )
}