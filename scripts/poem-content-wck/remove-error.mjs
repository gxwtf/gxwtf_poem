import fs from 'fs';
import path from 'path';

const baseDir = '/home/kevin/kevin/git/gxwtf_poem_react/src/data/poem/junior';

const files = fs.readdirSync(baseDir);

files.forEach(filename => {
    const JSON = path.join(baseDir, filename, 'index.json');
    // console.log(JSON);
    try{
        let data = fs.readFileSync(JSON, 'utf8');
        // console.log(data);
        if (data.includes('ERROR'))fs.unlinkSync(JSON);
    } catch (err) {
        // console.error(err);
    }
});

