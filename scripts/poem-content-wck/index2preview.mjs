import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, '..', '..', 'src', 'data', 'poem','junior');

const content = fs.readdirSync(basePath);

for (let i = 0; i < content.length; i++){
    const file = path.join(basePath, content[i], 'index.json');
    try{
        fs.renameSync(file, path.join(basePath, content[i], 'preview.json'));
    } catch(e){
        console.log(e);
    }
}