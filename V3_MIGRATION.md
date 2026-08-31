# V3 Replacement Guide

该目录是完整的 `p2wlan-web` V3 源码，可直接替换现有仓库工作树；不要复制 `dist/` 或 `.cache/` 到 Git。

```bash
# 在当前 p2wlan-web 仓库中
git switch -c redesign/v3-quiet-network-infrastructure

# 将 V3 源码解压到临时目录后，从源码包根目录执行
rsync -a --delete \
  --exclude '.git/' \
  --exclude 'dist/' \
  --exclude '.cache/' \
  ./ /path/to/p2wlan-web/

cd /path/to/p2wlan-web
npm ci --ignore-scripts
npm run check

git add -A
git commit -m "refactor: rebuild P2WLAN web with unified V3 design system"
git push -u origin redesign/v3-quiet-network-infrastructure
```

建议 PR 人工验收矩阵：

- 首页、下载、文档入口、更新页、任意两篇长文档。
- 1440 / 1024 / 768 / 390。
- Light / Dark / reduced motion。
- 当前平台推荐下载、Release 资产、复制 SHA-256、全文搜索、移动目录、主题持久化。
- Pages 部署后的自定义域名、`release-data.json`、`sitemap.xml` 与 HTTPS 冒烟检查。
