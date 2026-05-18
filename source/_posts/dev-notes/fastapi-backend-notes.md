---
title: FastAPI 后端开发笔记
date: 2026-05-18 10:12:00
categories:
  - Dev Notes
tags:
  - fastapi
  - python
  - backend
---

## 项目结构

采用 domain-driven 结构：`routers/`, `services/`, `models/`, `schemas/`。

## 依赖注入

FastAPI 的 Depends 用于管理数据库会话和用户认证状态。
