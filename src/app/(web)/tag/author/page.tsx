// 作者标签页面
import { notFound } from 'next/navigation'
import { MDXPreview } from '@/components/mdx-preview'
import { loadMDXWithTOC } from '@/lib/mdx-utils'

export async function generateMetadata() {
    return {
        title: `作者标签`,
        description: `作者标签概览页面`,
    };
}

export default async function Page() {
    try {
        const { mdxComponent: PreviewMDX, toc } = await loadMDXWithTOC(`tag/author/preview.mdx`);
        return (
            <MDXPreview
                mdxContent={<PreviewMDX />}
                toc={toc}
                now={"作者标签"}
            />
        );
    } catch (error) {
        console.error(error);
        notFound();
    }
}