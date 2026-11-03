# 图片来源与退役素材

## 当前使用

四张 WebP 来自主仓库 assets/readme，位于 public/images/product。原始像素和文件字节保持不变，设备、速率和延迟均为示例数据。首屏与房间展示采用 CSS 取景，完整原图继续可访问。访问服务阶段中的 SSH 命令为示例，不伪装为真实执行结果。

## 已退役的生成素材

2026-11-03 产品优先优化中移除了 network-light-path-v1.webp、optical-scene 组件和相关透视 / 光束代码。该物件的材质与软件形态不符，不再随网站发布。以下保留历史来源和完整 Prompt，便于追溯；不代表当前页面还引用该资产。

生成方式：Codex 内置 image_gen 工具。用途：P2WLAN 网站的抽象品牌视觉，非客户端截图或技术拓扑。

交付文件：`public/images/brand/network-light-path-v1.webp`，1774 × 887，214,192 bytes，保留透明 Alpha。生成的 PNG 只做 WebP 编码，不改动构图；四张真实客户端截图继续保留原始字节。

原始生成文件名：`exec-d852cb75-b5b3-497b-8369-53e75377ec64.png`，保留于 Codex 默认生成目录；网站只引用项目内的 WebP。

## 历史动态接入

`src/components/optical-scene.mjs` 把生成材质与 SVG 光束放在相同坐标系。光束使用材质 Alpha 蒙版，细光和宽光错峰通过；桌面指针最多触发 0.8° / 1.2° 的透视响应。首次进入视口播放一次，约 3.9 秒内结束，可手动重播。离开视口、进入后台或启用 Reduced Motion 时停止。静态图本身不包含动画帧。

## 最终生成 Prompt

```text
Use case: stylized-concept
Asset type: a premium, transparent-background optical network sculpture for the P2WLAN software website.
Primary request: a beautifully crafted fiber-optic light path joining two small precision glass nodes, expressing distant devices coming closer. This is abstract brand artwork, not a technical diagram.
Subject: two understated, rounded glass and graphite nodes at the far left and far right, linked by a delicate luminous mint fiber. A few blue-violet optical strands take a longer, flowing arc around the main connection. The optical strands are continuous, physically smooth, thin and elegant, never tangled.
Composition/framing: wide panoramic composition, approximately 2:1. The nodes sit in the outer quarters, lower in the composition, with generous transparent negative space above and in the upper center. One graceful sweeping arc brings depth. Keep the sculpture entirely within the image, with ample clean margins. Avoid a rigid front-facing schematic.
Style/medium: refined physically based 3D studio rendering, precise industrial craft, polished glass edges, realistic light refraction, restrained bloom and subtle depth of field, crisp clean silhouette.
Lighting/mood: calm, technical, tactile, quietly confident. Controlled soft studio illumination. Visible on both a midnight navy and a pale cool background.
Color palette: translucent cool glass, blue-violet accents close to #6675FF, a restrained mint fiber close to #4AC9A0, graphite hardware. Color comes from the object itself.
Text: none.
Constraints: genuine transparent alpha background, no backdrop, no ground plane, no frame, no typography, no watermark, no logos, no UI, no monitor screens, no measurements, no decorative particles, no sci-fi holograms, no overwhelming neon glow. Do not imitate Raycast branding.
```
