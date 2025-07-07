import { PoemPreview } from "@/components/poem-preview"

const content = [
  [
    {
      "sentence": [
        { "char": "前", "pinyin": "qián", "write": false, "read": false },
        { "char": "不", "pinyin": "bù", "write": false, "read": false },
        { "char": "见", "pinyin": "jiàn", "write": false, "read": true },
        { "char": "古", "pinyin": "gǔ", "write": false, "read": false },
        { "char": "人", "pinyin": "rén", "write": false, "read": false },
        { "char": "后", "pinyin": "hòu", "write": false, "read": false },
        { "char": "不", "pinyin": "bù", "write": false, "read": false },
        { "char": "见", "pinyin": "jiàn", "write": false, "read": true },
        { "char": "来", "pinyin": "lái", "write": false, "read": false },
        { "char": "者", "pinyin": "zhě", "write": false, "read": true }
      ],
      "translation": "向前看不见古代的贤明君主，向后看不见未来的杰出人才。",
      "notes": [
        { "start": "4", "end": "5", "note": "指古代的贤人，如尧舜禹汤等圣君，表达对先贤的追慕。" },
        { "start": "9", "end": "10", "note": "指未来的明主或知音，引申为能赏识人才的君主。" },
        { "start": "1", "end": "1", "note": "表示时间或方向上的往前，强调历史纵深感。" },
        { "start": "6", "end": "6", "note": "表示时间或方向上的往后，与“前”形成对比，突出时间流逝。" }
      ],
    },
    {
      "sentence": [
        { "char": "念", "pinyin": "niàn", "write": false, "read": false },
        { "char": "天", "pinyin": "tiān", "write": false, "read": false },
        { "char": "地", "pinyin": "dì", "write": false, "read": false },
        { "char": "之", "pinyin": "zhī", "write": false, "read": false },
        { "char": "悠", "pinyin": "yōu", "write": false, "read": false },
        { "char": "悠", "pinyin": "yōu", "write": false, "read": false },
        { "char": "独", "pinyin": "dú", "write": false, "read": false },
        { "char": "怆", "pinyin": "chuàng", "write": true, "read": true },
        { "char": "然", "pinyin": "rán", "write": false, "read": false },
        { "char": "而", "pinyin": "ér", "write": false, "read": false },
        { "char": "涕", "pinyin": "tì", "write": false, "read": true },
        { "char": "下", "pinyin": "xià", "write": false, "read": false }
      ],
      "translation": "想到天地的广阔无边与永恒，我独自悲伤地流下眼泪。",
      "notes": [
        { "start": "5", "end": "6", "note": "形容天地辽阔、时间久远，表达宇宙的无限与人生的短暂。" },
        { "start": "8", "end": "9", "note": "悲伤、凄凉的样子，“怆”易误写为“沧”或“创”，读音易误为“chuāng”。" },
        { "start": "11", "end": "11", "note": "指眼泪，非鼻涕，古汉语中常指泪水，读音易误为“bì”。" },
        { "start": "1", "end": "1", "note": "思考、感念之意，奠定全句抒情基调。" },
        { "start": "2", "end": "3", "note": "指宇宙或自然，强调空间的浩瀚。" },
        { "start": "4", "end": "4", "note": "结构助词，连接定语“悠悠”与中心语“天地”。" }
      ]
    }
  ]
]

export const metadata = {
  title: "诗词预览 - 广学古诗文",
  description: "诗词预览页面",
}

export default function PreviewPage() {
  return (
    <PoemPreview
      title="登高"
      author="杜甫"
      dynasty="唐"
      mode="poem"
      content={content}
    />
  )
}
