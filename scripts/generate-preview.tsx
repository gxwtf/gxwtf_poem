import fs from 'fs';
import path from 'path';

const processPoem = (inputPath: string) => {
    const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

    // 分离单字符注释和区间注释
    const [charNotes, sentenceNotes] = rawData.notes.reduce(
        (acc: any[], note: any) => {
            note.start === note.end ? acc[0].push(note) : acc[1].push(note);
            return acc;
        },
        [[], []]
    );

    const paragraphs = rawData.content.split('/').map((para: string, paraIndex: number) => {
        const translations = rawData.translation.split('/')[paraIndex]?.split('#') || [];
        return {
            paragraph: para.split('#').map((sentence: string, sentenceIndex: number) => {
                let globalIndex = 0;
                const chars = [];

                // 按句子处理拼音数组
                const sentencePinyin = rawData.pinyin
                    .split(/\s+|#|\//)
                    .filter((p: string) => p.trim() !== '')
                    .slice(0, sentence.length);

                let pinyinIndex = 0;

                for (const char of sentence) {
                    const charCode = char.charCodeAt(0);
                    const isPunctuation = !(charCode >= 0x4e00 && charCode <= 0x9fa5);

                    // 附加单字符注释
                    const note = charNotes.find((n: any) => n.start === globalIndex);

                    chars.push({
                        char,
                        pinyin: isPunctuation ? '　' : sentencePinyin[pinyinIndex++] || '　',
                        globalIndex: globalIndex++,
                        ...(note && {
                            note: note.note,
                            frequency: note.frequency
                        })
                    });
                }

                // 处理区间注释
                const processedNotes = sentenceNotes
                    .filter((note: any) => {
                        return globalIndex - sentence.length <= note.start && note.end <= globalIndex;
                    })
                    .map((note: any) => ({
                        ...note,
                        start: note.start - (globalIndex - sentence.length),
                        end: note.end - (globalIndex - sentence.length)
                    }));

                return {
                    sentence: chars,
                    translation: translations[sentenceIndex] || '',
                    notes: processedNotes
                };
            })
        };
    });

    // 生成预览文件
    const outputPath = path.join(
        path.dirname(inputPath),
        'preview',
        path.basename(inputPath).replace(/\.json$/, '.json')
    );

    // 确保预览目录存在
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // 添加文件写入操作
    fs.writeFileSync(outputPath, JSON.stringify({
        ...rawData,
        content: paragraphs
    }, null, 2));
};

// 遍历所有版本
const root = path.resolve(__dirname, '../src/poem');
['junior', 'senior'].forEach(version => {
    const versionDir = path.join(root, version);
    fs.readdirSync(versionDir)
        .filter(f => f.endsWith('.json') && !f.includes('overview'))
        .forEach(f => processPoem(path.join(versionDir, f)));
});