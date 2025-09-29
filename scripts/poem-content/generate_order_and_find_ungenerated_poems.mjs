#!/usr/bin/env node

/*
 * 查找未生成的古诗文脚本
 * 功能：
 * 1. 从senior.json和junior.json中读取古诗文名称，生成对应的order.tsx文件
 * 2. 检查src/data/poem/[junior或senior]目录下是否存在对应的古诗文文件夹（支持模糊匹配）
 * 3. 输出那些没有对应文件夹的古诗文名称，格式为逗号分隔的字符串
 * 运行方式：node find-ungenerated-poems.mjs [version]
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
        // 读取JSON文件
        const jsonFilePath = path.join(__dirname, `${version}.json`);
        if (!fs.existsSync(jsonFilePath)) {
            console.error(`错误：文件 ${jsonFilePath} 不存在`);
            return;
        }

        const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
        const poems = JSON.parse(jsonContent);

        // 提取所有古诗名称
        const poemNames = poems.map(poem => poem.name);

        // 查找未生成的古诗文并获取实际文件夹名称映射
        // 修复：使用正确的变量名 'ungenerated'
        const { ungenerated, nameToFolderMap } = findUngeneratedPoems(version, poemNames);

        // 生成order.tsx文件（使用实际文件夹名称）
        generateOrderFile(version, poemNames, nameToFolderMap);

        // 输出未生成的古诗文名称
        // 修复：使用正确的变量名 'ungenerated'
        if (ungenerated.length > 0) {
            const formattedOutput = ungenerated.map(name => `"${name}"`).join(',');
            console.log(`未生成的${version}古诗文：`);
            console.log(formattedOutput);
        } else {
            console.log(`${version}所有古诗文都已生成`);
        }

    } catch (error) {
        console.error(`处理${version}版本时出错：`, error);
    }
}

/**
 * 生成order.tsx文件
 * @param {string} version - 版本类型
 * @param {string[]} poemNames - 古诗文名称数组
 * @param {Object} nameToFolderMap - 古诗名称到实际文件夹名称的映射
 */
function generateOrderFile(version, poemNames, nameToFolderMap) {
    const orderFilePath = path.join(__dirname, '../../src/data/poem', version, 'order.tsx');
    const orderDir = path.dirname(orderFilePath);
    
    // 确保目录存在
    if (!fs.existsSync(orderDir)) {
        fs.mkdirSync(orderDir, { recursive: true });
    }

    // 内容格式：export const order = ["古诗1", "古诗2", ...]; 使用实际文件夹名称
    const actualFolderNames = poemNames.map(name => nameToFolderMap[name] || name);
    const content = `export const order = [
${actualFolderNames.map(name => `  "${name}"`).join(',\n')}
];`;

    fs.writeFileSync(orderFilePath, content);
    console.log(`已生成${version}的order.tsx文件：${orderFilePath}`);
}

/**
 * 查找未生成的古诗文
 * @param {string} version - 版本类型
 * @param {string[]} poemNames - 古诗文名称数组
 * @returns {Object} 包含未生成的古诗文名称数组和名称到文件夹的映射
 */
function findUngeneratedPoems(version, poemNames) {
    const ungenerated = [];
    const nameToFolderMap = {}; // 古诗名称到实际文件夹名称的映射
    const poemsDir = path.join(__dirname, '../../src/data/poem', version);

    if (!fs.existsSync(poemsDir)) {
        fs.mkdirSync(poemsDir, { recursive: true });
        return { ungenerated: poemNames, nameToFolderMap };
    }

    // 读取已存在的文件夹
    const existingFolders = fs.readdirSync(poemsDir).filter(f => 
        fs.statSync(path.join(poemsDir, f)).isDirectory()
    );

    // 为每个古诗名称查找匹配的文件夹（模糊匹配）
    for (const poemName of poemNames) {
        // 尝试精确匹配
        let matchedFolder = existingFolders.find(folder => folder === poemName);
        
        // 如果没有精确匹配，尝试模糊匹配（检查文件夹名是否包含在古诗名称中，或古诗名称是否包含在文件夹名中）
        if (!matchedFolder) {
            matchedFolder = existingFolders.find(folder => 
                poemName.includes(folder) || folder.includes(poemName)
            );
        }
        
        if (matchedFolder) {
            // 找到匹配的文件夹，记录映射关系
            nameToFolderMap[poemName] = matchedFolder;
        } else {
            // 没有找到匹配的文件夹
            ungenerated.push(poemName);
        }
    }

    return { ungenerated, nameToFolderMap };
}

// 处理所有指定的版本
async function main() {
    for (const version of versions) {
        await processVersion(version);
        console.log('-------------------');
    }
}

main();