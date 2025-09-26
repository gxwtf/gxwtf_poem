import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前脚本目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 动态导入 full2json.ts 的 convert 方法

// 你要处理的诗歌版本
const versions = ["junior", "senior"];

// full.json -> preview.json 转换脚本

// 由于 JS 没有类型声明，直接去掉所有 interface/type

// import { ParagraphData } from "../../src/components/poem-preview/paragraph";
// import { SentenceData, NoteBlock } from "../../src/components/poem-preview/sentence";
// import { CharData } from "../../src/components/poem-preview/char";

export function convert(data) {
    // 定义常见中文标点符号，这些标点的拼音将被替换为全角空格
    const punctuation = ["，", "。", "？", "！", "；", "：", "“", "”", "‘", "’", "—", "…"];
    
    // 初始化输出对象
    const output = {
        preview: [],
        mode: data.mode
    };

    // 遍历输入数据的每个段落
    for (const para of data.paragraphs) {
        const outputParagraph = {
            paragraph: []
        };

        // 遍历当前段落的每个句子
        for (const sent of para.sentences) {
            const outputSentence = {
                sentence: [],
                translation: {
                    translation: sent.translation || "" // 包装翻译为对象
                },
                notes: [] // 初始化句子级别的注释数组（用于词语注释）
            };

            // 处理句子中的每个字符
            for (const charObj of sent.content) {
                let pinyinValue = charObj.pinyin;
                // 如果字符是标点，拼音替换为全角空格
                if (punctuation.includes(charObj.char)) {
                    pinyinValue = "　"; // 全角空格
                }

                // 构建输出字符对象
                const outputChar = {
                    char: charObj.char,
                    pinyin: pinyinValue,
                    // frequency: 100 // 统一设置频率为100
                };

                // 暂时不处理字符注释，后续步骤处理
                outputSentence.sentence.push(outputChar);
            }

            // 处理句子的注释（如果存在）
            if (sent.notes && Array.isArray(sent.notes)) {
                for (const note of sent.notes) {
                    if (note.start === note.end) {
                        // 字符注释：添加到对应索引的字符对象
                        const charIndex = note.start;
                        if (charIndex >= 0 && charIndex < outputSentence.sentence.length) {
                            const targetChar = outputSentence.sentence[charIndex];
                            if (!targetChar.note) {
                                targetChar.note = []; // 初始化字符注释数组
                            }
                            // 添加注释对象，使用默认标题"注释"
                            targetChar.note.push({
                                title: "注释",
                                content: note.content
                            });
                        }
                    } else {
                        // 词语注释：添加到句子级别的notes数组
                        outputSentence.notes.push({
                            start: note.start,
                            end: note.end,
                            note: note.content // 注释内容作为字符串
                        });
                    }
                }
            }

            // 将处理好的句子添加到段落中
            outputParagraph.paragraph.push(outputSentence);
        }

        // 将段落添加到预览数组
        output.preview.push(outputParagraph);
    }

    return output;
}

export default convert;

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
    //   console.log(`✅ 生成 ${previewPath}`);
    } catch (e) {
      console.error(`❌ 处理 ${fullPath} 时出错:`, e);
    }
  }
}