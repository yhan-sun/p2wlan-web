# P2WLAN 全站 UI/UX 重构验收

基线日期：2026-10-08。完成全站重构，保留 Node.js 静态生成架构。根据后续授权追加精细动效与生成素材；本地验收通过后提交推送。main 推送将触发仓库现有 GitHub Pages 工作流，提交与远端结果记录在任务最终回复。2026-10-09 的 v0.1.170 更新与新增验收记录见文末。

## 核心改造

- 全站使用独立品牌的 Network Light Path：默认深色、独立亮色、浅色主 CTA、自然中文排版及精密细线层次。首页、下载、文档、正文和更新日志共享 Token 与 Shell。
- 首页改为居中品牌主张、连接演示、真实截图标签、Direct / Relay 对照、自托管架构及朴素的下载收尾。淘汰两套模拟客户端界面与捏造的网络指标。
- 四张 WebP 截图逐字节对应主仓库 `assets/readme/`。保持原始像素、注明演示数据，按需加载并保留原图入口；图片宽高与纵横比明确设置。
- 下载以当前设备推荐和平台横向分组组织信息。用户可手动选择七种正式包，完整资产、摘要及未签名 IPA 渐进展开。未知 macOS 芯片、Windows ARM、32 位及不匹配架构不直接推荐包。
- 文档保留全部 15 篇正文与原有路径，改善任务导航、搜索、代码复制、表格、章节链接、目录高亮、阅读进度与移动抽屉。更新日志呈现真实版本时间线。

## 网络演示与 Motion

`src/components/network-demo.mjs` 提供 SVG 路径和语义化节点，`src/client.js` 管理四阶段状态：设备就绪 → 候选交换 → NAT 探测 → Direct 完成。用户可手动选择阶段、精确暂停、原位继续、重播或切换 Relay。文字、节点、路径与可访问描述同步更新；明确标注「交互示意」和 NAT / 防火墙 / Relay 可达性的实际边界。

动画使用 160 / 280 / 560 / 1200ms Token 与 `cubic-bezier(.22,1,.36,1)`。路径通过 stroke-dashoffset 绘制，数据包通过 CSS offset-path 恒速移动，完成态最多两次经过。演示首次进入视口播放一次，离开视口或后台时暂停；重点展示轻微入场，文档段落保持安静。

### 追加动效与素材细节

| Before | After |
| --- | --- |
| Hero 背景只有三条平面 SVG 线 | 内置 image_gen 生成透明玻璃 / 光纤材质，编码为 214,192 bytes 的 WebP，接入首页和连接区域；完整 Prompt 与来源见 IMAGE_ASSETS.md |
| 品牌视觉缺少材质层次 | 同坐标系 SVG 细光 / 宽光受材质 Alpha 蒙版限制，错峰 280ms，约 3.9 秒完成一次播放，支持重播；桌面指针以 0.8° / 1.2° 透视微调，离屏、后台和 Reduced Motion 停止 |
| 数据包反复加减速，形状单薄 | 恒速移动的光点、局部光晕与有限光尾同步通过 SVG 路径 |
| NAT 探测只有半条静态线 | 品牌色虚线与往返一次的探测光点，区别于已建立的 Direct 路径 |
| 路径颜色及状态文案直接替换 | 路径颜色在 280ms 内过渡；标题 / 说明在 240ms 内移动 3px 并淡入，错峰 30ms，快速切换取消旧文案动画 |
| 连接完成缺少轻微确认 | 节点出现一次 560ms 的细外圈反馈，光点最多两次经过，播放控制在整段结束后归位 |
| 暂停只清理阶段计时器 | 暂停路径、光点、光尾、节点反馈与文案的当前时间，消除 pending pause 的一帧滑动，保留阶段与光流剩余时间，原位继续 |
| 重播 / 暂停图标直接销毁替换 | 三种图标保持挂载，以 opacity、scale .25 → 1、blur 4px → 0 在 300ms 内交接；按钮保持固定最小宽度 |
| 截图切换从低透明度闪入 | 目标图完成解码后，旧图在 240ms 内淡出，快速操作清理旧交接；说明区域桌面至少 46px、手机至少 64px |
| Reduced Motion 主要关闭 CSS 动画 | 还清理 Web Animations 文案、截图交接、品牌光束与指针透视；静态完成态及手动操作继续可用 |

Reduced Motion 关闭过渡、数据包和入场动画，默认展示静态完成态，保留阶段与路由操作。移动端使用两列阶段控件和整行路径切换，虚拟 IP 位于设备上方，防止地址与 Relay 节点遮挡。

