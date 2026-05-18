---
title: Chrome 插件开发笔记
date: 2026-05-18 10:11:00
categories:
  - Dev Notes
tags:
  - chrome-extension
  - manifest-v3
---

## Manifest V3

当前项目使用 Manifest V3。主要变化包括 Service Worker 替代 Background Page，以及声明式 Net Request。

## 消息传递

插件内部使用 chrome.runtime.sendMessage 进行通信，content script 与 service worker 之间通过消息中转。
