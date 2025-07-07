import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { PoemPreview } from "@/components/poem-preview"

const content = [
  {
    paragraph: [
      {
        "sentence": [
          { "char": "前", "pinyin": "qián", "write": false, "read": false },
          { "char": "不", "pinyin": "bù", "write": false, "read": false },
          { "char": "见", "pinyin": "jiàn", "write": false, "read": true },
          { "char": "古", "pinyin": "gǔ", "write": false, "read": false },
          { "char": "人", "pinyin": "rén", "write": false, "read": false },
          { "char": "，", "pinyin": "　", "write": false, "read": false },
          { "char": "后", "pinyin": "hòu", "write": false, "read": false },
          { "char": "不", "pinyin": "bù", "write": false, "read": false },
          { "char": "见", "pinyin": "jiàn", "write": false, "read": true },
          { "char": "来", "pinyin": "lái", "write": false, "read": false },
          { "char": "者", "pinyin": "zhě", "write": false, "read": true },
          { "char": "。", "pinyin": "　", "write": false, "read": false }
        ],
        "translation": {
          "translation": "向前看不见古代的贤明君主，向后看不见未来的杰出人才。"
        },
        "notes": [
          { "start": 0, "end": 0, "note": "表示时间或方向上的往前，强调历史纵深感。" },
          { "start": 3, "end": 4, "note": "指古代的贤人，如尧舜禹汤等圣君，表达对先贤的追慕。" },
          { "start": 9, "end": 10, "note": "指未来的明主或知音，引申为能赏识人才的君主。" },
          { "start": 6, "end": 6, "note": "表示时间或方向上的往后，与“前”形成对比，突出时间流逝。" }
        ],
      }],
  },
  {
    paragraph: [
      {
        "sentence": [
          { "char": "念", "pinyin": "niàn", "write": false, "read": false },
          { "char": "天", "pinyin": "tiān", "write": false, "read": false },
          { "char": "地", "pinyin": "dì", "write": false, "read": false },
          { "char": "之", "pinyin": "zhī", "write": false, "read": false },
          { "char": "悠", "pinyin": "yōu", "write": false, "read": false },
          { "char": "悠", "pinyin": "yōu", "write": false, "read": false },
          { "char": "，", "pinyin": "　", "write": false, "read": false },
          { "char": "独", "pinyin": "dú", "write": false, "read": false },
          { "char": "怆", "pinyin": "chuàng", "write": true, "read": true },
          { "char": "然", "pinyin": "rán", "write": false, "read": false },
          { "char": "而", "pinyin": "ér", "write": false, "read": false },
          { "char": "涕", "pinyin": "tì", "write": false, "read": true },
          { "char": "下", "pinyin": "xià", "write": false, "read": false },
          { "char": "。", "pinyin": "　", "write": false, "read": false }
        ],
        "translation": {
          "translation": "想到天地的广阔无边与永恒，我独自悲伤地流下眼泪。"
        },
        "notes": [
          { "start": 4, "end": 5, "note": "形容天地辽阔、时间久远，表达宇宙的无限与人生的短暂。" },
          { "start": 8, "end": 9, "note": "悲伤、凄凉的样子，“怆”易误写为“沧”或“创”，读音易误为“chuāng”。" },
          { "start": 11, "end": 11, "note": "指眼泪，非鼻涕，古汉语中常指泪水，读音易误为“bì”。" },
          { "start": 0, "end": 0, "note": "思考、感念之意，奠定全句抒情基调。" },
          { "start": 1, "end": 2, "note": "指宇宙或自然，强调空间的浩瀚。" },
          { "start": 3, "end": 3, "note": "结构助词，连接定语“悠悠”与中心语“天地”。" }
        ]
      }
    ]
  }
]

export const metadata = {
  title: "诗词预览 - 广学古诗文",
  description: "诗词预览页面",
}

export default function PreviewPage() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader data={[{
          name:"登高",
          href:"/preview"
          }]} now="预览" />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <PoemPreview
              title="登高"
              author="杜甫"
              dynasty="唐"
              mode="poem"
              content={content}
              background="北宋政治上的专制腐败、军事上的骄惰无能，带来外交上的极端软弱。其每年要向辽和西夏上贡大量银两以及商品。这样贿赂的结果，助长了辽、西夏的气焰，加重了人民的负担，极大地损伤了国力，带来了无穷的祸患。也就是说当时的北宋四周环伺，政策上求和，积贫积弱，而苏洵正是针对这样的现实撰写《六国论》的。"
              appreciation="这首诗表达了诗人对历史的感慨和对未来的忧虑，同时也流露出对天地的敬畏和对人生短暂的感伤。"
            />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
