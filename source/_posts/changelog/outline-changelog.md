---
title: Outline 更新日志
date: 2026-05-18 10:14:00
updated: 2026-09-22 08:48:00
description: "Outline 更新日志，记录 Wisteria Software 产品在功能、体验和工作流上的更新，帮助用户了解 ChatGPT Gemini Outline & Export 的近期变化。"
keywords:
  - AI 对话导航
  - ChatGPT Gemini Outline & Export
  - 目录导航
permalink: Changelog/changelog/outline-changelog/
categories:
  - 产品动态
tags:
  - ChatGPT Gemini Outline & Export
  - 目录导航
  - 产品动态
lang: zh-CN
---

## 3.7.3 (2026-09-22)

- 改进 ChatGPT 超长对话的完整目录加载：分页结果持续可见，慢页超时后可缩小批次重试，避免最后少量历史条目长期卡住整个目录。
- 调整目录与跳转状态：加载中深色条目可直接打开，灰色条目等待完整目录完成；完成后可对尚未挂载的远距离历史位置启动渐进式正文定位。
- Popup 新增 BUG 反馈入口，支持中/英/日反馈页、问题描述、可选截图与邮箱；不会自动上传 AI 对话正文、当前对话链接或页面截图。
- 新增最小匿名增长计数，用于安装、卸载、HTML 导出和支付弹窗打开等产品漏斗；不发送聊天内容、页面 URL、标注内容或导出文件名。购买数量沿用已验证支付记录统计，不与安装标识关联。
- 隐私政策同步补充上述最小统计范围。

## 3.7.2 (2026-09-20)

- 新增 BUG 反馈与帮助入口，并完成反馈持久化与邮件通知链路。
- 优化超长目录的加载提示、目录尾部展示和交互状态。

## 1.0.0 (2026-05-18)

- 初始版本发布
- 支持 ChatGPT/Gemini 对话大纲
- 支持书签与高亮
- 支持 Markdown 导出
