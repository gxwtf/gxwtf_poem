// 运行前会生成overview.json

import fs from "fs"
import path from "path"

const root = path.resolve(__dirname, "../src/poem")
const versions = ["junior", "senior"]

function cleanContent(content: string) {
    return content.replace(/[#/]/g, "").replace(/\n/g, "").trim()
}

for (const version of versions) {
    const dir = path.join(root, version)
    const orderPath = path.join(dir, "order.tsx")
    // 读取 order.tsx
    const orderContent = fs.readFileSync(orderPath, "utf-8")
    const orderMatch = orderContent.match(/order\s*=\s*\[([\s\S]*?)\]/)
    if (!orderMatch) continue
    // 提取顺序
    const orderArr = orderMatch[1]
        .split(",")
        .map(s => s.replace(/["'`]/g, "").trim())
        .filter(Boolean)

    const poems = []
    for (const title of orderArr) {
        const poemDir = path.join(dir, title);
        const jsonPath = path.join(poemDir, 'index.json');
        if (!fs.existsSync(jsonPath)) continue;
        const poem = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))
        poems.push({
            title: poem.title,
            author: poem.author,
            dynasty: poem.dynasty,
            content: cleanContent(poem.content),
            tags: poem.tags,
        })
    }
    fs.writeFileSync(
        path.join(dir, "overview.json"),
        JSON.stringify(poems, null, 2),
        "utf-8"
    )
}
