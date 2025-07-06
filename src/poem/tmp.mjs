// 临时脚本，可随时删除

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
    "text-align": "left|center", // 对于古诗，采用中间对齐；对于古文，采用左对齐
    "content": [
        {
            "text": "<第一段>",
            "translation": "<第一段的翻译>",
            "pinyin": "<第一段的拼音>"
        },
        {
            "text": "<第二段>",
            "translation": "<第二段的翻译>",
            "pinyin": "<第二段的拼音>"
        },
        {
            "text": "<第三段>",
            "translation": "<第三段的翻译>",
            "pinyin": "<第三段的拼音>"
        },
        ...
    ],
    "background": "<古诗的写作背景介绍>",
    "authorBackground": "<作者的个人介绍>",
    "wrong": ["易错字1", "易错字2", "易错字3",...] // 此处需要你自己总结易错字，可以为空，注意只需要填写原文中哪个字容易出错即可，比如：原文中的“惟”容易写成“唯”，此时你只需要在列表中加入“惟”即可。
}


你只需要严格按照上述格式生成一个JSON即可，只需输出该JSON（纯文本格式）即可，千万不要输出多余的信息。
我会给你提供一些古诗文的数据，**请特别注意这些数据可能会有错误，你需要自行修正错误**。然后，请按照上述格式以JSON输出修正后、重新格式化的数据。

请注意：
1. 需要使用中文标点。
2. 不要出现“@ref” 这样的信息。
3. 请注意合理分段，对于古诗，一句话一段；对于古文，一段就是原文中的一段。
4. 切勿输出多余信息。
5. 不要出现乱码。
6. 不要输出 \`\`\`json\`\`\` 这样的代码块，以纯文本格式输出。
7. 提供的写作背景和作者介绍仅供参考，请在此基础上进一步完善，越详细越好，最好400字以上。
8. JSON 中不要出现注释。

加油！！！
`;

(async function(){
    const files = fs.readdirSync(path.join(__dirname, 'junior'));
    for (let i = 0;i <= files.length - 1;i ++){
        const file = files[i];
        console.log(file);
        if (!file.endsWith('.txt'))continue;
        // const file = '14登幽州台歌.txt'
        const filePath = path.join(__dirname, `junior/${file}`);
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(content);
        let response = await ds(content, prompt);
        console.log(response);
        let txt = response.choices[0].message.content;
        // let txt = 'XC';
        // console.log(JSON.stringify(response.choices[0].message));
        console.log(txt);
        let JSONfile = filePath.replace('.txt', '.json');
        fs.writeFileSync(JSONfile, txt);
    }
})();