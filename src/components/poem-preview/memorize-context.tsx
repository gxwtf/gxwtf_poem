/*
此文件定义了一个Context和一个Context Provider，用于设置阅读模式/背诵模式。
其中，memorize的值为NaN，表示当前处于阅读模式；值为实数时，表示处于背诵模式，且memorize的值代表背诵的难度。
更多信息可以参考：https://yuanbao.tencent.com/bot/app/share/chat/9Nrl3oZXWLuh

Author: wchengk09
*/

"use client";

import React, { createContext, useState } from "react";

export const MemorizeContext = createContext({
    memorize: NaN,
    setMemorize: (memorize: number) => { if(memorize){} }
});

// 用法：const { memorize, setMemorize } = useContext(MemorizeContext);
// 前提是你必须在父组件中使用了下文的MemorizeContextProvider

export function MemorizeContextProvider(props: { children: React.ReactNode }) {
    const [memorize, setMemorize] = useState(NaN);
    return (
        <MemorizeContext.Provider value={{ memorize, setMemorize }}>
            {props.children}
        </MemorizeContext.Provider>
    );
}