// 临时脚本，可随时删除

process.on('uncaughtException', (err) => {
    console.error(err);
})

import ds from './deepseek.mjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// let XC = await ds('你好！（请回复我，不要出现乱码）');
// console.log(XC.choices[0].message);
// process.exit();

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const prompt = `
作为AI数据转化器，用户将提供一首古诗文的名称。请生成关于这首古诗文的数据（JSON格式）。只输出纯文本JSON，不添加任何额外字符（如\`\`\`json）。输出内容必须信息全面、准确无误。

{
    "title": "<古诗名>", // 修正错误后正确标题
    "author": "<作者名>", // 修正错误后正确作者
    "dynasty": "<朝代>", // 修正错误后正确朝代
    "text-align": "center|paragraph", // 基于类型选择：古诗用"center"，古文词用"paragraph"
    "content": "分段字符串，每段#分隔，每句/分隔（以句号结尾为单句）。例：诗：'第一句。#第二句。'；词文：'第一句。/第二句。#第二段第一句。'",
    "translation": "译文字符串，格式同content，每句翻译严格对应原文",
    "pinyin": "拼音字符串，格式同content，每句拼音严格对应原文；拼音间空格（如：'xiān dì chuàng yè'）",
    "comment": [
        {
            "start": <整数索引>,
            "end": <整数索引>,
            "content": "<简洁注释>"
        },
        ...
    ], // 只针对难懂词语
    "different_meanings": [
        {
            "start": <整数索引>,
            "end": <整数索引>,
            "old": "<古代含义>",
            "new": "<现代含义>"
        },
        ...
    ], // 必须找全
    "special_sentences": [
        {
            "start": <整数索引>,
            "end": <整数索引>,
            "content": "<特殊句式描述>"
        },
        ...
    ], // 必须找全
    "read": [<整数索引1>, <整数索引2>, ...], // 易读错字下标数组
    "write": [<整数索引1>, <整数索引2>, ...], // 易写错字下标数组
    "background": "<详细背景介绍>", // 600字以上
    "appreciation": "<详细内容赏析>", // 600字以上
    "tags": ["标签1", "标签2", ...] // 准确标签
}

**处理规则（必须严格遵守）：**
1. **输入数据处理：** 用户提供的数据可能有错误（如作者名、朝代错误）。AI须自行修正：核对历史资料（如权威古籍数据库），深度思考至少15分钟以确保准确性。
2. **输出格式：**
   - 只输出纯JSON文本，无多余信息（如：不要\`\`\`json标记）。
   - JSON中不出现任何注释（//内容仅为说明）。
3. **分段与断句规则：**
   - **诗类（如绝句、律诗）：** 每句视为独立段落。content中仅用#分隔句，无/。每句以句号结尾，逗号不结束句。例：'床前明月光，疑是地上霜。#'
   - **词/古文类（如宋词、散文）：** 按原文分段：#分隔段落，/分隔段落内句子。每句以句号结尾。例：'醉翁之意不在酒，在乎山水之间也。/山水之乐，得之心而寓之酒也。#若夫日出而林霏开，...'
4. **索引计算规则：**
   - 所有start/end索引基于content字符串（包括标点符号、/、#）。
   - 下标从0开始，闭区间（如索引0到5表示位置0-5字符）。
   - 示例：content为"AB/CDE"，"AB"索引start=0, end=1（含/）。
5. **内容准确性规则：**
   - **标签：** 必须真实无误。包括：风格标签（如"山水田园"）、教材来源（如"七年级下册"）、类型标签（如"背诵"）。检查教材版本避免错误。
   - **背景/appreciation：** 在参考输入基础上，丰富至600字以上，内容详实、流畅。
   - **注释/特殊项：** 
     - comment/different_meanings/special_sentences：只添加必要项（难懂字词、古今异义、句式如宾语前置）。务必详尽找全，但要简洁。
     - 注释下标必须逐个核对（重点查易错点）。
   - **拼音/翻译：** 一一对应原文，拼音空格分隔。
6. **语言与格式规则：**
   - 使用中文标点（如句号、逗号）。
   - 删除@ref等无效信息。
7. **全局要求：**
   - 信息量最大化，但绝对准确（无虚假或猜测）。
   - 易错点优先级：分段、下标、标签各检查至少3次。
   - 输出前，模拟测试JSON有效性（如使用JSON验证器）。

当用户提供具体古诗文数据时，基于此Prompt执行处理。
`;

function removeDigits(str) {
    return str.replace(/\d/g, '');
}

(async function(){
    const files = fs.readdirSync('/home/kevin/kevin/git/gxwtf_poem/src/poem/junior/');
    for (let i = 0;i <= files.length - 1;i ++){
        const file = files[i];
        // console.log(file);

        if (!file.endsWith('.txt'))continue;

        const poemname = removeDigits(file.replace('.txt', ''));
        // console.log(poemname);

        const dir = path.join('/home/kevin/kevin/git/gxwtf_poem_react/src/data/poem/junior/', poemname);
        
        // create directory dir
        fs.mkdirSync(dir, { recursive: true });

        let JSONfile = path.join(dir, 'index.json');
        // console.log(JSONfile);

        // 如果已经存在JSON文件，则跳过
        if (fs.existsSync(JSONfile))continue;

        console.log(poemname);
        // try{
        //     let response = await ds(poemname, prompt);
        //     console.log(response);
        //     fs.writeFileSync(JSONfile, response);
        // }catch (error){
        //     console.error(error);
        //     fs.writeFileSync(JSONfile, error || 'ERROR');
        // }
    }
})();