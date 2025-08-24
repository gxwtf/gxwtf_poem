// 古诗文概览页面

"use client"
import React, { useEffect, useState } from "react"
import { PoemCard } from "@/components/poem-card"
import { useVersion } from "@/components/version-provider"
import {SiteHeader} from "@/components/site-header";

type PoemMeta = {
  title: string
  author: string
  dynasty: string
  content: string
  tags?: string[]
}

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
      <>
          <SiteHeader now="古诗文" />
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {poems.map((poem, idx) => (
                  <PoemCard key={poem.title + idx} {...poem} url={`/poem-preview/${version}/${poem.title}`}/>
              ))}
          </div>
      </>
  )
}
