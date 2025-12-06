import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前脚本目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function convert(data) {
  // 构建基础 MDX 内容
  let mdxContent = `import { Meta } from '@/components/poem-meta';
import { PoemPreview } from '@/components/poem-preview/poem-preview';
import previewData from './preview.json';
import { MemorizeContextProvider } from "@/components/poem-preview/memorize-context";
import { Tags } from "@/components/tag"
import { BilibiliVideos } from "@/components/video"
import { PoemQuoteCard } from "@/components/poem-quote-card"

<Meta 
  title="${data.name}"
  author="${data.author}"
  dynasty="${data.dynasty}"
/>

<MemorizeContextProvider>
  <PoemPreview data={{ mode: "${data.mode}", preview: previewData.preview }} />
</MemorizeContextProvider>

## 写作背景

${data.background || "暂无写作背景。"}

## 作品赏析

${data.appreciation || "暂无内容赏析。"}`;

  // 检查是否有视频数据
  if (data.videos && Array.isArray(data.videos) && data.videos.length > 0) {
    mdxContent += `

## 更多学习视频

<BilibiliVideos videos={${JSON.stringify(data.videos)}} />`;
  }

  return mdxContent;
}

// 你要处理的诗歌版本
const versions = ["junior", "senior"];

for (const version of versions) {
  const basePath = path.join(__dirname, "../../src/data/poem", version);
  if (!fs.existsSync(basePath)) continue;
  const poemDirs = fs.readdirSync(basePath);

  for (const dir of poemDirs) {
    const fullPath = path.join(basePath, dir, "full.json");
    const previewPath = path.join(basePath, dir, "preview.mdx");
    if (!fs.existsSync(fullPath)) continue;

    try {
      let fullData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
      let previewData = convert(fullData);
      if (fs.existsSync(path.join(path.dirname(previewPath), 'extra.mdx'))) {
        const content = fs.readFileSync(path.join(path.dirname(previewPath), 'extra.mdx'), "utf-8");
        previewData += content;
      }
      // console.log(previewData)
      fs.writeFileSync(previewPath, previewData, "utf-8");
      // console.log(`✅ 生成 ${previewPath}`);
    } catch (e) {
      console.error(`❌ 处理 ${fullPath} 时出错:`, e);
    }
  }
}