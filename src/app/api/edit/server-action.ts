'use server';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Props {
	version: string,
	poem: string
};

export async function getFullData(props: Props){
    console.log('XC', props.version, props.poem);

    const filename = join(__dirname, '..', '..', '..', 'data', 'poem', props.version, props.poem, 'full.json');

    return fs.promises.readFile(filename, 'utf-8');
}