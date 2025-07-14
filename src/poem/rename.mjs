// 临时脚本，可随时删除

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { isLeftHandSideExpression } from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async function(){
    const files = fs.readdirSync(path.join(__dirname, 'junior'));
    for (let i = 0;i <= files.length - 1;i ++){
        const file = files[i];
        console.log(file);
        if (!file.endsWith('.json'))continue;
        // 以JSON格式读取文件内容
        try{
            const content = JSON.parse(fs.readFileSync(path.join(__dirname, 'junior', file), 'utf-8'));
            // 询问用户
            console.log(content.title);

            // 等待用户输入（从stdin）
            const input = await new Promise(resolve => {
                process.stdin.once('data', data => {
                    resolve(data.toString().trim());
                });
            });

            console.log(input);

            if (input == 1)content["text-align"] = "center";
            else content["text-align"] = "paragraph";

            console.log(content);

            // 写入文件
            fs.writeFileSync(path.join(__dirname, 'junior', file), JSON.stringify(content, null, 2), 'utf-8');

        }catch (e){console.error(e);}
    }
})();