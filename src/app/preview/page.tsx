import { PoemPreview, PoemCharData, NoteBlock } from "@/components/poem-preview"

const content = [
  {
    paragraph: [
      {
        sentence: [
          { char: "风", pinyin: "fēng"},
          { char: "风", pinyin: "fēng"},
          { char: "风", pinyin: "fēng"},
          { char: "风", pinyin: "fēng"},
          { char: "风", pinyin: "fēng"},
          { char: "风", pinyin: "fēng"},
          { char: "急", pinyin: "jí" },
          { char: "天", pinyin: "tiān" },
          { char: "高", pinyin: "gāo" },
          { char: "猿", pinyin: "yuán" },
          { char: "啸", pinyin: "xiào" },
          { char: "哀", pinyin: "āi" },
          { char: "，", pinyin: "　" },
          { char: "渚", pinyin: "zhǔ" },
          { char: "清", pinyin: "qīng" },
          { char: "沙", pinyin: "shā" },
          { char: "白", pinyin: "bái" },
          { char: "鸟", pinyin: "niǎo" },
          { char: "飞", pinyin: "fēi" },
          { char: "回", pinyin: "huí" },
          { char: "。", pinyin: "　" },
        ],
        notes: [
          { start: 4, end: 6, note: "猿啸哀：猿猴的哀鸣。" },
          { start: 8, end: 9, note: "渚清：水中的小洲清澈。" },
        ],
        translation: "秋风急骤，天高气爽，猿声哀鸣。沙洲清澈，白沙滩上鸟儿盘旋。",
      },
      {
        sentence: [
          { char: "无", pinyin: "wú" },
          { char: "边", pinyin: "biān" },
          { char: "落", pinyin: "luò" },
          { char: "木", pinyin: "mù" },
          { char: "萧", pinyin: "xiāo" },
          { char: "萧", pinyin: "xiāo" },
          { char: "下", pinyin: "xià" },
          { char: "，", pinyin: "　" },
          { char: "不", pinyin: "bù" },
          { char: "尽", pinyin: "jìn" },
          { char: "长", pinyin: "cháng" },
          { char: "江", pinyin: "jiāng" },
          { char: "滚", pinyin: "gǔn" },
          { char: "滚", pinyin: "gǔn" },
          { char: "来", pinyin: "lái" },
          { char: "。", pinyin: "　" },
        ],
        notes: [],
        translation: "无边的落叶萧萧而下，无尽的长江滚滚东流。",
      },
      {
        sentence: [
          { char: "无", pinyin: "wú" },
          { char: "边", pinyin: "biān" },
          { char: "落", pinyin: "luò" },
          { char: "木", pinyin: "mù" },
          { char: "萧", pinyin: "xiāo" },
          { char: "萧", pinyin: "xiāo" },
          { char: "下", pinyin: "xià" },
          { char: "，", pinyin: "　" },
          { char: "不", pinyin: "bù" },
          { char: "尽", pinyin: "jìn" },
          { char: "长", pinyin: "cháng" },
          { char: "江", pinyin: "jiāng" },
          { char: "滚", pinyin: "gǔn" },
          { char: "滚", pinyin: "gǔn" },
          { char: "来", pinyin: "lái" },
          { char: "。", pinyin: "　" },
        ],
        notes: [],
        translation: "无边的落叶萧萧而下，无尽的长江滚滚东流。",
      }
    ]
  },
  {
    paragraph: [
      {
        sentence: [
          { char: "无", pinyin: "wú" },
          { char: "边", pinyin: "biān" },
          { char: "落", pinyin: "luò" },
          { char: "木", pinyin: "mù" },
          { char: "萧", pinyin: "xiāo" },
          { char: "萧", pinyin: "xiāo" },
          { char: "下", pinyin: "xià" },
          { char: "，", pinyin: "　" },
          { char: "不", pinyin: "bù" },
          { char: "尽", pinyin: "jìn" },
          { char: "长", pinyin: "cháng" },
          { char: "江", pinyin: "jiāng" },
          { char: "滚", pinyin: "gǔn" },
          { char: "滚", pinyin: "gǔn" },
          { char: "来", pinyin: "lái" },
          { char: "。", pinyin: "　" },
        ],
        notes: [],
        translation: "无边的落叶萧萧而下，无尽的长江滚滚东流。",
      },
            {
        sentence: [
          { char: "无", pinyin: "wú" },
          { char: "边", pinyin: "biān" },
          { char: "落", pinyin: "luò" },
          { char: "木", pinyin: "mù" },
          { char: "萧", pinyin: "xiāo" },
          { char: "萧", pinyin: "xiāo" },
          { char: "下", pinyin: "xià" },
          { char: "，", pinyin: "　" },
          { char: "不", pinyin: "bù" },
          { char: "尽", pinyin: "jìn" },
          { char: "长", pinyin: "cháng" },
          { char: "江", pinyin: "jiāng" },
          { char: "滚", pinyin: "gǔn" },
          { char: "滚", pinyin: "gǔn" },
          { char: "来", pinyin: "lái" },
          { char: "。", pinyin: "　" },
        ],
        notes: [],
        translation: "无边的落叶萧萧而下，无尽的长江滚滚东流。",
      },
            {
        sentence: [
          { char: "无", pinyin: "wú" },
          { char: "边", pinyin: "biān" },
          { char: "落", pinyin: "luò" },
          { char: "木", pinyin: "mù" },
          { char: "萧", pinyin: "xiāo" },
          { char: "萧", pinyin: "xiāo" },
          { char: "下", pinyin: "xià" },
          { char: "，", pinyin: "　" },
          { char: "不", pinyin: "bù" },
          { char: "尽", pinyin: "jìn" },
          { char: "长", pinyin: "cháng" },
          { char: "江", pinyin: "jiāng" },
          { char: "滚", pinyin: "gǔn" },
          { char: "滚", pinyin: "gǔn" },
          { char: "来", pinyin: "lái" },
          { char: "。", pinyin: "　" },
        ],
        notes: [],
        translation: "无边的落叶萧萧而下，无尽的长江滚滚东流。",
      },
            {
        sentence: [
          { char: "无", pinyin: "wú" },
          { char: "边", pinyin: "biān" },
          { char: "落", pinyin: "luò" },
          { char: "木", pinyin: "mù" },
          { char: "萧", pinyin: "xiāo" },
          { char: "萧", pinyin: "xiāo" },
          { char: "下", pinyin: "xià" },
          { char: "，", pinyin: "　" },
          { char: "不", pinyin: "bù" },
          { char: "尽", pinyin: "jìn" },
          { char: "长", pinyin: "cháng" },
          { char: "江", pinyin: "jiāng" },
          { char: "滚", pinyin: "gǔn" },
          { char: "滚", pinyin: "gǔn" },
          { char: "来", pinyin: "lái" },
          { char: "。", pinyin: "　" },
        ],
        notes: [],
        translation: "无边的落叶萧萧而下，无尽的长江滚滚东流。",
      }
    ]
  },
  {
    paragraph: [
      {
        sentence: [
          { char: "万", pinyin: "wàn" },
          { char: "里", pinyin: "lǐ" },
          { char: "悲", pinyin: "bēi" },
          { char: "秋", pinyin: "qiū" },
          { char: "常", pinyin: "cháng" },
          { char: "作", pinyin: "zuò" },
          { char: "客", pinyin: "kè" },
          { char: "，", pinyin: "　" },
          { char: "百", pinyin: "bǎi" },
          { char: "年", pinyin: "nián" },
          { char: "多", pinyin: "duō" },
          { char: "病", pinyin: "bìng" },
          { char: "独", pinyin: "dú" },
          { char: "登", pinyin: "dēng" },
          { char: "台", pinyin: "tái" },
          { char: "。", pinyin: "　" },
        ],
        notes: [],
        translation: "万里漂泊，常为异乡之客；百年多病，独自登台远望。",
      }
    ]
  },
  {
    paragraph: [
      {
        sentence: [
          { char: "艰", pinyin: "jiān" },
          { char: "难", pinyin: "nán" },
          { char: "苦", pinyin: "kǔ" },
          { char: "恨", pinyin: "hèn" },
          { char: "繁", pinyin: "fán" },
          { char: "霜", pinyin: "shuāng" },
          { char: "鬓", pinyin: "bìn" },
          { char: "，", pinyin: "　" },
          { char: "潦", pinyin: "liáo" },
          { char: "倒", pinyin: "dǎo" },
          { char: "新", pinyin: "xīn" },
          { char: "停", pinyin: "tíng" },
          { char: "浊", pinyin: "zhuó" },
          { char: "酒", pinyin: "jiǔ" },
          { char: "杯", pinyin: "bēi" },
          { char: "。", pinyin: "　" },
        ],
        notes: [
          { start: 6, end: 6, note: "鬓：两鬓斑白。" },
          { start: 12, end: 14, note: "浊酒杯：浊酒，指低度酒，借指饮酒。" },
        ],
        translation: "艰难困苦，愁恨两鬓早生华发；潦倒失意，新近才戒掉浊酒。",
      }
    ]
  },
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
