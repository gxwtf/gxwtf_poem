// src/mdx-components.tsx
import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import { generateIdFromText } from '@/lib/toc';

const components = {
	h1: ({ children }) => {
		const id = generateIdFromText(children?.toString() || '');
		return (
			<h1 id={id} className="text-3xl font-bold text-[var(--theme-color)] text-center my-8">
				{children}
			</h1>
		);
	},

	h2: ({ children }) => {
		const id = generateIdFromText(children?.toString() || '');
		return (
			<h2 id={id} className="text-2xl font-bold text-[var(--theme-color)] my-6">
				{children}
			</h2>
		);
	},

	h3: ({ children }) => {
		const id = generateIdFromText(children?.toString() || '');
		return (
			<h3 id={id} className="text-xl font-semibold text-[var(--theme-color)] my-4">
				{children}
			</h3>
		);
	},

	p: ({ children }) => (
		<p className="text-primary text-lg leading-relaxed my-4">
			{children}
		</p>
	),

	strong: ({ children }) => (
		<strong className="text-[var(--theme-color)]">
			{children}
		</strong>
	),

	em: ({ children }) => (
		<em className="text-[var(--theme-color)]">
			{children}
		</em>
	),

	del: ({ children }) => (
		<del className="text-[var(--theme-color)]">
			{children}
		</del>
	),

	blockquote: ({ children }) => (
		<blockquote className="text-primary text-lg border-l-4 border-[var(--theme-color)] p-4 mb-4 leading-relaxed [&>p]:my-0 [&>p:not(:last-child)]:mb-2">
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

	// 图片
	img: (props) => {
		if (props.src.startsWith('http')) {
			return (
				<img
					src={props.src}
					alt={props.alt}
					className="max-w-full h-auto"
				/>
			);
		}

		return (
			<Image
				sizes="100vw"
				style={{ width: '100%', height: 'auto' }}
				{...(props as ImageProps)}
			/>
		);
	},

	// 水平分割线
	hr: () => (
		<hr className="my-8 border-t border-[var(--theme-color)]" />
	),

	// 表格
	table: ({ children }) => (
		<table className="min-w-full my-6 border-collapse">
			{children}
		</table>
	),

	// 表格行
	tr: ({ children }) => (
		<tr className="border-b border-[var(--border)]">
			{children}
		</tr>
	),

	// 表头单元格
	th: ({ children }) => (
		<th className="text-xl py-4 text-center font-bold text-[var(--theme-color)]">
			{children}
		</th>
	),

	// 表格单元格
	td: ({ children }) => (
		<td className="text-lg py-4 text-center text-primary">
			{children}
		</td>
	),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
	return components;
}