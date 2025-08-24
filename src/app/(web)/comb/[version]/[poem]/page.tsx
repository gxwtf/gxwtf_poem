// 古诗文知识梳理页面
import { notFound } from 'next/navigation'

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

        return (
            <div className="p-8">
                <PreviewMDX />
            </div>
        );
    } catch (error) {
        console.error('MDX文件加载失败:', error);
        notFound();
    }
}
