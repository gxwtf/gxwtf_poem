// 古诗文预览页面

import {PoemPreview} from "@/components/poem-preview/poem-preview"
import {MemorizeContextProvider} from "@/components/poem-preview/memorize-context"

const content = [
    {
        paragraph: [
            {
                "sentence": [
                    {"char": "千", "pinyin": "qiān"},
                    {"char": "古", "pinyin": "gǔ"},
                    {"char": "江", "pinyin": "jiāng"},
                    {"char": "山", "pinyin": "shān"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "英", "pinyin": "yīng"},
                    {"char": "雄", "pinyin": "xióng"},
                    {"char": "无", "pinyin": "wú"},
                    {"char": "觅", "pinyin": "mì"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "孙", "pinyin": "sūn"},
                    {"char": "仲", "pinyin": "zhòng"},
                    {"char": "谋", "pinyin": "móu"},
                    {"char": "处", "pinyin": "chù"},
                    {"char": "。", "pinyin": "　"}
                ],
                "translation": {
                    "translation": "千百年来江山依旧，却无处寻找像孙权那样的英雄人物了。"
                },
                "notes": []
            },
            {
                "sentence": [
                    {"char": "舞", "pinyin": "wǔ"},
                    {"char": "榭", "pinyin": "xiè"},
                    {"char": "歌", "pinyin": "gē"},
                    {"char": "台", "pinyin": "tái"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "风", "pinyin": "fēng"},
                    {"char": "流", "pinyin": "liú"},
                    {"char": "总", "pinyin": "zǒng"},
                    {"char": "被", "pinyin": "bèi"},
                    {"char": "雨", "pinyin": "yǔ"},
                    {"char": "打", "pinyin": "dǎ"},
                    {"char": "风", "pinyin": "fēng"},
                    {"char": "吹", "pinyin": "chuī"},
                    {"char": "去", "pinyin": "qù"},
                    {"char": "。", "pinyin": "　"}
                ],
                "translation": {
                    "translation": "当年的歌舞楼台和英雄业绩，都已被历史风雨冲刷殆尽。"
                },
                "notes": []
            },
            {
                "sentence": [
                    {"char": "斜", "pinyin": "xié"},
                    {"char": "阳", "pinyin": "yáng"},
                    {"char": "草", "pinyin": "cǎo"},
                    {"char": "树", "pinyin": "shù"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "寻", "pinyin": "xún"},
                    {"char": "常", "pinyin": "cháng"},
                    {"char": "巷", "pinyin": "xiàng"},
                    {"char": "陌", "pinyin": "mò"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "人", "pinyin": "rén"},
                    {"char": "道", "pinyin": "dào"},
                    {"char": "寄", "pinyin": "jì"},
                    {"char": "奴", "pinyin": "nú"},
                    {"char": "曾", "pinyin": "céng"},
                    {"char": "住", "pinyin": "zhù"},
                    {"char": "。", "pinyin": "　"}
                ],
                "translation": {
                    "translation": "夕阳映照草木间的普通街巷，人们说这里曾是刘裕居住的地方。"
                },
                "notes": [
                    {
                        "start": 12,
                        "end": 15,
                        "note": "寄奴是南朝宋武帝刘裕（363—422）的小名。刘裕的祖先移居京口，他在这里起事，晚年推翻东晋做了皇帝。"
                    },
                ]
            },
            {
                "sentence": [
                    {"char": "想", "pinyin": "xiǎng"},
                    {"char": "当", "pinyin": "dāng"},
                    {"char": "年", "pinyin": "nián"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "金", "pinyin": "jīn"},
                    {"char": "戈", "pinyin": "gē"},
                    {"char": "铁", "pinyin": "tiě"},
                    {"char": "马", "pinyin": "mǎ"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "气", "pinyin": "qì"},
                    {"char": "吞", "pinyin": "tūn"},
                    {"char": "万", "pinyin": "wàn"},
                    {"char": "里", "pinyin": "lǐ"},
                    {"char": "如", "pinyin": "rú"},
                    {"char": "虎", "pinyin": "hǔ"},
                    {"char": "。", "pinyin": "　"}
                ],
                "translation": {
                    "translation": "回想当年他手持金戈、身骑铁马，气吞山河如猛虎般威武。"
                },
                "notes": [
                    {"start": 0, "end": 14, "note": "刘裕曾两次率领东晋军队北伐，收复洛阳、长安等地。"}
                ]
            }
        ]
    },
    {
        paragraph: [
            {
                "sentence": [
                    {"char": "元", "pinyin": "yuán"},
                    {"char": "嘉", "pinyin": "jiā"},
                    {
                        "char": "草", "pinyin": "cǎo",
                        "note": [
                            {"title": "词类活用", "content": "名词活用作形容词"},
                            {"title": "古今异义", "content": "古义：草率\n今义：一种植物"},
                        ],
                        "frequency": 114,
                    },
                    {"char": "草", "pinyin": "cǎo"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "封", "pinyin": "fēng"},
                    {"char": "狼", "pinyin": "láng"},
                    {"char": "居", "pinyin": "jū"},
                    {"char": "胥", "pinyin": "xū", "write": true, "read": true},
                    {"char": "，", "pinyin": "　"},
                    {"char": "赢", "pinyin": "yíng"},
                    {"char": "得", "pinyin": "dé"},
                    {"char": "仓", "pinyin": "cāng"},
                    {"char": "皇", "pinyin": "huáng"},
                    {"char": "北", "pinyin": "běi"},
                    {"char": "顾", "pinyin": "gù"},
                    {"char": "。", "pinyin": "　"}
                ],
                "translation": {
                    "translation": "元嘉年间草率北伐，妄想建立封狼居胥的功业，结果只落得仓皇败退。"
                },
                "notes": [
                    {
                        "start": 0,
                        "end": 3,
                        "note": "南朝宋文帝刘义隆好大喜功，仓促北伐，遭到重创。元嘉，宋文帝刘义隆的年号（424—453）。草草，轻率。"
                    },
                    {
                        "start": 5,
                        "end": 8,
                        "note": "汉武帝元狩四年（前119），霍去病远征匈奴，歼敌七万余，封狼居得山而还。封，登山祭天，以纪功勋。狼居，山名，即今蒙古国境内的肯特山。这里用“元嘉北伐”暗示南宋朝廷要汲取历史教训。《宋书•王玄谟传》载刘义隆对殷景仁说：“闻王玄谟陈说，使人有封狼居晉意。”"
                    },
                    {"start": 14, "end": 15, "note": "败逃中回头北望。"},
                ]
            },
            {
                "sentence": [
                    {"char": "四", "pinyin": "sì"},
                    {"char": "十", "pinyin": "shí"},
                    {"char": "三", "pinyin": "sān"},
                    {"char": "年", "pinyin": "nián"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "望", "pinyin": "wàng"},
                    {"char": "中", "pinyin": "zhōng"},
                    {"char": "犹", "pinyin": "yóu"},
                    {"char": "记", "pinyin": "jì"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "烽", "pinyin": "fēng"},
                    {"char": "火", "pinyin": "huǒ"},
                    {"char": "扬", "pinyin": "yáng"},
                    {"char": "州", "pinyin": "zhōu"},
                    {"char": "路", "pinyin": "lù"},
                    {"char": "。", "pinyin": "　"}
                ],
                "translation": {
                    "translation": "四十三年过去了，眺望中还记得当年扬州路上烽火连天的战乱景象。"
                },
                "notes": [
                    {"start": 0, "end": 3, "note": "作者于宋高宗绍兴三十二年（1162）南归，到写这首词时正好四十三年。"},
                    {"start": 10, "end": 14, "note": "扬州一带抗金的烽火。"},
                ]
            },
            {
                "sentence": [
                    {"char": "可", "pinyin": "kě"},
                    {"char": "堪", "pinyin": "kān"},
                    {"char": "回", "pinyin": "huí"},
                    {"char": "首", "pinyin": "shǒu"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "佛", "pinyin": "fó"},
                    {"char": "狸", "pinyin": "lí"},
                    {"char": "祠", "pinyin": "cí"},
                    {"char": "下", "pinyin": "xià"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "一", "pinyin": "yī"},
                    {"char": "片", "pinyin": "piàn"},
                    {"char": "神", "pinyin": "shén"},
                    {"char": "鸦", "pinyin": "yā"},
                    {"char": "社", "pinyin": "shè"},
                    {"char": "鼓", "pinyin": "gǔ"},
                    {"char": "！", "pinyin": "　"}
                ],
                "translation": {
                    "translation": "怎忍回首，那佛狸祠下，乌鸦啄食祭品、社鼓喧腾的景象！"
                },
                "notes": [
                    {
                        "start": 5,
                        "end": 7,
                        "note": "北魏太武帝拓跋焘（408—452）小名“佛狸”。公元450年，他反击刘宋，兵锋南下，在长江北岸瓜步山上建立行宫，后称“佛狸祠”。"
                    },
                    {"start": 12, "end": 13, "note": "指在庙里吃祭品的乌鸦。"},
                    {
                        "start": 14,
                        "end": 15,
                        "note": "社日祭祀土地神的鼓声。南宋时期，当地老百姓只把佛狸祠当作一般祠庙来祭祀供奉，而不知道它过去曾是北魏皇帝的行宫。"
                    },
                ]
            },
            {
                "sentence": [
                    {"char": "凭", "pinyin": "píng"},
                    {"char": "谁", "pinyin": "shuí"},
                    {"char": "问", "pinyin": "wèn"},
                    {"char": "：", "pinyin": "　"},
                    {"char": "廉", "pinyin": "lián"},
                    {"char": "颇", "pinyin": "pō"},
                    {"char": "老", "pinyin": "lǎo"},
                    {"char": "矣", "pinyin": "yǐ"},
                    {"char": "，", "pinyin": "　"},
                    {"char": "尚", "pinyin": "shàng"},
                    {"char": "能", "pinyin": "néng"},
                    {"char": "饭", "pinyin": "fàn"},
                    {"char": "否", "pinyin": "fǒu"},
                    {"char": "？", "pinyin": "　"}
                ],
                "translation": {
                    "translation": "有谁来问：廉颇老了，饭量还好吗？（暗指自己虽老仍愿为国效力）"
                },
                "notes": [
                    {
                        "start": 4,
                        "end": 13,
                        "note": "据《史记 •廉颇蔺相如列传》，战国时赵国名将廉颇被免职后跑到魏国，后来赵王想重新起用他，派人去探看他的身体状况。廉颇在使者面前吃下饭一斗、肉十斤，披甲上马，以示尚可大用。使者受廉颇仇人郭开的贿赂，回来报告赵王说：“廉将军虽老，尚善饭，然与臣坐，顷之三遗矢矣。”（矢，同“屎”。）赵王以为廉颇已老，遂不召。"
                    }
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
        <MemorizeContextProvider>
            <PoemPreview
                title="永遇乐·京口北固亭怀古"
                author="辛弃疾"
                dynasty="宋"
                mode="paragraph"
                content={content}
                background="北宋政治上的专制腐败、军事上的骄惰无能，带来外交上的极端软弱。其每年要向辽和西夏上贡大量银两以及商品。这样贿赂的结果，助长了辽、西夏的气焰，加重了人民的负担，极大地损伤了国力，带来了无穷的祸患。也就是说当时的北宋四周环伺，政策上求和，积贫积弱，而苏洵正是针对这样的现实撰写《六国论》的。"
                appreciation="这首诗表达了诗人对历史的感慨和对未来的忧虑，同时也流露出对天地的敬畏和对人生短暂的感伤。"
            />
        </MemorizeContextProvider>
    )
}
