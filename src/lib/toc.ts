import { remark } from "remark";

export interface TocItem {
  title: string;
  url: string;
  depth: number;
  items?: TocItem[];
}

export interface Toc {
  items: TocItem[];
}

/**
 * 从MDX内容中提取目录结构
 */
export function getTableOfContents(mdxContent: string): Toc {
  const headings: TocItem[] = [];
  
  const processor = remark()
    .use(function () {
      return (tree: any) => {
        // 使用栈结构来构建层级目录
        const stack: TocItem[] = [];
        const maxDepth = 3; // 设置最大深度
        
        const processNode = (node: any) => {
          if (node.type === "heading" && node.depth >= 1 && node.depth <= maxDepth) {
            const title = extractTextFromNode(node);
            const id = generateIdFromText(title);
            
            const tocItem: TocItem = {
              title,
              url: `#${id}`,
              depth: node.depth,
              items: []
            };
            
            // 找到正确的父级
            while (stack.length > 0 && stack[stack.length - 1].depth >= node.depth) {
              stack.pop();
            }
            
            if (stack.length === 0) {
              // 顶级标题
              headings.push(tocItem);
            } else {
              // 子标题，添加到父级的items中
              const parent = stack[stack.length - 1];
              if (!parent.items) parent.items = [];
              parent.items.push(tocItem);
            }
            
            // 将当前标题推入栈中
            stack.push(tocItem);
          }
          
          // 递归处理子节点
          if (node.children) {
            node.children.forEach((child: any) => {
              processNode(child);
            });
          }
        };
        
        processNode(tree);
      };
    });

  processor.processSync(mdxContent);
  return { items: headings };
}

/**
 * 从节点提取文本内容
 */
function extractTextFromNode(node: any): string {
  if (node.type === "text") {
    return node.value;
  }
  
  if (node.children) {
    return node.children.map((child: any) => extractTextFromNode(child)).join("");
  }
  
  return "";
}

/**
 * 从文本生成ID
 */
export function generateIdFromText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-');
}

/**
 * 从MDX内容生成完整的目录
 */
export async function generateTableOfContents(mdxContent: string): Promise<Toc> {
  return getTableOfContents(mdxContent);
}