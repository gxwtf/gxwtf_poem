import { PrismaClient, Prisma } from '../src/app/generated/prisma'

const prisma = new PrismaClient()

const poemData: Prisma.PoemCreateInput[] = [
  {
    title: '次北固山下',
    version: 'junior',
    tags: ['七上', '五言律诗', '山水诗', '思乡诗', '唐诗三百首', '必背古诗', '长江', '北固山', '王湾', '唐代诗歌'],
    author: '王湾',
    dynasty: '唐',
    mode: 'poem',
    content: '客路青山外，行舟绿水前。/潮平两岸阔，风正一帆悬。/海日生残夜，江春入旧年。/乡书何处达？归雁洛阳边。'
  },
  {
    title: '虞美人·春花秋月何时了',
    version: 'junior',
    tags: ['婉约派', '亡国之痛', '思乡', '必修上', '古诗', '背诵', '李煜', '五代'],
    author: '李煜',
    dynasty: '五代',
    mode: 'paragraph',
    content: '春花秋月何时了？往事知多少。#小楼昨夜又东风，故国不堪回首月明中。/雕栏玉砌应犹在，只是朱颜改。#问君能有几多愁？恰似一江春水向东流。'
  },
  {
    title: '涉江采芙蓉',
    version: 'senior',
    tags: ['必修上', '古诗十九首', '汉代诗歌', '思乡诗', '爱情诗', '五言诗', '抒情诗', '背诵'],
    author: '佚名',
    dynasty: '两汉',
    mode: 'poem',
    content: '涉江采芙蓉，兰泽多芳草。/采之欲遗谁？所思在远道。/还顾望旧乡，长路漫浩浩。/同心而离居，忧伤以终老。'
  }
]

export async function main() {
  for (const poem of poemData) {
    await prisma.poem.create({ data: poem })
  }
  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })