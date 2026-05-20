---
title: MySQL / 原生 SQL 笔记
date: 2026-05-18 10:13:00
permalink: Dev-Notes/dev-notes/mysql-raw-sql-notes/
categories:
  - 开发笔记
tags:
  - 开发笔记
  - MySQL
  - 后端
---

## 常用模式

使用原生 SQL 而非 ORM 的场景包括：复杂报表查询、批量更新、全文检索。

## 注意

始终使用参数化查询防止 SQL 注入。避免在循环中执行 SQL。
