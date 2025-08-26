import fs from 'fs'
import path from 'path'
import { generateTableOfContents, Toc } from '@/lib/toc'

export async function loadMDXWithTOC(Path: string): Promise<{
    mdxComponent: React.ComponentType,
    toc: Toc,
    content: string
}> {
    try {
        const { default: mdxComponent } = await import(`../${Path}`);
        const mdxContent = fs.readFileSync(path.join(process.cwd(), 'src', Path), 'utf-8');
        const toc = await generateTableOfContents(mdxContent);
        return { mdxComponent, toc, content: mdxContent };
    } catch (error) {
        throw error;
    }
}