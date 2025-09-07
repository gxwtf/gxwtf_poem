const fs = require('fs');
const path = require('path');

// 读取sentence文件
const sentenceData = fs.readFileSync('./sentence/sentence1-10000.json', 'utf8');
const sentences = sentenceData.trim().split('\n').map(line => JSON.parse(line));

// 读取所有guwen文件
const guwenFiles = [
  './guwen/guwen0-1000.json',
  './guwen/guwen1001-2000.json',
  './guwen/guwen2001-3000.json',
  './guwen/guwen3001-4000.json',
  './guwen/guwen4001-5000.json',
  './guwen/guwen5001-6000.json',
  './guwen/guwen6001-7000.json',
  './guwen/guwen7001-8000.json',
  './guwen/guwen8001-9000.json',
  './guwen/guwen9001-10000.json'
];

// 创建作者和朝代映射
const authorDynastyMap = new Map();

for (const filePath of guwenFiles) {
  if (fs.existsSync(filePath)) {
    const guwenData = fs.readFileSync(filePath, 'utf8');
    const guwenItems = guwenData.trim().split('\n').map(line => JSON.parse(line));
    
    for (const item of guwenItems) {
      if (item.writer && item.dynasty) {
        authorDynastyMap.set(item.writer, item.dynasty);
      }
    }
  }
}

// 转换函数
function convertSentence(sentence) {
  const from = sentence.from || '';
  
  // 解析from字段，格式如："李白《行路难·其一》"
  let author = '';
  let title = '';
  let dynasty = '';
  
  // 匹配作者和标题
  const match = from.match(/^([^《]+)《([^》]+)》$/);
  if (match) {
    author = match[1].trim();
    title = match[2].trim();
    
    // 从映射中获取朝代
    dynasty = authorDynastyMap.get(author) || '';
    
    // 如果映射中没有，尝试从常见作者中推断
    if (!dynasty) {
      const commonAuthors = {
        '李白': '唐',
        '杜甫': '唐', 
        '苏轼': '宋',
        '李清照': '宋',
        '白居易': '唐',
        '王维': '唐',
        '李商隐': '唐',
        '杜牧': '唐',
        '陆游': '宋',
        '辛弃疾': '宋',
        '王安石': '宋',
        '欧阳修': '宋',
        '柳永': '宋',
        '纳兰性德': '清',
        '陶渊明': '晋',
        '曹操': '汉',
        '曹植': '三国',
        '李煜': '五代',
        '孟浩然': '唐',
        '王昌龄': '唐'
      };
      
      dynasty = commonAuthors[author] || '';
    }
    
    // 处理朝代字段：取代"代"字
    if (dynasty && dynasty.endsWith('代')) {
      dynasty = dynasty.slice(0, -1);
    }
    
    // 如果作者是"佚名"，则移除朝代信息
    if (author === '佚名') {
      dynasty = '';
    }
  }
  
  return {
    title: title,
    quote: sentence.name,
    author: author,
    dynasty: dynasty
  };
}

// 转换所有句子
const quotes = sentences.map(convertSentence);

// 写入quote.json文件
fs.writeFileSync('./quote.json', JSON.stringify(quotes, null, 2), 'utf8');

console.log('转换完成！共生成', quotes.length, '条语录');
console.log('文件已保存到: ./quote.json');