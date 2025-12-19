import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前脚本目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 检查内容是否存在的函数
function hasContent(data, field) {
  if (Array.isArray(data[field])) {
    return data[field] && data[field].length > 0;
  }
  return data[field] && data[field].length > 0;
}

// 段落格式化函数，每段前面加两个全角空格
function paragraph(text) {
  if (!text) return '';
  // 按换行符分割成段落，每段前面加两个全角空格
  return text.split('\n')
    .map(line => line.trim() ? `　　${line}` : line)
    .join('\n');
}

function convert(data) {
  // 构建基础 MDX 内容
  let mdxContent = `import { Meta } from '@/components/poem-meta';
import { PoemPreview } from '@/components/poem-preview/poem-preview';
import previewData from './preview.json';
import { MemorizeContextProvider } from "@/components/poem-preview/memorize-context";
import { Tags } from "@/components/tag"
import { BilibiliVideos } from "@/components/video"
import { PoemQuoteCard, PoemQuoteCards } from "@/components/poem-quote-card"

<Meta 
  title="${data.name}"
  author="${data.author}"
  dynasty="${data.dynasty}"
/>

<MemorizeContextProvider>
  <PoemPreview data={{ mode: "${data.mode}", preview: previewData.preview }} />
</MemorizeContextProvider>
`;

  // 检查是否有背景数据
  if (hasContent(data, 'background')) {
    mdxContent += `
## 写作背景

${paragraph(data.background)}
`}

  // 检查是否有赏析数据
  if (hasContent(data, 'appreciation')) {
    mdxContent += `
## 作品赏析

${paragraph(data.appreciation)}
`}

  // 检查是否有推荐数据
  if (hasContent(data, 'recommends')) {
    mdxContent += `
## 猜你还想学

<PoemQuoteCards poems = {${JSON.stringify(data.recommends)}} className = "my-4" /> 
  `;
  }

  // 检查是否有视频数据
  if (hasContent(data, 'videos')) {
    mdxContent += `
## 更多学习视频

<BilibiliVideos videos = {${JSON.stringify(data.videos)}} />`;
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