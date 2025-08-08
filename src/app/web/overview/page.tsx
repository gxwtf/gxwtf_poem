// 古诗文概览页面

"use client"
import { useEffect, useState } from "react"
import { PoemCard } from "@/components/poem-card"
import { useVersion } from "@/components/version-provider"

type PoemMeta = {
  title: string
  author: string
  dynasty: string
  content: string
  tags?: string[]
}

function cleanContent(content: string) {
  // 去除 # 和 / 及其后的换行，仅保留诗文内容
  return content
    .replace(/[#/]/g, "") // 去掉分隔符
    .replace(/\n/g, "")   // 去掉换行
    .trim()
}

// export const metadata = {
//     title: "古诗文概览 - 广学古诗文",
//     description: "古诗文概览页面",
// }

export default function OverviewPage() {
  const { version } = useVersion()
  const [poems, setPoems] = useState<PoemMeta[]>([])

  useEffect(() => {
    async function loadPoems() {
      // 动态导入 order.tsx
      const orderModule = await import(`@/poem/${version}/order.tsx`)
      const order: string[] = orderModule.order

      // 依次加载每首诗文
      const poemList: PoemMeta[] = await Promise.all(
        order.map(async (title) => {
          // 路径需与实际文件名一致
          const poemData = await import(`@/poem/${version}/${title}.json`)
          const { title: t, author, dynasty, content, tags } = poemData.default
          return {
            title: t,
            author,
            dynasty,
            content: cleanContent(content),
            tags,
          }
        })
      )
      setPoems(poemList)
    }
    loadPoems()
  }, [version])

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {poems.map((poem, idx) => (
        <PoemCard key={poem.title + idx} {...poem} />
      ))}
    </div>
  )
}
