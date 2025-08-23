import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const withMDX = createMDX({
    extension: /\.(md|mdx)$/
});

const nextConfig: NextConfig = {
    images: {
        domains: ['guwen-1252396323.cos.ap-chengdu.myqcloud.com', 'gxwtf.cn', 'account.gxwtf.cn'],
    },
    pageExtensions: ['ts', 'tsx', 'md', 'mdx', 'js', 'jsx'],
};

export default withMDX(nextConfig);