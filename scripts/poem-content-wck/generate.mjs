// 生成古诗文数据的脚本

process.on('uncaughtException', (err) => {
    console.error(err);
})

import ds from './deepseek.mjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// let XC = await ds('你好！（请回复我，不要出现乱码）');
// console.log(XC);
// process.exit();

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const globalRequirements = `角色：AI古诗文数据处理助手
任务：根据用户提供的古诗文名称，分三步生成完整、准确的JSON数据。
输出要求：始终只输出纯JSON文本，无任何额外格式或说明文字。

全局规则（所有Prompt均需遵守）：
• 格式：输出必须是纯JSON，无\`\`\`json等标记。**全程使用简体中文输出。**

• 准确性：所有信息必须准确无误，严禁编造。

• 标点：使用中文标点符号。

• 其它：注意节约 Tokens，深度思考时不要重复输出相同内容。
`

const prompt1 = globalRequirements + `Prompt 1：基础数据生成

角色：古诗文基础信息处理专家
任务：根据用户提供的古诗文名称，生成最基础的数据。
输入：古诗文名称（如《静夜思》）
输出：纯JSON文本，包含以下字段：
• title：正确的标题。

• author：正确的作者。

• dynasty：正确的朝代。

• mode：根据体裁选择。"center"（用于诗：绝句、律诗等），"paragraph"（用于词、古文：宋词、散文等）。

• paragraphs: 数组。每个数组内一个 JSON 对象，表示原文中的一个自然段。严格遵循分段断句规则：

  • 诗 (mode: "center")：每句为一段。

  • 词/古文 (mode: "paragraph")：原文中的大段为一段。

paragraphs 字段具体格式如下：

"paragraphs": [
    {"sentences": [...]}, // 第一段
    {"sentences": [...]}, // 第二段
    {"sentences": [...]}, // 第三段
    ...    
]

其中 sentences 字段为数组，每个数组元素为一个句子。划分句子以句号（或者感叹号、问号）作为句子的分隔符。每个句子包含以下字段：

• content：这句话的原文内容。

• pinyin：这句话的拼音字符串，格式与content完全一致，每句拼音严格对应原文句。拼音间用空格分隔，如：chuáng qián míng yuè guāng

• translation：这句话的译文字符串，格式与content完全一致，每句翻译严格对应原文句。

要求：
1.  确保标题、作者、朝代绝对准确。
2.  仔细区分诗和词文，应用正确的mode和格式规则。这是后续所有索引计算的基础，务必零错误。
3.  拼音和翻译必须与原文逐句对应。
4.  只输出JSON，不输出任何其他文字。
5. **一定要保证内容的完整性！！！**
`;

const prompt2 = globalRequirements + `Prompt 2：语言知识点分析

角色：古诗文语言知识点分析专家
任务：基于提供的古诗文基础信息，分析其中的语言知识点。
输入：一个 **已经标注了下标** 的字符串，表示古诗文的内容。
输出：纯JSON文本，包含以下字段：
• notes：数组。仅针对难懂词语提供注释。每个对象包含start（起始索引）、end（结束索引）、content（简洁注释）。

• different_meanings：数组。列出所有古今异义词。每个对象包含start, end, old（古代含义）, new（现代含义）。

• special_sentences：数组。列出所有特殊句式（如宾语前置、状语后置、判断句、省略句等）。每个对象包含start, end, content（句式描述，如“宾语前置：疑问代词‘何’前置”）。

• read：数组。列出所有易读错字在content字符串中的索引（单个数字）。

• write：数组。列出所有易写错字在content字符串中的索引（单个数字）。

要求：
1.  索引计算：所有start、end和数组中的索引值，都必须基于输入的字符串进行计算。这是本步骤的核心和难点，必须逐个字符核对，确保绝对准确。
2.  详尽且简洁：务必找全古今异义和特殊句式，但注释只给难点。描述语言要专业、简洁。
3.  只输出JSON，不输出任何其他文字。`

const prompt3 = globalRequirements + `Prompt 3：文学深度解析

角色：古诗文文学赏析专家
任务：基于提供的古诗文完整信息，生成深度的文学解析。
输入：古诗文名称（如《静夜思》）
输出：纯JSON文本，包含以下字段：
• background：600字以上的详细写作背景介绍。需包括时代背景、作者个人经历、创作缘由等，内容详实、流畅。

• appreciation：600字以上的详细内容赏析。需包括思想内涵、艺术特色、意境分析、名句解读等，内容详实、流畅。

• tags：标签数组。必须准确，包括：

    ◦ 风格标签（如"山水田园"、"边塞征战"、"咏史怀古"）。

    ◦ 教材来源标签（如"七年级上册"、"必修上册"。这是硬性要求，必须查询真实准确的教材信息）。

    ◦ 其他相关标签（如"思乡"、"抒情"、"背诵"）。

要求：
1.  background和appreciation必须达到字数要求，且是高质量、有深度的原创性内容，而非简单堆砌信息。
2.  tags中的教材信息必须真实无误，需核对主流教材版本（如部编版、人教版等）。
3.  只输出JSON，不输出任何其他文字。`

function removeDigits(str) {
    return str.replace(/\d/g, '');
}

(async function(){
    const files = fs.readdirSync('/home/kevin/kevin/git/gxwtf_poem/src/poem/senior/');
    for (let i = 0;i <= files.length - 1;i ++){
        const file = files[i];
        // console.log(file);

        if (!file.endsWith('.txt'))continue;

        let poemname = removeDigits(file.replace('.txt', ''));
        // console.log(poemname);

        const dir = path.join('/home/kevin/kevin/git/gxwtf_poem_react/src/data/poem/senior/', poemname);
        
        // create directory dir
        fs.mkdirSync(dir, { recursive: true });

        let JSONfile = path.join(dir, 'index.json');
        // console.log(JSONfile);

        // 如果已经存在JSON文件，则跳过
        if (fs.existsSync(JSONfile))continue;

        console.log(poemname);

        // poemname = '登幽州台歌';
        try{
            let response1 = JSON.parse(await ds(prompt1 + '\n\n' + poemname));
            let indexes = '';
            let cnt = 0;
            let content = response1.content;
            for (let i = 0;i <= content.length - 1;i ++){
                if (content[i] !== '/' && content[i] !== '#'){
                    indexes += `${cnt ++} - ${content[i]}\n`;
                }
            }

            let response2 = JSON.parse(await ds(prompt2 + '\n\n' + poemname + '\n\n' + indexes));
            let response3 = JSON.parse(await ds(prompt3 + '\n\n' + poemname));

            console.log('\x1b[31;1m生成完毕！\x1b[0m');
            console.log(response1,response2,response3);

            let response = {
                response1,
                response2,
                response3
            };

            fs.writeFileSync(JSONfile, JSON.stringify(response, null, 2));
        }catch (error){
            console.error(error);
            i --;
            continue;
        }
    }
})();