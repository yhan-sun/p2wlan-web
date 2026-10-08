# P2WLAN Design System

## Network Light Path / 网络光路

官网帮助访客理解产品、下载客户端与建立第一条连接。参考 Raycast 的原生软件质感、文字层级与细节精度，使用 P2WLAN 自己的节点标志和蓝紫品牌色。视觉母题是设备之间的细线光路：首屏用于说明 P2P 连接，下载页仅留下微弱背景轨迹，文档依靠排版与导航。

默认深色。使用场景是用户在桌面或手机上判断产品、选择安装包；安静的深色画面让关键动作与网络路径清楚呈现。亮色主题使用独立的纸面、墨色、代码块和状态配色，手动主题选择跨页面保留。没有远程字体或客户端框架。

## Color tokens

| 角色 | Dark | Light |
| --- | --- | --- |
| 页面 `--bg` | `#080A0E` | `#F6F7FA` |
| 表面 `--surface` | `#101319` | `#FCFCFE` |
| 控件表面 `--surface-raised` | `#1A1E27` | `#EDF0F6` |
| 主文字 `--ink` | `#F5F6FA` | `#181D2B` |
| 次文字 `--muted` | `#A3AAB9` | `#586277` |
| 辅助文字 `--faint` | `#858D9E` | `#626D82` |
| 品牌 / 焦点 `--brand` | `#6675FF` | `#5261DC` |
| Direct | `#4AC9A0` | `#127754` |
| Relay | `#D8A35D` | `#946012` |
| 主 CTA 背景 | `#F0F2F8` | `#1B2233` |
| 主 CTA 文字 | `#121621` | `#F4F6FA` |

品牌色表达当前选择、协调过程与焦点；Direct / Relay 只表达连接语义。状态同时提供文字与路径，不能只靠颜色识别。版本标签使用中性或品牌色，不能借用 Direct 状态来表示发布成熟度。

## Typography and space

- Sans：Inter / Apple 与 Windows 系统字体，中文使用 PingFang SC / Microsoft YaHei。沿用用户要求的原生字体方向，无额外字体下载。
- Mono：SFMono-Regular / Consolas / Liberation Mono / Menlo，仅用于版本、地址、代码与文件信息。
- 中文标题不使用负字距，按语义控制首页两行主张；H1 / H2 / H3 通过大小、权重和空间建立层级。
- 营销内容最大宽度 1160px，首页交互区 980px，截图 920px，下载及版本时间线约 1000px。
- 文档最大阅读宽度 720px；桌面为章节 / 正文 / 本页内容三栏，1200px 以下将本页内容改为正文内展开项，960px 以下提供章节抽屉。
- 全站采用 1px 边界，控件半径 6–10px，主要窗口 12–14px。阴影仅用于演示窗口、截图、推荐区与搜索弹层。
- 不做渐变文字、重复功能卡片、玻璃卡片或巨大渐变广告。主要内容以分区、细线和留白组织。

## Page patterns

### Home

1. 居中品牌主张、动态版本入口、下载与快速开始。
2. SVG + 原生 JavaScript 网络演示，明确标注「交互示意」。
3. 场景列表与主仓库四张客户端截图，使用可访问标签切换，提供原图入口。
4. Direct / Relay 路径对照与自托管架构。
5. 单一下载引导，朴素收尾。

现有截图保持原始像素与主题，周围框架遵循网站主题。截图中的设备、速率与延迟为演示数据；不制造额外监控指标或模拟客户端。生成的透明光纤素材仅作品牌概念视觉，来源与完整 Prompt 见 IMAGE_ASSETS.md。

### Download

优先识别当前系统，浏览器确实提供架构信息时才据此选择 macOS 包；不能确认时明确要求手动选择。Linux 桌面优先 GUI x64，arm64 使用 CLI。iOS / iPadOS 不自动推荐 IPA。

手动选择器同步平台、架构、格式、真实文件名、文件大小与下载 URL。主要列表分 Windows / macOS / Linux / Android，所有原始 Release 资产及 SHA-256 按需展开；未签名 IPA 仅在高级列表中如实说明。

### Docs and changelog

文档首页按任务排布，搜索支持 ⌘K / Ctrl+K、方向键和 Enter。正文保留全部 15 篇文档与路径，支持代码和章节链接复制、表格键盘滚动、本页高亮、阅读进度及移动抽屉。

