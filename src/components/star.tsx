import {
    Star
} from "lucide-react";
import { useEffect, useState } from "react";
import { queryStar, updateStar, queryStarNum } from "@/lib/star";
import useSession from "@/lib/use-session";
import { Button } from "@/components/ui/button";

export function StarButton({
    poemId
}: {
    poemId: string
}){
    const { session } = useSession();
    const userId = session.userid;
    const [ starStat, setStarStat ] = useState<Boolean>(false);
    const [ starNum, setStarNum ] = useState<number>(0);
    useEffect(() => {
        queryStarNum(poemId)
        .then((res)=>{setStarNum(res);});
        if(session.isLoggedIn){
            queryStar(userId,poemId)
            .then((res)=>{setStarStat(res);});
        }
    }, [userId, poemId]);
    return (
        <Button onClick={async (event)=>{
            event.stopPropagation();
            if(session.isLoggedIn){
                setStarStat(await updateStar(userId, poemId));
                queryStarNum(poemId)
                .then((res)=>{setStarNum(res);});
            }
        }}>
            <Star fill={starStat?"var(--theme-color)":"var(--muted-foreground)"} strokeWidth={1} />
            {starNum}
        </Button>
    );
}