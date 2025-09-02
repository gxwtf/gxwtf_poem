const fs = require('fs');
const path = require('path');

// 获取当前目录下的所有JSON文件
const files = fs.readdirSync(process.cwd())
  .filter(file => file.endsWith('.json') && /^\d+.*\.json$/.test(file));

// 按数字前缀排序
const sortedFiles = files
  .map(file => ({
    original: file,
    prefix: parseInt(file.match(/^(\d+)/)[0]),
    newName: file.replace(/^\d+/, '')  // 移除数字前缀
  }))
  .sort((a, b) => a.prefix - b.prefix);

// 创建顺序映射表
const orderMap = {};
const fileNamesOnly = [];

sortedFiles.forEach(item => {
  // 检查是否会发生名称冲突
  if (fs.existsSync(item.newName) && item.original !== item.newName) {
    throw new Error(`名称冲突：${item.newName} 已存在`);
  }
  
  orderMap[item.newName] = item.prefix;
  fileNamesOnly.push(item.newName);
});

// 写入order.json
fs.writeFileSync('order.json', JSON.stringify({
  originalOrder: sortedFiles.map(item => item.original),
  renamedFiles: fileNamesOnly,
  prefixMapping: orderMap
}, null, 2));

// 执行文件重命名
sortedFiles.forEach(item => {
  if (item.original !== item.newName) {
    fs.renameSync(item.original, item.newName);
    console.log(`重命名: ${item.original} -> ${item.newName}`);
  }
});

console.log(`操作完成! ${sortedFiles.length}个文件已处理`);
console.log('生成的顺序文件: order.json');
