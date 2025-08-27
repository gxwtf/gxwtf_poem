// 运行前会生成articles.json

import fs from "fs"
import path from "path"

const root = path.resolve(__dirname, "../src/article")
const orderPath = path.join(root, "order.tsx")

// 读取 order.tsx
const orderContent = fs.readFileSync(orderPath, "utf-8")
// 提取文章顺序数组
const orderMatch = orderContent.match(/order\s*=\s*\[([\s\S]*?)\]/)
if (!orderMatch) {
    console.error("无法解析order.tsx文件")
    process.exit(1)
}

// 提取顺序
const orderArr = orderMatch[1]
    .split(",")
    .map(s => s.replace(/[\"'`]/g, "").trim())
    .filter(Boolean)

const articles: {
    title: string;
    author?: string;
    dynasty?: string;
    views?: number;
    abstract?: string;
    img?: string;
    tags?: string[];
}[] = []

for (const articleName of orderArr) {
    const articleDir = path.join(root, articleName);
    const jsonPath = path.join(articleDir, 'index.json');
    if (!fs.existsSync(jsonPath)) {
        console.warn(`文章 ${articleName} 的index.json文件不存在，跳过`)
        continue;
    }
    
    try {
        const article = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))
        articles.push({
            title: article.title,
            author: article.author,
            dynasty: article.dynasty,
            views: article.views,
            abstract: article.abstract,
            img: article.img,
            tags: article.tags
        })
    } catch (error) {
        console.error(`解析文章 ${articleName} 的index.json文件时出错:`, error)
    }
}

fs.writeFileSync(
    path.join(root, "articles.json"),
    JSON.stringify(articles, null, 2),
    "utf-8"
)

// console.log(`成功生成articles.json，包含 ${articles.length} 篇文章信息`)