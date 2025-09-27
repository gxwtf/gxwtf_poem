import fs from 'fs';
import path from 'path';

// 定义项目根目录
const PROJECT_ROOT = path.resolve(process.cwd());
const DATA_DIR = path.join(PROJECT_ROOT, 'src', 'data');
const QUOTE_FILE = path.join(DATA_DIR, 'quote', 'index_real.json');
const AUTHOR_DIR = path.join(DATA_DIR, 'author');

/**
 * 读取JSON文件
 * @param {string} filePath 文件路径
 * @returns {any} JSON解析后的数据
 */
function readJSONFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`读取文件失败: ${filePath}`, error);
    return [];
  }
}

/**
 * 写入JSON文件
 * @param {string} filePath 文件路径
 * @param {any} data 要写入的数据
 */
function writeJSONFile(filePath, data) {
  try {
    // 确保目录存在
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`成功写入文件: ${filePath}`);
  } catch (error) {
    console.error(`写入文件失败: ${filePath}`, error);
  }
}

/**
 * 更新JSON文件中的字段
 * @param {string} filePath 文件路径
 * @param {string} field 要更新的字段
 * @param {any} value 新值
 */
function updateJSONField(filePath, field, value) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`文件不存在: ${filePath}`);
      return;
    }
    const data = readJSONFile(filePath);
    data[field] = value;
    writeJSONFile(filePath, data);
  } catch (error) {
    console.error(`更新文件字段失败: ${filePath}`, error);
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log('开始生成诗人名言...');
    
    // 读取所有名言
    const allQuotes = readJSONFile(QUOTE_FILE);
    console.log(`成功读取${allQuotes.length}条名言`);
    
    // 按诗人分组名言
    const quotesByAuthor = new Map();
    allQuotes.forEach(quote => {
      if (quote.author) {
        const authorName = quote.author;
        if (!quotesByAuthor.has(authorName)) {
          quotesByAuthor.set(authorName, []);
        }
        quotesByAuthor.get(authorName).push(quote);
      }
    });
    console.log(`已按诗人分组，共有${quotesByAuthor.size}位诗人有对应的名言`);
    
    // 读取所有诗人文件夹
    const authorDirs = fs.readdirSync(AUTHOR_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name !== '.DS_Store')
      .map(dirent => dirent.name);
    console.log(`找到${authorDirs.length}位诗人的文件夹`);
    
    // 处理每个诗人
    let processedCount = 0;
    let updatedIndexCount = 0;
    
    for (const authorName of authorDirs) {
      const authorFolderPath = path.join(AUTHOR_DIR, authorName);
      const quoteFilePath = path.join(authorFolderPath, 'quote.json');
      const indexFilePath = path.join(authorFolderPath, 'index.json');
      
      // 检查诗人是否有名言
      if (quotesByAuthor.has(authorName)) {
        const authorQuotes = quotesByAuthor.get(authorName);
        
        // 写入quote.json文件
        writeJSONFile(quoteFilePath, authorQuotes);
        processedCount++;
        
        // 如果有index.json文件，更新quote字段
        if (fs.existsSync(indexFilePath)) {
          if (authorQuotes.length > 0) {
            updateJSONField(indexFilePath, 'quote', authorQuotes[0].quote);
            updatedIndexCount++;
          }
        }
      }
    }
    
    console.log(`诗人名言生成完成!`);
    console.log(`- 共处理${processedCount}位诗人的名言数据`);
    console.log(`- 共更新${updatedIndexCount}位诗人的index.json文件`);
    
  } catch (error) {
    console.error('生成诗人名言时出错:', error);
  }
}

// 执行主函数
main();