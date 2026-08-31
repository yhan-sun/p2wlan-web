# P2WLAN Web

P2WLAN 的官方产品网站与文档站，部署于 `https://p2wlan.yhan.fun/`。

## 架构

- Node.js 静态站点生成器，无客户端框架运行时。
- 首页、下载页、版本页与每篇文档均生成独立 HTML。
- GitHub Actions 构建时同步 `yhan-sun/p2wlan` 最新 Release、资产大小和 SHA-256。
- 原生全文搜索、明暗主题、键盘导航、代码复制和网络路径交互演示。
- 自动生成 sitemap、Open Graph、JSON-LD、PWA manifest 与构建元数据。

## 本地验证

```bash
npm ci
npm run check
npm run preview
```

`npm run sync-release` 需要联网；离线构建会使用经过核对的 Release fallback。

## 发布

合并到 `main` 后，`.github/workflows/deploy.yml` 会运行内容校验、Release 同步、构建与产物校验，再通过 GitHub Pages 部署。工作流也会定时同步最新 Release。