## Release 与真实内容

全站重构的基线使用 [v0.1.169](https://github.com/yhan-sun/p2wlan/releases/tag/v0.1.169)，`prerelease=false`，发布时间为 2026-10-08 01:26:01 UTC。当时构建数据与 API 的 11 个资产文件名、URL、大小和 SHA-256 全部一致；11 个下载 URL 跟随重定向后的 HEAD 状态均为 200。此段保留历史验收数据，当前版本以文末的追加记录为准。

- Linux GUI 同时支持 `p2wlan-linux-x64.tar.gz` 与旧 `p2wlan-flutter-linux-x64.tar.gz`，`.sha256` 辅助文件不会覆盖 CLI 包。
- 同步仅选择正式客户端 `vX.Y.Z`，与 `server-vX.Y.Z` 分开。缓存缺失、损坏、过旧、草稿、预发布或没有资产时使用已验证 fallback；页面和 release-data.json 使用同一规则。
- 安装及完整性校验文档使用构建期 token，同步真实版本、包名、下载地址及摘要。Linux GUI 归档包含应用文件，命令显式指定解压目录。
- 去掉无条件 Preview 标签，iOS unsigned IPA 仅在高级列表及相关文档如实标注。NAT、TLS、审计及客户端限制以主仓库公开信息为准。
- 更新日志中的上游验证次数来自对应 Release 正文；它们不是本次网站测试产生的性能结果。

## 本地验收

环境：macOS，Node.js v24.14.0，Headless Chrome 153.0.8010.53。未新增网站运行时依赖。

| 检查 | 最终结果 |
| --- | --- |
| `npm ci --ignore-scripts` | 通过；无依赖漏洞报告 |
| `npm run check` | 通过：15 篇内容、资产分类、19 个页面生成及 20 个 HTML 的产物校验 |
| `npm run preview` | 已运行于 http://127.0.0.1:4173 |
| CSS 语法与层 | 8 个源文件分别解析、合并样式解析通过，层独立封闭 |
| CSS / JS 预算 | 80,293 / 100,000 bytes；33,681 / 40,000 bytes |
| 渲染矩阵 | 首页、下载、文档首页、快速开始正文、更新日志 × 6 宽度 × 2 主题 × 2 动态偏好 = 120 组通过 |
| 宽度 | 360 / 390 / 768 / 1024 / 1440 / 1920px |
| 布局及资源 | 未发现页面横向溢出、可见图片失效、JavaScript 异常或控制台错误；代码 / 表格的独立横向滚动符合设计 |
| 功能 | 43 项交互、16 项边界及无脚本退化、15 项平台识别，共 74 项通过 |
| 追加动效回归 | 17 项通过：精确冻结与原位继续、探测往返、快速操作、三宽度光点对齐、离屏暂停、材质 Alpha 光束、透视、有限播放及动态 Reduced Motion |
| 网络阶段布局 | 六种宽度、两套主题、五种阶段 / 路线共 60 组通过，节点与地址无重叠 |
| 文档锚点 | 六种宽度、明暗主题、正常 / Reduced Motion 共 24 组通过，标题与当前章节提示可见 |
| axe-core 4.10.3 | 全部 19 页及网络、搜索、下载、移动菜单 / 目录状态共 116 组，无 WCAG 2 A/AA、2.1 AA 测试集违规；锚点后的 4 组补充审查也通过 |
| 对比度 | 28 组主要文字 / 表面、状态、代码与 CTA Token 组合均 ≥ 4.5:1，最低 4.57:1；工具对伪元素背景保留人工判断项，结合真实截图复核 |
| 发布缓存 | 8 种缓存场景通过，原始已验证缓存逐字节恢复 |
| 预览健壮性 | 5 项通过：暂缺构建返回 503、无效 URL 返回 400、恢复服务、正常 404 与 WebP MIME |
| 外部资产 | 最新版本一致，11 个资产元数据一致，11 个 HEAD 链接成功 |
| `git diff --check` | 通过 |

追加阶段重新执行 24 组首页布局、24 组首页 / 网络状态 axe 检查、60 组网络布局及 74 项功能回归；其余页面沿用先前未改动布局的验证证据。

保留了 60 张关键页面完整截图、12 张首页视口截图、20 张网络阶段截图及 2 张文档锚点视口截图。人工复核桌面与移动代表图，并额外检查 768px 首页、1024px 下载、390px 更新日志及 Direct / Relay 网络图；其余组合通过自动布局与资源检查。

验证中已修复移动抽屉焦点、背景 inert、抽屉搜索的焦点返回、搜索失败重试、空态 ARIA、代码 / 路径区域键盘滚动、说明链接辨识、移动地址遮挡、章节跳转间距及预览文件读取错误。没有已知阻塞问题。

## 证据与验证范围

本地证据位于被 Git 忽略的 `output/playwright/`：

- `visual-check.json`：120 组最终布局 / 资源结果；`home-visual-check.json`：首页最终迭代。
- `final-functional-check.json`：74 项交互与设备识别结果；`motion-polish-check.json`：17 项新增动效回归。
- `a11y-check.json`、`final-home-a11y.json`、`doc-anchor-check.json`、`token-contrast-check.json`：语义、阶段边界、章节跳转与 Token 对比度。
- `release-links-check.json`、`release-cache-check.log`、`preview-check.log`、`build-check.log`：Release、缓存、服务与构建。
- `home-*-*-viewport.png`、`*-full.png`、`network-*.png`、`article-anchor-*.png`：实际渲染截图。

本次浏览器验收使用 Chromium 视口模拟和键盘操作。Safari / Firefox、实体移动浏览器、VoiceOver / NVDA、客户端实际安装与真实 NAT 网络未验证。下载文件未逐个落盘重算 SHA-256，摘要已与 GitHub API 核对。自动化检查不能代替这些环境的实际验收。工作流文件保持原状，main 推送会触发线上运行与部署。

## 修改文件列表

共 47 个文件，包含 4 个原始 WebP 截图及 1 个生成的透明 WebP 品牌素材。构建产物与浏览器证据均被忽略。

| 文件 | 修改用途 |
| --- | --- |
| `.gitignore` | 忽略本地浏览器截图与工具日志 |
| `DESIGN.md` | 新增视觉方向、组件与交互上下文 |
| `DESIGN_SYSTEM.md` | 重建颜色、排版、空间、Motion 与工程规范 |
| `IMAGE_ASSETS.md` | 生成素材、完整 Prompt、模式与动态接入说明 |
| `PRODUCT.md` | 新增用户、产品定位、成功路径与边界背景 |
| `README.md` | 更新网站结构、真实素材、同步规则与验证方式 |
| `UI_VALIDATION_REPORT.md` | 本次修改与验收记录 |
| `package.json` | 将资产分类回归纳入标准 check |
| `public/images/brand/network-light-path-v1.webp` | 内置 image_gen 生成的透明品牌材质 |
| `public/images/product/screenshot-devices.webp` | 主仓库真实截图，按原始字节复制 |
| `public/images/product/screenshot-home.webp` | 主仓库真实截图，按原始字节复制 |
| `public/images/product/screenshot-room.webp` | 主仓库真实截图，按原始字节复制 |
| `public/images/product/screenshot-rooms.webp` | 主仓库真实截图，按原始字节复制 |
| `scripts/build.mjs` | 统一 Release 加载、文档 token 和可访问滚动区域 |
| `scripts/serve.mjs` | WebP MIME；重建缺文件及无效 URL 的错误处理 |
| `scripts/sync-release.mjs` | 同步正式客户端、全部资产、发布正文及历史 |
| `scripts/validate-dist.mjs` | 校验站内路径与页内锚点 |
| `scripts/validate-release-rules.mjs` | 新增新旧包名、校验辅助文件及标签分类回归 |
| `scripts/write-release-data.mjs` | 与页面构建共享版本来源和发布状态 |
| `src/client.js` | 重构搜索、主题、推荐下载、网络演示、复制与导航 |
| `src/components/network-demo.mjs` | 新增语义化 SVG 交互网络示意 |
| `src/components/optical-scene.mjs` | 生成材质与 Alpha 蒙版动态光束的同坐标系组件 |
| `src/content/docs/cli.html` | 动态版本示例 |
| `src/content/docs/faq.html` | 清理无条件 Preview 判断 |
| `src/content/docs/getting-started.html` | 动态下载版本与真实安全边界 |
| `src/content/docs/install.html` | 真实资产表、当前包名与 Linux GUI 解压目录 |
| `src/content/docs/networking.html` | 为移动连接路径示意增加键盘滚动 |
| `src/content/docs/release-verification.html` | 动态 SHA-256 表与包名 |
| `src/content/docs/security.html` | 修订审计及默认控制面安全说明 |
| `src/data/docs.json` | 更新平台与安全描述，清理过时搜索关键词 |
| `src/data/load-release.mjs` | 新增缓存选择与已验证 fallback 共用规则 |
| `src/data/release-fallback.json` | 更新 v0.1.169、11 个真实资产和三条历史发布 |
| `src/data/site.mjs` | 完整包名匹配、平台架构与辅助资产分类 |
| `src/layout.mjs` | 统一 Shell、SEO、搜索、移动目录和文档三栏 |
| `src/pages/changelog.mjs` | 真实发布日期、改进与边界的版本时间线 |
| `src/pages/docs-index.mjs` | 按任务导航与简洁的快速开始入口 |
| `src/pages/download.mjs` | 当前设备推荐、平台分组和渐进资产详情 |
| `src/pages/home.mjs` | 居中 Hero、真实截图、路径对照与自托管结构 |
| `src/styles/00-foundation.css` | 重写独立封闭的 CSS 层，支持明暗主题与响应式 |
| `src/styles/10-components.css` | 重写独立封闭的 CSS 层，支持明暗主题与响应式 |
| `src/styles/20-home-product.css` | 重写独立封闭的 CSS 层，支持明暗主题与响应式 |
| `src/styles/21-home-architecture.css` | 重写独立封闭的 CSS 层，支持明暗主题与响应式 |
| `src/styles/30-pages.css` | 重写独立封闭的 CSS 层，支持明暗主题与响应式 |
| `src/styles/40-docs-hub.css` | 重写独立封闭的 CSS 层，支持明暗主题与响应式 |
| `src/styles/50-docs.css` | 重写独立封闭的 CSS 层，支持明暗主题与响应式 |
| `src/styles/60-responsive.css` | 重写独立封闭的 CSS 层，支持明暗主题与响应式 |
| `src/ui.mjs` | 共享版本状态、图标及网络光路视觉 |

## 2026-10-09：v0.1.170 与 OpenWrt 下载

正式客户端更新为 [v0.1.170](https://github.com/yhan-sun/p2wlan/releases/tag/v0.1.170)，发布于 2026-10-08 06:03:07 UTC。线上定时同步已取得该版本；本次将仓库中的已验证 fallback、全部 21 个资产与三条历史发布同步到同一版本。

| Before | After |
| --- | --- |
| OpenWrt 原生包归入其他辅助资产 | 10 个原生安装包按固件版本与精确包架构分类，24.10 对应 IPK，25.12 对应 APK |
| 下载页没有路由器入口 | 沿用现有平台横向分组，两个原生 details 按需展开；保留七种桌面 / 移动端设备推荐，路由器包手动选择 |
| 安装文档只覆盖桌面与移动端 | 新增固定 Release tag 的 OpenWrt 安装器、服务与升级说明，链接对应版本的上游指南；搜索和 SEO 加入 OpenWrt |

| 新增检查 | 结果 |
| --- | --- |
| `npm run check` | 通过：15 篇文档、21 个 fallback 资产、发布分类回归、19 个生成页面与 20 个 HTML 产物校验 |
| OpenWrt 分类边界 | 10 个精确架构包通过；错误固件 / 格式组合、MIPS 与摘要 sidecar 不作为原生安装包；OpenWrt APK 不混入 Android |
| 浏览器功能 | 14 项通过：键盘展开 / 收起、独立设备推荐、10 个路由器链接、21 个完整资产、SHA-256 复制、安装锚点、版本化命令、历史日志和无脚本下载 |
| 响应式布局 | 下载与安装页 × 六种宽度 × 明暗主题，共 24 组通过，无页面横向溢出或控制台错误 |
| axe-core 4.10.3 | 两页 × 390 / 1440px × 明暗主题，共 8 组，无 WCAG 2 A/AA、2.1 AA 测试集违规；对比度仍有工具人工判断项，沿用已核对的 Token，并复核明暗平台截图 |
| 官方数据与链接 | 21 个资产的名称、URL、大小和摘要与 GitHub API 一致；manifest 中的 20 个文件逐项匹配；21 个 HEAD 响应成功且 Content-Length 一致 |
| 离线 / 过旧缓存 | 两组通过：缓存缺失及 v0.1.169 缓存均使用 v0.1.170 fallback；原始缓存逐字节恢复 |
| CSS / JS 预算 | 81,503 / 100,000 bytes；33,681 / 40,000 bytes |

证据：`output/playwright/release170-browser-check.json`、`release170-links-check.json` 与四张 `release170-openwrt-*.png`。本次只重新检查发布数据、下载页与新增安装内容；既有首页动效沿用前述验收。没有在实体路由器安装客户端，也没有下载全部二进制重新计算摘要；上游客户端验证结果仍来自对应 Release，不是本次网站验收。
