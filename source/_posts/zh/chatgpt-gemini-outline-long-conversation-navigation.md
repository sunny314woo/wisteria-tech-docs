---
title: ChatGPT Gemini 对话目录与大纲：如何解决长对话滚动查找问题
date: 2026-05-18 14:00:00
categories:
  - 产品文档
tags:
  - 大纲
  - 长对话
  - ChatGPT
  - Gemini
  - 效率
lang: zh-CN
---

## 长对话的困境

如果你每天和 AI 进行几十轮甚至上百轮的对话，你一定遇到过这样的场景：三周前和 ChatGPT 讨论过的一个技术方案，现在想回头看某个具体的结论，但你需要滚动几十屏才能找到那个位置。Ctrl+F 搜索也不太管用，因为你不一定能准确回忆起关键词。

这是 AI 重度用户每天都会碰到的真实问题。ChatGPT 和 Gemini 的默认界面在设计时更偏向短问答场景，没有为长对话的回顾、定位和复用做太多考虑。

ChatGPT Gemini Outline & Export 就是针对这个痛点设计的。它在 ChatGPT 和 Gemini 页面右侧添加一个自动生成的对话目录，让你像翻书一样快速定位到对话中的任意位置。

## 自动大纲如何工作

这个 Chrome 扩展的工作原理比较直接：它读取当前对话页面中用户和 AI 的每一轮消息，提取出你的提问作为目录条目——因为在大多数场景下，用户的提问是对话的"章节标题"。

### 核心功能

**自动对话目录**。安装之后，打开 ChatGPT 或 Gemini 页面，右侧会出现一个侧边栏，里面按顺序列出你在这场对话中提出的所有问题。点击任意一条可以直接跳转到对应位置。

**书签与重点标记**。如果某一段 AI 回复特别重要——比如一个具体的代码片段、一组参数配置或者一段关键结论——你可以给它打上书签或高亮标记。所有标记集中在一个面板里查看，不用在整个对话中反复翻找。

**Markdown 导出**。对话可以导出为标准 Markdown 文件，保留代码块、列表和引用结构。导出的文件可以放入任何 Markdown 编辑器或笔记工具继续加工。

**Inbox 本地归档**。如果你使用 macOS，可以配合 Inbox 桌面应用，将整理好的对话片段一键发送到本地知识库中。相比 Markdown 文件散落各处，Inbox 提供了更好的搜索和回顾体验。

## 使用步骤

1. 从 Chrome Web Store 安装扩展。
2. 打开 ChatGPT（chatgpt.com）或 Gemini（gemini.google.com）。
3. 开始对话后，右侧面板自动显示对话大纲。
4. 点击大纲条目可跳转到对应位置。
5. 鼠标悬停在任一条 AI 回复上，点击书签图标即可标记。
6. 点击导出按钮，选择 Markdown 格式即可下载。

## 隐私设计

所有处理都在你的浏览器本地完成。扩展不会把你的对话内容发送到任何第三方服务器，不收集用户数据，不需要注册账号。大纲的生成、书签的存储、导出的执行全部在本地运行。

这个设计原则也延续到了 Inbox 桌面应用上。Inbox 同样不走云端，所有数据存储在本地文件系统里。

## 适合哪些用户

如果你属于以下任何一类，这个工具对你的帮助会比较直接：

- 每天和 ChatGPT/Gemini 进行 20 轮以上对话的重度用户
- 需要把 AI 对话作为研究资料归档的研究者和学者
- 在对话中写代码、调试、开发的工程师
- 用 AI 辅助写作、需要随时回顾前文的写作者

对于偶尔使用 AI 的用户，浏览器的默认界面可能已经够用。

## FAQ

**Q: 支持 Claude 或其他 AI 平台吗？**

目前只支持 ChatGPT（chatgpt.com）和 Gemini（gemini.google.com）。在考虑对其他平台的支持，但现阶段主要精力在这两个平台上。

**Q: 大纲会影响对话页面的加载速度吗？**

扩展只在页面加载完成后读取对话内容，不会影响页面的正常加载。对于极长的对话（数千轮），生成大纲可能会有短暂延迟，但不会使页面卡顿。

**Q: 书签数据存在哪里？**

存在浏览器的本地存储（localStorage 或 IndexedDB）中。清除浏览器数据时需要注意备份。

**Q: 免费版和 Pro 版有什么区别？**

基础功能（大纲浏览和 Markdown 导出）是免费的。书签数量限制、Inbox 集成和高级导出选项是 Pro 功能。具体差异可以在 Chrome Web Store 页面查看。

**Q: Inbox 是什么？**

Inbox 是 Wisteria Software 的 macOS 桌面应用，专注于本地优先的笔记和知识管理。它可以作为 ChatGPT Gemini Outline & Export 的本地归档后端。目前主要面向 macOS 用户。

---

- [官网](https://wisteriasoftware.uk/)
- [Chrome 网上应用店](https://chromewebstore.google.com/detail/opbngifmlnoahbhjhgmngkggedlofddj)
- [Demo 视频](https://www.youtube.com/watch?v=1BZpejb1oT0)
- English version: [ChatGPT Gemini Outline & Export: How to Navigate Long AI Conversations](/en/chatgpt-gemini-outline-export-how-to-navigate-long-ai-conversations/)
