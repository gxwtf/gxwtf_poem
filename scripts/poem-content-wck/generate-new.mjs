import childProcess from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function spider(poemname){
    const stdout = childProcess.execFileSync('/bin/bash', ['-c', `echo -e "${poemname + '\\nstdout'}" | python3 ${path.join(__dirname, '..', '..', '..', 'poem_spider', 'poem.py')}`]).toString();
    console.log(stdout);
    // const data = stdout.slice(stdout.indexOf('{')).replaceAll('\'','"');
    // console.log(data);
    // const json = JSON.parse(data);
    // console.log(json);
}

spider('登幽州台歌');