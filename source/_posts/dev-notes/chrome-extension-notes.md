---
title: Chrome 插件开发笔记
date: 2026-05-18 10:11:00
description: "Chrome 插件开发笔记，整理 Wisteria Software 在浏览器扩展、后端服务和本地优先知识管理工具开发中的技术实现与工程经验。"
keywords:
  - Chrome 扩展
  - Chrome MV3
  - 开发笔记
permalink: Dev-Notes/dev-notes/chrome-extension-notes/
categories:
  - 开发笔记
tags:
  - Chrome 扩展
  - 开发笔记
  - Chrome MV3
lang: zh-CN
---

## Manifest V3

当前项目使用 Manifest V3。主要变化包括 Service Worker 替代 Background Page，以及声明式 Net Request。

## 消息传递

插件内部使用 chrome.runtime.sendMessage 进行通信，content script 与 service worker 之间通过消息中转。
