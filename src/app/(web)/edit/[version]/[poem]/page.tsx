'use client';

import Edit, { TextGroup, TableItem} from "@/components/edit";
import { getFullData } from "@/app/api/edit/server-action";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { InputData } from "@/lib/full";

type Props = {
	version: string,
	poem: string
};

export default function Page() {
	let params = useParams() as Props;
	params.poem = decodeURIComponent(params.poem);
	
	const [fullData, setFullData] = useState<InputData | null>(null);
	const [text, setText] = useState<TextGroup[]>([]);
	const [table, setTable] = useState<TableItem[]>([]);

	useEffect(() => {
		(async () => {
			setFullData(JSON.parse((await getFullData(params)).toString()));
		})();
	}, []);

	useEffect(() => {
		if (fullData){
			let cnt = 0, ncnt = 0;
			for (let i of fullData.paragraphs)
				for (let j of i.sentences){
					let content = '';
					for (let k of j.content)
						content += k.char;
					setText((prev) => prev.concat({id: ++cnt, content: content, translation: j.translation || ""}));
				
					if (j.notes){
						for (let k of j.notes)
							setTable((prev) => prev.concat({id: ++ncnt, name: 'XC', description: k.content, metadata: k}));
					}
				}
		}
	}, [fullData]);

	return (
		<>
			{fullData && <h1 className="text-3xl font-bold text-center p-8">{fullData.name}</h1>}
			<Edit textGroups={text} tableData={table} onView={() => {}} onEdit={() => {}}></Edit>
		</>
	);
}