// next.config.ts
import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import path from 'path';

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: ['remark-gfm'],
    }
});

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'guwen-1252396323.cos.ap-chengdu.myqcloud.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'gxwtf.cn',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'account.gxwtf.cn',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ai.gxwtf.cn',
                port: '',
                pathname: '/**',
            }
        ],
    },
    pageExtensions: ['ts', 'tsx', 'md', 'mdx', 'js', 'jsx'],
    turbopack: {
        root: path.join(__dirname),
    },
};

export default withMDX(nextConfig);