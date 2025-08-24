// src/mdx-components.tsx
import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

const components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-[var(--theme-color)] text-center mt-10 mb-8">
        {children}
    </h1>
  ),
  
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-[var(--theme-color)] mt-8 mb-6">
      {children}
    </h2>
  ),
  
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-[var(--theme-color)] mt-6 mb-4">
      {children}
    </h3>
  ),
  
  p: ({ children }) => (
    <p className="text-primary text-lg leading-relaxed mb-4">
      {children}
    </p>
  ),
  
  strong: ({ children }) => (
    <strong className="font-bold text-[var(--theme-color)]">
      {children}
    </strong>
  ),
  
  // 斜体文本
  em: ({ children }) => (
    <em className="italic text-[var(--theme-color)]">
      {children}
    </em>
  ),
  
  // 引用块 - 古诗文风格
  blockquote: ({ children }) => (
    <blockquote className="text-primary text-lg border-l-4 border-[var(--theme-color)] bg-[#f8f5f0] p-2 mb-4 leading-relaxed">
      {children}
    </blockquote>
  ),
  
  // 无序列表
  ul: ({ children }) => (
    <ul className="text-primary text-lg leading-relaxed list-disc pl-8 mb-4">
      {children}
    </ul>
  ),
  
  // 有序列表
  ol: ({ children }) => (
    <ol className="text-primary text-lg leading-relaxed list-decimal pl-8 mb-4">
      {children}
    </ol>
  ),
  
  // 列表项
  li: ({ children }) => (
    <li className="pl-2 mb-1">
      {children}
    </li>
  ),
  
  // 链接
  a: ({ href, children }) => (
    <a 
      href={href} 
      className="text-[var(--theme-color)] hover:underline underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  
  // 图片 - 古诗文风格
  img: (props) => (
    <div className="my-6 flex justify-center">
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto', maxWidth: '600px' }}
        className="rounded-lg shadow-md border border-gray-200"
        {...(props as ImageProps)}
      />
    </div>
  ),
  
  // 代码块
  code: ({ children, className }) => {
    const language = className ? className.replace('language-', '') : '';
    
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-4 overflow-x-auto">
        {language && (
          <div className="text-sm text-gray-500 mb-2">
            {language}
          </div>
        )}
        <code className="text-sm">
          {children}
        </code>
      </div>
    );
  },
  
  // 内联代码
  inlineCode: ({ children }) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">
      {children}
    </code>
  ),
  
  // 水平分割线
  hr: () => (
    <hr className="my-8 border-t border-gray-300 dark:border-gray-700" />
  ),
  
  // 表格
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse">
        {children}
      </table>
    </div>
  ),
  
  // 表头
  thead: ({ children }) => (
    <thead className="bg-gray-100 dark:bg-gray-800">
      {children}
    </thead>
  ),
  
  // 表格行
  tr: ({ children }) => (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      {children}
    </tr>
  ),
  
  // 表头单元格
  th: ({ children }) => (
    <th className="px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  
  // 表格单元格
  td: ({ children }) => (
    <td className="px-4 py-2">
      {children}
    </td>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}