import { Meta } from '@/components/poem-meta';
import { PoemPreview } from '@/components/poem-preview/poem-preview';
import fullData from './full.json';
import {MemorizeContextProvider} from "@/components/poem-preview/memorize-context"
import full2preview, {InputData} from "../../../../../scripts/format/full2json";

function XC(){
    return <>


<Meta 
  title="XC"
  author="XC"
  dynasty="XC"
/>

<MemorizeContextProvider>
  <PoemPreview data={{mode: (fullData as InputData).mode,preview: full2preview(fullData as InputData).preview}}
  />
</MemorizeContextProvider>
    </>
}