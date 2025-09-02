// 古诗文标签页面
import { notFound } from 'next/navigation'
import { MDXPreview } from '@/components/mdx-preview'
import { loadMDXWithTOC } from '@/lib/mdx-utils'

export async function generateMetadata() {
    return {
        title: `古诗文标签`,
        description: '古诗文标签概览页面',
    };
}

export default async function Page() {
    try {
        const { mdxComponent: PreviewMDX, toc } = await loadMDXWithTOC(`tag/poem.mdx`);
        return (
            <MDXPreview
                mdxContent={<PreviewMDX />}
                toc={toc}
                headerData={[{ name: "古诗文标签", href: "/tag/poem" }]}
            />
        );
    } catch (error) {
        console.error(error);
        notFound();
    }
}