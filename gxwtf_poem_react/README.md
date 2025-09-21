# gxwtf_poem_react

## 项目简介
`gxwtf_poem_react` 是一个基于 React 的项目，旨在提供一个用户友好的仪表板，用户可以在其中查看打卡状态、推荐内容以及历史事件。

## 文件结构
```
gxwtf_poem_react
├── src
│   ├── app
│   │   └── (web)
│   │       └── dashboard
│   │           └── page.tsx          # 仪表板页面的主要组件
│   ├── components
│   │   ├── carousel2.tsx              # 新的滑动窗口组件，使用 Embla 实现
│   │   ├── check-in.tsx               # 打卡组件，显示用户的打卡状态和相关信息
│   │   ├── recommends.tsx              # 推荐内容展示组件
│   │   ├── site-header.tsx             # 页面头部组件
│   │   ├── today-in-history.tsx        # 显示历史事件的组件
│   │   └── Embla
│   │       ├── Embla.css               # Embla 滑动窗口的样式
│   │       ├── EmblaCarousel.tsx       # Embla 滑动窗口的主要功能
│   │       ├── EmblaCarouselArrowButtons.tsx # 滑动窗口的箭头按钮
│   │       └── EmblaCarouselDotButton.tsx    # 滑动窗口的点按钮
│   └── lib
│       └── use-session.ts              # 自定义 Hook，用于管理用户会话状态
├── package.json                        # npm 配置文件，列出项目依赖和脚本
├── tsconfig.json                       # TypeScript 配置文件
└── README.md                           # 项目文档说明
```

## 功能说明
- **打卡功能**：用户可以通过打卡组件查看自己的打卡状态，并进行打卡操作。
- **推荐内容**：展示个性化的推荐内容，增强用户体验。
- **历史事件**：提供历史上的今天的事件信息，增加趣味性。

## 使用说明
1. 克隆项目到本地。
2. 运行 `npm install` 安装依赖。
3. 运行 `npm run dev` 启动开发服务器。
4. 打开浏览器访问 `http://localhost:3000` 查看应用。

## 贡献
欢迎任何形式的贡献！请提交问题或拉取请求。