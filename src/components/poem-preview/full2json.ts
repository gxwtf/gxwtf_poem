// full.json -> preview.json 转换脚本

import { ParagraphData } from "./paragraph";
import { SentenceData, NoteBlock } from "./sentence";
import { CharData } from "./char";

export interface PreviewData {
    mode: "poem" | "paragraph";
    preview: ParagraphData[];
};

export interface InputChar {
    char: string;
    pinyin: string;
    index: number;
    read: boolean;
    write: boolean;
}

export interface InputSentence {
    content: InputChar[];
    translation?: string;
    pinyin?: string;
    notes?: {
        start: number;
        end: number;
        content: string;
    }[];
    special_sentences?: {
        start: number;
        end: number;
        content: string;
    }[];
    different_meanings?: {
        start: number;
        end: number;
        old: string;
        new: string;
    }[];
}

export interface InputParagraph {
    sentences: InputSentence[];
}

export type InputData = {
    name: string;
    author: string;
    dynasty: string;
    mode: "poem" | "paragraph";
    paragraphs: InputParagraph[];
    tags?: string[];
    background?: string;
    appreciation?: string;
}


export default function convert(data: InputData){
    console.log(data);
    // 定义常见中文标点符号，这些标点的拼音将被替换为全角空格
    const punctuation = ["，", "。", "？", "！", "；", "：", "“", "”", "‘", "’", "—", "…"];
    
    // 初始化输出对象
    const output: PreviewData = {
        preview: [],
        mode: data.mode
    };

    // 遍历输入数据的每个段落
    for (const para of data.paragraphs) {
        const outputParagraph: ParagraphData = {
            paragraph: []
        };

        // 遍历当前段落的每个句子
        for (const sent of para.sentences) {
            const outputSentence: SentenceData = {
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
                const outputChar: CharData = {
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

// 测试用例
// const testData = {
//   "name": "次北固山下",
//   "author": "王湾",
//   "dynasty": "唐代",
//   "mode": "poem",
//   "paragraphs": [
//     {
//       "sentences": [
//         {
//           "content": [
//             { "char": "客", "pinyin": "kè", "index": 0, "read": false, "write": false },
//             { "char": "路", "pinyin": "lù", "index": 1, "read": false, "write": false },
//             { "char": "青", "pinyin": "qīng", "index": 2, "read": false, "write": false },
//             { "char": "山", "pinyin": "shān", "index": 3, "read": false, "write": false },
//             { "char": "外", "pinyin": "wài", "index": 4, "read": false, "write": false },
//             { "char": "，", "pinyin": "，", "index": 5, "read": false, "write": false },
//             { "char": "行", "pinyin": "xíng", "index": 6, "read": false, "write": false },
//             { "char": "舟", "pinyin": "zhōu", "index": 7, "read": false, "write": false },
//             { "char": "绿", "pinyin": "lǜ", "index": 8, "read": false, "write": false },
//             { "char": "水", "pinyin": "shuǐ", "index": 9, "read": false, "write": false },
//             { "char": "前", "pinyin": "qián", "index": 10, "read": false, "write": false },
//             { "char": "。", "pinyin": "。", "index": 11, "read": false, "write": false }
//           ],
//           "translation": "旅途延伸在青翠北固山外，行船漂浮在碧绿江水之前。",
//           "pinyin": "kè lù qīng shān wài ， xíng zhōu lǜ shuǐ qián 。",
//           "notes": [
//             { "start": 0, "end": 1, "content": "客路：指游子在外的旅程，非字面‘客人之路’。" },
//             { "start": 5, "end": 5, "content": "外：在……外面，此处为‘于青山外’的省略，表空间方位。" },
//             { "start": 11, "end": 11, "content": "前：在……前面，即‘于绿水前’，状语后置结构。" }
//           ]
//         }
//       ]
//     },
//     {
//       "sentences": [
//         {
//           "content": [
//             { "char": "潮", "pinyin": "cháo", "index": 12, "read": false, "write": false },
//             { "char": "平", "pinyin": "píng", "index": 13, "read": false, "write": false },
//             { "char": "两", "pinyin": "liǎng", "index": 14, "read": false, "write": false },
//             { "char": "岸", "pinyin": "àn", "index": 15, "read": false, "write": false },
//             { "char": "阔", "pinyin": "kuò", "index": 16, "read": false, "write": false },
//             { "char": "，", "pinyin": "，", "index": 17, "read": false, "write": false },
//             { "char": "风", "pinyin": "fēng", "index": 18, "read": false, "write": false },
//             { "char": "正", "pinyin": "zhèng", "index": 19, "read": false, "write": false },
//             { "char": "一", "pinyin": "yī", "index": 20, "read": false, "write": false },
//             { "char": "帆", "pinyin": "fān", "index": 21, "read": false, "write": false },
//             { "char": "悬", "pinyin": "xuán", "index": 22, "read": true, "write": true },
//             { "char": "。", "pinyin": "。", "index": 23, "read": false, "write": false }
//           ],
//           "translation": "潮涨江平两岸更显宽阔，顺风吹拂孤帆高高悬垂。",
//           "pinyin": "cháo píng liǎng àn kuò ， fēng zhèng yī fān xuán 。"
//         }
//       ]
//     }
//   ],
//   "tags": ["七上", "诗", "五言律诗"],
//   "background": "此诗作于唐代先天年间，王湾游历江南途经北固山（今江苏镇江）。当时诗人宦游他乡，行船长江，恰逢冬春交替之时。大唐盛世初显气象，但诗人面对壮丽河山，仍涌起思乡愁绪，遂将旅途见闻化作此千古名篇。",
//   "appreciation": "本诗最妙在“海日生残夜，江春入旧年”一联。以“生”“入”二字赋予自然现象生命动感，展现新旧交替的哲学意味：残夜未消而红日已升，旧年尚在而春意已临。颈联“潮平岸阔””风正帆悬”以宏阔画卷暗喻人生坦途，尾联则借鸿雁传书回归游子乡愁。全诗气象壮阔而不失细腻，对仗工整如天衣无缝。"
// };

// // 执行转换
// const result = convert(testData);
// console.log(JSON.stringify(result, null, 2));
