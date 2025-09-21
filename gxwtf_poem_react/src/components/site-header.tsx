import React from "react";

export const SiteHeader = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold">诗词打卡</h1>
            <nav className="mt-2">
                <ul className="flex space-x-4">
                    <li><a href="/" className="hover:underline">首页</a></li>
                    <li><a href="/dashboard" className="hover:underline">仪表板</a></li>
                    <li><a href="/about" className="hover:underline">关于</a></li>
                </ul>
            </nav>
        </header>
    );
};