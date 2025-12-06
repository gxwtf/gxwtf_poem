// 生成拼音

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前脚本目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function equal(str1, str2) {
	str1 = str1.replace(/[（）·()（）《》\s]/g, "");
	str2 = str2.replace(/[（）·()（）《》\s]/g, "");
	// console.log(str1, str2);
	return str1.includes(str2) || str2.includes(str1);
}

function convert(data, version) {
	const punctuation = ["，", "。", "？", "！", "；", "：", "“", "”", "‘", "’", "—", "…", "《", "》", "、"];

	// console.log(data.name);
	const pinyinJSON = JSON.parse(fs.readFileSync(path.join(__dirname, `../../../poem_spider/${version}_pinyin.json`), "utf-8"));
	for (let i = 0; i < pinyinJSON.length; i++) {
		// console.log(pinyinJSON[i].name);
		if (equal(pinyinJSON[i].name, data.name)) {
			const pinyinlist = pinyinJSON[i].pinyin.split(' ');
			let ptr = 0;
			for (let j = 0; j < data.paragraphs.length; j++) {
				const paragraph = data.paragraphs[j];
				// console.log(paragraph);
				for (let k = 0; k < paragraph.sentences.length; k++) {
					const sentence = paragraph.sentences[k];
					for (let l = 0; l < sentence.content.length; l++) {
						// throw new Error("1");
						let word = sentence.content[l];
						// console.log(word.char);
						if (!punctuation.includes(word.char))
							word.pinyin = pinyinlist[ptr ++];
						else{
							word.pinyin = "";
							// throw new Error('XC');
						}
					}
				}
			}
			return data;
		}
	}
	throw new Error("Not Found");
	// console.log(pinyinJSON);
}

// 你要处理的诗歌版本
const versions = ["junior", "senior"];

for (const version of versions) {
	const basePath = path.join(__dirname, "../../src/data/poem", version);
	if (!fs.existsSync(basePath)) continue;
	const poemDirs = fs.readdirSync(basePath);

	for (const dir of poemDirs) {
		const fullPath = path.join(basePath, dir, "full.json");
		const previewPath = fullPath;
		if (!fs.existsSync(fullPath)) continue;

		try {
			const fullData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
			const previewData = convert(fullData, version);
			// console.log(JSON.stringify(previewData, null, 2))
			  fs.writeFileSync(previewPath, JSON.stringify(previewData, null, 2), "utf-8");
			//   console.log(`✅ 生成 ${previewPath}`);
		} catch (e) {
			console.error(`❌ 处理 ${fullPath} 时出错:`, e);
		}
	}
}