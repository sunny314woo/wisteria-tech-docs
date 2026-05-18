# Wisteria Tech Docs

Wisteria Software 产品线的技术文档与开发笔记，使用 [Hexo](https://hexo.io/) 构建，[NexT](https://theme-next.js.org/) 主题。

## 本地开发

```bash
# 安装依赖
npm install

# 本地预览（默认 http://localhost:4000）
npm run server

# 新建文章
npm run new -- "文章标题"

# 生成静态文件
npm run build

# 清理缓存
npm run clean
```

## 目录结构

```
source/
├── _posts/            # 文章存放目录
│   ├── outline/       # ChatGPT Gemini Outline & Export 文档
│   ├── inbox/         # Inbox 工具文档
│   ├── license/       # License 与激活说明
│   ├── dev-notes/     # 开发笔记
│   └── changelog/     # 更新日志
├── images/            # 本地图片
├── categories/        # 分类页
├── tags/              # 标签页
└── about/             # 关于页
```

## GitHub Pages 部署

项目已配置 GitHub Actions（`.github/workflows/pages.yml`）。

启用步骤：

1. 将项目推送到 GitHub 仓库
2. 进入仓库 Settings → Pages
3. Source 选择 **GitHub Actions**
4. 推送 `main` 分支后自动触发构建部署

## 自定义域名

后续可通过 Cloudflare 绑定 `docs.wisteriasoftware.uk`：

1. 在 Cloudflare 添加 CNAME 记录，指向 `你的用户名.github.io`
2. 在仓库 Settings → Pages 中填入 `docs.wisteriasoftware.uk`
3. 在 `source/CNAME` 文件中写入 `docs.wisteriasoftware.uk`

## 不做的功能

- 不做 CMS（无后台内容管理）
- 不做登录（无用户认证）
- 不做评论（无第三方评论系统）
- 不做数据库（纯静态站）
- 不做多语言（仅中文）
- 不做动态后台（纯前端静态生成）
