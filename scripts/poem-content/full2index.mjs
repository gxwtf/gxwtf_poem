import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前脚本目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function convert(data) {
    // 拼接 content、translation、pinyin
    let contentArr = [];
    let translationArr = [];
    let pinyinArr = [];
    let notesArr = [];

    let globalCharIndex = 0;

    for (const para of data.paragraphs) {
        let paraContent = [];
        let paraTranslation = [];
        let paraPinyin = [];

        for (const sent of para.sentences) {
            // 1. 内容
            let sentContent = sent.content.map(c => c.char).join('');
            paraContent.push(sentContent);

            // 2. 拼音
            if (sent.content && sent.content.length > 0) {
                paraPinyin.push(sent.content.map(c => c.pinyin).join(' '));
            } else if (sent.pinyin) {
                paraPinyin.push(sent.pinyin);
            }

            // 3. 译文
            if (sent.translation) {
                paraTranslation.push(sent.translation);
            } else if (sent.translation && sent.translation.translation) {
                paraTranslation.push(sent.translation.translation);
            }

            // 4. 注释（句级notes和char级note都合并到全局notes）
            // 句级notes
            if (sent.notes && Array.isArray(sent.notes)) {
                for (const note of sent.notes) {
                    notesArr.push({
                        start: globalCharIndex + note.start,
                        end: globalCharIndex + note.end,
                        note: note.content || note.note
                    });
                }
            }
            // char级note
            if (sent.content) {
                for (let i = 0; i < sent.content.length; i++) {
                    const c = sent.content[i];
                    if (c.note) {
                        // 允许 note 为数组或对象
                        if (Array.isArray(c.note)) {
                            for (const n of c.note) {
                                notesArr.push({
                                    start: globalCharIndex + i,
                                    end: globalCharIndex + i,
                                    note: n.content || n.note
                                });
                            }
                        } else {
                            notesArr.push({
                                start: globalCharIndex + i,
                                end: globalCharIndex + i,
                                note: c.note.content || c.note.note
                            });
                        }
                    }
                }
            }

            globalCharIndex += sent.content.length;
        }

        contentArr.push(paraContent.join(''));
        translationArr.push(paraTranslation.join(''));
        pinyinArr.push(paraPinyin.join(' '));
    }

    return {
        title: data.name,
        author: data.author,
        dynasty: data.dynasty,
        mode: data.mode,
        content: contentArr.join('#'),
        translation: translationArr.join('#'),
        pinyin: pinyinArr.join(' ').replaceAll("   ", " ").replaceAll("  "," "),
        notes: notesArr,
        tags: data.tags || []
    };
}

// 你要处理的诗歌版本
const versions = ["junior", "senior"];

for (const version of versions) {
  const basePath = path.join(__dirname, "../../src/data/poem", version);
  if (!fs.existsSync(basePath)) continue;
  const poemDirs = fs.readdirSync(basePath);

  for (const dir of poemDirs) {
    const fullPath = path.join(basePath, dir, "full.json");
    const previewPath = path.join(basePath, dir, "index.json");
    if (!fs.existsSync(fullPath)) continue;

    try {
      const fullData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
      const previewData = convert(fullData);
      // console.log(previewData)
      fs.writeFileSync(previewPath, JSON.stringify(previewData, null, 2), "utf-8");
    //   console.log(`✅ 生成 ${previewPath}`);
    } catch (e) {
      console.error(`❌ 处理 ${fullPath} 时出错:`, e);
    }
  }
}