// 作者介绍页面
import { notFound } from 'next/navigation'
import { TableOfContents } from '@/components/toc'
import { generateTableOfContents } from '@/lib/toc'
import fs from 'fs'
import path from 'path'
import { SiteHeader } from "@/components/site-header";
import React from "react";

interface Props {
    params: Promise<{ author: string }>;
    searchParams: Promise<{ sortOrder: string }>;
}

export async function generateMetadata(props: Props) {
    const { author } = await props.params;
    const Author = decodeURIComponent(author);
    return {
        title: `作者介绍 - ${Author}`,
        description: '作者介绍页面',
    };
}

export default async function Page(props: Props) {
    const { author } = await props.params;
    const Author = decodeURIComponent(author);
    try {
        const { default: PreviewMDX } = await import(
            `@/author/${Author}/intro.mdx`
        );

        const poemPath = path.join(process.cwd(), 'src', 'author', Author, 'intro.mdx');
        const mdxContent = fs.readFileSync(poemPath, 'utf-8');

        const toc = await generateTableOfContents(mdxContent);

        return (
            <>
                <SiteHeader data={[{ name: "作者", href: "/authors" }]} now={Author} />
                <div className="flex">
                    <div className="flex-1 p-8">
                        <PreviewMDX />
                    </div>
                    <aside className="hidden md:inline-block w-64 p-6 sticky top-20 h-screen overflow-auto">
                        <TableOfContents toc={toc.items} />
                    </aside>
                </div>
            </>
        );
    } catch (error) {
        notFound();
    }
}