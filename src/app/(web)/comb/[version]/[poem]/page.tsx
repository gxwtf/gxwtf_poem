// 古诗文知识梳理页面
import { notFound } from 'next/navigation'
import { TableOfContents } from '@/components/toc'
import { generateTableOfContents } from '@/lib/toc'
import fs from 'fs'
import path from 'path'

interface Params {
    params: {
        version: 'junior' | 'senior';
        poem: string;
    };
}

export async function generateMetadata({ params }: Params) {
    const { version, poem } = await params;
    const Poem = decodeURIComponent(poem);
    return {
        title: `知识梳理 - ${Poem}`,
        description: '文言知识梳理页面',
    };
}

export default async function Page({ params }: Params) {
    const { version, poem } = await params;
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
            <div className="flex">
                <div className="flex-1 p-8">
                    <PreviewMDX />
                </div>
                <aside className="w-64 p-6 border-l sticky top-20 h-screen overflow-auto">
                    <TableOfContents toc={toc.items} />
                </aside>
            </div>
        );
    } catch (error) {
        console.error('MDX文件加载失败:', error);
        notFound();
    }
}