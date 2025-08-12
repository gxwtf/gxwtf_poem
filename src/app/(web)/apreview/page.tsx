// 作者预览页面

import {AuthorPreview} from "@/components/author-preview/author-preview"

export const metadata = {
    title: "作者预览 - 广学古诗文",
    description: "作者预览页面",
}

const poems = [
    "闻王昌龄左迁龙标遥有此寄", "渡荆门送别", "行路难·其一", "梦游天姥吟留别", "将进酒", "蜀道难"
]

export default function PreviewPage() {
    return (
        <AuthorPreview
            name="李白"
            avatar="https://guwen-1252396323.cos.ap-chengdu.myqcloud.com/headImage/20180914152354795.jpg"
            dynasty="唐"
            content="李白（701年-762年），字太白，号青莲居士，唐代伟大的浪漫主义诗人，被后人誉为“诗仙”。其诗风格豪迈奔放，清新飘逸，意境深远，代表作有《静夜思》《望庐山瀑布》《将进酒》等。"
            poem={poems}
        />
    )
}
