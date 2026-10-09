# P2WLAN Web

P2WLAN 的官方产品网站与文档站，部署于 `https://p2wlan.yhan.fun/`。

## Network Light Path / 网络光路

本地静态站点，默认深色，并提供独立设计的亮色主题。

- 首页使用 SVG + 原生 JavaScript 演示候选交换、NAT 探测与 Direct / Relay 路径，支持阶段选择、精确暂停、原位继续、重播及 Reduced Motion。
- 生成的透明光纤材质与 SVG 动态光束组成品牌视觉，支持轻微透视响应和一次播放；素材来源、透明 WebP 与完整生成 Prompt 见 [IMAGE_ASSETS.md](IMAGE_ASSETS.md)。
- 产品界面使用主仓库 `assets/readme/` 中的四张现有截图，保留原图，明确标注其中演示数据；素材存放在 `public/images/product/`。
- 下载页优先识别当前设备，保留手动平台与架构选择，完整文件名、SHA-256、未签名 IPA 和辅助文件按需展开。
- OpenWrt 原生包按固件版本与包架构单独展开，推荐使用原生安装器自动选择，避免与 Android APK 或普通 Linux 包混用。
- 文档首页按任务导航；正文保留全文搜索、键盘操作、代码复制、章节目录、阅读进度及移动抽屉。
- 更新日志显示实际客户端发布内容与历史版本；客户端与服务端 Release 分开处理。
- 每个 CSS 文件独立封闭自己的层，合并时不跨文件开启或结束 `@layer`。

设计规范见 [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)，验收结果见 [UI_VALIDATION_REPORT.md](UI_VALIDATION_REPORT.md)。

## 架构

- Node.js 22+ 静态站点生成器，无客户端框架运行时。
- `src/data/site.mjs`：站点事实、导航、Release 资产分类与规范化。
- `src/data/docs.json`：15 篇文档的元数据、顺序和分组。
- `src/content/docs/*.html`：文档正文。
- `src/pages/*.mjs`：首页、下载、文档入口和更新页。
- `src/layout.mjs` 与 `src/ui.mjs`：全站 Shell 与共享组件。
- `src/styles/*.css`：按 foundation、components、home、pages、docs 与 responsive 分层的设计系统；构建时合并为单个 CSS。
- `src/client.js`：主题、全文搜索、智能下载、网络演示、截图标签、目录、阅读进度和复制交互。
- `scripts/build.mjs`：生成独立 HTML、搜索索引、sitemap 和构建元数据。

## 本地验证

```bash
npm ci --ignore-scripts
npm run check
npm run preview
```

构建读取 `.cache/release.json` 中的最新正式客户端版本；缓存不存在、无效或早于已验证备用版本时，使用 `src/data/release-fallback.json`。备用数据于 2026-10-09 核对为 v0.1.170，包含 21 个资产的真实文件大小、SHA-256、发布说明和历史记录，其中 10 个为 OpenWrt 原生包。联网环境可先同步最新版：

```bash
npm run sync-release
npm run check
```

发布同步只接受正式客户端 `vX.Y.Z`，不会将独立服务端 `server-vX.Y.Z` 当作客户端。安装与校验文档的 Release token 在构建时更新，旧 Linux GUI 文件名仍可匹配，`.sha256` 辅助文件不会覆盖安装包。

原始 CSS 预算 100KB、客户端 JS 预算 40KB。`npm run check` 包括内容与发布分类回归、静态构建、语义 / SEO / 内部链接及锚点 / 资源预算校验。浏览器验收产物写入被忽略的 `output/playwright/`，无需安装客户端运行时依赖。

## 发布

Pull Request 会同步最新 P2WLAN Release 并运行完整校验。合并到 `main` 后，GitHub Actions 会再次执行内容校验、Release 同步、静态构建与产物校验，然后部署到 GitHub Pages，并对自定义域名执行 HTTPS 冒烟检查。
