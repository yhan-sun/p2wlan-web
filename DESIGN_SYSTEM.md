# P2WLAN V3 Design System

## Design statement

**Quiet Network Infrastructure**：网页首先证明产品已经可用，再解释网络原理。视觉保持冷静、精确、可信，避免玻璃拟态、过量卡片、装饰性渐变和与产品无关的重动画。

## Information architecture

### Home

1. 产品主张与真实连接状态
2. 四项能力证明
3. 产品界面与诊断入口
4. 自托管架构与安全边界
5. 平台入口与单一最终 CTA

首页不再重复讲解 NAT、候选、Relay 和安全模型；详细过程进入文档。

### Download

1. 当前设备推荐版本
2. Windows / macOS / Linux / Mobile
3. 完整 Release 资产
4. 文件大小与 SHA-256
5. 历史版本和验证说明

### Docs

文档首页按任务导航；文章页使用全局目录、正文、本页目录和阅读进度。搜索、代码复制、标题链接与移动端目录保持原生、可访问。

## Color roles

- `--brand*`：品牌、主 CTA、焦点与当前选择。
- `--direct*`：已建立端点直连。
- `--relay*`：当前使用回退中继或实验性状态。
- `--danger*`：明确错误和危险提示。
- 中性色：页面、文字、边界、离线与非激活状态。

品牌色不得代替网络状态色；Direct 与 Relay 必须保持不同语义。

## Shape and elevation

- 普通控件：8–12px 圆角。
- 内容卡片：16–18px 圆角。
- 主产品框架：22–28px 圆角。
- 普通内容依靠边界和留白分层，不使用阴影。
- 阴影只用于产品框架、搜索浮层、移动抽屉和少数主要强调面板。

## Typography

- 中文标题按语义控制断行，不依赖窄列随机换行。
- 正文宽度限制在可读范围；技术信息使用等宽字体。
- 大标题承担品牌表达，正文保持事实导向，不使用营销式堆叠形容词。

## Responsive acceptance

必须验收：

- 1440px：完整桌面导航、产品双栏、三栏文档。
- 1024px：产品双栏或自然降为单栏，文档隐藏本页目录。
- 768px：移动导航、单栏内容、触控友好按钮。
- 390px：无横向溢出，中文标题断行稳定，下载与文档入口可单手操作。
- Light / Dark：所有文本、边界、状态、代码块和浮层均独立验收。
- `prefers-reduced-motion`：关闭非必要动画。

## Engineering guardrails

- 页面代码不得直接重复站点事实和 Release 解析逻辑。
- CSS 按 foundation、components、page、docs、responsive 顺序合并。
- 构建输出必须通过标题、描述、canonical、唯一 H1、重复 ID、可访问名称、内部链接与资源预算校验。
- Release 下载地址只接受 `yhan-sun/p2wlan` 的可信 GitHub Release 路径。
- 不引入客户端框架运行时或第三方 UI 依赖。
