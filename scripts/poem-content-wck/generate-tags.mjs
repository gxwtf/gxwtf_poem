import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, '..', '..', 'src', 'data', 'poem','senior');
const oldPath = path.join(__dirname, '..', '..', '..', 'gxwtf_poem', 'src', 'poem', 'senior');

const oldContent = fs.readdirSync(oldPath);

const content = fs.readdirSync(basePath);

function extractTagsContent(str) {
  console.log(str);
  let startIndex = str.indexOf('tags:');
  if (startIndex === -1) return ''; // 如果找不到起始标记，返回空字符串
  startIndex += 5; // 跳过 'tags:'

  const substringFromStart = str.substring(startIndex);
  const endIndex = substringFromStart.indexOf('\n');
  
  // 如果找到换行符，截取到换行符前；否则截取到字符串末尾
  return endIndex === -1 
    ? substringFromStart 
    : substringFromStart.substring(0, endIndex);
}

for (let i = 0; i < content.length; i++){
    const poemname = content[i];
    // console.log(poemname);
    // 如果 poemname 含有字母，则跳过
    if (/[a-zA-Z]/.test(poemname)){
        continue;
    }
    console.log(poemname);
    fs.renameSync(path.join(basePath, poemname, 'preview.json'), path.join(basePath, poemname, 'full.json'));
    continue;

    let oldData = fs.readFileSync(path.join(oldPath, oldContent.find(item => item.includes(poemname))), 'utf-8');
    oldData = oldData.split('\n\n');
    console.log(JSON.stringify(oldData, null, 2));

    let newData = fs.readFileSync(path.join(basePath, poemname, 'preview.json'), 'utf-8');
    console.log(newData);
    newData = JSON.parse(newData);
    newData.tags = extractTagsContent(oldData[0]).split(',');

    newData.background = oldData[4];
    newData.appreciation = oldData[5];

    // console.log(JSON.stringify(oldData, null, 2));

    // console.log(JSON.stringify(newData, null, 2));

    fs.writeFileSync(path.join(basePath, poemname, 'preview.json'), JSON.stringify(newData, null, 2));
}