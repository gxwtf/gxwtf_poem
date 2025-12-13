import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const versions = ["junior", "senior"];

/**
 * 读取指定版本的 order.tsx 文件，提取其中的诗文名称数组。
 */
function loadOrder(version) {
    const orderPath = path.join(__dirname, "../../src/data/poem", version, "order.tsx");
    if (!fs.existsSync(orderPath)) return [];

    const content = fs.readFileSync(orderPath, "utf-8");
    const match = content.match(/export const order = \[([\s\S]*?)\];/);
    if (!match) return [];

    const poemNames = match[1].match(/["']([^"']+)["']/g) || [];
    return poemNames.map(s => s.slice(1, -1));
}

/**
 * 检查 full.json 是否缺少拼音
 * 规则：只检查全文第一个字，如果 pinyin 为空字符串则判定为“无拼音”
 */
function noPinyin(full) {
    for (const para of full.paragraphs || []) {
        for (const sentence of para.sentences || []) {
            for (const ch of sentence.content || []) {
                return !ch.pinyin || ch.pinyin.trim() === "";
            }
        }
    }
    return true;
}

function main() {
    const result = { junior: [], senior: [] };

    for (const version of versions) {
        const base = path.join(__dirname, "../../src/data/poem", version);
        const poems = loadOrder(version);

        for (const name of poems) {
            const fullPath = path.join(base, name, "full.json");
            if (!fs.existsSync(fullPath)) continue;

            try {
                const full = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
                if (noPinyin(full)) {
                    result[version].push(name);
                }
            } catch {
                // 忽略解析失败的
            }
        }
    }

    console.log(JSON.stringify(result, null, 2));
}

main();
