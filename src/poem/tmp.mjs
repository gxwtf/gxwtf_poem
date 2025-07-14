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
我现在搜集了大量有关古诗文的数据，需要将它们转化为 JSON 格式。请务必遵循以下格式：
{
    "title": "<古诗名>",
    "author": "<作者名>",
    "dynasty": "<朝代>",
    "text-align": "center|paragraph", // 对于古诗，采用中间对齐；对于其余的文本（古文/词），采用左对齐
    "content": "第一段的第一句话。/第二句话。/第三句话。/.../第一段的最后一句话。#第二段的第一句话。/第二句话。/第三句话/.../第二段的最后一句话。#.../最后一段的最后一句话", // 古诗文的正文，每段用#分隔，每句用/分隔
    "translation": "第一段的第一句话的翻译。/第二句话。/第三句话。/.../第一段的最后一句话。#第二段的第一句话。/第二句话。/第三句话/.../第二段的最后一句话。#.../最后一段的最后一句话", // 古诗文的译文，同样地，每段用#分隔，每句用/分隔，翻译要与原文一一对应
    "pinyin": "第一段的第一句话的拼音。/第二句话。/第三句话。/.../第一段的最后一句话。#第二段的第一句话。/第二句话。/第三句话/.../第二段的最后一句话。#.../最后一段的最后一句话", // 古诗文的拼音，同样地，每段用#分隔，每句用/分隔，拼音要与原文一一对应。拼音之间要有空格，比如：“xiān dì chuàng yè wèi bàn ér zhōng dào bēng cú”。
    "comment": [ // 评论可以针对词语和句子
        {
            "start": <起始位置，从0开始，标点符号和/,#占据的位置也要计算在内>,
            "end": <结束位置，从0开始，标点符号和/,#占据的位置也要计算在内>,
            "content": <评论内容（如：解词，特殊句式如倒装句、宾语前置等）>
        },
        ...
    ],
    "read": [XXX, XXX, ...], // 所有易读错的字的下标，从0开始，标点符号和/,#占据的位置也要计算在内
    "write": [XXX, XXX, ...], // 所有易写错的字的下标，从0开始，标点符号和/,#占据的位置也要计算在内
    "background": "<古诗的写作背景介绍>",
    "appreciation": "<内容赏析>",
    "tags": ["山水田园", "送别诗", "豪放派", "婉约派", "七年级下册", "必修一", "古诗/古文", "背诵", ...], // 古诗文的标签，越多越好！（注意标签针对这首文章，而不是针对作者，且不要出现错误标签）
}


你只需要严格按照上述格式生成一个JSON即可，只需输出该JSON（纯文本格式）即可，千万不要输出多余的信息。
我会给你提供一些古诗文的数据，**请特别注意这些数据可能会有错误，你需要自行修正错误**。然后，请按照上述格式以JSON输出修正后、重新格式化的数据。

请注意：
0. 信息量越大越好，越全面越好，但是要注意千万不要出现错误信息，请反复核对信息以保证其正确性。
1. 需要使用中文标点。
2. 不要出现“@ref” 这样的信息。
3. 请注意分段，对于古诗，**一句话就是一段**（也就是说，古诗中不能出现/，只能出现#）；对于词/文，请按照原文的分段方式分段（比如对于词，上阕和下阙可以看作一段，用 # 分隔，其余句子都用 / 分隔）。
4. 请注意断句，**无论是古诗还是古文，我们一律认为一句话以句号结尾。** 比如，“会当凌绝顶，一览众山小”是一句话，“会当凌绝顶”和“一览众山小”不能拆开。
5. 切勿输出多余信息。
6. 不要出现乱码。
7. 不要输出 \`\`\`json\`\`\` 这样的代码块，以纯文本格式输出。
8. 提供的写作背景和内容赏析仅供参考，请在此基础上进一步完善，越详细越好，最好600字以上。
9. JSON 中不要出现注释。
10. 对于哪些难以理解的字，务必添加注释（comment，越多越好）；对于特殊句式，必须标注出来，并说明特殊之处（比如：宾语前置、状语后置等）。**注释一定要简洁，对于那些意义比较清楚的字，可以不添加注释**。
11. 需要特别注意的是，标签必须准确无误，且必须包含古诗文的来源（来自哪本教材）。**注意标签必须符合真实情况，不要乱标，尤其注意标签来自几年级的教材（如：七年级下册/必修上/选择性必修二），这一点千万不要搞错。**。
12. 注释的起始位置和终止位置使用的是content字符串中的下标，**注意：下标从 0 开始，且标点符号和 /, # 等特殊符号的位置也要计算在内**。起点和终点位置使用**闭区间**。

请务必严格遵循以上要求。对于每首古诗文，建议你深度思考15min以上，以保证信息的准确性。请自己检查输出内容的准确性至少3次。

以下地方经常出错：
1. 分段
2. 注释的下标（一定要仔细检查每一个下标，不要偷懒）
3. 标签的准确性（一定要仔细检查每一个标签，不要搞错，尤其是这首古诗文来自哪本教材，这个非常容易搞错！！！）

加油！
`;

(async function(){
    const files = fs.readdirSync(path.join(__dirname, 'junior'));
    for (let i = 0;i <= files.length - 1;i ++){
        const file = files[i];
        console.log(file);
        if (!file.endsWith('.json1'))continue;
        const filePath = path.join(__dirname, `junior/${file}`);
        // const file = '14登幽州台歌.txt'
        let JSONfile = filePath.replace('.json1', '.json');
        // 如果已经存在JSON文件，则跳过
        if (fs.existsSync(JSONfile))continue;
        const content = (fs.readFileSync(filePath, 'utf8')).split('\n')[1];
        console.log(content);
        let response = await ds(content, prompt);
        console.log(response);
        let txt = response.choices[0].message.content;
        // let txt = 'XC';
        // console.log(JSON.stringify(response.choices[0].message));
        console.log(txt);
        fs.writeFileSync(JSONfile, txt);
    }
})();