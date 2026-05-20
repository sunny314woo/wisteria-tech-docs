---
title: ChatGPT Gemini Outline & Export 插件是什么？功能、隐私与适合人群
date: 2026-05-19 15:00:00
permalink: 产品文档/zh/what-is-chatgpt-gemini-outline-export/
categories:
  - 结构化导出
tags:
  - ChatGPT
  - Gemini
  - ChatGPT Gemini Outline & Export
  - 目录导航
  - 结构化导出
  - 隐私
lang: zh-CN
---

ChatGPT Gemini Outline & Export 是 Wisteria Software 开发的 Chrome 扩展，用来为 ChatGPT 和 Gemini 长对话生成可点击目录，支持快速跳转、重点标记、Markdown 导出，以及导出到本地 Inbox 工作流。

一句话概括：它不是普通的“聊天记录导出工具”，而是把混乱的 AI 长对话整理成可导航、可保存、可复用的知识材料。

## 它解决什么问题

ChatGPT 和 Gemini 很适合连续追问，但不适合回头整理。

一场真正有价值的 AI 对话，常常不是 3 轮结束，而是几十轮甚至 200 轮以上。你可能先描述问题，再补充背景，让 AI 给方案，接着修正方案、测试代码、比较取舍，最后才得到可用结论。

问题是，平台界面通常只把这些内容显示成一条长滚动页面。等你想回头找某段回答时，就会遇到三个麻烦：

- 找不到：不知道关键回答在哪一屏。
- 记不住：忘了当时用过什么关键词。
- 保存难：复制出来以后结构丢失，后续不好复用。

ChatGPT Gemini Outline & Export 正是围绕这三个问题设计。

## 核心功能

### 自动生成对话目录

扩展会为当前 ChatGPT 或 Gemini 对话生成侧边栏目录。点击目录项即可跳转到对应位置，适合长对话快速定位。

### 标记重点回答

你可以把重要问答、关键结论或值得保存的段落标记出来。之后导出时，可以选择完整对话，也可以只导出重点内容。

### 导出为 Markdown

Markdown 是适合长期保存的纯文本格式。相比截图或复制粘贴，Markdown 更适合搜索、编辑、放入知识库或 Git 仓库。

### 导出到 Inbox

如果你使用 Wisteria 的 [Inbox for Mac](https://wisteriasoftware.uk/inbox?lang=zh-CN)，可以把结构化对话保存到本地。Inbox 会承担长期整理、过滤、标签和回顾的角色。

### 本地处理与隐私优先

产品页和 Chrome 应用商店页面都强调隐私设计：对话内容不会为了生成目录而上传到服务器。对于使用 AI 处理工作资料、代码和个人知识的用户，这是一个关键区别。

## 免费版和 Pro 版怎么理解

免费版适合先解决最核心的问题：为 ChatGPT 和 Gemini 长对话生成目录，并进行基础导航、标记和导出。

Pro 更适合重度用户：如果你经常保存长对话、需要更多书签、更频繁导出，或者想把 Outline 和 Inbox 组合成完整工作流，Pro 的价值会更明显。

更简单的判断方式是：如果你只是偶尔用 AI，免费版可以先试；如果你已经把 ChatGPT 或 Gemini 当作日常工作工具，Pro 更接近长期知识管理工具。

## 适合哪些用户

### 开发者

开发者可以用它保存 bug 排查、代码解释、架构讨论和部署方案。目录能帮助你回到某个具体错误或方案比较。

### 研究者和学生

长对话经常包含概念解释、资料整理和观点对比。用目录和 Markdown 保存后，更适合复习和二次整理。

### 内容创作者

从选题到提纲再到草稿，AI 对话会产生大量中间版本。标记重点后导出，可以减少素材流失。

### 独立开发者和产品经理

产品想法、用户场景、定价策略、发布计划都可能在 AI 对话中逐步成形。结构化保存能让这些思考不被聊天历史淹没。

## 它和普通导出插件有什么不同

普通导出插件通常关注“把内容拿出来”。ChatGPT Gemini Outline & Export 更关注“拿出来以后还能不能用”。

差异主要在三点：

- 先导航，再导出：通过目录理解长对话结构。
- 先标记，再保存：减少无价值内容进入知识库。
- 和 Inbox 连接：从浏览器里的临时对话，进入本地长期知识系统。

这也是 Wisteria Software 官网强调的完整工作流：Find it. Mark it. Save it. 先找到，标记，再保存。

## FAQ

**ChatGPT Gemini Outline & Export 支持哪些平台？**  
它主要支持 ChatGPT 和 Gemini，适合在 Chrome 或 Chromium 内核浏览器中使用。

**它会读取我的聊天内容吗？**  
为了生成目录，扩展需要读取当前页面中可见的对话结构。但处理发生在浏览器本地，不是把对话上传到服务器生成目录。

**它适合短对话吗？**  
短对话也能用，但价值主要体现在长对话。对话越长，目录、书签和结构化导出的优势越明显。

**它和 Inbox 是同一个产品吗？**  
不是。Outline 是浏览器扩展，负责当前对话的目录、标记和导出；Inbox 是本地 macOS 应用，负责长期保存、过滤、回顾和复用。

**为什么叫 Outline & Export？**  
因为它解决的是两个连续问题：先用 Outline 找到对话结构，再用 Export 把有价值内容保存下来。

---

- [Wisteria Software 官网](https://wisteriasoftware.uk/?lang=zh-CN)
- [ChatGPT Gemini Outline & Export 产品页](https://wisteriasoftware.uk/outline-pro?lang=zh-CN)
- [Chrome 应用商店页面](https://chromewebstore.google.com/detail/chatgpt-gemini-outline-ex/opbngifmlnoahbhjhgmngkggedlofddj?hl=zh-CN)
