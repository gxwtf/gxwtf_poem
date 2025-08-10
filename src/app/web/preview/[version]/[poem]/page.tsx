// 古诗文预览页面
import {PoemPreview} from "@/components/poem-preview/poem-preview"
import {MemorizeContextProvider} from "@/components/poem-preview/memorize-context"
import { notFound } from 'next/navigation'
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface Params {
  params: {
    version: 'junior' | 'senior';
    poem: string;
  };
}

export async function generateMetadata({ params }: Params) {
  const { poem } = await params;
  const decodedPoem = decodeURIComponent(poem);
  return {
    title: `古诗文预览 - ${decodedPoem}`,
    description: '古诗文预览页面',
  };
}

export default async function PoemPreviewPage({ params }: Params) {
  const { version, poem } = await params;
  const decodedPoem = decodeURIComponent(poem);
  
  // 参数有效性验证
  if (!version || !poem) {
    notFound();
  }

  const filePath = join(
    process.cwd(),
    'src/poem',
    version,
    'preview',
    `${poem}.json`
  );

  if (!existsSync(filePath)) {
    notFound();
  }

  // 添加JSON解析错误处理
  try {
    const poemData = JSON.parse(readFileSync(filePath, 'utf-8'));
    return (
      <MemorizeContextProvider>
        <PoemPreview data={{...poemData}} />
      </MemorizeContextProvider>
    );
  } catch (error) {
    console.error('文件解析失败:', error);
    notFound();
  }
}