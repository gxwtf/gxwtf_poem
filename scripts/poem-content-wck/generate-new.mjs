import childProcess from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function spider(poemname){
    let XC = childProcess.execFileSync('/bin/bash', ['-c', `echo -e "${poemname + '\\nstdout'}" | python3 ${path.join(__dirname, '..', '..', '..', 'poem_spider', 'poem.py')}`]);
    console.log(XC.toString());
}

spider('登幽州台歌');