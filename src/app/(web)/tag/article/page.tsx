// 读书课标签页面
import { notFound } from 'next/navigation'
import { MDXPreview } from '@/components/mdx-preview'
import { loadMDXWithTOC } from '@/lib/mdx-utils'

export async function generateMetadata() {
    return {
        title: `读书课标签`,
        description: `读书课标签概览页面`,
    };
}

export default async function Page() {
    try {
        const { mdxComponent: PreviewMDX, toc } = await loadMDXWithTOC(`tag/article/preview.mdx`);
        return (
            <MDXPreview
                mdxContent={<PreviewMDX />}
                toc={toc}
                now={"读书课标签"}
            />
        );
    } catch (error) {
        console.error(error);
        notFound();
    }
}