import fs from 'fs/promises';
import path from 'path';
import deepseekChat from '../poem-content-wck/deepseek.mjs';

function cleanPinyin(str) {
    if (!str) return str;

    let s = str;

    // ① 统一分隔符：/ → 空格
    s = s.replace(/[\/]/g, " ");

    // ② 去除所有已知标点符号（中英 + 梵文句号等）
    s = s.replace(
        /[，。！？；：、“”‘’（）《》〈〉【】〔〕—…·｡．.,!?;:'"()\[\]{}<>。॥।]/g,
        ""
    );

    // ③ 只保留【允许的拼音字符集】
    // 允许：a-z、A-Z、声调元音、ü/Ü、空格
    // 其余（汉字、乱码、符号）全部删除
    s = s.replace(
        /[^a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ\s]/g,
        ""
    );

    // // ④ 修复拼音黏连（声调元音/元音 + 辅音开头）
    // s = s.replace(
    //     /([aeiouüāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ])([bpmfdtnlgkhjqxrzcsyw])/gi,
    //     "$1 $2"
    // );

    // ⑤ 空格规范化：多个 → 一个
    s = s.replace(/\s+/g, " ").trim();

    return s;
}

function buildPrompt(name, content) {
    return `
你需要为下面的中文文本生成拼音。

背景说明：
以下正文为出现或曾经出现在由中华人民共和国教育部编纂的部编版语文中学教材中的文言课文。

生成要求（严格遵守）：
1. 只输出【正文】中汉字对应的拼音
2. 不要输出标题的拼音
3. 每个汉字对应一个拼音，按原文顺序
4. 拼音之间只用一个空格分隔
5. 标点符号、空行、换行全部跳过，输出的拼音里不要有任何标点符号！
6. 如果原文中间有"/"之类的，直接忽略，不输出！
7. 不要添加任何解释、说明或多余内容
8. 遇到文言文中的通假字、多音字、古今异读，请以教材通行读音为准

标题（仅用于语境理解，不需要处理）：
${name}

正文（只为下列文本生成拼音）：
${content}
`.trim();
}

async function main() {
    const file = process.argv[2];
    if (!file) {
        console.error('❌ 用法：node generate_pinyin.mjs xxx.json');
        process.exit(1);
    }

    const filePath = path.resolve(process.cwd(), file);
    const raw = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(raw);

    if (!Array.isArray(data)) {
        console.error('❌ JSON 根节点必须是数组');
        process.exit(1);
    }

    for (const item of data) {
        if (item.pinyin && item.pinyin.trim() !== '') {
            const cleaned = cleanPinyin(item.pinyin);

            // 已有拼音但不合格：需要修复并输出标题
            if (cleaned !== item.pinyin) {
                console.log(item.name || '');
                item.pinyin = cleaned;
                await fs.writeFile(
                    filePath,
                    JSON.stringify(data, null, 2),
                    'utf-8'
                );
            }

            continue;
        }

        const name = item.name || '';
        const content = item.content || '';

        if (!content) continue;

        // 只输出标题，便于你 Ctrl+C 中断时定位进度
        console.log(name);

        const prompt = buildPrompt(name, content);
        const result = await deepseekChat(prompt);

        item.pinyin = cleanPinyin(result);

        // 每生成一篇就立刻写回文件，保证中断不丢数据
        await fs.writeFile(
            filePath,
            JSON.stringify(data, null, 2),
            'utf-8'
        );
    }
}

main().catch(err => {
    console.error('❌ 脚本运行失败：', err);
});