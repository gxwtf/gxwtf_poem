import { Outline, OutlineContent } from "@/components/outline";
export default function Page(){
    return (
        <Outline
            content={{
                title: 'Chapter 1',
                id: 1,
                children: [
                    {
                        title: 'Unit 1',
                        id: 2,
                        children: [
                            {title: 'Hello',id:3},
                            {title: 'World',id:4}
                        ]
                    },
                    {
                        title: 'Unit 2',
                        id: 5
                    }
                ]
            }}
        />
    );
}