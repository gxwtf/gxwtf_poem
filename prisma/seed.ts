import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

// 读取JSON文件的辅助函数
function readJsonFile(filePath: string): any {
    if (!fs.existsSync(filePath)) {
        // 文件不存在则直接返回 null，不报错
        return null
    }
    try {
        const content = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(content)
    } catch (error) {
        // JSON 格式错误等情况才打印
        console.error(`Error parsing JSON in file ${filePath}:`, error)
        return null
    }
}

// 读取order.tsx文件获取顺序
function getOrderFromFile(filePath: string): string[] {
    try {
        const content = fs.readFileSync(filePath, 'utf-8')
        const match = content.match(/export const order = \[([\s\S]*?)\]/)
        if (match) {
            const orderArray = match[1]
                .replace(/\n/g, '')
                .split(',')
                .map(item => item.trim().replace(/['"]/g, ''))
                .filter(item => item.length > 0)
            return orderArray
        }
    } catch (error) {
        console.error(`Error reading order file ${filePath}:`, error)
    }
    return []
}

export async function main() {
    const basePath = path.join(__dirname, '../src/data')
    
    // 清空现有数据
    // await prisma.checkIn.deleteMany() 
    // await prisma.quote.deleteMany()
    await prisma.article.deleteMany()
    await prisma.author.deleteMany()
    await prisma.poem.deleteMany()
    await prisma.event.deleteMany()
    
    // 处理名句数据 - 只添加新的quote记录
    const quotePath = path.join(basePath, 'quote', 'index.json')
    const quoteData = readJsonFile(quotePath)
    
    if (quoteData && Array.isArray(quoteData)) {
        for (const quote of quoteData) {
            // 检查quote是否已存在
            const existingQuote = await prisma.quote.findFirst({
                where: {
                    quote: quote.quote,
                    author: quote.author
                }
            })
            
            // 如果不存在，则创建新记录
            if (!existingQuote) {
                await prisma.quote.create({
                    data: {
                        title: quote.title,
                        quote: quote.quote,
                        author: quote.author,
                        dynasty: quote.dynasty
                    }
                })
            }
        }
    }
    
    // 处理诗歌数据（junior & senior）
    const versions = ['junior', 'senior']
    for (const ver of versions) {
        const order = getOrderFromFile(path.join(basePath, `poem/${ver}/order.tsx`))
        for (const poemName of order) {
            const poemPath = path.join(basePath, `poem/${ver}`, poemName, 'index.json')
            const poemData = readJsonFile(poemPath)

            if (poemData) {
                const exists = await prisma.poem.findFirst({
                    where: {
                        version: ver,
                        title: poemData.title
                    }
                })

                if (exists) {
                    console.log(`🚨 Duplicate detected: version=${ver}, title=${poemData.title}`)
                    continue
                }

                await prisma.poem.create({
                    data: {
                        title: poemData.title,
                        version: ver,
                        tags: poemData.tags || [],
                        author: poemData.author,
                        dynasty: poemData.dynasty,
                        mode: poemData.mode || 'poem',
                        content: poemData.content
                    }
                })
            }
        }
    }
    
    // 处理文章数据
    const articleOrder = getOrderFromFile(path.join(basePath, 'article/order.tsx'))
    for (const articleName of articleOrder) {
        const articlePath = path.join(basePath, 'article', articleName, 'index.json')
        const articleData = readJsonFile(articlePath)
        
        if (articleData) {
            await prisma.article.create({
                data: {
                    title: articleData.title,
                    author: articleData.author,
                    dynasty: articleData.dynasty,
                    views: articleData.views || 0,
                    abstract: articleData.abstract,
                    content: articleData.content,
                    img: articleData.img,
                    tags: articleData.tags || []
                }
            })
        }
    }
    
    // 处理作者数据
    const authorOrder = getOrderFromFile(path.join(basePath, 'author/order.tsx'))
    for (const authorName of authorOrder) {
        const authorPath = path.join(basePath, 'author', authorName, 'index.json')
        const authorData = readJsonFile(authorPath)
        
        if (authorData) {
            await prisma.author.create({
                data: {
                    name: authorData.name,
                    dynasty: authorData.dynasty,
                    epithet: authorData.epithet,
                    quote: authorData.quote,
                    avatar: authorData.avatar,
                    intro: authorData.intro,
                    tags: authorData.tags || []
                }
            })
        }
    }
    
    // 处理历史事件数据
    const eventPath = path.join(basePath, 'event', 'index.json')
    const eventData = readJsonFile(eventPath)
    
    if (eventData && Array.isArray(eventData)) {
        for (const event of eventData) {
            await prisma.event.create({
                data: {
                    year: event.year,
                    month: event.month,
                    day: event.day,
                    type: event.type,
                    figure: event.figure,
                    importance: event.importance,
                    data: event.data
                }
            })
        }
    }
    
    console.log('Seed data created successfully from file system')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })