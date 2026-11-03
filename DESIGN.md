# P2WLAN visual context

## Direction

客户端优先的精密软件官网。访客首先看到产品界面与一个具体任务；地址、设备与服务之间的关系构成视觉记忆。参考 Raycast 的精度，保留独立的节点标志与品牌蓝紫，不使用科幻塑胶物件、装饰性字眉或虚构监控。

## Palette and typography

克制配色，默认近中性的深色；页面、表面使用 OKLCH，亮色主题独立配置。品牌色只用于焦点与选择，Direct / Relay 状态语义独立。主 CTA 使用高对比的浅色表面。完整角色见 DESIGN_SYSTEM.md 与实际 CSS Token。

Inter / 系统 sans、自然中文排版。网页功能文字至少 12px，正文 16px，代码与元信息按角色设置；截图内的原始文字通过取景放大。版本、地址、代码与文件名使用等宽字体。

## Components and layout

营销容器 1200px，文档正文 740px。首屏桌面左右分栏，手机独立取景；界面原图不修改像素。控件半径 6–10px，精细边界与中性阴影。使用任务分组、横向平台列表与版本时间线，避免重复卡片堆叠。

## Interaction

首屏导览从地址、设备到访问示例，首次可见时自动播放一次，约 3.4 秒后保留结果。图片解码成功后才切换，320ms 交接，700ms 小幅取景过渡；可暂停、继续、重播及键盘选择。离屏、后台停止；Reduced Motion 不自动播放，手动仍可选择静态内容。导览明确为界面与访问示例。

原理演示默认折叠，保留四阶段、Direct / Relay、精确暂停与继续。文档正文保持安静；全站搜索、复制、抽屉和焦点反馈继续可用。生成光纤材质与其透视、光束代码已经退役。

## Source of truth

DESIGN_SYSTEM.md 记录设计与工程规范，src/styles/00-foundation.css 是实际 Token，PRODUCT.md 记录产品目标。素材来源与退役 Prompt 保留于 IMAGE_ASSETS.md。
