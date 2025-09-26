/*
定义了 full.json 的文件格式
author: wchengk09
*/

export interface InputChar {
    char: string;
    pinyin: string;
    index: number;
    read: boolean;
    write: boolean;
}

export interface InputSentence {
    content: InputChar[];
    translation?: string;
    pinyin?: string;
    notes?: {
        start: number;
        end: number;
        content: string;
    }[];
    special_sentences?: {
        start: number;
        end: number;
        content: string;
    }[];
    different_meanings?: {
        start: number;
        end: number;
        old: string;
        new: string;
    }[];
}

export interface InputParagraph {
    sentences: InputSentence[];
}

export interface InputData {
    name: string;
    author: string;
    dynasty: string;
    mode: string;
    paragraphs: InputParagraph[];
    tags?: string[];
    background?: string;
    appreciation?: string;
}