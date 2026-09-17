---
title: "ChatGPT 怎么加书签？用 Outlinesave 标记、筛选和导出重要回答"
date: 2026-05-18 10:02:00
updated: 2026-09-17 19:46:00
description: "ChatGPT 怎么加书签并只看重要回答？Outlinesave 支持给一级对话和 AI 二级标题添加 Bookmark，用 Bookmark Filter 筛选重点，并导出对应的重要轮次。"
keywords:
  - ChatGPT 怎么加书签
  - ChatGPT 书签
  - ChatGPT 收藏重要回答
  - ChatGPT 只导出重要内容
  - Bookmark Filter
  - Outlinesave 书签
permalink: Outline/outline/bookmarks-and-highlights/
categories:
  - 产品指南
tags:
  - Outlinesave
  - 书签
  - Bookmark Filter
  - ChatGPT
lang: zh-CN
---

## ChatGPT 怎么加书签？

可以用 Outlinesave 给 ChatGPT 对话中的**一级 conversation turn 和 AI 回答里的二级标题**添加 Bookmark。书签和目录不是一回事：**目录负责导航整段对话，Bookmark 负责标记真正重要的内容。**之后可以打开 Bookmark Filter 只查看这些重点，并在导出时只保留对应的重要一级轮次。

对于 100、200 甚至更多轮的长对话，这比把整个目录都当成“收藏”更有用。

## Outline 和 Bookmark 有什么区别？

**Outline 回答“在哪里？”**  
**Bookmark 回答“什么重要？”**

一级目录对应用户问题，二级目录对应 AI 回答中的标题。即使没有任何 Bookmark，完整 Outline 仍然负责展示 conversation 的结构。

Bookmark 是你主动加在结构上的重要性标记。

## 一级和二级都能加 Bookmark 吗？

可以。你既可以标记整个一级 turn，也可以只标记 AI 回答里的某个二级标题。

例如一个回答包含“问题分析 / 方案 A / 方案 B / 最终建议 / 示例代码”，如果真正重要的是“最终建议”，可以直接给这个二级标题加 Bookmark。

## Bookmark Filter 有什么用？

打开 Bookmark Filter 后，Outlinesave 会把完整目录切换成更聚焦的书签视图。

例如一个 236-turn conversation 里，你可能只标记了 12 个真正重要的位置。Filter 让你复习这 12 个位置，而不必重新扫描 236 轮。

关闭 Filter 后，完整目录仍然存在，其他内容不会被删除。

## 二级标题加书签后，导出什么？

聚焦导出最终以**一级 conversation turn**为基本单位。如果某个二级标题被标记，它所属的一级 turn 会被纳入 Bookmark 导出范围。

这样可以保留对应问题和 AI 回答的上下文，而不是只抽出一个孤立标题。

所以：**二级 Bookmark 用来精确表达“这一节重要”；导出时保留它所属的完整一级轮次。**

## 可以只导出 Bookmark 的内容吗？

可以。使用：

**Bookmark → Bookmark Filter → Export**

即可生成更聚焦的 Markdown 或离线 HTML。完整导出适合保存整个项目历史；Bookmark-only 聚焦导出适合保存真正需要复习和继续使用的重要 turns。

## 完整 HTML 会保留 Bookmark 吗？

当前 HTML 导出会携带目录以及 turn / heading 的标记状态，用于构建离线知识页。因此完整 HTML 可以继续保留你已经建立的 Bookmark 信息，而不只是保存一份纯聊天正文。

## Bookmark、Highlight、Note 和 Search 怎么选？

Bookmark 标记值得以后返回的位置；Highlight / Underline 标记正文中的具体文字；Note 加入你自己的解释和提醒；Search 用关键词重新找到内容。

一个完整工作流可以是：

**Bookmark 重要回答 → Highlight 关键句 → 写 Note → Bookmark Filter 复习 → Export 保存。**

## 200+ 轮对话应该怎么用？

不要把所有内容都 Bookmark。书签的价值来自选择。

例如 debugging conversation 可以只标记 root cause、final fix、regression test、architecture decision 和 remaining issue。项目阶段结束时，完整 HTML 保存全部历史，再通过 Bookmark Filter 导出一份精炼版本。

## 常见问题

### Bookmark Filter 会删除其他消息吗？

不会，只改变当前筛选视图和相应的聚焦导出范围。

### 二级标题可以加书签吗？

可以。

### 二级 Bookmark 导出时只保留这个标题吗？

不会。它所属的完整一级 turn 会被纳入，以保留上下文。

### 可以只导出重要回答吗？

可以。先 Bookmark，再开启 Bookmark Filter 后导出。

一句话记住：**Outline answers “Where is it?” Bookmark answers “What matters?” Export answers “What do I keep?”**

*Outlinesave is developed by Wisteria Software.*
