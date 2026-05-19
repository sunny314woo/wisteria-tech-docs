---
title: 如何把 ChatGPT 和 Gemini 长对话导出为结构化 Markdown
date: 2026-05-18 14:02:00
categories:
  - 产品文档
tags:
  - Markdown
  - 导出
  - ChatGPT
  - Gemini
  - 归档
lang: zh-CN
---

## 聊天内容的"只进不出"问题

ChatGPT 和 Gemini 官方已经提供了对话历史功能，但它有一个明显的局限：内容只能在平台内查看。你想把一段有价值的对话分享给同事、放进自己的笔记系统、或者在本地备份？只能手动复制粘贴。

手动操作有一个更大的问题：它会丢掉对话的结构。代码块可能变成纯文本，引用关系丢失，一问一答之间的逻辑链条断裂。你拿到的是一堆需要重新格式化的碎片。

ChatGPT Gemini Outline & Export 的 Markdown 导出功能就是为这个场景设计的。它保留对话的完整结构，一键导出为标准 Markdown 文件。

## 导出包含什么

导出后的 Markdown 文件包含以下内容：

1. **对话标题**（取自你的第一个提问，可自定义）
2. **每条消息的角色标识**（用户 / ChatGPT / Gemini）
3. **完整的代码块**（保留编程语言标注和缩进）
4. **列表、引用、粗体、斜体等富文本格式**
5. **每条消息的时间戳**
6. **你添加的书签和高亮标记**（如果有的话）

导出的文件是一个纯 `.md` 文件，可以用任何编辑器打开，不需要安装额外工具。

## 导出步骤

### 基础导出

1. 打开 ChatGPT 或 Gemini 页面，进入你想导出的对话。
2. 确认扩展已激活（右侧出现大纲面板）。
3. 点击大纲面板顶部的导出按钮。
4. 选择"Markdown"格式。
5. 文件自动下载到浏览器默认的下载目录。

### 选择性导出

如果你只想导出对话的一部分（比如只导出有书签标记的部分，或只导出某几段关键问答）：

1. 在对话中标记想要导出的消息（添加书签或高亮）。
2. 点击导出按钮。
3. 选择"仅导出已标记内容"。
4. 下载的文件只包含你选中的内容。

这个功能尤其适合需要把多个对话中的关键结论汇总到一个文档里的场景。

## 导出后怎么用

导出的 Markdown 文件用途很广：

- **直接放入 Obsidian、Notion、Logseq 等笔记工具**。Markdown 是它们的原生格式，拖进去就能用，保留所有结构和样式。
- **纳入 Git 仓库**。如果你在对话中讨论了技术方案或代码片段，导出的文件可以直接作为项目文档的一部分。
- **通过 Inbox 本地归档**。如果你安装了 Inbox 桌面应用，可以设置导出路径直接指向 Inbox 的导入目录，实现一次导出、自动纳入本地知识库。
- **打印和分享**。Markdown 可以转换为 PDF 或 HTML，方便分享给不使用这些工具的人。

## 和平台原生导出功能的比较

ChatGPT 目前支持通过数据导出功能导出全部对话记录，但它导出的是整个账号的全量数据，而且格式是 JSON 或 HTML，不是阅读友好的 Markdown。如果你只想导出某一场对话，用平台原生功能需要先在全量数据中手动抽取，再自行转换格式。

Gemini 的原生支持更有限。在一些地区可以通过 Google Takeout 导出数据，但同样不是针对单场对话的设计。

ChatGPT Gemini Outline & Export 填补的是"单场对话、即时导出、结构化 Markdown"这个场景。它是轻量的、针对性的，不需要你导出整个账号的几十兆数据包来找到一段对话。

## FAQ

**Q: 导出的 Markdown 会包含图片吗？**

对话中的图片会以链接形式保留在 Markdown 中。如果图片托管在源平台（例如 ChatGPT 的图片 URL），导出的文件会保留这个 URL。注意，这些 URL 的访问权限取决于源平台的政策。

**Q: 可以导出为 PDF 吗？**

扩展本身只导出 Markdown。但你可以用任何 Markdown 编辑器（如 Typora、VS Code）或命令行工具（如 Pandoc）将导出的 `.md` 文件转换为 PDF。

**Q: 导出文件大小有没有上限？**

没有硬性的文件大小限制。但对话极长时，导出的 Markdown 文件会相应变大。对于超过数千轮的超长对话，建议分批导出或使用选择性导出。

**Q: 导出的数据包含我的个人信息吗？**

导出的文件只包含你在对话页面中能看到的内容——即你的提问和 AI 的回复。不包含浏览器 cookie、IP 地址等元数据。

---

- [官网](https://wisteriasoftware.uk/)
- [Chrome 网上应用店](https://chromewebstore.google.com/detail/opbngifmlnoahbhjhgmngkggedlofddj)
- [Demo 视频](https://www.youtube.com/watch?v=1BZpejb1oT0)
- English version: [How to Export Long ChatGPT and Gemini Conversations to Structured Markdown](/en/how-to-export-chatgpt-gemini-conversations-structured-markdown/)
