import fs from 'fs';
import path from 'path';

const processPoem = (inputPath: string) => {
    const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
    let pinyinIndex = 0;
    let globalIndex = 0;

    // 处理内容分段
    const paragraphs = rawData.content.split('/').map((para: string, paraIndex: number) => {
        const translations = rawData.translation.split('/')[paraIndex]?.split('#') || [];
        return {
            paragraph: para.split('#').map((sentence: string, sentenceIndex: number) => {
                // 记录句子起始位置
                const sentenceStartIndex = globalIndex;
                const chars = [];

                // 预处理拼音数据
                const pinyinArray = rawData.pinyin
                    .split(/\s+|#\//)
                    .filter((p: string) => p.trim() !== '');

                // 处理每个字符
                for (const char of sentence) {
                    const charCode = char.charCodeAt(0);
                    const isPunctuation = !(charCode >= 0x4e00 && charCode <= 0x9fa5);
                    
                    chars.push({
                        char,
                        pinyin: isPunctuation 
                            ? '　'
                            : pinyinArray[pinyinIndex++] || '　',
                    });
                    globalIndex++; // 恢复全局索引递增
                }

                // 转换注释下标
                const sentenceNotes = rawData.notes
                    .filter((note: any) => {
                        return note.start >= sentenceStartIndex && 
                               note.end <= sentenceStartIndex + sentence.length;
                    })
                    .map((note: any) => ({
                        ...note,
                        start: note.start - sentenceStartIndex,
                        end: note.end - sentenceStartIndex
                    }));

                return {
                    sentence: chars,
                    translation: translations[sentenceIndex] || '',
                    notes: sentenceNotes
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