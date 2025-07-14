"use client"
/**
 * @description generate a outline
 * @param {Array<any>} content content of outline, keys must be ["1","2","3",...]
 * @return {React.ReactElement} outline component
 */
import React from "react";
import { useState } from "react";
export type OutlineContent = {
    title: string,
    id: Number,
    children?: Array<OutlineContent>
};
export function Outline({content,activeId,setActiveId}:{
    content:OutlineContent
    activeId?:Number,
    setActiveId?:React.Dispatch<React.SetStateAction<Number>>
}){
    if(!setActiveId){
        [activeId,setActiveId]=useState(content.id);
    }
    let chs=(<></>);
    if(content.children){
        chs=(
            <div className="pl-4">
                {content.children.map((ch,index)=>(
                    <Outline key={index} content={ch} activeId={activeId} setActiveId={setActiveId}/>
                ))}
            </div>
        );
    }
    return (<>
        <p className={`${activeId==content.id?"":"text-black"} cursor-pointer`} onClick={()=>{setActiveId(content.id)}}>
            {content.title}
        </p>
        {chs}
    </>);
}