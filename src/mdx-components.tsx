import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
 
// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
 
const components = {
  // Allows customizing built-in components, e.g. to add styling.
  h2: ({ children }) => (
        <h2 className="text-xl font-bold text-[var(--theme-color)]">
      {children}
    </h2>
  ),
  p: ({ children }) => (
    <p className="text-primary">
      {children}
    </p>
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      {...(props as ImageProps)}
    />
  ),
} satisfies MDXComponents
 
export function useMDXComponents(): MDXComponents {
  return components
}