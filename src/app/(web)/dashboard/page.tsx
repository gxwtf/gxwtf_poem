// 主页推荐页面

import { SiteHeader } from "@/components/site-header"
import Recommends from "@/components/recommends"
import { CheckIn } from "@/components/check-in"
import { TodayInHistory } from "@/components/today-in-history"
import React from "react"

export default function Page() {
    return (
        <>
            <SiteHeader />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <CheckIn />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <TodayInHistory />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
                    <Recommends />
                </div>
            </div>
        </>
    )
}