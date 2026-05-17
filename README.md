# Wisteria Blog 使用与接手指南

这是 Wisteria Software 的博客项目，用来发布和维护 AI 对话工作流、ChatGPT / Gemini、Outline、Inbox、本地优先归档、Markdown 导出等相关内容。

网站使用 [Hexo](https://hexo.io/) 生成静态页面，使用 [NexT](https://theme-next.js.org/) 主题，通过 GitHub Pages 自动部署。

线上地址：

- 博客：<https://blog.wisteriasoftware.uk>
- 官网：<https://wisteriasoftware.uk>

## 这是什么项目

你可以把它理解成一个“用 Markdown 写文章的网站”：

1. 文章写在 `source/_posts/` 下面。
2. 图片放在 `source/images/` 下面。
3. 配置写在 `_config.yml` 和 `_config.next.yml`。
4. 样式写在 `source/_data/styles.styl`。
5. 本地运行 `npm run server` 可以预览。
6. 推送到 GitHub 的 `main` 分支后，GitHub Pages 会自动构建并发布。

这个项目没有后台、没有数据库、没有 CMS。所有内容都在本地文件里。

## 第一次接手怎么跑起来

先确认电脑里已经安装了 Node.js。建议使用 Node.js 20 或更新版本。

```bash
node -v
npm -v
```

进入项目目录：

```bash
cd /Users/wufengyu/Projects/wisteria-tech-docs
```

安装依赖：

```bash
npm install
```

启动本地预览：

```bash
npm run server
```

浏览器打开：

```text
http://localhost:4000/
```

如果 4000 端口被占用，可以换一个端口：

```bash
npm run server -- --port 4001
```

生成静态网站：

```bash
npm run build
```

清理缓存并重新生成：

```bash
npm run clean
npm run build
```

如果你改了主题 CSS 或配置，但页面看起来没有变化，优先执行 `npm run clean && npm run build`。Hexo 有缓存，单独 `npm run build` 有时不会重新生成所有 CSS。

## 常用命令

```bash
# 安装依赖
npm install

# 本地预览
npm run server

# 新建文章
npm run new -- "文章标题"

# 生成静态文件
npm run build

# 清理缓存
npm run clean

# 清理后重新生成
npm run clean && npm run build
```

## 项目目录说明

```text
.
├── _config.yml                    # Hexo 主配置：站点名、域名、文章 URL、语法高亮等
├── _config.next.yml               # NexT 主题配置：侧栏、菜单、暗色模式、搜索等
├── package.json                   # npm 命令和依赖
├── README.md                      # 当前接手指南
├── scripts/
│   └── helpers.js                 # 自定义 Hexo helper，例如侧栏近期文章
├── _templates/
│   └── sidebar-recent-posts.njk   # 自定义侧栏模板
├── source/
│   ├── _data/
│   │   ├── body-end.njk           # 页面底部注入脚本：UI 中英文切换逻辑
│   │   ├── header.njk             # 头部注入内容：中英文切换按钮
│   │   └── styles.styl            # 自定义主题样式，UI 主要改这里
│   ├── _posts/                    # 所有博客文章
│   │   ├── zh/                    # 中文 SEO / AEO 文章
│   │   ├── en/                    # 英文文章
│   │   ├── outline/               # Outline 产品文档
│   │   ├── inbox/                 # Inbox 产品文档
│   │   ├── license/               # 授权、激活、FAQ
│   │   ├── dev-notes/             # 开发笔记
│   │   └── changelog/             # 更新日志
│   ├── images/                    # 图片资源
│   │   ├── outline/
│   │   ├── inbox/
│   │   ├── license/
│   │   ├── dev-notes/
│   │   ├── products/
│   │   └── tutorials/
│   ├── about/index.md             # 关于页
│   ├── categories/index.md        # 分类页
│   └── tags/index.md              # 标签页
└── .github/workflows/pages.yml    # GitHub Pages 自动部署流程
```

## 怎么配置网站

### 站点基础信息

改 `_config.yml`：

```yaml
title: Wisteria Blog
subtitle: 'AI 对话整理、导出与本地知识管理'
description: 'Wisteria Software 的 AI 对话工作流博客...'
keywords: [Wisteria, Wisteria Blog, ChatGPT, Gemini, Outline, Inbox]
author: Wisteria Software
language: zh-CN
url: https://blog.wisteriasoftware.uk
```

常见要改的地方：

- `title`：浏览器标题、站点标题、SEO 标题的一部分。
- `subtitle`：侧栏品牌区下方的小字。
- `description`：首页和 SEO 描述。
- `keywords`：站点关键词。
- `url`：线上域名。
- `permalink`：文章 URL 结构。目前是 `:category/:title/`。

### 主题、菜单和侧栏

改 `_config.next.yml`：

```yaml
scheme: Pisces
darkmode: true

menu:
  home: / || fa fa-home
  categories: /categories/ || fa fa-th
  tags: /tags/ || fa fa-tags
  archives: /archives/ || fa fa-archive
  about: /about/ || fa fa-user
```

常见要改的地方：

- `menu`：顶部/侧栏菜单。
- `sidebar`：侧栏显示方式。
- `toc`：文章目录。
- `local_search`：本地搜索。
- `theme_color`：浏览器地址栏颜色。
- `darkmode`：是否跟随系统暗色模式。

### UI 样式

主要改：

```text
source/_data/styles.styl
```

这里覆盖 NexT 主题样式，包括：

- 品牌区
- 侧栏
- 文章列表
- 文章正文
- 暗色模式颜色
- 链接、代码块、表格、分页、返回顶部按钮

如果样式改了没生效，运行：

```bash
npm run clean && npm run build
```

然后重新启动本地预览。

### 中英文 UI 切换

当前网站支持“只切换 UI，不切换文章正文”的中英文切换。

它会影响：

- 导航菜单：首页、分类、标签、归档、关于、搜索
- 侧栏标签：文章目录、站点概览、日志、分类、标签、近期文章
- 站点副标题和站点描述
- 搜索框 placeholder
- 文章元信息里的“发表于 / 更新于 / 分类于”
- 返回顶部、搜索按钮等 aria-label

它不会影响：

- 博客文章标题
- 博客文章正文
- 最近文章列表里的文章标题
- URL 路径
- 分类和标签本身

相关文件：

```text
source/_data/header.njk       # 语言切换按钮
source/_data/body-end.njk     # 自动识别浏览器语言和切换 UI 文案
source/_data/styles.styl      # 按钮样式
_config.next.yml              # custom_file_path 注入配置
```

自动适配逻辑：

1. 如果用户点过语言按钮，优先使用上次选择，并保存在浏览器 `localStorage`。
2. 如果用户没有选择过，根据浏览器语言判断。
3. 浏览器语言以 `zh` 开头时显示中文 UI，否则显示英文 UI。

如果要改翻译文案，修改：

```text
source/_data/body-end.njk
```

找到 `dictionary` 里的 `zh-CN` 和 `en` 两组文本即可。

## 怎么写一篇新博客

如果你完全不熟 Hexo，可以先记住一句话：**本地写博客就是新建一个 Markdown 文件，写完后用 `npm run server` 在浏览器预览，确认没问题再提交推送。**

最常用的本地写作流程是：

```bash
# 1. 进入项目
cd /Users/wufengyu/Projects/wisteria-tech-docs

# 2. 拉取最新代码，避免在旧版本上写
git pull origin main

# 3. 启动本地预览
npm run server
```

然后打开浏览器：

```text
http://localhost:4000/
```

接下来就可以在编辑器里写 Markdown。每保存一次文件，刷新浏览器就能看到新内容。

### 方法一：用命令创建

```bash
npm run new -- "my-new-post"
```

Hexo 会在 `source/_posts/` 下生成一个 Markdown 文件。

### 方法二：手动创建

你也可以直接新建文件，例如：

```text
source/_posts/zh/how-to-use-chatgpt-outline.md
```

文件开头必须有 frontmatter：

```markdown
---
title: 如何使用 ChatGPT 对话目录快速定位关键回答
date: 2026-05-19 16:00:00
categories:
  - 产品文档
tags:
  - ChatGPT
  - 大纲
  - 长对话
  - Markdown
lang: zh-CN
---

这里开始写正文。
```

字段说明：

- `title`：文章标题。
- `date`：发布时间，格式建议 `YYYY-MM-DD HH:mm:ss`。
- `categories`：分类。会影响 URL，因为当前 permalink 是 `:category/:title/`。
- `tags`：标签，可以多个。
- `lang`：语言，中文写 `zh-CN`。

### 本地写博客的完整步骤

假设你要写一篇中文文章，标题是：

```text
ChatGPT 长对话怎么导出为 Markdown
```

你可以这样做：

1. 在 `source/_posts/zh/` 下面新建一个 Markdown 文件。

```text
source/_posts/zh/export-chatgpt-long-conversation-to-markdown.md
```

2. 写 frontmatter。

```markdown
---
title: ChatGPT 长对话怎么导出为 Markdown？
date: 2026-05-19 16:00:00
categories:
  - 产品文档
tags:
  - ChatGPT
  - Markdown
  - 导出
  - 长对话
lang: zh-CN
---
```

3. 在 frontmatter 下面写正文。

```markdown
ChatGPT 长对话可以通过结构化导出工具保存为 Markdown。相比复制粘贴，Markdown 更适合长期归档、搜索和再次编辑。

## 为什么需要导出

这里写原因。

## 具体步骤

1. 打开 ChatGPT 对话。
2. 打开 Outline 侧边栏。
3. 标记重点回答。
4. 导出 Markdown。

## FAQ

**ChatGPT 官方支持 Markdown 导出吗？**
默认不支持针对单场长对话的结构化 Markdown 导出。
```

4. 回到浏览器刷新 `http://localhost:4000/`。

如果文章没有出现在首页，先检查：

- `date` 是不是未来时间。
- 文件是不是放在 `source/_posts/` 下面。
- frontmatter 的 `---` 有没有漏写。
- 本地服务有没有报错。

5. 写完后运行构建检查。

```bash
npm run build
```

6. 如果构建通过，再提交。

```bash
git status
git add source/_posts/zh/export-chatgpt-long-conversation-to-markdown.md
git commit -m "Add post about exporting ChatGPT conversations"
git push origin main
```

## 怎么写英文博客

英文博客和中文博客的流程基本一样，但有几个关键区别：文件放 `source/_posts/en/`，frontmatter 用英文，`lang` 写 `en`。

### 文件位置

英文文章必须放在：

```text
source/_posts/en/
```

不是 `source/_posts/zh/`，也不是 `source/_posts/` 根目录。放错位置 Hexo 不会生成正确的 URL。

### Frontmatter 格式

英文文章的 frontmatter 和中文文章写法一致，但字段值要用英文：

```markdown
---
title: "How to Export ChatGPT Conversations to Markdown"
date: 2026-05-19 10:00:00
categories:
  - Product Docs
tags:
  - Markdown
  - export
  - ChatGPT
  - archiving
lang: en
---
```

和中英文前端的区别：

| 字段 | 中文 | 英文 |
|---|---|---|
| `title` | 中文标题 | 英文标题 |
| `categories` | 产品文档 | Product Docs |
| `tags` | 中文标签 | 英文小写标签，多个词用连字符（如 `long-conversation`） |
| `lang` | zh-CN | en |

**重要：** `lang: en` 必须写，否则 Hexo 会把文章当成中文处理，URL 和页面渲染都会出问题。

### 标签命名规范

英文标签建议用全小写，多个词用连字符连接：

推荐：

```yaml
tags:
  - long-conversation
  - Markdown
  - knowledge-management
  - local-first
```

不推荐：

```yaml
tags:
  - Long Conversation
  - markdown
  - Knowledge Management
  - local_first
```

保持标签写法前后一致，否则 Hexo 会生成两个不同标签页。

### 文章结构建议

为了 SEO 和 AEO（AI 引擎优化），英文文章建议使用以下结构：

```markdown
---
title: "How to Do Something in ChatGPT"
date: 2026-05-19 10:00:00
categories:
  - Product Docs
tags:
  - ChatGPT
  - productivity
  - guide
lang: en
---

**Meta Description:** A one-sentence summary of what this article teaches.

---

## Quick Answer

直接回答问题。一两段就够了。不要绕弯子。

## Why This Matters

解释这是一个什么痛点和为什么值得解决。

## Step-by-Step Guide

### Step 1: xxx

文字说明。

### Step 2: xxx

文字说明。

## Comparison (可选)

| Method | Speed | Ease |
|---|---|---|
| Method A | Fast | Easy |
| Method B | Slow | Hard |

## FAQ

**Question one?**
Direct answer.

**Question two?**
Direct answer.

## Final Thoughts

总结 + 自然提到相关产品 + CTA 链接。
```

这套结构和 `source/_posts/en/` 里已有的 20 篇文章一致，可以参考仿写。

### 已有文章参考

当前 `source/_posts/en/` 目录下有以下文章可以直接作为示例：

- `01-how-to-navigate-long-chatgpt-conversations-without-endless-scrolling.md`
- `03-how-to-export-chatgpt-conversations-to-markdown.md`
- `05-how-to-bookmark-important-chatgpt-answers.md`
- `11-how-to-organize-long-gemini-conversations.md`
- `14-chatgpt-gemini-outline-export-review.md`
- `18-how-to-build-a-local-first-ai-knowledge-base.md`

想写新文章时，可以打开其中一篇查看 frontmatter 和正文结构，直接复制格式。

### 完整发布流程（英文文章）

假设新文章放在：

```text
source/_posts/en/my-new-english-post.md
```

发布步骤：

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 本地预览（确认文章格式和效果）
npm run server

# 3. 构建检查
npm run build

# 4. 查看改动
git status

# 5. 提交
git add source/_posts/en/my-new-english-post.md
git commit -m "Add English post: My New English Post"

# 6. 如果有新图片也一起提交
git add source/images/tutorials/my-new-english-post/
git commit -m "Add images for English post"

# 7. 推送到 GitHub
git push origin main
```

推送后 GitHub Actions 会自动构建并部署到 <https://blog.wisteriasoftware.uk>。

### 英文文章发布检查清单

- [ ] 文件在 `source/_posts/en/` 下
- [ ] `title` 是英文
- [ ] `date` 格式正确（`YYYY-MM-DD HH:mm:ss`）
- [ ] `categories` 写的是 `Product Docs`（或对应英文分类）
- [ ] `tags` 全是英文小写，多词用连字符
- [ ] `lang: en` 已写
- [ ] frontmatter 的 `---` 上下对齐，没有多余空格
- [ ] 正文有 `Quick Answer` / `Why This Matters` / `Step-by-Step Guide` / `FAQ` / `Final Thoughts`
- [ ] CTA 链接指向 Chrome Web Store 和 wisteriasoftware.uk
- [ ] 本地 `npm run build` 通过
- [ ] 本地预览 `http://localhost:4000/` 能正常显示
- [ ] `git push origin main` 成功后等 GitHub Actions 变绿

### 中英文文章同发策略

如果同一主题需要中英文两篇：

1. 分别放在 `source/_posts/zh/` 和 `source/_posts/en/`。
2. 文件名不需要一致，但建议保持相似以便查找。
3. 两篇文章互相独立，不互相翻译。英文用英文搜索关键词，中文用中文搜索关键词。
4. 可以同时在两个文件里添加内部链接互相引用（用 `https://blog.wisteriasoftware.uk/...` 完整 URL），方便用户切换语言。
5. 单独提交，一次只推一篇或一批同类文章，不要中英混合大批量提交。

### 本地写作时推荐打开两个终端

第一个终端专门跑预览服务：

```bash
npm run server
```

第二个终端用来检查、提交和推送：

```bash
git status
npm run build
git add ...
git commit -m "..."
git push origin main
```

这样写文章时不用反复停止和启动服务。

### 推荐文章结构

为了 SEO 和 AEO，建议每篇文章使用这个结构：

```markdown
---
title: 用户会搜索的问题型标题
date: 2026-05-19 16:00:00
categories:
  - 产品文档
tags:
  - ChatGPT
  - Gemini
lang: zh-CN
---

第一段直接回答问题。不要绕弯子。

## 为什么这是一个问题

解释用户痛点。

## 解决方法

给出清晰方案。

## 具体步骤

1. 第一步
2. 第二步
3. 第三步

## 适合哪些人

说明使用场景。

## FAQ

**问题一？**
直接回答。

**问题二？**
直接回答。
```

## 怎么写带图片的博客

带图片有两种推荐方式。最简单、最稳定的是使用 `source/images/`。

### 推荐方式：把图片放到 source/images

比如你要写一篇文章：

```text
source/_posts/zh/chatgpt-outline-guide.md
```

建议给图片建一个单独目录：

```text
source/images/tutorials/chatgpt-outline-guide/
```

把图片放进去：

```text
source/images/tutorials/chatgpt-outline-guide/outline-sidebar.png
source/images/tutorials/chatgpt-outline-guide/export-markdown.png
```

在 Markdown 里这样引用：

```markdown
![ChatGPT 对话目录侧边栏](/images/tutorials/chatgpt-outline-guide/outline-sidebar.png)

![导出 Markdown 的按钮](/images/tutorials/chatgpt-outline-guide/export-markdown.png)
```

注意：

- 路径要以 `/images/` 开头。
- 不要写 `source/images/...`。
- 文件名尽量用英文小写和短横线，比如 `outline-sidebar.png`。
- 图片 alt 文本要写清楚，有利于 SEO 和可访问性。

### 图片命名建议

推荐：

```text
outline-sidebar.png
chatgpt-bookmark-panel.png
export-markdown-dialog.png
inbox-import-result.png
```

不推荐：

```text
截图 2026-05-19 下午3.22.11.png
image.png
1.png
```

### 图片尺寸建议

- 文章内截图：宽度 1200px 到 1600px 通常够用。
- 文件格式：优先用 `.png` 或 `.webp`。
- 如果是照片或大图，可以用 `.jpg`。
- 图片不要太大，单张最好控制在 1MB 以内。

### 带图片文章示例

```markdown
---
title: 如何用 ChatGPT Gemini Outline & Export 导出重点回答
date: 2026-05-19 16:00:00
categories:
  - 产品文档
tags:
  - ChatGPT
  - Markdown
  - 导出
lang: zh-CN
---

ChatGPT Gemini Outline & Export 可以把长对话中的重点回答导出为 Markdown。你可以先标记关键问答，再只导出已标记内容。

## 第一步：打开侧边栏目录

![ChatGPT 对话目录侧边栏](/images/tutorials/export-key-answers/outline-sidebar.png)

## 第二步：标记重点回答

![标记重点回答](/images/tutorials/export-key-answers/bookmark-answer.png)

## 第三步：导出 Markdown

![导出 Markdown](/images/tutorials/export-key-answers/export-markdown.png)
```

### 图文混排怎么写

图文混排就是：先写一段解释，再放一张图，然后继续解释这张图里应该看哪里。

最推荐的写法是：

```markdown
## 第一步：打开 ChatGPT 对话

先打开你想整理的 ChatGPT 长对话。对话越长，目录的价值越明显。

![打开 ChatGPT 长对话](/images/tutorials/chatgpt-outline-guide/open-chatgpt-thread.png)

上图中需要注意右侧区域。安装扩展后，页面会出现 Outline 侧边栏。

## 第二步：查看自动生成的目录

目录会按照对话顺序列出你的关键提问。点击任意一项，可以直接跳转到对应回答。

![自动生成的对话目录](/images/tutorials/chatgpt-outline-guide/outline-sidebar.png)

如果一场对话超过几十轮，建议先通过目录快速扫一遍结构，再决定哪些内容值得保存。

## 第三步：标记重点回答

找到重要回答后，可以先标记，再导出。这样导出的 Markdown 会更干净。

![标记重点回答](/images/tutorials/chatgpt-outline-guide/bookmark-answer.png)
```

写图文混排时注意：

- 每张图前面先说“这张图要表达什么”。
- 每张图后面补一句“用户应该看哪里”。
- 不要连续堆很多图，中间要有文字解释。
- 图片 alt 文本不要写“图片1”，要写具体内容。
- 一篇教程文章建议 3 到 8 张图，不要太少，也不要像相册。

### 图文混排目录建议

如果是一篇产品教程，可以用这个结构：

```markdown
---
title: 如何用 ChatGPT Gemini Outline & Export 整理长对话
date: 2026-05-19 16:00:00
categories:
  - 产品文档
tags:
  - ChatGPT
  - 大纲
  - 教程
lang: zh-CN
---

第一段直接说明这篇教程能帮用户完成什么。

## 准备工作

说明需要安装什么、打开什么页面。

![准备工作截图](/images/tutorials/example/setup.png)

## 第一步：打开长对话

文字说明。

![打开长对话](/images/tutorials/example/open-thread.png)

## 第二步：使用目录跳转

文字说明。

![使用目录跳转](/images/tutorials/example/use-outline.png)

## 第三步：标记重点

文字说明。

![标记重点](/images/tutorials/example/bookmark.png)

## 第四步：导出 Markdown

文字说明。

![导出 Markdown](/images/tutorials/example/export.png)

## 常见问题

**问题一？**
回答。
```

### 图片放置和引用完整例子

假设文章文件是：

```text
source/_posts/zh/how-to-use-outline-export.md
```

图片目录建议是：

```text
source/images/tutorials/how-to-use-outline-export/
```

图片文件：

```text
source/images/tutorials/how-to-use-outline-export/open-chatgpt.png
source/images/tutorials/how-to-use-outline-export/outline-sidebar.png
source/images/tutorials/how-to-use-outline-export/export-markdown.png
```

文章里引用：

```markdown
![打开 ChatGPT 长对话](/images/tutorials/how-to-use-outline-export/open-chatgpt.png)

![Outline 侧边栏目录](/images/tutorials/how-to-use-outline-export/outline-sidebar.png)

![导出 Markdown 文件](/images/tutorials/how-to-use-outline-export/export-markdown.png)
```

## 怎么发布博客

完整流程如下：

1. 新建或修改 Markdown 文件。
2. 如果有图片，把图片放到 `source/images/...`。
3. 本地启动预览。
4. 浏览器检查页面效果。
5. 构建确认没有报错。
6. 提交 Git。
7. 推送到 GitHub。
8. 等 GitHub Pages 自动部署。

命令示例：

```bash
# 1. 本地预览
npm run server

# 2. 另开一个终端，构建检查
npm run build

# 3. 查看改动
git status
git diff --stat

# 4. 提交
git add source/_posts/zh/your-post.md source/images/tutorials/your-post/
git commit -m "Add blog post about your topic"

# 5. 推送
git push origin main
```

推送后，GitHub Actions 会自动运行 `.github/workflows/pages.yml`：

1. 安装依赖。
2. 执行 `npx hexo clean`。
3. 执行 `npx hexo generate`。
4. 把 `public/` 发布到 GitHub Pages。

几分钟后，线上网站会更新。

## 如何检查部署是否成功

进入 GitHub 仓库：

```text
https://github.com/sunny314woo/wisteria-tech-docs
```

查看：

```text
Actions -> Deploy to GitHub Pages
```

如果绿色通过，说明部署成功。

如果失败，点进去看失败日志。常见问题：

- Markdown frontmatter 写错。
- YAML 缩进错误。
- 依赖安装失败。
- 某个文件路径大小写不一致。

## 常见问题

### 改了 CSS 为什么没变化

先清缓存：

```bash
npm run clean && npm run build
```

再重启本地服务：

```bash
npm run server
```

### 图片本地能看到，线上看不到

检查这几件事：

1. 图片是否放在 `source/images/` 下。
2. Markdown 路径是否以 `/images/` 开头。
3. 文件名大小写是否完全一致。
4. 图片是否已经 `git add` 并提交。

Linux 上部署是大小写敏感的。`Logo.png` 和 `logo.png` 是两个不同文件。

### 文章 URL 为什么是中文分类

当前 `_config.yml` 里是：

```yaml
permalink: :category/:title/
```

所以文章 URL 会包含分类和标题。如果文章分类是 `产品文档`，线上 URL 里就会出现：

```text
/产品文档/zh/...
```

这是当前项目的正常行为。如果想改 URL 结构，需要谨慎，因为会影响已有文章链接。

### 怎么删除一篇文章

删除对应 Markdown 文件即可：

```text
source/_posts/zh/some-post.md
```

然后运行：

```bash
npm run clean && npm run build
```

确认没问题后提交并推送。

### 怎么改首页侧栏的近期文章

相关文件：

```text
scripts/helpers.js
_templates/sidebar-recent-posts.njk
_config.next.yml
```

`_config.next.yml` 里有：

```yaml
recent_posts:
  enable: true
  title: 近期文章
  count: 20
```

`count` 控制侧栏显示多少篇近期文章。

## 内容写作建议

这个博客的核心主题是：

- ChatGPT / Gemini 长对话导航
- AI 对话目录和大纲
- Markdown 导出
- 本地优先归档
- Inbox 本地知识库
- 隐私友好的 AI 工作流

文章标题建议用用户会搜索的问题，例如：

- ChatGPT 长对话怎么快速定位关键回答？
- 如何把 Gemini 对话导出为 Markdown？
- AI 对话如何本地保存和归档？
- ChatGPT 对话目录插件适合哪些人？

每篇文章开头第一段要直接回答问题。这样更适合 SEO，也更适合被 AI 搜索或问答系统引用。

## 发布前检查清单

发布前快速检查：

- [ ] 文章有 `title`
- [ ] 文章有 `date`
- [ ] 文章有 `categories`
- [ ] 文章有 `tags`
- [ ] 图片路径以 `/images/` 开头
- [ ] 图片文件已经提交到 Git
- [ ] 本地 `npm run build` 通过
- [ ] 本地预览页面正常
- [ ] `git status` 里只有你想提交的文件
- [ ] 推送后 GitHub Actions 通过
