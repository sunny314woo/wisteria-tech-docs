---
title: FastAPI 后端开发笔记
date: 2026-05-18 10:12:00
description: "FastAPI 后端开发笔记，整理 Wisteria Software 在浏览器扩展、后端服务和本地优先知识管理工具开发中的技术实现与工程经验。"
keywords:
  - FastAPI
  - 后端
  - 开发笔记
permalink: Dev-Notes/dev-notes/fastapi-backend-notes/
categories:
  - 开发笔记
tags:
  - 开发笔记
  - FastAPI
  - 后端
lang: zh-CN
---

## 项目结构

采用 domain-driven 结构：`routers/`, `services/`, `models/`, `schemas/`。

## 依赖注入

FastAPI 的 Depends 用于管理数据库会话和用户认证状态。
