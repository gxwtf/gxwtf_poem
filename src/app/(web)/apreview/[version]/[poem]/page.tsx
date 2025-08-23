// 古诗文预览页面
// import {MemorizeContextProvider} from "@/components/poem-preview/memorize-context"
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
    title: `古诗文预览 - ${Poem}`,
    description: '古诗文预览页面',
  };
}

export default async function Page({ params }: Params) {
  const { version, poem } = await params;
  const Poem = decodeURIComponent(poem);
  try {
    const { default: PreviewMDX } = await import(
      `@/poem/${version}/${Poem}/preview.mdx`
    );
    
    return (
        <PreviewMDX />
    );
  } catch (error) {
    console.error('MDX文件加载失败:', error);
    notFound();
  }
}