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

(async function(){
    const files = fs.readdirSync(path.join(__dirname, 'senior'));
    for (let i = 0;i <= files.length - 1;i ++){
        const file = files[i];
        console.log(file);
        if (!file.endsWith('.txt'))continue;
        const filePath = path.join(__dirname, `senior/${file}`);
        // const file = '14登幽州台歌.txt'
        let JSONfile = filePath.replace('.txt', '.json');
        // 如果已经存在JSON文件，则跳过
        if (fs.existsSync(JSONfile))continue;
        const content = fs.readFileSync(filePath, 'utf8');
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