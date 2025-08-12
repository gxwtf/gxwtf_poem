// 古诗文知识梳理页面

import {Section, SectionHeading, SectionContent} from "@/components/section"

export const metadata = {
    title: "知识梳理 - 广学古诗文",
    description: "文言知识梳理页面",
}

export default function CombPage() {
    return (
        <>
            <Section>
                <SectionHeading val="通假字" level={1}/>
                <SectionContent
                    val={`卤：予反覆不宜卤莽 \u00A0\u00A0 通“鲁”，粗野 \n 辨：不复一一自辨 \u00A0\u00A0 通“辩”，辩解`}/>
            </Section>

            <Section>
                <SectionHeading val="重点词语解释" level={1}/>
                <SectionContent val={`兀：蜀山兀 \u00A0\u00A0 光秃 \n 辞：辞楼下殿，辇来于秦 \u00A0\u00A0 辞别`}/>
            </Section>

            <Section>
                <SectionHeading val="一词多义" level={1}/>
                <SectionContent val={`缦 \n 廊腰缦回：回环的样子 \n 缦立远视：久`}/>
            </Section>
        </>
    )
}
