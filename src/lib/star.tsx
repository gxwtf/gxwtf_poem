"use server"

import prisma from "@/lib/prisma";

export const queryStar = async (userId: number, poemId: string): Promise<Boolean> => {
    const res = await prisma.star.findUnique({
        where: {
            compoundId: {
                userId: userId,
                poemId: poemId
            }
        }
    });
    if(res) return true;
    return false;
};

export const updateStar = async (userId: number, poemId: string): Promise<Boolean> => {
    const type = await queryStar(userId,poemId);
    if(type){
        await prisma.star.delete({
            where: {
                compoundId: {
                    userId: userId,
                    poemId: poemId
                }
            }
        });
    }
    else{
        await prisma.star.create({
            data: {
                userId: userId,
                poemId: poemId
            }
        })
    }
    return !type;
};
