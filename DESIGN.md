# P2WLAN visual context

## Direction

Network Light Path：克制的原生软件官网。居中首屏与可交互连接拓扑建立识别度，真实客户端截图展示产品，下载、文档与版本页面共享精密排版和细线层次。参考 Raycast 的精度，不使用其商标与专有视觉资产。

## Palette and typography

深色默认背景 #080A0E，表面 #101319，标题 #F5F6FA，辅助文字 #A3AAB9，品牌 #6675FF。Direct #4AC9A0，Relay #D8A35D。主 CTA 使用浅色高对比表面。亮色主题独立配置；完整角色表见 DESIGN_SYSTEM.md。

Inter 与系统 sans、自然中文排版，无负字距。版本、代码、地址与文件信息使用系统等宽字体。

## Components and layout

1px 边框，控件 6–10px 半径，窗口 12–14px。营销容器 1160px，交互区 980px，截图 920px，文档正文 720px。使用横向平台分组、任务导航与版本时间线，避免重复卡片网格。

## Interaction

160 / 280 / 560 / 1200ms 的微交互、组件、入场与连接路径绘制，采用平稳 ease-out。网络阶段、路线、节点与文字同步更新；数据包以恒定速度移动，带局部光尾，NAT 探测往返一次。暂停冻结当前进度，可原位继续。

透明光纤材质由内置 image_gen 生成，叠加受材质 Alpha 限制的 SVG 光束。光束一次播放约 3.9 秒，桌面指针仅引起轻微透视，离屏及后台停止。截图解码后通过 240ms 交接；支持 Reduced Motion、键盘、触控、移动目录抽屉与明暗主题切换。素材与完整 Prompt 见 IMAGE_ASSETS.md。

## Source of truth

`DESIGN_SYSTEM.md` 记录完整设计与工程规范，`src/styles/00-foundation.css` 为实际 Token，`PRODUCT.md` 记录战略背景。
