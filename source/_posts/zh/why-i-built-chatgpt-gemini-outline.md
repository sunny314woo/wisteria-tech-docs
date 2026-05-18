---
title: "为什么我开发了 ChatGPT Gemini Outline & Export"
date: 2026-05-19 22:15:00
categories:
  - AI 工具
tags:
  - 产品故事
  - ChatGPT
  - Gemini
  - Chrome 扩展
  - Wisteria
description: "分享开发 ChatGPT Gemini Outline & Export 的初衷和过程——从一个长对话找内容翻到崩溃的真实经历，到做出同时支持 ChatGPT 和 Gemini 的导航与导出工具。"
lang: zh-CN
---

## 快速回答

ChatGPT Gemini Outline & Export 的起点不是商业计划，而是一个很具体的挫败感：一场 200 轮的 ChatGPT 对话里有一个关键结论，我翻了三分钟才找到。

这个经历引发了一个朴素的问题：为什么我只能像翻聊天记录一样翻 AI 对话？为什么不能像看有目录的文档一样看它？

从这个问题出发，最终做出了一个极简的 Chrome 扩展，专注做三件事：给对话加目录、标记重点、导出可复用的 Markdown 文件。而且既然 ChatGPT 和 Gemini 都有这个问题，那就两个平台都支持。

## 起点：一场翻不到头的对话

最早触发这个想法的是我一个做开发的朋友。他那天在 Slack 上发了一条消息，大意是："我在 ChatGPT 里调了一个下午的 bug，聊了快 100 轮，现在我想回头看第 30 轮那段关于超时的分析，翻了五分钟还不确定是不是那段。"

这不是什么极端场景。对很多 ChatGPT 重度用户来说，这几乎是每天都会发生的事。

我自己也遇到过类似的情况——一场长对话里有价值的不是全部内容，而是分散在各个角落的几个关键回答。但在默认界面里，这些珍珠全都埋在一堆沙子里。

## 要解决的核心问题

开发之前，我定义了两个核心问题：

1. **长对话里找不到东西。** 不是因为内容不好，而是因为没有导航方式。
2. **对话内容不能被重复使用。** 聊完就关掉，下次要用同样的内容还得重新聊。

第一个问题是"当下体验"的问题，第二个问题是"长期价值"的问题。ChatGPT Gemini Outline & Export 的设计就是围绕这两个问题展开。

**针对第一个问题：** 加了侧边栏目录——把每轮对话变成目录条目，点击跳转。

**针对第二个问题：** 加了书签标记和 Markdown 导出——你可以标记重点，导出后放进本地知识库，下次直接搜索使用。

## 为什么也支持 Gemini

做了一半的时候发现，Gemini 的用户面临一模一样的问题——长对话没有目录、不能标记、不能导出。

既然两个平台共享同一个痛点，那用同一个扩展、同一套交互逻辑来解决，对用户来说是最自然的。你不需要在 ChatGPT 上用一个工具、在 Gemini 上用另一个工具。学习一次，两个平台通用。

## 设计上的几个坚持

### 不做功能堆砌

ChatGPT Gemini Outline & Export 没有提示词管理、没有主题美化、没有批量对话操作。这些功能有存在的价值，但不是这个扩展要解决的问题。

坚持做少，是为了做好。

### 隐私放在第一行

扩展在浏览器本地完成所有处理——生成目录、标记、导出，每一步都不需要把你的对话内容发送到服务器。

对于用 AI 处理代码、商业信息和私人知识的用户来说，这不是可选的加分项，是必须的前提。

### Markdown 而不是私有格式

导出格式选 Markdown 是经过考虑的。Markdown 是纯文本、开源格式、任何设备都能打开、任何编辑器都支持。用 Markdown 导出的对话十年后还能打开，不需要特定的软件。

## 适合谁用

- ChatGPT / Gemini 深度用户，单场对话经常 30 轮以上。
- 需要保存 AI 对话作为工作记录、学习笔记或参考资料的人。
- 同时使用两个 AI 平台、想要统一管理逻辑的用户。
- 重视隐私、不希望 AI 对话内容离开本地的用户。

## 不适合谁

- 只用 ChatGPT 做短问答。
- 不需要保存或反复查看对话记录。
- 只用 Safari 或 Firefox（目前仅支持 Chrome）。

## 常见问题 FAQ

**为什么叫 Outline & Export？**

因为它做的事情就是先 Outline（给对话生成目录），再 Export（导出有价值的内容）。这两个动作连接起来就是完整的"找到 → 保存"流程。

**会一直免费吗？**

免费版会保留核心功能——目录、书签和基础导出。重度用户可以选 Pro 版获得更多的导出量和书签数。

**下一步做什么？**

会继续跟着 ChatGPT 和 Gemini 的界面更新做适配，也会根据用户反馈优化现有功能。但不会变成一个什么都做的"全能工具"。

**开发花了多长时间？**

从想法到可用的第一个版本大概几周。但持续适配 ChatGPT 和 Gemini 的界面变化是一个长期工程。

**和 Wisteria Software 的其他产品是什么关系？**

Wisteria Software 还有本地知识管理工具 Inbox。Outline 解决的是浏览器端的对话管理和导出问题，Inbox 解决的是导出后的长期整理和回顾问题。两者可以独立使用，也可以组合成完整工作流。

## 总结

ChatGPT Gemini Outline & Export 是一个从具体痛苦出发的工具——因为找不到对话里的内容而沮丧，最后做了一个让你不再需要为此沮丧的东西。它不花哨，但解决了高频、真实的问题。

## 相关链接

- [Wisteria Software 官网](https://wisteriasoftware.uk/?lang=zh-CN)
- [ChatGPT Gemini Outline & Export — Chrome 应用商店](https://chromewebstore.google.com/detail/opbngifmlnoahbhjhgmngkggedlofddj?hl=zh-CN)

## 建议内部链接

- [ChatGPT Gemini Outline & Export 使用体验分享](chatgpt-gemini-outline-experience-review.md)
- [2026 年最好用的 ChatGPT 目录插件推荐](best-chatgpt-outline-extension-2026.md)
- [如何将 ChatGPT 对话保存到本地知识库](how-to-save-chatgpt-to-local-knowledge-base.md)
