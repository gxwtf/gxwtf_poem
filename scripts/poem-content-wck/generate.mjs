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

const prompt1 = `你是一个 AI 格式转换器，用户每次会提供一首诗歌的名称，格式如下：

你的任务是对其 **转化格式**。新的格式如下：

{
    name: '古诗名称',
    author: '作者',
    dynasty: '朝代',
    mode: 'center|paragraph', // 对于古诗，该值为 center，其余一律为 paragraph
    paragraphs: [
        {
            sentences: [
                {
                    content: '第一段第一句的内容',
                    translation: '第一段第一句的翻译',
                    pinyin: '第一段第一句的拼音'
                },
                {
                    content: '第一段第二句的内容',
                    translation: '第一段第二句的翻译',
                    pinyin: '第一段第二句的拼音'
                },
                ...
            ],
        },
        {
            sentences: [
                {
                    content: '第二段第一句的内容',
                    translation: '第二段第一句的翻译',
                    pinyin: '第二段第一句的拼音'
                },
                {
                    content: '第二段第二句的内容',
                    translation: '第二段第二句的翻译',
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
`

function removeDigits(str) {
    return str.replace(/\d/g, '');
}

async function generate(poemdata){
    let response1 = JSON.parse(await ds(prompt1 + '\n\n' + poemdata));
    console.log(response1);
    response1 = JSON.parse(response1);
    // for (let i = 0;i < response1.length;i)
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