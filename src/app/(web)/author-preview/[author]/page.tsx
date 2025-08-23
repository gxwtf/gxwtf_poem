// 作者介绍页面
import { notFound } from 'next/navigation'

interface Params {
    params: {
        author: string;
    };
}

export async function generateMetadata({ params }: Params) {
    const { author } = await params;
    const Author = decodeURIComponent(author);
    return {
        title: `作者介绍 - ${Author}`,
        description: '作者介绍页面',
    };
}

export default async function Page({ params }: Params) {
    const { author } = await params;
    const Author = decodeURIComponent(author);
    try {
        const { default: PreviewMDX } = await import(
            `@/author/${Author}/intro.mdx`
        );

        return (
            <PreviewMDX />
        );
    } catch (error) {
        console.error('MDX文件加载失败:', error);
        notFound();
    }
}
