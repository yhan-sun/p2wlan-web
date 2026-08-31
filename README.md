# P2WLAN Web

P2WLAN 的官方产品网站与文档站，部署于 `https://p2wlan.yhan.fun/`。

## V3：Quiet Network Infrastructure

V3 从页面结构、品牌语言和组件系统开始重做，而不是继续为旧页面追加局部样式。

- 首页以真实产品状态为首屏，突出虚拟 IP、Direct、Relay 与设备列表。
- Direct、Relay、Offline、Error 与品牌色使用独立语义，避免状态和品牌混用。
- 下载页先回答“应该下载哪个”，完整文件名、大小与 SHA-256 下沉到高级下载区。
- 文档首页改为任务导航；文章页保留全局目录、正文、本页目录、全文搜索和阅读进度。
- 更新页明确区分当前 Release、发布资产与主分支开发状态。
- Light / Dark、桌面 / 平板 / 移动端使用同一套布局、边界、圆角与排版规则。

## 架构

- Node.js 22+ 静态站点生成器，无客户端框架运行时。
- `src/data/site.mjs`：站点事实、导航、Release 资产分类与规范化。
- `src/data/docs.json`：15 篇文档的元数据、顺序和分组。
- `src/content/docs/*.html`：文档正文。
- `src/pages/*.mjs`：首页、下载、文档入口和更新页。
- `src/layout.mjs` 与 `src/ui.mjs`：全站 Shell 与共享组件。
- `src/styles/*.css`：按 foundation、components、home、pages、docs 与 responsive 分层的设计系统；构建时合并为单个 CSS。
- `src/client.js`：主题、全文搜索、智能下载、目录、阅读进度和复制交互。
- `scripts/build.mjs`：生成独立 HTML、搜索索引、sitemap 和构建元数据。

## 本地验证

```bash
npm ci --ignore-scripts
npm run check
npm run preview
```

构建默认使用 `src/data/release-fallback.json` 中经过核对的 Release 数据。联网环境可先同步最新版：

```bash
npm run sync-release
npm run check
```

## 发布

Pull Request 会同步最新 P2WLAN Release 并运行完整校验。合并到 `main` 后，GitHub Actions 会再次执行内容校验、Release 同步、静态构建与产物校验，然后部署到 GitHub Pages，并对自定义域名执行 HTTPS 冒烟检查。
