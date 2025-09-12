// 生成古诗文数据的脚本

process.on('uncaughtException', (err) => {
    console.error(err);
})

import ds from './deepseek.mjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// let XC = await ds('你好！（请回复我，不要出现乱码）');
// console.log(XC);
// process.exit();

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/*
{
    "name": "XXX",
    "author": "XXX",
    "dynasty": "XXX",
    "content": "XXX",
    "translation": "XXX",
    "annotation": "XXX",
    "appreciation": "XXX",
    "background": "XXX"
}
*/

const example = `{
    "name": "登幽州台歌",
    "author": "陈子昂",
    "dynasty": "唐代",
    "mode": "center",
    "paragraphs": [
        {
            "sentences": [
                {
                    "content": "前不见古人",
                    "translation": "向前看不见古代的贤君",
                    "pinyin": "qián bù jiàn gǔ rén"
                }
            ]
        },
        {
            "sentences": [
                {
                    "content": "后不见来者",
                    "translation": "往后看不见未来的才俊",
                    "pinyin": "hòu bù jiàn lái zhě"
                }
            ]
        },
        {
            "sentences": [
                {
                    "content": "念天地之悠悠",
                    "translation": "想天地浩渺悠远",
                    "pinyin": "niàn tiān dì zhī yōu yōu"
                }
            ]
        },
        {
            "sentences": [
                {
                    "content": "独怆然而涕下",
                    "translation": "独自悲伤流下眼泪",
                    "pinyin": "dú chuàng rán ér tì xià"
                }
            ]
        }
    ]
}`

const prompt1 = `你是一个 AI 格式生成器，用户每次会提供一首诗歌的名称。


你的任务是对其 **生成一个 JSON**。格式如下：

{
    name: '古诗名称',
    author: '作者',
    dynasty: '朝代',
    mode: 'center|paragraph', // 对于古诗，该值为 center，其余一律为 paragraph
    paragraphs: [
        {
            sentences: [
                {
                    content: '第一段第一句的内容（包含标点符号）。',
                    translation: '第一段第一句的翻译（翻译成现代汉语，包含标点符号）。',
                    pinyin: '第一段第一句的拼音，包含标点符号。'
                },
                {
                    content: '第一段第二句的内容',
                    translation: '第一段第二句的翻译（翻译成现代汉语）',
                    pinyin: '第一段第二句的拼音'
                },
                ...
            ],
        },
        {
            sentences: [
                {
                    content: '第二段第一句的内容',
                    translation: '第二段第一句的翻译（翻译成现代汉语）',
                    pinyin: '第二段第一句的拼音'
                },
                {
                    content: '第二段第二句的内容',
                    translation: '第二段第二句的翻译（翻译成现代汉语）',
                    pinyin: '第二段第二句的拼音'
                },
                ...
            ],
        },
        ...
    ]
}

注意：

1. 合理断句。以 **句号（或者感叹号、问号）** 作为一句话的结尾。
2. 合理分段。对于古诗而言，**一个句子就是一段**（也就是说，paragraphs 数组的每一个元素都只有一个 sentence）；对于古文，**按照原文分段**。
3. 内容必须绝对准确，不得编造。
4. 以纯文本格式输出，不得出现 \`\`\`json 等标记。
`;
const prompt2 = `你是一个 AI 数据生成器，用户将会提供一个字符串，这个字符串是 **标注了下标** 的古诗文数据。你需要生成以下内容(JSON)：

{
    notes: [ // 注释列表
        {
            start: start_index, // 注释的起始下标，为闭区间
            end: end_index, // 注释的结束下标，为闭区间
            content: "注释内容"
        },
        ...
    ],
    different_meanings: [ // 古诗文中所有的古今异义词
        start: start_index, // 起始下标，为闭区间
        end: end_index, // 结束下标，为闭区间
        old: "古代含义",
        new: "现代含义"
    ],
    special_sentences: [ // 所有的特殊句式，包括宾语前置、状语后置等
        start: start_index,
        end: end_index,
        content: "XXX" // 属于什么特殊句式
    ],
    read: [...], // 所有易读错的字的下标列表
    write: [...] // 所有易写错的字的下标列表
}

注意事项：

1. 以纯文本格式输出，不得出现 \`\`\`json 等特殊标记。
2. 注释要尽可能全面，需要标注出所有可能出错的地方，不宜过少，也不宜过多
`

function removeDigits(str) {
    return str.replace(/\d/g, '');
}

async function generate(poemdata){
    // let response1 = JSON.parse(await ds(prompt1 + '\n\n' + poemdata));
    let response1 = JSON.parse(example);
    // console.log(response1);
    let merged = '';
    let cnt = 0;
    for (let i in response1.paragraphs){
        // console.log(response1.paragraphs[i]);
        for (let j in response1.paragraphs[i].sentences){
            let obj = response1.paragraphs[i].sentences[j];
            console.log(obj);
            for (let k = 0;k < obj.content.length;k ++)
                merged += `${cnt ++}${obj.content[k]}`;
        }
    }
    console.log(merged);
}

(async function(){
    const files = fs.readdirSync('/home/kevin/kevin/git/gxwtf_poem/src/poem/senior/');
    for (let i = 0;i <= files.length - 1;i ++){
        const file = files[i];
        // console.log(file);

        if (!file.endsWith('.txt'))continue;

        let poemname = removeDigits(file.replace('.txt', ''));
        // console.log(poemname);

        const dir = path.join('/home/kevin/kevin/git/gxwtf_poem_react/src/data/poem/senior/', poemname);
        
        // create directory dir
        fs.mkdirSync(dir, { recursive: true });

        let JSONfile = path.join(dir, 'index.json');
        // console.log(JSONfile);

        // 如果已经存在JSON文件，则跳过
        if (fs.existsSync(JSONfile))continue;

        console.log(poemname);

        try{
            await generate(poemname);
        }catch (error){
            console.error(error);
            i --;
            continue;
        }
    }
});
generate('登幽州台歌');