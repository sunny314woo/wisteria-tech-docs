---
title: "OutlineSave 工具栏怎么用？ChatGPT 目录、书签、跳转与导出功能说明"
date: 2026-09-17 16:30:00
updated: 2026-09-22 08:47:00
description: "OutlineSave 工具栏怎么用、消失后怎么恢复？了解 Edge Button、Quick Toolbar 和 Full TOC，以及 ChatGPT 目录、书签筛选、上一项/下一项跳转和导出入口。"
keywords:
  - OutlineSave 工具栏怎么用
  - OutlineSave 不见了
  - ChatGPT 目录工具栏
  - ChatGPT Outline
  - ChatGPT 书签筛选
  - OutlineSave Full TOC
permalink: Outline/outline/floating-toolbar-and-full-outline/
categories:
  - 产品指南
tags:
  - OutlineSave
  - ChatGPT Outline
  - 目录导航
lang: zh-CN
---

## OutlineSave 工具栏怎么用？

OutlineSave 在 ChatGPT 页面里有几种显示状态。最容易记的方法是：**隐藏 → Edge Button → Quick Toolbar → Full TOC**。Edge Button 最省空间，Quick Toolbar 提供常用操作，Full TOC 用于查看和导航完整长对话结构。

如果你突然找不到 OutlineSave，通常先判断它是折叠了，还是在扩展 Popup 中被隐藏了。

## Quick Toolbar 有哪些功能？

目前快捷工具栏采用右侧纵向的五类功能控制：**目录、上下导航、下载、搜索、收起**。上下导航包含上一条和下一条。需要仅查看书签时，可使用目录内的 **“仅看书签”**（Bookmarks only）筛选。

它适合在不一直占用侧边空间的情况下快速使用常用功能。

## Full TOC 是什么？在哪里打开？

**Full TOC（Full Table of Contents）是完整目录视图的文档名称，不是按钮标签。** 请点击快捷工具栏中的 **“目录”**（英文 **Outline**）按钮打开目录侧边栏。一级目录以用户问题为主要结构，AI 回答中的标题可以作为二级目录。它适合几十到几百轮的长 conversation：先看结构，再选择目标，而不是不断向上滚动。

完整目录顶部还提供上一项、下一项、导出和书签筛选等操作。关闭 Full TOC 或按 Esc 后，会回到 Quick Toolbar。

## Bookmark Filter 是什么？

目录和书签不是一回事。Outline 展示 conversation 的整体结构；Bookmark 是你主动添加的“这里重要”标记。

使用目录里的“仅看书签”筛选后，可以把完整目录缩小到已标记的重要部分。对于 200+ 轮的对话，这通常比重新浏览整个目录更适合复习。

## 为什么有些长对话不能一次跳到目标？

ChatGPT 超长 conversation 的历史消息不一定全部同时加载在当前页面。OutlineSave 可能已经发现目标位置，但对应内容仍未进入可直接定位状态。

新版把“目录全量发现”和“正文跳转”明确分开：完整目录仍在加载时，深色条目可以直接打开，灰色条目暂时等待；目录完成后，灰色的远距离目标可以触发渐进式正文定位。加载阶段编号仍可能重新校准，完成后再把编号作为稳定顺序。

## OutlineSave 不见了怎么恢复？

如果还能看到 Edge Button，点击它恢复 Quick Toolbar；如果能看到 Quick Toolbar 但没有目录，点击目录按钮打开 Full TOC。

如果页面上完全没有 OutlineSave，请打开浏览器扩展栏中的 OutlineSave Popup，检查 **“显示浮动工具栏”** 是否已关闭（英文 **Show floating toolbar**）。该设置也会隐藏折叠后的 Edge Button。Popup 底部还提供 **详细教程、BUG 反馈、重播初始引导** 三个入口；出现兼容性问题时可以直接从 BUG 反馈提交问题和可选截图。

## 我应该保持哪种状态？

注意：Full TOC 表示目录视图，并不保证数百轮长对话已经全部加载完成。

专心聊天、希望最少占空间时使用 Edge Button；频繁上一项/下一项、Bookmark 或导出时使用 Quick Toolbar；阅读长 conversation 时打开 Full TOC；暂时完全不需要页面工具时才在 Popup 中关闭。

## 常见问题

### Quick Toolbar 和 Full TOC 是同一个东西吗？

不是。Quick Toolbar 是快捷操作入口；Full TOC 是完整 conversation 结构和导航视图。

### 关闭 Full TOC 会把 OutlineSave 关掉吗？

不会。通常会回到 Quick Toolbar。

### “仅看书签”筛选是不是目录按钮？

不是。目录负责“在哪里”，Bookmark 负责“什么重要”。“仅看书签”（Bookmarks only）用于只查看你主动标记的部分。

### ChatGPT 更新后工具栏或导航表现异常怎么办？

OutlineSave 工作在 ChatGPT 的实时网页界面上。如果 ChatGPT 改变渲染、DOM 或加载方式，行为可能暂时变化，直到兼容性更新完成。

参阅：[低打扰使用指南](/Product-Docs/zh/chatgpt-hide-toolbar-sidebar-low-distraction/)。

*OutlineSave is developed by Wisteria Software.*
