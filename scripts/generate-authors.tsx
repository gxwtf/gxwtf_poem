// 运行前会生成authors.json

import fs from "fs"
import path from "path"

const root = path.resolve(__dirname, "../src/data/author")
const orderPath = path.join(root, "order.tsx")

// 读取 order.tsx
const orderContent = fs.readFileSync(orderPath, "utf-8")
const orderMatch = orderContent.match(/order\s*=\s*\[([\s\S]*?)\]/)
if (!orderMatch) {
    console.error("无法解析order.tsx文件")
    process.exit(1)
}

// 提取顺序
const orderArr = orderMatch[1]
    .split(",")
    .map(s => s.replace(/["'`]/g, "").trim())
    .filter(Boolean)

const authors: {
    name: string;
    dynasty?: string;
    epithet?: string;
    quote?: string;
    intro?: string;
}[] = []

for (const authorName of orderArr) {
    const authorDir = path.join(root, authorName);
    const jsonPath = path.join(authorDir, 'index.json');
    if (!fs.existsSync(jsonPath)) {
        console.warn(`作者 ${authorName} 的index.json文件不存在，跳过`)
        continue;
    }
    
    try {
        const author = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))
        authors.push({
            name: author.name,
            dynasty: author.dynasty,
            epithet: author.epithet,
            quote: author.quote,
            intro: author.intro
        })
    } catch (error) {
        console.error(`解析作者 ${authorName} 的index.json文件时出错:`, error)
    }
}

fs.writeFileSync(
    path.join(root, "authors.json"),
    JSON.stringify(authors, null, 2),
    "utf-8"
)

// console.log(`成功生成authors.json，包含 ${authors.length} 位作者信息`)