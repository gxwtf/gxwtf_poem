#!/usr/bin/env node

/*
 * 修改词牌模式脚本
 * 功能：
 * 1. 从src/data/poem/junior/order.tsx和src/data/poem/senior/order.tsx中读取古诗文名称
 * 2. 检查名称中是否含有间隔号"·"（认为是词）
 * 3. 检查对应文件夹下是否存在full.json文件
 * 4. 如果存在full.json文件，将其中的mode字段改为"paragraph"
 * 运行方式：node modify_Ci_mode.mjs [version]
 * version可选值：senior, junior（默认处理both）
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取命令行参数，确定要处理的版本
const args = process.argv.slice(2);
let versions = ['junior', 'senior'];

if (args.length > 0) {
    if (versions.includes(args[0])) {
        versions = [args[0]];
    } else {
        console.error('参数错误：请输入 junior 或 senior，或者不输入参数处理所有版本');
        process.exit(1);
    }
}

/**
 * 处理指定版本的古诗文数据
 * @param {string} version - 版本类型 (junior 或 senior)
 */
async function processVersion(version) {
    try {
        // 读取order.tsx文件
        const orderFilePath = path.join(__dirname, '../../src/data/poem', version, 'order.tsx');
        if (!fs.existsSync(orderFilePath)) {
            console.error(`错误：文件 ${orderFilePath} 不存在`);
            return;
        }

        const orderContent = fs.readFileSync(orderFilePath, 'utf8');
        // 解析order.tsx文件，提取古诗名称数组
        const poemNames = parseOrderFile(orderContent);
        
        // 处理每个古诗名称
        let modifiedCount = 0;
        for (const poemName of poemNames) {
            // 检查名称中是否含有间隔号"·"
            if (poemName.includes('·')) {
                // 构建full.json文件路径
                const fullJsonPath = path.join(__dirname, '../../src/data/poem', version, poemName, 'full.json');
                
                // 检查full.json文件是否存在
                if (fs.existsSync(fullJsonPath)) {
                    // 修改mode字段
                    if (modifyModeField(fullJsonPath)) {
                        console.log(`已修改 ${version}/${poemName}/full.json 的 mode 字段`);
                        modifiedCount++;
                    }
                }
            }
        }
        
        console.log(`${version}版本处理完成，共修改了 ${modifiedCount} 个文件的 mode 字段`);
    } catch (error) {
        console.error(`处理${version}版本时出错：`, error);
    }
}

/**
 * 解析order.tsx文件，提取古诗名称数组
 * @param {string} content - order.tsx文件内容
 * @returns {string[]} 古诗名称数组
 */
function parseOrderFile(content) {
    // 提取数组内容
    const match = content.match(/export const order = \[(.*?)\];/s);
    if (!match) {
        return [];
    }
    
    // 提取所有字符串值
    const nameMatches = match[1].match(/"([^"]*)"/g);
    if (!nameMatches) {
        return [];
    }
    
    // 去掉引号，返回名称数组
    return nameMatches.map(name => name.replace(/"/g, ''));
}

/**
 * 修改full.json文件中的mode字段
 * @param {string} fullJsonPath - full.json文件路径
 * @returns {boolean} 修改是否成功
 */
function modifyModeField(fullJsonPath) {
    try {
        // 读取文件内容
        const content = fs.readFileSync(fullJsonPath, 'utf8');
        const data = JSON.parse(content);
        
        // 检查mode字段是否存在且需要修改
        if (data.mode && data.mode !== 'paragraph') {
            data.mode = 'paragraph';
            
            // 写回文件
            fs.writeFileSync(fullJsonPath, JSON.stringify(data, null, 2));
            return true;
        }
        
        return false;
    } catch (error) {
        console.error(`修改文件 ${fullJsonPath} 时出错：`, error);
        return false;
    }
}

// 处理所有指定的版本
async function main() {
    for (const version of versions) {
        await processVersion(version);
        console.log('-------------------');
    }
}

main();