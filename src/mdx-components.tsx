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
		<blockquote className="text-primary text-lg border-l-4 border-[var(--theme-color)] p-4 mb-4 leading-relaxed [&>p]:my-0 [&>p:not(:last-child)]:mb-2">
			{children}
		</blockquote>
	),

	del: ({ children }) => (
		<del className="text-gray-500 line-through">
			{children}
		</del>
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
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
	return components;
}