更新日志展示真实客户端 Release 的发布日期、改进、修复与边界，历史版本按需展开。客户端 `vX.Y.Z` 与服务端 `server-vX.Y.Z` 明确分开。

## Motion system

| Token | 时长 | 用途 |
| --- | --- | --- |
| `--motion-micro` | 160ms | Hover / Pressed / 焦点附近状态 |
| `--motion-component` | 280ms | 搜索、抽屉、标签、展开内容 |
| `--motion-entrance` | 560ms | 首屏轻微错峰与重点展示入场 |
| `--motion-network` | 1200ms | SVG 路径绘制、候选交换与阶段切换 |
| `--ease-out` | `cubic-bezier(.22,1,.36,1)` | 平稳减速，无弹跳 |

网络演示：设备就绪 → 控制面交换候选 → NAT 探测 → Direct 完成。可选择 Relay 回退结果、手动选择任意阶段、暂停、原位继续或重播。状态文本、可访问描述、节点、路径和标签一起更新。路径用 SVG stroke-dashoffset 绘制；数据包以 linear 沿 CSS offset-path 移动，局部光尾同步经过。NAT 探测以虚线与往返光点表达尝试；连接完成给出一次轻微外圈反馈。

首次进入视口播放一次。完成态数据包最多两次经过路径，离开视口或页面进入后台即暂停序列与当前路径进度，通过「继续」恢复。状态文案在 240ms 内淡入并移动 3px，标题与说明错峰 30ms；重播 / 暂停 / 继续图标保持挂载，以 opacity、scale .25 → 1、blur 4px → 0 在 300ms 内交接。

品牌光纤由透明 WebP 材质与同坐标系 SVG 光束组成；材质 Alpha 蒙版使光束局限于对象内。两束光错峰 280ms，单次总时长约 3.9 秒，可手动重播，无无限循环。桌面指针最多产生 0.8° / 1.2° 透视响应，离开视口或进入后台时停止。

截图切换保留原图直到目标图完成解码，再进行 240ms 淡出；快速切换取消上一轮交接。说明区域桌面至少 46px、手机至少 64px，保持布局稳定。重点展示通过 IntersectionObserver 触发入场；普通文档段落不做滚动动画。

减少动态效果时不自动播放，默认展示 Direct 完成状态，关闭路径过渡、光尾、数据包、材质透视和入场动画；手动阶段和路由仍可使用。中途打开系统减少动态效果设置时停止序列、清理截图交接和文案动画，并进入静态完成状态。

## Engineering constraints

- 每个 CSS 文件独立关闭自己的 `@layer`，按 reset / tokens / base / layout / components / home / pages / docs-hub / docs / content / responsive 声明顺序合并。不要跨文件开启与关闭花括号。
- 原始 CSS ≤ 100,000 bytes，客户端 JavaScript ≤ 40,000 bytes，不增加框架、动画库或字体依赖。
- 页面保留唯一 H1、zh-CN、canonical、SEO、sitemap、skip link、可访问名称与所有文档路径。
- Release 数据保留真实 URL、大小与 SHA-256，规则采用完整文件名匹配，校验文件不得误认为安装包。
- 缓存不得覆盖更新的已验证 fallback。构建与 release-data.json 使用相同加载规则。
- 安装与校验文档使用构建期 Release token，同步版本、文件名和摘要；缺少资产时不制造链接。
- 焦点可见；搜索使用原生 dialog；移动菜单和文档抽屉有焦点约束、Escape 关闭与焦点返回。

## Acceptance

必须检查 360 / 390 / 768 / 1024 / 1440 / 1920px 的首页、下载、文档首页、正文和更新日志，覆盖 Dark / Light / Reduced Motion。

运行 `npm ci --ignore-scripts`、`npm run check`、`npm run preview`。发布分类回归校验涵盖旧 Linux 命名、SHA-256 辅助文件、实验 IPA 和客户端 / 服务端标签。构建校验包含内部路径及锚点、SEO、语义与资源预算。

浏览器截图与检查日志放在被忽略的 `output/playwright/`，本次结果记录在 `UI_VALIDATION_REPORT.md`。提交与推送按用户授权执行；main 推送会触发仓库现有 GitHub Pages 发布工作流。
