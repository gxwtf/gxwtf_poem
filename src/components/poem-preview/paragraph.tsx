"use client"

import { useState } from "react";
import {Sentence,SentenceData} from "./sentence";

type ParagraphData = {
    sentences: SentenceData[]
}

export function Paragraph({
    para,
    showPinyin
}:{
    para: ParagraphData
    showPinyin: boolean
}){
}