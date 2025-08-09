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

// export const metadata = {
//     title: "古诗文概览 - 广学古诗文",
//     description: "古诗文概览页面",
// }

export default function OverviewPage() {
  const { version } = useVersion()
  const [poems, setPoems] = useState<PoemMeta[]>([])

  useEffect(() => {
  async function loadPoems() {
    const overviewData = await import(`@/poem/${version}/overview.json`);
    setPoems(overviewData.default);
  }
  loadPoems();
}, [version]);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {poems.map((poem, idx) => (
        <PoemCard key={poem.title + idx} {...poem} />
      ))}
    </div>
  )
}
