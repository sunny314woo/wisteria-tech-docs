---
title: "Outlinesave 怎么用？ChatGPT 目录、高亮、书签与导出完整教程"
date: 2026-05-18 10:00:00
updated: 2026-09-22 08:46:00
description: "Outlinesave 怎么用？这篇快速教程介绍如何为 ChatGPT 长对话生成目录、跳转旧回答、添加高亮和书签，并导出 Markdown 或可搜索的离线 HTML。"
keywords:
  - Outlinesave 怎么用
  - Outlinesave 教程
  - ChatGPT 目录
  - ChatGPT 书签
  - ChatGPT 高亮
  - ChatGPT 导出
  - ChatGPT Outline
permalink: Outline/outline/getting-started/
categories:
  - 产品指南
tags:
  - Outlinesave
  - ChatGPT Outline
  - 目录导航
  - 对话导出
lang: zh-CN
---

## Outlinesave 怎么用？

Outlinesave 是一个用于整理 ChatGPT 等 AI 长对话的浏览器扩展。安装后，你可以把 conversation 变成**可导航的两级目录**，给重要内容添加**高亮、下划线、备注和书签**，通过筛选快速找回重点，并将对话保存为 **Markdown 或可搜索的离线 HTML**。

第一次使用只需要记住一个流程：

**打开旧对话 → 用目录定位 → Bookmark / Highlight 重要内容 → Filter 聚焦 → Export 保存。**

## 1. 安装后打开一个已有 ChatGPT 对话

安装 Outlinesave 后，先打开一个已经有内容的 ChatGPT conversation。Outlinesave 也支持其他 AI 平台，但本教程以 ChatGPT 为主要示例，不同网站的界面和部分能力可能不同。

## 2. 用 Full Outline 查看完整目录

在页面中的 Outlinesave 工具栏点击目录按钮，打开 **Full Outline**。

一级目录对应你的问题；AI 回答中的标题可以成为二级目录。这样即使 conversation 已经有几十或几百轮，也可以先看结构，再决定跳到哪里。

对于超长 ChatGPT 对话，新版会在后台分页补齐完整目录。加载过程中，已经挂载到页面的深色条目可以直接点击；灰色条目先等待完整目录加载结束。完整目录完成后，点击尚未挂载的远距离历史条目会启动渐进式正文定位，逐步加载并寻找目标。

## 3. 目录和书签不是同一个东西

目录负责回答“内容在哪里”，Bookmark 负责回答“什么值得以后回来”。

一级 turn 和 AI 二级标题都可以留下 Bookmark。之后打开 **Bookmark Filter**，可以把一个 200+ 轮的完整目录缩成你真正标记的重要部分。

## 4. 用 Highlight、Underline 和 Note 精读

Bookmark 适合标记重要位置；Highlight / Underline 适合标记正文里的具体文字；Note 适合加入自己的解释、问题或下一步想法。

一个实用组合是：**Bookmark 重要回答 → Highlight 关键句 → 写 Note → 以后 Filter 回来复习。**

## 5. 导出 Markdown 还是 HTML？

如果你想继续编辑、进入 PKM、Git 或文本工作流，优先使用 **Markdown**。

如果你想长期保存一个可以直接用浏览器打开、保留目录和标注结构的知识页，优先使用 **离线 HTML**。普通无额外资源的 conversation 可以生成单个 `.html` 文件；需要保存外部资源时，Outlinesave 可能把 HTML 与资源一起打包以避免内容丢失。

Bookmark Filter 还可以参与导出范围：你既可以保存完整 conversation，也可以先筛选 Bookmark，再导出更聚焦的重要一级 turns。

## 6. Outlinesave 不见了怎么办？

页面工具可以理解为：

**隐藏 → Edge Button → Quick Toolbar → Full Outline**

如果只是折叠到边缘，点击 Edge Button 即可恢复 Quick Toolbar；如果在扩展 Popup 中彻底关闭了浮动工具栏，则需要重新打开 Popup 开启它。

## 7. 隐私方面需要知道什么？

Outlinesave 采用 local-first 设计，不要求注册 Outlinesave 用户账号，也不会为了普通目录、标注和本地导出而把你的 AI conversation 上传到 Outlinesave 的聊天存储服务器。

只有当你主动使用 Google Drive 等外部服务时，才会连接你明确选择的目标服务。

从 3.7.3 起，Outlinesave 还使用**最小化的匿名产品计数**来了解安装、卸载、HTML 导出和支付弹窗打开等关键漏斗。统计不会发送对话正文、问题/回答、标题、页面 URL、搜索词、高亮、备注、书签、导出内容或文件名，也不读取 Google/Chrome 账号信息。HTML 导出计数表示已经生成文件并触发浏览器下载，不代表操作系统最终写盘成功；购买数量来自既有的已验证支付记录，不与本地安装标识关联。

## 常见问题

### Outlinesave 只是 ChatGPT 目录插件吗？

不是。目录是入口，完整工作流还包括 Bookmark、Highlight、Note、Search / Filter，以及 Markdown 和离线 HTML 保存。

### ChatGPT 对话太长，旧回答跳不过去怎么办？

超长 conversation 的旧内容可能尚未挂载到当前页面。目录加载阶段先等待灰色条目完成全量发现；完整目录完成后，点击远距离条目会自动逐步加载正文并定位。

### 我只想保存重要回答怎么办？

先给重要 turn 或二级标题加 Bookmark，再打开 Bookmark Filter 后导出。聚焦导出最终以对应的一级 conversation turn 为单位保留上下文。

### HTML 和 Markdown 应该选哪个？

**继续编辑选 Markdown；长期离线阅读、保留更丰富结构选 HTML。**

## 8. 遇到问题怎么反馈？

打开浏览器工具栏里的 Outlinesave Popup，底部依次提供 **详细教程 / BUG 反馈 / 重播初始引导**。BUG 反馈会打开独立反馈页，并自动附带扩展版本；你可以填写问题描述，并可选上传截图和邮箱。

反馈页不会自动读取或上传你的 AI 对话正文、当前对话链接或页面截图。截图只在你主动选择时提交；邮箱仅用于反馈跟进。

## 下一步

根据自己的问题继续阅读长对话导航、ChatGPT 书签、Markdown 导出和离线 HTML 专题即可，不需要一次学完所有功能。

*Outlinesave is developed by Wisteria Software.*
