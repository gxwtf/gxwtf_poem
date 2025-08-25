// 古诗文知识梳理页面
import { notFound } from 'next/navigation'
import { TableOfContents } from '@/components/toc'
import { generateTableOfContents } from '@/lib/toc'
import fs from 'fs'
import path from 'path'
import { SiteHeader } from "@/components/site-header";
import React from "react";

interface Props {
    params: Promise<{ version: 'junior' | 'senior'; poem: string; }>;
    searchParams: Promise<{ sortOrder: string }>;
}

export async function generateMetadata(props: Props) {
    const { poem } = await props.params;
    const Poem = decodeURIComponent(poem);
    return {
        title: `知识梳理 - ${Poem}`,
        description: '文言知识梳理页面',
    };
}

export default async function Page(props: Props) {
    const { version, poem } = await props.params;
    const Poem = decodeURIComponent(poem);
    try {
        const { default: PreviewMDX } = await import(
            `@/poem/${version}/${Poem}/comb.mdx`
        );

        // 正确读取MDX文件的原始内容
        const poemPath = path.join(process.cwd(), 'src', 'poem', version, Poem, 'comb.mdx');
        const mdxContent = fs.readFileSync(poemPath, 'utf-8');

        const toc = await generateTableOfContents(mdxContent);

        return (
            <>
                <SiteHeader data={[{ name: "古诗文", href: "/overview" }, { name: Poem, href: `/poem-preview/${version}/${Poem}` }]} now="知识梳理" />
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