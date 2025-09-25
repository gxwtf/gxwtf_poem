import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { convert } from "./full2json.mjs";

// 获取当前脚本目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 动态导入 full2json.ts 的 convert 方法

// 你要处理的诗歌版本
const versions = ["junior", "senior"];

for (const version of versions) {
  const basePath = path.join(__dirname, "../../src/data/poem", version);
  if (!fs.existsSync(basePath)) continue;
  const poemDirs = fs.readdirSync(basePath);

  for (const dir of poemDirs) {
    const fullPath = path.join(basePath, dir, "full.json");
    const previewPath = path.join(basePath, dir, "preview.json");
    if (!fs.existsSync(fullPath)) continue;

    try {
      const fullData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
      const previewData = convert(fullData);
      fs.writeFileSync(previewPath, JSON.stringify(previewData, null, 2), "utf-8");
      console.log(`✅ 生成 ${previewPath}`);
    } catch (e) {
      console.error(`❌ 处理 ${fullPath} 时出错:`, e);
    }
  }
}