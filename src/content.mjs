export const SITE = {
  name: "P2WLAN",
  origin: "https://p2wlan.yhan.fun",
  repository: "https://github.com/yhan-sun/p2wlan",
  webRepository: "https://github.com/yhan-sun/p2wlan-web",
  releases: "https://github.com/yhan-sun/p2wlan/releases",
  description:
    "P2WLAN 是一个开源、P2P 优先、可自托管的加密虚拟局域网，支持跨网络设备直连与 Relay 自动回退。",
};

export const releaseFallback = {
  tag: "v0.1.145",
  name: "v0.1.145",
  publishedAt: "2026-08-27T18:18:57Z",
  url: "https://github.com/yhan-sun/p2wlan/releases/tag/v0.1.145",
  source: "fallback",
  assets: [
    {
      name: "p2wlan-flutter-windows-x64-setup.exe",
      size: 14788301,
      digest: "sha256:fe04a9a7e388e1420679d608d70857f01300df29c8a788140df36190002a0686",
      url: "https://github.com/yhan-sun/p2wlan/releases/download/v0.1.145/p2wlan-flutter-windows-x64-setup.exe",
    },
    {
      name: "p2wlan-flutter-macos-arm64.dmg",
      size: 15287480,
      digest: "sha256:724c57cb022c8fe66ad0316a9e94d7b19db8f7756987275882b51faf608b0009",
      url: "https://github.com/yhan-sun/p2wlan/releases/download/v0.1.145/p2wlan-flutter-macos-arm64.dmg",
    },
    {
      name: "p2wlan-flutter-macos-x64.dmg",
      size: 16991830,
      digest: "sha256:3f90ecf60e06e04ad19589aa056d9723e7be5960c635a19f1ab5b7390ff64c25",
      url: "https://github.com/yhan-sun/p2wlan/releases/download/v0.1.145/p2wlan-flutter-macos-x64.dmg",
    },
    {
      name: "p2wlan-flutter-linux-x64.tar.gz",
      size: 15200060,
      digest: "sha256:d9dfbc38b39117acd2ea8a4f3f27e79392abbfa7e7795c6ceacdf4dfa717c218",
      url: "https://github.com/yhan-sun/p2wlan/releases/download/v0.1.145/p2wlan-flutter-linux-x64.tar.gz",
    },
    {
      name: "p2wlan-linux-x64-cli.tar.gz",
      size: 12770401,
      digest: "sha256:1f6c8c24fbe5f036e9b9083619ee8bc674cc79b362f9a96877e6c978693ecc46",
      url: "https://github.com/yhan-sun/p2wlan/releases/download/v0.1.145/p2wlan-linux-x64-cli.tar.gz",
    },
    {
      name: "p2wlan-linux-arm64-cli.tar.gz",
      size: 12057583,
      digest: "sha256:caa94e016098c81d0cdf514e653a0a3635210d1587f16128700bd31aef78d955",
      url: "https://github.com/yhan-sun/p2wlan/releases/download/v0.1.145/p2wlan-linux-arm64-cli.tar.gz",
    },
    {
      name: "p2wlan-flutter-android-arm64-release.apk",
      size: 28416656,
      digest: "sha256:6545ace723a89bcfef2dd0482bed5c2a5b6537dc80dd36ff7bbc414f1acace93",
      url: "https://github.com/yhan-sun/p2wlan/releases/download/v0.1.145/p2wlan-flutter-android-arm64-release.apk",
    },
    {
      name: "p2wlan-flutter-ios-arm64-unsigned.ipa",
      size: 7300438,
      digest: "sha256:d0e44e0c49b72102694a6117a6a63f1f7b55b91c91f0bfdf77e488f0313d2323",
      url: "https://github.com/yhan-sun/p2wlan/releases/download/v0.1.145/p2wlan-flutter-ios-arm64-unsigned.ipa",
    },
  ],
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const code = (value, language = "bash") => `
  <div class="code-frame" data-language="${escapeHtml(language)}">
    <div class="code-frame__bar"><span>${escapeHtml(language)}</span></div>
    <pre><code>${escapeHtml(value.trim())}</code></pre>
  </div>`;

export const callout = (kind, title, body) => `
  <aside class="callout callout--${kind}">
    <div class="callout__icon" aria-hidden="true"></div>
    <div><strong>${title}</strong><div>${body}</div></div>
  </aside>`;

const assetMeta = [
  {
    match: "windows-x64-setup.exe",
    platform: "Windows",
    detail: "Windows 10/11 · x64 安装程序",
    key: "windows-x64",
    status: "稳定预览",
  },
  {
    match: "macos-arm64.dmg",
    platform: "macOS",
    detail: "Apple Silicon · DMG",
    key: "macos-arm64",
    status: "稳定预览",
  },
  {
    match: "macos-x64.dmg",
    platform: "macOS",
    detail: "Intel · DMG",
    key: "macos-x64",
    status: "稳定预览",
  },
  {
    match: "flutter-linux-x64.tar.gz",
    platform: "Linux GUI",
    detail: "x86_64 · Flutter 客户端",
    key: "linux-gui-x64",
    status: "预览",
  },
  {
    match: "linux-x64-cli.tar.gz",
    platform: "Linux CLI",
    detail: "x86_64 · CLI + daemon",
    key: "linux-cli-x64",
    status: "推荐服务器",
  },
  {
    match: "linux-arm64-cli.tar.gz",
    platform: "Linux CLI",
    detail: "arm64 · CLI + daemon",
    key: "linux-cli-arm64",
    status: "推荐服务器",
  },
  {
    match: "android-arm64-release.apk",
    platform: "Android",
    detail: "arm64 · APK 侧载",
    key: "android-arm64",
    status: "Preview",
  },
  {
    match: "ios-arm64-unsigned.ipa",
    platform: "iOS",
    detail: "arm64 · 未签名 IPA",
    key: "ios-arm64",
    status: "实验性",
  },
];

export function normalizeAssets(release) {
  return release.assets
    .map((asset) => {
      const meta = assetMeta.find((item) => asset.name.includes(item.match));
      return meta ? { ...asset, ...meta } : null;
    })
    .filter(Boolean);
}

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return "未知大小";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(unit < 2 ? 0 : 1)} ${units[unit]}`;
}

export function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "未知日期";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Shanghai",
  }).format(date);
}

function assetRows(release) {
  return normalizeAssets(release)
    .map(
      (asset) => `
      <tr>
        <td><strong>${asset.platform}</strong><br><span class="muted">${asset.detail}</span></td>
        <td><code>${escapeHtml(asset.name)}</code></td>
        <td>${formatBytes(asset.size)}</td>
        <td><button class="hash-button" type="button" data-copy-text="${escapeHtml(
          asset.digest?.replace(/^sha256:/, "") || ""
        )}">${asset.digest ? "复制 SHA-256" : "未提供"}</button></td>
      </tr>`
    )
    .join("");
}

export const docGroups = [
  {
    title: "开始使用",
    items: [
      ["/docs/", "文档导览"],
      ["/docs/getting-started/", "五分钟快速开始"],
      ["/docs/install/", "下载与安装"],
      ["/docs/release-verification/", "版本与完整性校验"],
    ],
  },
  {
    title: "客户端",
    items: [
      ["/docs/clients/desktop/", "桌面客户端"],
      ["/docs/clients/mobile/", "Android 与 iOS"],
      ["/docs/cli/", "Linux CLI"],
      ["/docs/configuration/", "配置参考"],
    ],
  },
  {
    title: "网络原理",
    items: [
      ["/docs/networking/", "连接模型与路径"],
      ["/docs/nat-traversal/", "NAT 穿透"],
      ["/docs/relay/", "Relay 回退"],
    ],
  },
  {
    title: "部署与运维",
    items: [
      ["/docs/self-hosting/", "自托管"],
      ["/docs/security/", "安全边界"],
      ["/docs/troubleshooting/", "故障排查"],
    ],
  },
  {
    title: "项目",
    items: [
      ["/docs/development/", "开发与贡献"],
      ["/docs/faq/", "常见问题"],
    ],
  },
];

export const docs = [
  {
    path: "/docs/",
    group: "开始使用",
    title: "P2WLAN 文档",
    description: "从安装、第一次组网到 NAT 穿透、自托管和安全边界，系统了解 P2WLAN。",
    keywords: ["P2WLAN", "文档", "虚拟局域网", "P2P", "自托管"],
    body: ({ release }) => `
      <p class="doc-lead">P2WLAN 是一个开源、P2P 优先、可自托管的加密虚拟局域网。每台设备获得一个私有虚拟 IP，普通应用可以继续使用 ping、SSH、RDP、数据库或 Web 管理面板，不需要为每个服务分别暴露公网端口。</p>

      ${callout(
        "warning",
        "Preview 状态",
        "项目适合真实网络测试、自托管与开发验证，但尚未完成独立安全审计。高敏感生产环境应先完成自己的安全评估。"
      )}

      <h2 id="recommended-route">推荐阅读路径</h2>
      <div class="step-list">
        <a class="step-card" href="/docs/getting-started/"><span>01</span><div><strong>跑通两台设备</strong><p>下载、登录、启动网络，并通过虚拟 IP 访问对端。</p></div></a>
        <a class="step-card" href="/docs/networking/"><span>02</span><div><strong>理解连接路径</strong><p>区分 Control Plane、Direct、Relay 和虚拟网卡。</p></div></a>
        <a class="step-card" href="/docs/troubleshooting/"><span>03</span><div><strong>学会诊断</strong><p>使用 status、doctor 和 logs 判断问题位于哪一层。</p></div></a>
        <a class="step-card" href="/docs/self-hosting/"><span>04</span><div><strong>部署自己的服务</strong><p>构建 Control Plane 与 Relay，并在前置代理上启用 TLS。</p></div></a>
      </div>

      <h2 id="architecture">架构一览</h2>
      <div class="architecture-grid">
        <article><span class="eyebrow">GUI</span><h3>Flutter 客户端</h3><p>负责登录、设备管理、连接状态和诊断入口。</p></article>
        <article><span class="eyebrow">Data Plane</span><h3>Rust daemon</h3><p>负责 TUN、加密会话、路径选择、NAT 穿透与 Relay 回退。</p></article>
        <article><span class="eyebrow">Coordination</span><h3>Go Control Plane</h3><p>负责认证、设备注册、虚拟 IP、信令和 Relay ticket。</p></article>
        <article><span class="eyebrow">Fallback</span><h3>Go Relay</h3><p>在 Direct 不可用时转发加密数据帧，不负责解密业务载荷。</p></article>
      </div>

      <h2 id="path-order">连接路径</h2>
      <p>默认策略可以概括为：<strong>LAN Direct → Public UDP Direct → Encrypted Relay</strong>。Direct 是否成功取决于两端 NAT、防火墙、CGNAT、热点和运营商网络；复杂环境下不保证一定打洞成功。</p>

      <h2 id="documentation-version">文档版本</h2>
      <p>当前页面在构建时同步 GitHub 最新正式 Release。此次构建对应 <strong>${escapeHtml(
        release.tag
      )}</strong>，发布时间为 ${formatDate(release.publishedAt)}。下载资产、文件大小和 SHA-256 均来自 Release API；源码行为仍应以对应 tag、测试和 CI 为最终依据。</p>

      <h2 id="important-boundaries">开始前必须知道</h2>
      <ul class="check-list">
        <li>P2WLAN 使用 WireGuard-like Noise 数据面，但不是官方 WireGuard 实现，也不声明互操作兼容。</li>
        <li>业务数据端到端加密不等于控制面登录链路一定使用 HTTPS；请阅读安全边界。</li>
        <li>Relay 看不到业务明文，但仍可能看到节点标识、连接时间、方向和数据包大小等元数据。</li>
        <li>iOS Release 是未签名 IPA，需要自行签名；Android APK 属于 Preview。</li>
        <li>MIT License 允许使用、修改、分发与商业使用，软件按“现状”提供。</li>
      </ul>`,
  },
  {
    path: "/docs/getting-started/",
    group: "开始使用",
    title: "五分钟快速开始",
    description: "在两台设备上安装 P2WLAN、登录、启动虚拟网络并验证 Direct 或 Relay 连接。",
    keywords: ["快速开始", "登录", "虚拟 IP", "p2wlan up", "p2wlan status"],
    body: ({ release }) => `
      <p class="doc-lead">本指南以两台设备加入同一网络为目标。桌面端可以使用 Flutter GUI；服务器或无桌面环境使用 Linux CLI。</p>

      <h2 id="prepare">1. 准备两台设备</h2>
      <p>两台设备应能正常访问控制面。首次验证建议让它们位于不同网络，例如家庭宽带与手机热点，这样能观察公网 UDP Direct 或 Relay 回退。</p>
      ${callout(
        "danger",
        "不要复用重要密码",
        "当前 Linux CLI 源码中的默认控制面地址是 http://47.109.40.237:18080。HTTP 不为登录凭据提供 TLS 传输保护。Preview 测试请使用独立密码；敏感或生产环境必须改用自己的 HTTPS 控制面。"
      )}

      <h2 id="download">2. 下载 ${escapeHtml(release.tag)}</h2>
      <p>前往 <a href="/download/">下载页</a>，页面会根据操作系统推荐安装包，并显示 GitHub 提供的 SHA-256 digest。安装前建议完成完整性校验。</p>

      <h2 id="login">3. 登录或注册</h2>
      <p>GUI 中按界面提示完成登录。Linux CLI：</p>
      ${code(`p2wlan register -u you@example.com
# 已有账号时：
p2wlan login -u you@example.com`)}
      <p>不传 <code>-p</code> 时，CLI 会在终端中隐藏密码输入。自托管用户可以指定控制面：</p>
      ${code(`p2wlan login -u you@example.com -s https://control.example.com`)}

      <h2 id="start-network">4. 启动虚拟网络</h2>
      ${code(`p2wlan up
p2wlan status`)}
      <p><code>up</code> 会启动 daemon 和 TUN 虚拟网卡；Linux 通常需要管理员权限。GUI 客户端会在需要时请求系统授权。</p>

      <h2 id="second-device">5. 在第二台设备重复操作</h2>
      <p>使用同一账号和网络加入第二台设备。设备上线后，状态页面或 CLI 会显示对端的虚拟 IP 与当前路径。</p>

      <h2 id="verify">6. 验证连通性</h2>
      ${code(`ping 10.20.0.5
ssh user@10.20.0.5

# 查看更完整的诊断 JSON
p2wlan status --json`)}
      <p>虚拟 IP 示例仅用于说明，实际地址以客户端显示为准。路径可能显示 LAN Direct、Direct、Relay、Connecting 或 Offline。</p>

      <h2 id="diagnose">7. 不通时先做这三步</h2>
      ${code(`p2wlan doctor
p2wlan status --json
p2wlan logs -n 200`)}
      <p>先区分“控制面登录失败”“daemon/TUN 未启动”“对端离线”“Direct 失败但 Relay 可用”和“Direct、Relay 都不可用”。不要一开始就关闭所有安全软件或随意开放公网端口。</p>

      <h2 id="stop">停止与退出</h2>
      ${code(`p2wlan down
p2wlan logout`)}
      <p><code>down</code> 停止本地 daemon；<code>logout</code> 删除保存的控制面会话。两者用途不同。</p>`,
  },
  {
    path: "/docs/install/",
    group: "开始使用",
    title: "下载与安装",
    description: "Windows、macOS、Linux、Android 与 iOS 的安装说明、权限要求和平台限制。",
    keywords: ["Windows", "macOS", "Linux", "Android", "iOS", "安装"],
    body: ({ release }) => `
      <p class="doc-lead">正式安装包统一从 GitHub Releases 发布。当前构建同步到 <strong>${escapeHtml(
        release.tag
      )}</strong>；不要从来历不明的镜像站下载安装包。</p>

      <h2 id="platform-matrix">平台与资产</h2>
      <div class="table-wrap"><table><thead><tr><th>平台</th><th>Release 文件</th><th>状态</th></tr></thead><tbody>
        ${normalizeAssets(release)
          .map(
            (asset) => `<tr><td><strong>${asset.platform}</strong><br><span class="muted">${asset.detail}</span></td><td><code>${escapeHtml(
              asset.name
            )}</code></td><td>${asset.status}</td></tr>`
          )
          .join("")}
      </tbody></table></div>

      <h2 id="windows">Windows</h2>
      <ol>
        <li>下载 <code>p2wlan-flutter-windows-x64-setup.exe</code>。</li>
        <li>核对下载页展示的 SHA-256。</li>
        <li>运行安装程序；创建虚拟网卡或修改路由时，系统可能请求管理员权限。</li>
        <li>如果 Windows 安全提示阻止 Preview 构建，先核对发布来源和摘要，再决定是否继续。</li>
      </ol>
      <p>不要为了排障长期关闭 Defender、防火墙或驱动签名保护。需要放行时，应限定到 P2WLAN 程序和必要网络范围。</p>

      <h2 id="macos">macOS</h2>
      <ol>
        <li>Apple Silicon 下载 arm64 DMG；Intel Mac 下载 x64 DMG。</li>
        <li>打开 DMG，将应用拖入 Applications。</li>
        <li>首次启动和创建 <code>utun</code> 接口时，按系统提示授权。</li>
      </ol>
      <p>Preview 构建若触发 Gatekeeper 提示，应先验证 digest。不要使用不明来源的“去签名”或二次打包版本。</p>

      <h2 id="linux-gui">Linux GUI</h2>
      <p>x86_64 桌面环境可以使用 Flutter tarball。解压后从目录启动，并确保系统具备创建 TUN 接口所需权限。</p>
      ${code(`tar -xzf p2wlan-flutter-linux-x64.tar.gz
cd p2wlan-flutter-linux-x64
./p2wlan`)}

      <h2 id="linux-cli">Linux CLI</h2>
      <p>服务器更推荐 CLI + daemon。可以手工下载对应架构的 tarball，或先审阅官方安装脚本再执行：</p>
      ${code(`curl -fsSL https://raw.githubusercontent.com/yhan-sun/p2wlan/main/scripts/install-linux-cli.sh -o /tmp/p2wlan-install.sh
less /tmp/p2wlan-install.sh
sudo sh /tmp/p2wlan-install.sh`)}
      ${callout(
        "info",
        "关于安装脚本",
        "脚本便于更新，但执行远程脚本前仍应先审阅。需要更严格的供应链控制时，请手工下载 tarball、核对 SHA-256，再将二进制安装到受控目录。"
      )}

      <h2 id="android">Android</h2>
      <p>当前提供 arm64 APK，需要启用允许该来源安装应用。首次启动虚拟网络时，Android 会显示 VPN 权限对话框。部分系统的省电策略会限制后台网络，请为 P2WLAN关闭不必要的后台冻结，而不是关闭整个系统安全能力。</p>

      <h2 id="ios">iOS</h2>
      <p>Release 中的 IPA 是<strong>未签名实验构建</strong>，不能像 App Store 应用一样直接安装。需要使用自己的开发者签名和受支持的安装流程。普通用户应将 iOS 支持视为实验性能力。</p>

      <h2 id="upgrade">升级</h2>
      <p>桌面与移动端从新 Release 覆盖安装。Linux CLI 支持：</p>
      ${code(`p2wlan update --dry-run
p2wlan update
# 安装指定版本
p2wlan update --version ${release.tag}`)}
      <p>升级前保存配置路径：<code>p2wlan config path</code>。自托管服务升级前应备份 SQLite 数据库和环境配置。</p>`,
  },
  {
    path: "/docs/release-verification/",
    group: "开始使用",
    title: "版本与完整性校验",
    description: "使用 GitHub Release digest 和系统 sha256 工具验证 P2WLAN 安装包。",
    keywords: ["SHA-256", "checksum", "digest", "Release", "供应链"],
    body: ({ release }) => `
      <p class="doc-lead">本站在 GitHub Actions 构建时读取最新正式 Release，并展示 GitHub 为每个资产记录的 SHA-256 digest。当前版本为 <strong>${escapeHtml(
        release.tag
      )}</strong>。</p>

      <h2 id="asset-digests">当前资产摘要</h2>
      <div class="table-wrap table-wrap--wide"><table><thead><tr><th>平台</th><th>文件</th><th>大小</th><th>SHA-256</th></tr></thead><tbody>${assetRows(
        release
      )}</tbody></table></div>

      <h2 id="windows-verify">Windows 校验</h2>
      ${code(`Get-FileHash .\\p2wlan-flutter-windows-x64-setup.exe -Algorithm SHA256`, "powershell")}
      <p>将输出的 Hash 与下载页中的 64 位十六进制摘要逐字符比较。</p>

      <h2 id="mac-linux-verify">macOS / Linux 校验</h2>
      ${code(`# macOS
shasum -a 256 p2wlan-flutter-macos-arm64.dmg

# Linux
sha256sum p2wlan-linux-x64-cli.tar.gz`)}

      <h2 id="what-it-proves">SHA-256 能证明什么</h2>
      <p>摘要一致可以确认你本地文件与 GitHub Release 记录的资产字节一致，能够发现下载损坏或文件被替换。但摘要本身不是代码签名，也不是独立的可复现构建证明。</p>
      ${callout(
        "warning",
        "仍处于 Preview",
        "项目尚未完成独立安全审计，也没有在本站声称拥有完整的可复现构建或第三方签名证明。高风险环境应自行审阅源码、固定 commit，并建立自己的构建与签名流程。"
      )}

      <h2 id="version-source">版本来源</h2>
      <ul>
        <li>下载链接、大小和 digest：GitHub Releases API。</li>
        <li>功能行为：对应 release tag 的源码与测试。</li>
        <li>主分支的新功能：可能尚未进入当前 Release，不能当作已发布能力。</li>
        <li>本站 fallback 数据：仅在 GitHub API 暂时不可用时使用，并在构建日志中标记。</li>
      </ul>`,
  },
  {
    path: "/docs/clients/desktop/",
    group: "客户端",
    title: "桌面客户端",
    description: "Windows、macOS 与 Linux GUI 的运行模型、权限、连接状态和日常操作。",
    keywords: ["桌面客户端", "Flutter", "Windows", "macOS", "托盘", "TUN"],
    body: () => `
      <p class="doc-lead">桌面客户端提供登录、设备列表、连接路径与诊断入口；真正的数据面由本地 Rust daemon 负责。理解 GUI 与 daemon 的分工，有助于定位“界面正常但网络不通”的问题。</p>

      <h2 id="runtime-model">运行模型</h2>
      <div class="flow-row"><span>Flutter GUI</span><b>→</b><span>本地 daemon</span><b>→</b><span>TUN / Wintun / utun</span><b>→</b><span>Direct 或 Relay</span></div>
      <p>关闭主窗口不一定等于停止虚拟网络；是否继续运行取决于托盘和后台进程状态。需要明确停止时，使用客户端的停止操作或 CLI 的 <code>p2wlan down</code>。</p>

      <h2 id="permissions">系统权限</h2>
      <ul>
        <li><strong>Windows：</strong>创建 Wintun、安装组件和修改路由可能需要 UAC 管理员授权。</li>
        <li><strong>macOS：</strong>创建 utun 接口、调整路由或启动辅助进程时可能请求管理员授权。</li>
        <li><strong>Linux：</strong>创建 TUN 通常需要 root、CAP_NET_ADMIN 或受控的 systemd 能力配置。</li>
      </ul>
      <p>不要通过“永久以 root 运行整个图形界面”来规避权限设计。应只让需要网络能力的 daemon 获得最小权限。</p>

      <h2 id="connection-status">连接状态</h2>
      <div class="definition-grid">
        <article><strong>LAN Direct</strong><p>两端通过本地网络直接通信，通常延迟最低。</p></article>
        <article><strong>Direct</strong><p>通过公网 UDP 建立端到端连接。</p></article>
        <article><strong>Relay</strong><p>Direct 暂不可用，业务密文经 Relay 转发。</p></article>
        <article><strong>Connecting</strong><p>正在获取候选、协商加密会话或确认路径。</p></article>
        <article><strong>Offline</strong><p>对端离线、控制面不可达或没有可用数据路径。</p></article>
      </div>

      <h2 id="daily-checks">日常检查</h2>
      <ol>
        <li>确认账号和网络一致。</li>
        <li>确认本机虚拟 IP、daemon 状态和 TUN 接口存在。</li>
        <li>确认对端在线且显示当前路径。</li>
        <li>先 ping 虚拟 IP，再测试 SSH/RDP/业务端口。</li>
        <li>出现尖峰或切路时记录两端日志和路径变化时间。</li>
      </ol>

      <h2 id="safe-exit">安全退出</h2>
      <p>停止虚拟网络后再卸载应用，以便 daemon 有机会清理路由和接口。异常退出后若仍残留路由，重启 daemon 或系统通常比手工删除未知路由更安全；需要手工处理时先保存当前路由表。</p>`,
  },
  {
    path: "/docs/clients/mobile/",
    group: "客户端",
    title: "Android 与 iOS",
    description: "移动端 VPN 权限、后台限制、热点网络和 iOS 未签名构建说明。",
    keywords: ["Android", "iOS", "VPN", "后台", "APK", "IPA"],
    body: () => `
      <p class="doc-lead">移动端通过系统 VPN / Network Extension 能力接入虚拟网络。与桌面端相比，后台调度、电池策略和热点切换对连接稳定性影响更明显。</p>

      <h2 id="android-permission">Android VPN 权限</h2>
      <p>首次启动网络时，系统会显示 VPN 连接确认。此权限允许 P2WLAN 创建本地虚拟接口，不代表应用自动获得设备上所有账号或文件权限。</p>
      <ul>
        <li>安装来源应为官方 GitHub Release。</li>
        <li>仅在需要组网时启用 VPN；系统状态栏会显示 VPN 标识。</li>
        <li>频繁断连时检查系统省电、后台冻结和厂商网络管理策略。</li>
        <li>从 Wi-Fi 切换到蜂窝或热点后，连接路径可能重新协商。</li>
      </ul>

      <h2 id="mobile-latency">移动网络延迟</h2>
      <p>移动端可能出现更明显的尾延迟，常见原因包括 Wi-Fi 省电、蜂窝调度、热点 NAT、后台线程冻结和路径重选。不要只看平均 RTT，应同时记录 P50、P95、P99、丢包率和当时路径。</p>

      <h2 id="android-debug">Android 排障顺序</h2>
      <ol>
        <li>确认 VPN 权限仍有效。</li>
        <li>保持屏幕亮起做一次对照测试，判断是否为后台限制。</li>
        <li>分别测试同一 Wi-Fi、不同 Wi-Fi、手机热点和蜂窝网络。</li>
        <li>观察 Direct 与 Relay 是否频繁切换。</li>
        <li>同时保存桌面端与 Android 端日志，避免只分析单端。</li>
      </ol>

      <h2 id="ios-status">iOS 状态</h2>
      ${callout(
        "warning",
        "实验性、未签名",
        "Release 提供的是 unsigned IPA，需要自行签名和安装。它不是 App Store 分发，也不适合作为无开发者经验用户的默认入口。"
      )}
      <p>iOS 的 Network Extension、签名、provisioning profile 和后台执行均受系统约束。安装成功不代表具备长期稳定后台运行能力，实际表现还取决于签名权限和系统版本。</p>

      <h2 id="privacy">隐私提示</h2>
      <p>移动端的业务数据使用 P2WLAN 加密数据面，但控制面仍处理账号、设备、虚拟 IP、在线状态和信令。Relay 仍能观察连接元数据。请结合 <a href="/docs/security/">安全边界</a>评估使用场景。</p>`,
  },
  {
    path: "/docs/cli/",
    group: "客户端",
    title: "Linux CLI",
    description: "P2WLAN Linux CLI 的完整命令、参数、更新、日志和诊断用法。",
    keywords: ["CLI", "login", "up", "status", "doctor", "logs", "update"],
    body: () => `
      <p class="doc-lead">Linux CLI 适合云主机、NAS、HomeLab 和无桌面服务器。它负责管理配置与 daemon 生命周期，数据面仍由 <code>p2wlan-daemon</code> 执行。</p>

      <h2 id="global-option">全局选项</h2>
      ${code(`p2wlan --config /etc/p2wlan/config.json <command>`)}
      <p><code>--config</code> 可以为任意子命令指定配置文件。默认路径用 <code>p2wlan config path</code> 查看，不要在文档或脚本中猜测不同发行版的路径。</p>

      <h2 id="authentication">账号命令</h2>
      ${code(`p2wlan register -u you@example.com
p2wlan login -u you@example.com
p2wlan login -u you@example.com -s https://control.example.com
p2wlan logout`)}
      <p><code>-p/--password</code> 可直接传密码，但会增加 shell history 和进程参数泄漏风险。默认隐藏输入更安全。</p>

      <h2 id="lifecycle">网络生命周期</h2>
      ${code(`p2wlan up       # 别名 start
p2wlan status
p2wlan status --json
p2wlan down     # 别名 stop`)}
      <p><code>status --json</code> 适合自动化采集完整诊断响应；面向人阅读时使用普通 <code>status</code>。</p>

      <h2 id="logs">日志</h2>
      ${code(`p2wlan logs
p2wlan logs -n 300
p2wlan logs -f
p2wlan logs -n 200 -f`)}
      <p>提交日志前先检查账号、token、私钥、内网地址和业务目标是否需要脱敏。源码会对部分配置秘密做 redaction，但不能假设所有业务日志都已自动脱敏。</p>

      <h2 id="config-commands">配置</h2>
      ${code(`p2wlan config path
p2wlan config show
p2wlan config set mtu 1380
p2wlan config set path-policy score
p2wlan config set relay-startup-timeout 1500`)}
      <p>支持项和合法范围见 <a href="/docs/configuration/">配置参考</a>。修改身份、网络或控制面相关字段可能清除旧凭据，随后需要重新登录或注册设备。</p>

      <h2 id="doctor">诊断</h2>
      ${code(`p2wlan doctor`)}
      <p><code>doctor</code> 检查本地配置、daemon、Direct UDP 与 Relay fallback。诊断结果不是单一“通过/失败”，应结合对端日志和当时路径判断。</p>

      <h2 id="update">更新</h2>
      ${code(`p2wlan update --dry-run
p2wlan update
p2wlan update --version v0.1.145
p2wlan update --install-dir /usr/local/bin`)}
      <p><code>--repo</code> 默认指向 <code>yhan-sun/p2wlan</code>。生产环境建议固定版本并在升级前核对摘要，而不是无条件跟随 latest。</p>

      <h2 id="automation">自动化建议</h2>
      <ul>
        <li>脚本读取 <code>status --json</code>，不要解析彩色的人类可读输出。</li>
        <li>启动失败时设置有限重试和退避，不要无限循环 sudo。</li>
        <li>将配置和日志权限限制为运行用户可读。</li>
        <li>systemd 中仅授予 daemon 所需网络能力，避免整个运维脚本以 root 常驻。</li>
      </ul>`,
  },
  {
    path: "/docs/configuration/",
    group: "客户端",
    title: "配置参考",
    description: "CLI 可修改的控制面、网络、STUN、Relay、路径策略、MTU 和诊断配置。",
    keywords: ["配置", "MTU", "STUN", "Relay", "path-policy", "socket-pool"],
    body: () => `
      <p class="doc-lead">使用 <code>p2wlan config set &lt;key&gt; &lt;value&gt;</code> 修改持久配置。先运行 <code>config show</code> 保存基线，再一次只改一个变量。</p>

      <h2 id="identity-control">身份与控制面</h2>
      <div class="table-wrap"><table><thead><tr><th>Key</th><th>值</th><th>行为</th></tr></thead><tbody>
        <tr><td><code>control</code></td><td>HTTP(S) URL</td><td>切换控制面；变化时会清除旧 auth token 和设备凭据。</td></tr>
        <tr><td><code>network</code></td><td>非空字符串</td><td>切换网络；变化时清除设备凭据。</td></tr>
        <tr><td><code>device-name</code></td><td>非空字符串</td><td>修改设备名；变化时清除设备凭据。</td></tr>
      </tbody></table></div>

      <h2 id="interface-network">接口与网络</h2>
      <div class="table-wrap"><table><thead><tr><th>Key</th><th>允许值</th><th>说明</th></tr></thead><tbody>
        <tr><td><code>interface</code></td><td>1–15 字符</td><td>Linux TUN 接口名，默认通常为 <code>p2wlan0</code>。</td></tr>
        <tr><td><code>mtu</code></td><td>576–65535</td><td>默认 1420。遇到分片或特定业务卡顿时再逐步降低。</td></tr>
        <tr><td><code>udp-bind</code></td><td><code>ip:port</code></td><td>Direct UDP 本地绑定，默认 <code>0.0.0.0:0</code>。</td></tr>
        <tr><td><code>udp-advertise</code></td><td><code>ip:port</code> 或 clear</td><td>显式通告可达端点；不能使用 unspecified IP 或 0 端口。</td></tr>
        <tr><td><code>stun</code></td><td>逗号分隔服务器、off/clear</td><td>用于发现 server-reflexive UDP candidate。</td></tr>
        <tr><td><code>port-mapping</code></td><td>true/false</td><td>启用短期 UPnP IGD / PCP / NAT-PMP 尝试。</td></tr>
        <tr><td><code>birthday-probing</code></td><td>true/false</td><td>对适合的 NAT profile 生成有界探测候选。</td></tr>
        <tr><td><code>socket-pool</code></td><td>off、on、2–4</td><td>实验性 hard NAT socket pool；on 等价于 3。</td></tr>
      </tbody></table></div>

      <h2 id="diagnostics">本地诊断</h2>
      <p><code>diagnostics</code> 接受 socket address，并且必须绑定在 <code>127.0.0.1</code> 或 <code>::1</code>。CLI 默认诊断地址是 <code>127.0.0.1:39277</code>。</p>
      ${code(`p2wlan config set diagnostics 127.0.0.1:39277`)}
      <p>不要将诊断接口暴露到公网。需要远程查看时使用 SSH 隧道，而不是改成 <code>0.0.0.0</code>。</p>

      <h2 id="relay-config">Relay 与路径策略</h2>
      <div class="table-wrap"><table><thead><tr><th>Key</th><th>允许值</th><th>说明</th></tr></thead><tbody>
        <tr><td><code>relay</code></td><td>逗号分隔 endpoint</td><td>Relay candidates，可包含 region@endpoint。</td></tr>
        <tr><td><code>relay-policy</code></td><td>auto / direct / relay</td><td>兼容入口；relay 会切到 RelayOnly。</td></tr>
        <tr><td><code>path-policy</code></td><td>auto / score / direct-sticky / relay-only</td><td>控制路径选择策略。</td></tr>
        <tr><td><code>relay-startup-timeout</code></td><td>100–60000 ms</td><td>等待 Direct 的启动窗口；过大增加首包等待，过小可能过早走 Relay。</td></tr>
      </tbody></table></div>

      <h2 id="policy-guidance">策略选择</h2>
      <ul>
        <li><strong>auto：</strong>默认推荐，兼顾可用性与 Direct。</li>
        <li><strong>score：</strong>根据路径质量评分，适合研究或需要主动比较路径的场景。</li>
        <li><strong>direct-sticky：</strong>Direct 建立后更倾向保持，适合减少频繁切路。</li>
        <li><strong>relay-only：</strong>仅用于受控诊断、策略要求或 Direct 明确不可用环境。</li>
      </ul>

      <h2 id="change-method">安全修改流程</h2>
      ${code(`p2wlan config show > /tmp/p2wlan-config-before.txt
p2wlan config set mtu 1380
p2wlan down
p2wlan up
p2wlan doctor`)}
      <p>保留修改前后诊断结果。不要同时更改 STUN、socket pool、path policy 和 MTU，否则很难判断哪个变量产生影响。</p>`,
  },
  {
    path: "/docs/networking/",
    group: "网络原理",
    title: "连接模型与路径",
    description: "理解 P2WLAN 的 Control Plane、加密 Data Plane、虚拟 IP、Direct 与 Relay。",
    keywords: ["Control Plane", "Data Plane", "Direct", "Relay", "虚拟 IP"],
    body: () => `
      <p class="doc-lead">P2WLAN 将“发现与协调”和“业务数据传输”分开。Control Plane 负责身份、设备、虚拟 IP 和信令；本地 daemon 负责实际数据面。</p>

      <h2 id="planes">控制面与数据面</h2>
      <div class="comparison-grid">
        <article><span class="eyebrow">Control Plane</span><h3>建立关系</h3><ul><li>登录与设备注册</li><li>分配虚拟 IP</li><li>交换候选和信令</li><li>签发 Relay ticket</li><li>维护在线状态</li></ul></article>
        <article><span class="eyebrow">Data Plane</span><h3>传输业务数据</h3><ul><li>创建 TUN 虚拟接口</li><li>建立加密会话</li><li>选择 Direct 或 Relay</li><li>封装与解封装 IP 包</li><li>保持路径并执行回退</li></ul></article>
      </div>

      <h2 id="virtual-network">虚拟网络</h2>
      <p>默认 CIDR 为 <code>10.20.0.0/16</code>，默认 MTU 为 1420。普通应用只看到对端虚拟 IP，不需要知道当前底层路径是局域网、公网 UDP 还是 Relay。</p>

      <h2 id="connection-sequence">连接建立序列</h2>
      <ol class="timeline">
        <li><strong>注册与在线：</strong>设备向控制面认证并发布在线状态。</li>
        <li><strong>候选收集：</strong>daemon 收集 host、STUN server-reflexive、映射和预测候选。</li>
        <li><strong>双向探测：</strong>两端通过信令协调时间窗口并发送 UDP probes。</li>
        <li><strong>加密会话：</strong>确认可用端点后建立 WireGuard-like Noise 会话。</li>
        <li><strong>路径提交：</strong>Direct 可用则选 Direct；否则使用已准备的 Relay。</li>
        <li><strong>持续维护：</strong>keepalive、质量统计和重新协商维持连接。</li>
      </ol>

      <h2 id="path-order">路径优先级</h2>
      <div class="path-strip"><span>LAN Direct</span><i></i><span>Public UDP Direct</span><i></i><span>Encrypted Relay</span></div>
      <p>这不是“先长时间阻塞等待 Direct，最后才准备 Relay”的简单串行流程。实现会围绕首个可用业务包、回退与后续 Direct 提升做协同，但具体时序以对应版本源码和诊断事件为准。</p>

      <h2 id="path-semantics">状态含义</h2>
      <ul>
        <li><strong>LAN Direct：</strong>底层端点位于同一可达局域网。</li>
        <li><strong>Direct：</strong>底层端点通过公网 UDP 或 NAT 映射直接通信。</li>
        <li><strong>Relay：</strong>加密 frame 经中继转发，业务应用无需修改连接目标。</li>
        <li><strong>Connecting：</strong>尚未完成候选确认、加密握手或路径提交。</li>
        <li><strong>Offline：</strong>对端不在线或当前没有可用路径。</li>
      </ul>

      <h2 id="not-wireguard">与 WireGuard 的关系</h2>
      ${callout(
        "info",
        "WireGuard-like，不是 WireGuard",
        "P2WLAN 使用 X25519、ChaCha20-Poly1305、BLAKE2s 等组件构建 Noise 风格数据面，但不是官方 WireGuard 实现，也不声明与 WireGuard 配置或协议互操作。"
      )}`,
  },
  {
    path: "/docs/nat-traversal/",
    group: "网络原理",
    title: "NAT 穿透",
    description: "P2WLAN 如何使用 STUN、端口映射、预测候选与有界探测尝试 UDP Direct。",
    keywords: ["NAT", "STUN", "CGNAT", "对称 NAT", "UDP 打洞", "birthday probing"],
    body: () => `
      <p class="doc-lead">NAT 穿透的目标是在不手工开放入站端口的前提下，让两端发现并同时探测可用的 UDP 映射。任何实现都不能保证在所有 NAT、防火墙和运营商网络下成功。</p>

      <h2 id="candidate-types">候选来源</h2>
      <ul>
        <li><strong>Host candidate：</strong>本地接口地址，适合同一局域网。</li>
        <li><strong>Server-reflexive candidate：</strong>通过 STUN 观察到的公网 IP 与端口。</li>
        <li><strong>Port mapping candidate：</strong>短期 UPnP IGD、PCP 或 NAT-PMP 映射。</li>
        <li><strong>Predicted candidate：</strong>根据多个观察结果推断可能的对端映射。</li>
        <li><strong>Birthday probing candidate：</strong>对特定 NAT profile 生成有界端口集合。</li>
      </ul>

      <h2 id="why-hard">为什么 Hard NAT 难</h2>
      <p>对称 NAT 可能为不同目的地址分配不同外部端口，映射序列还可能受并发流量、超时和运营商 CGNAT 影响。一个 STUN 服务器看到的端口不一定就是发往对端时使用的端口。</p>

      <h2 id="fresh-mapping">Fresh mapping 与预测</h2>
      <p>当前 daemon 包含 fresh-socket measure-then-punch 路径：使用新 UDP socket 依次测量多个观察点，建模端口分配步骤，再从同一 socket 向预测端点发起探测。预测候选默认启用，但它仍是概率性策略，不是确定性保证。</p>

      <h2 id="bounded-techniques">有界增强策略</h2>
      <div class="definition-grid">
        <article><strong>Port mapping</strong><p>尝试路由器支持的 UPnP / PCP / NAT-PMP，默认开启。</p></article>
        <article><strong>Birthday probing</strong><p>当 NAT profile 合适时，对有限候选集合并行探测，默认开启。</p></article>
        <article><strong>Socket pool</strong><p>为 Hard NAT 提供 2–4 个 UDP socket 的实验能力，默认关闭。</p></article>
        <article><strong>UDP liveness</strong><p>在扩展扫描没有 ACK 时帮助区分 UDP 出站被阻断与端口预测失败。</p></article>
      </div>

      <h2 id="failure-causes">Direct 常见失败原因</h2>
      <ul>
        <li>双端对称 NAT 或大规模 CGNAT 的映射不可预测。</li>
        <li>企业、校园或酒店网络阻断未知 UDP。</li>
        <li>云安全组只允许 TCP，或宿主机防火墙丢弃 UDP。</li>
        <li>设备在探测期间切换 Wi-Fi、蜂窝、VPN 或代理。</li>
        <li>候选过期、时钟/调度抖动或两端版本差异导致协同失败。</li>
      </ul>

      <h2 id="diagnostic-method">诊断方法</h2>
      ${code(`p2wlan doctor
p2wlan status --json
p2wlan logs -n 300`)}
      <p>记录两端相同时间窗口中的候选数量、NAT profile、probe wave、ACK、路径提交和 Relay 状态。只看一条“punch failed”日志无法判断根因。</p>

      <h2 id="safe-experiments">安全实验顺序</h2>
      <ol>
        <li>确认 Relay 能用，建立可用性基线。</li>
        <li>只开启默认 Direct 策略测试。</li>
        <li>比较不同网络组合，而不是只重复同一环境。</li>
        <li>一次只改变一个设置，例如 socket pool 或 STUN 列表。</li>
        <li>设置停止条件；不要进行无限端口扫描或无界探测。</li>
      </ol>`,
  },
  {
    path: "/docs/relay/",
    group: "网络原理",
    title: "Relay 回退",
    description: "理解 P2WLAN Relay 的加密边界、ticket 认证、TLS、元数据和路径策略。",
    keywords: ["Relay", "回退", "TLS", "ticket", "元数据", "relay-only"],
    body: () => `
      <p class="doc-lead">Relay 的目标是保证可用性：当 Direct 暂时无法建立时，两端仍通过中继交换加密数据帧。业务应用继续访问相同虚拟 IP。</p>

      <h2 id="encryption-boundary">加密边界</h2>
      <p>业务载荷在端点 daemon 中加密，Relay 转发 opaque encrypted frame，不负责解密业务内容。但“无法读取明文”不等于“看不到任何信息”。</p>
      <div class="comparison-grid">
        <article><h3>Relay 不应获得</h3><ul><li>业务 IP 包明文</li><li>SSH、RDP 或数据库载荷</li><li>端到端会话私钥</li></ul></article>
        <article><h3>Relay 仍可能观察</h3><ul><li>节点/设备标识</li><li>连接时间与持续时长</li><li>方向、频率和帧大小</li><li>来源网络地址</li></ul></article>
      </div>

      <h2 id="transport-tls">Relay TLS 与端到端加密</h2>
      <p>二者是不同层次：</p>
      <ul>
        <li><strong>端到端加密：</strong>保护业务载荷不被 Relay 解密。</li>
        <li><strong>Relay TLS：</strong>保护客户端到 Relay 的传输、服务端身份和额外元数据暴露面。</li>
      </ul>
      <p>生产 Relay 应配置 <code>RELAY_TLS_CERT</code> 与 <code>RELAY_TLS_KEY</code>。<code>RELAY_ALLOW_INSECURE_PLAINTEXT=true</code> 只适合隔离开发环境。</p>

      <h2 id="ticket-auth">Ticket 认证</h2>
      <p>Relay 默认要求认证，需要 ticket keyring、audience 与 region。Control Plane 为设备签发短期 Relay ticket，Relay 验证后才接受注册。关键配置包括：</p>
      ${code(`RELAY_REQUIRE_AUTH=true
RELAY_TICKET_KEYRING_JSON='{"active":"..."}'
RELAY_AUDIENCE=relay-tokyo-1
RELAY_REGION=ap-northeast
RELAY_TLS_CERT=/etc/p2wlan/tls/fullchain.pem
RELAY_TLS_KEY=/etc/p2wlan/tls/privkey.pem`)}
      <p>keyring JSON 的实际结构必须与当前源码和 Control Plane 配置保持一致，不要直接复制示意值上线。</p>

      <h2 id="capacity">容量与保护</h2>
      <p>Relay 提供有界 send queue、注册超时、idle timeout、最大连接数、最大 frame payload 和认证失败速率限制。默认监听地址为 <code>:18081</code>，默认最大连接数为 1000；生产容量需基于真实并发、带宽和帧大小压测。</p>

      <h2 id="path-policy">何时使用 Relay-only</h2>
      <p><code>path-policy relay-only</code> 适合以下受控场景：</p>
      <ul>
        <li>验证 Relay 可用性和容量。</li>
        <li>企业策略明确禁止 UDP P2P。</li>
        <li>排除 Direct 路径变量。</li>
      </ul>
      <p>它不应成为掩盖 NAT 穿透故障的长期默认值。正常用户优先使用 auto。</p>

      <h2 id="relay-unavailable">Relay 不可用时</h2>
      <p>检查 DNS/TLS、TCP 端口、ticket audience/region、keyring、时间、revocation feed 和连接上限。客户端与 Relay 两侧日志必须按同一时间窗口比对。</p>`,
  },
  {
    path: "/docs/self-hosting/",
    group: "部署与运维",
    title: "自托管 Control Plane 与 Relay",
    description: "从源码构建 P2WLAN Control Plane 和 Relay，配置 TLS、systemd、备份与升级。",
    keywords: ["自托管", "Control Plane", "Relay", "Docker", "Caddy", "systemd"],
    body: () => `
      <p class="doc-lead">P2WLAN 的 Control Plane 和 Relay 位于主仓库 <code>server/</code>。仓库目前没有承诺一键生产部署模板，因此本页明确区分“源码已有能力”和“运维示例”。</p>

      ${callout(
        "danger",
        "生产环境必须启用 TLS",
        "Control Plane 承载登录、token、设备凭据和信令。请在反向代理上提供 HTTPS/WSS；Relay 也应配置自己的 TLS 证书。"
      )}

      <h2 id="prerequisites">准备</h2>
      <ul>
        <li>一台具有稳定公网入口的 Linux 主机。</li>
        <li>域名，例如 <code>control.example.com</code> 和 <code>relay.example.com</code>。</li>
        <li>Go 1.23 或与当前 <code>server/go.mod</code> 兼容的工具链。</li>
        <li>反向代理与有效 TLS 证书。</li>
        <li>安全存储 JWT secret、Relay ticket keyring 和数据库备份。</li>
      </ul>

      <h2 id="build">从源码构建</h2>
      ${code(`git clone https://github.com/yhan-sun/p2wlan.git
cd p2wlan/server

go build -trimpath -o p2wlan-control .
go build -trimpath -o p2wlan-relay ./relay`)}

      <h2 id="control-env">Control Plane 配置</h2>
      <div class="table-wrap"><table><thead><tr><th>变量</th><th>默认值</th><th>用途</th></tr></thead><tbody>
        <tr><td><code>PORT</code></td><td>8080（Dockerfile 设为 18080）</td><td>HTTP 监听端口。</td></tr>
        <tr><td><code>DB_PATH</code></td><td><code>p2pnet.db</code></td><td>SQLite 数据库路径。</td></tr>
        <tr><td><code>JWT_SECRET</code></td><td>无</td><td>必填；缺失时服务拒绝启动。</td></tr>
        <tr><td><code>CONTROL_ALLOWED_ORIGINS</code></td><td>空</td><td>允许的浏览器 Origin，native 客户端通常不发送 Origin。</td></tr>
        <tr><td><code>CONTROL_TRUSTED_PROXY_CIDRS</code></td><td>空</td><td>可信反向代理 CIDR，用于安全处理 X-Forwarded-For。</td></tr>
      </tbody></table></div>
      ${code(`install -d -m 0750 /var/lib/p2wlan
export PORT=18080
export DB_PATH=/var/lib/p2wlan/p2pnet.db
export JWT_SECRET="$(openssl rand -hex 32)"
./p2wlan-control`)}

      <h2 id="control-container">Control Plane 容器</h2>
      <p>仓库提供 <code>server/Dockerfile</code>。它以非 root 用户运行，并将数据库放在 <code>/data</code>：</p>
      ${code(`cd server
docker build -t p2wlan-control:local .
docker run --rm \\
  -p 127.0.0.1:18080:18080 \\
  -e JWT_SECRET="$(openssl rand -hex 32)" \\
  -v /var/lib/p2wlan:/data \\
  p2wlan-control:local`)}

      <h2 id="reverse-proxy">HTTPS / WSS 反向代理示例</h2>
      <p>以下是运维示例，不是仓库内现成文件：</p>
      ${code(`control.example.com {
  reverse_proxy 127.0.0.1:18080
}`, "caddy")}
      <p>WebSocket 路由位于 <code>/api/v1/signals/ws</code>，现代 Caddy 会自动处理 Upgrade。使用其他代理时需确认 WSS 转发。</p>

      <h2 id="relay-env">Relay 最小安全配置</h2>
      ${code(`export RELAY_BIND=:18081
export RELAY_REQUIRE_AUTH=true
export RELAY_AUDIENCE=relay-1
export RELAY_REGION=ap-northeast
export RELAY_TICKET_KEYRING_JSON='REPLACE_WITH_CONTROL_MATCHING_KEYRING'
export RELAY_TLS_CERT=/etc/letsencrypt/live/relay.example.com/fullchain.pem
export RELAY_TLS_KEY=/etc/letsencrypt/live/relay.example.com/privkey.pem
./p2wlan-relay`)}
      <p>Relay 默认要求认证、默认不允许 plaintext。若配置 keyring、audience 或 region 缺失，启动会失败。这是安全保护，不应通过关闭认证绕过。</p>

      <h2 id="relay-options">Relay 常用变量</h2>
      <div class="table-wrap"><table><thead><tr><th>变量</th><th>默认</th><th>说明</th></tr></thead><tbody>
        <tr><td><code>RELAY_BIND</code></td><td>:18081</td><td>TCP 监听地址。</td></tr>
        <tr><td><code>RELAY_SEND_QUEUE</code></td><td>1024</td><td>每连接发送队列容量。</td></tr>
        <tr><td><code>RELAY_REGISTER_TIMEOUT</code></td><td>5s</td><td>注册超时。</td></tr>
        <tr><td><code>RELAY_IDLE_TIMEOUT</code></td><td>30s</td><td>空闲超时。</td></tr>
        <tr><td><code>RELAY_MAX_CONNECTIONS</code></td><td>1000</td><td>最大连接数。</td></tr>
        <tr><td><code>RELAY_METRICS_BIND</code></td><td>空</td><td>只读指标接口；默认关闭。</td></tr>
        <tr><td><code>RELAY_UDP_OBSERVER_BIND</code></td><td>空</td><td>可选 UDP observer / STUN 地址。</td></tr>
      </tbody></table></div>

      <h2 id="systemd">systemd 示例</h2>
      ${code(`[Unit]
Description=P2WLAN Control Plane
After=network-online.target
Wants=network-online.target

[Service]
User=p2wlan
Group=p2wlan
EnvironmentFile=/etc/p2wlan/control.env
ExecStart=/usr/local/bin/p2wlan-control
WorkingDirectory=/var/lib/p2wlan
Restart=on-failure
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ReadWritePaths=/var/lib/p2wlan

[Install]
WantedBy=multi-user.target`, "systemd")}
      <p>Relay 建议使用单独用户和 unit，并仅开放证书读取路径、必要监听端口和日志目录。部署前在你的发行版上验证 hardening 选项。</p>

      <h2 id="backup-upgrade">备份与升级</h2>
      <ol>
        <li>停止 Control Plane 或使用 SQLite 一致性备份方式。</li>
        <li>备份数据库、环境文件、ticket keyring 和反向代理配置。</li>
        <li>构建固定 tag，而不是直接部署不断变化的 main。</li>
        <li>在 staging 验证登录、设备注册、WebSocket、Relay ticket、Direct 与 Relay。</li>
        <li>升级后检查 <code>GET /health</code>、日志和数据库权限。</li>
      </ol>`,
  },
  {
    path: "/docs/security/",
    group: "部署与运维",
    title: "安全边界与威胁模型",
    description: "P2WLAN 的端到端加密、控制面、Relay 元数据、凭据与 Preview 风险说明。",
    keywords: ["安全", "端到端加密", "威胁模型", "HTTP", "TLS", "独立审计"],
    body: () => `
      <p class="doc-lead">安全判断必须区分业务数据面、控制面、Relay 传输、终端本身和发布供应链。任何一个层面安全，不代表整个系统自动安全。</p>

      ${callout(
        "warning",
        "尚未完成独立安全审计",
        "P2WLAN 当前是 Preview。本文描述设计边界，不构成第三方安全认证，也不保证不存在实现缺陷。"
      )}

      <h2 id="protected">数据面保护</h2>
      <p>端点之间使用 WireGuard-like Noise 加密会话，密码学组件包括 X25519、ChaCha20-Poly1305 与 BLAKE2s。Relay 只转发密文，不持有端到端会话私钥。</p>

      <h2 id="control-plane">控制面风险</h2>
      <p>Control Plane 处理账号登录、设备注册、虚拟 IP、在线状态、信令和 Relay ticket。即使业务数据端到端加密，控制面仍是高价值组件。</p>
      ${callout(
        "danger",
        "当前 CLI 默认地址使用 HTTP",
        "Linux CLI 源码当前默认控制面为 http://47.109.40.237:18080。该链路不提供 HTTPS 传输保护。请仅用独立测试密码；生产和敏感使用必须指定自托管 HTTPS 地址。"
      )}

      <h2 id="relay-metadata">Relay 可见元数据</h2>
      <p>Relay 无法按设计解密业务载荷，但可以观察连接来源、节点标识、时间、持续时长、方向、频率和 frame 大小。这些元数据可能足以推断通信关系或活动模式。</p>

      <h2 id="endpoint-security">终端安全</h2>
      <p>若设备本身被入侵，攻击者可以在加密前读取业务数据、窃取配置或控制虚拟网卡。应保护：</p>
      <ul>
        <li>配置文件、auth token、设备凭据和私钥的文件权限。</li>
        <li>daemon 二进制、更新来源和管理员授权。</li>
        <li>操作系统补丁、磁盘加密与登录凭据。</li>
        <li>SSH/RDP/数据库本身的认证；虚拟局域网不是应用层免认证。</li>
      </ul>

      <h2 id="self-host-checklist">自托管安全清单</h2>
      <ul class="check-list">
        <li>Control Plane 仅通过 HTTPS/WSS 暴露，内部 HTTP 只监听 loopback 或私网。</li>
        <li>JWT secret 使用高熵随机值，不提交到 Git。</li>
        <li>Relay 启用 TLS、ticket 认证、audience 和 region。</li>
        <li>metrics、diagnostics 和数据库不暴露公网。</li>
        <li>可信代理 CIDR 精确配置，避免信任任意 X-Forwarded-For。</li>
        <li>定期备份 SQLite，并验证恢复流程。</li>
        <li>固定 Release tag 和 SHA-256，保留升级回滚路径。</li>
      </ul>

      <h2 id="license">License 与保证</h2>
      <p>P2WLAN 使用 MIT License，允许个人与商业使用、修改和分发。MIT 同时声明软件按“现状”提供，不附带明示或暗示担保。官网不会增加“仅限非商业使用”的额外限制。</p>`,
  },
  {
    path: "/docs/troubleshooting/",
    group: "部署与运维",
    title: "故障排查",
    description: "按控制面、daemon、TUN、Direct、Relay、MTU 和移动端症状排查 P2WLAN。",
    keywords: ["故障排查", "doctor", "日志", "Direct 失败", "Relay 失败", "MTU"],
    body: () => `
      <p class="doc-lead">排障的第一原则是定位层次，而不是随机改配置。先保存两端时间、版本、网络环境、路径和日志，再逐步缩小范围。</p>

      <h2 id="minimum-evidence">最小证据集</h2>
      ${code(`p2wlan status
p2wlan status --json > status.json
p2wlan doctor
p2wlan logs -n 300 > p2wlan.log
p2wlan config show`)}
      <p>同时记录：两端 Release、操作系统、Wi-Fi/蜂窝/热点、是否使用其他 VPN/代理、问题发生的绝对时间和对端虚拟 IP。</p>

      <h2 id="symptom-matrix">症状矩阵</h2>
      <div class="table-wrap table-wrap--wide"><table><thead><tr><th>症状</th><th>优先检查</th><th>下一步</th></tr></thead><tbody>
        <tr><td>无法登录</td><td>控制面 URL、HTTP/HTTPS、DNS、时间、账号</td><td>curl /health；确认独立测试密码与服务日志。</td></tr>
        <tr><td>登录成功但 up 失败</td><td>daemon、管理员权限、TUN/Wintun</td><td>查看 daemon 日志和系统接口/路由。</td></tr>
        <tr><td>对端一直 Offline</td><td>账号/网络是否一致、对端进程、控制面在线状态</td><td>两端重查 status，不要只重启单端。</td></tr>
        <tr><td>Relay 可用但 Direct 失败</td><td>UDP、防火墙、NAT profile、候选与 probe</td><td>比较不同网络组合；查看 NAT 穿透文档。</td></tr>
        <tr><td>Direct 和 Relay 都失败</td><td>控制面、Relay TLS/ticket、网络出口</td><td>检查 Relay 服务端日志、端口和 audience。</td></tr>
        <tr><td>ping 通但 SSH/RDP 卡住</td><td>MTU、应用监听地址、主机防火墙</td><td>逐步降低 MTU，并检查业务端口。</td></tr>
        <tr><td>移动端偶发高延迟</td><td>省电、后台冻结、路径切换、Wi-Fi 调度</td><td>亮屏对照、记录 P95/P99 与路径。</td></tr>
      </tbody></table></div>

      <h2 id="control-check">控制面检查</h2>
      ${code(`curl -v https://control.example.com/health
# 预期响应体：ok`)}
      <p>自托管环境还要确认 WebSocket 反向代理、JWT secret、SQLite 权限和服务时间。HTTP 200 的 health 只说明进程可响应，不代表登录、信令和 ticket 全部正常。</p>

      <h2 id="tun-check">TUN 与路由</h2>
      ${code(`# Linux
ip link show p2wlan0
ip addr show p2wlan0
ip route

# macOS
ifconfig | grep -A6 utun
netstat -rn

# Windows PowerShell
Get-NetAdapter
Get-NetRoute`, "bash")}
      <p>不要复制粘贴删除路由命令，先确认接口和目标网段确实属于 P2WLAN。</p>

      <h2 id="direct-failure">Direct 失败</h2>
      <ol>
        <li>确认 UDP 出站未被阻断。</li>
        <li>检查云安全组和主机防火墙。</li>
        <li>测试一端换到手机热点，判断问题是否与固定 NAT 组合有关。</li>
        <li>查看候选、probe wave、ACK 和最终 path commit。</li>
        <li>仅在有基线后尝试 socket-pool 或其他实验设置。</li>
      </ol>

      <h2 id="relay-failure">Relay 失败</h2>
      <p>服务端重点检查 TLS 证书、ticket keyring、audience、region、注册超时、最大连接数和认证失败限制。客户端重点检查 Relay endpoint、系统时间和控制面是否成功签发 ticket。</p>

      <h2 id="mtu">MTU 问题</h2>
      <p>小 ping 正常但大包、TLS 或 RDP 卡顿时，可能存在 path MTU 问题。默认 MTU 为 1420，可逐步尝试 1380、1340 等较小值，每次重启网络并记录结果。</p>
      ${code(`p2wlan config set mtu 1380
p2wlan down
p2wlan up`)}

      <h2 id="support-bundle">提交问题</h2>
      <p>问题报告应包含可复现步骤、预期/实际结果、两端版本、网络拓扑和脱敏日志。不要上传密码、token、私钥或与问题无关的业务数据。</p>`,
  },
  {
    path: "/docs/development/",
    group: "项目",
    title: "开发与贡献",
    description: "P2WLAN 仓库结构、构建测试、文档事实来源和贡献要求。",
    keywords: ["开发", "贡献", "Rust", "Go", "Flutter", "CI"],
    body: () => `
      <p class="doc-lead">P2WLAN 是单仓库多语言项目。修改前先确定责任边界：Flutter 负责 UI，Rust 负责客户端数据面，Go 负责 Control Plane 与 Relay。</p>

      <h2 id="repository-layout">仓库结构</h2>
      ${code(`apps/flutter_client/   Flutter 桌面与移动客户端
client/daemon/        Rust daemon
client/cli/           Rust Linux CLI
client/tun/           虚拟网卡抽象
client/crypto/        加密组件
server/               Go Control Plane
server/relay/         Go Relay
scripts/              安装、验证与网络测试脚本
.github/workflows/    CI 与 Release`, "text")}

      <h2 id="build-server">Go 服务</h2>
      ${code(`cd server
go test ./...
go build -o p2wlan-control .
go build -o p2wlan-relay ./relay`)}

      <h2 id="build-rust">Rust workspace</h2>
      ${code(`cargo fmt --all -- --check
cargo test --workspace
cargo clippy --workspace --all-targets -- -D warnings
cargo build --release`)}
      <p>实际 CI 可能按平台拆分任务；提交前应查看当前 workflow，而不是假设本机一个命令覆盖所有 Windows、macOS、Linux、Android 行为。</p>

      <h2 id="build-flutter">Flutter 客户端</h2>
      ${code(`cd apps/flutter_client
flutter pub get
flutter analyze
flutter test`)}
      <p>平台打包还依赖相应 SDK、签名、Rust daemon 产物和集成脚本。不要把“Flutter UI 构建成功”当作完整客户端可用。</p>

      <h2 id="change-discipline">改动纪律</h2>
      <ul class="check-list">
        <li>网络状态机改动必须提供可重复测试和诊断证据。</li>
        <li>跨平台改动说明未验证的平台，不伪造通过结论。</li>
        <li>安全相关默认值应失败关闭，而不是静默降级到不安全模式。</li>
        <li>配置、命令和 Release 文件名变化必须同步文档。</li>
        <li>不要把测试 harness 开关暴露为普通生产功能。</li>
      </ul>

      <h2 id="documentation-source">文档事实来源</h2>
      <ol>
        <li>Release tag 下的源码和测试。</li>
        <li>CI / Release workflow。</li>
        <li>公开 README 和代码内配置说明。</li>
        <li>官网的解释性文档。</li>
      </ol>
      <p>当官网与源码冲突时，应修复官网并以源码为准。本站构建会检查禁用的跨项目残留、无效内部链接和基础元数据。</p>

      <h2 id="reporting">提交 Issue / PR</h2>
      <p>Issue 请包含版本、平台、网络组合、复现率、路径、诊断 JSON 和脱敏日志。PR 应控制范围、说明风险、列出验证矩阵并避免无关格式化。</p>`,
  },
  {
    path: "/docs/faq/",
    group: "项目",
    title: "常见问题",
    description: "关于 P2WLAN、WireGuard、Relay、自托管、平台支持和生产使用的常见问题。",
    keywords: ["FAQ", "WireGuard", "公网 IP", "商业使用", "生产环境"],
    body: () => `
      <p class="doc-lead">这里集中回答产品边界。遇到具体故障时，请转到故障排查并保存两端证据。</p>

      <h2 id="wireguard">P2WLAN 是 WireGuard 吗？</h2>
      <p>不是。它使用 WireGuard-like Noise 数据面和相似密码学组件，但不是官方 WireGuard 实现，也不声明协议或配置互操作。</p>

      <h2 id="public-ip">使用端设备需要公网 IP 吗？</h2>
      <p>通常不需要。P2WLAN 会尝试 UDP NAT 穿透；失败时可以使用 Relay。自托管 Control Plane / Relay 则需要客户端可访问的稳定入口。</p>

      <h2 id="always-direct">所有网络都能 Direct 吗？</h2>
      <p>不能保证。双端对称 NAT、CGNAT、企业防火墙、酒店/校园网和 UDP 阻断都可能让打洞失败。</p>

      <h2 id="relay-plaintext">Relay 能看到业务明文吗？</h2>
      <p>按设计不能。业务载荷在端点加密，Relay 转发密文；但 Relay 仍能看到连接元数据。</p>

      <h2 id="application-auth">加入虚拟网后，SSH 或数据库还需要密码吗？</h2>
      <p>需要。P2WLAN 只提供网络连接与数据面加密，不替代 SSH key、RDP 身份验证、数据库账号、TLS 和主机防火墙。</p>

      <h2 id="self-host">可以完全自托管吗？</h2>
      <p>Control Plane 和 Relay 源码均在主仓库。生产部署需要你自行配置域名、HTTPS/WSS、Relay TLS、密钥、备份、监控和升级。</p>

      <h2 id="commercial">可以商业使用吗？</h2>
      <p>项目采用 MIT License，允许商业使用、修改和分发，但软件按“现状”提供，不附带担保。</p>

      <h2 id="production">现在适合生产吗？</h2>
      <p>项目处于 Preview，尚未完成独立安全审计。可用于真实网络测试、自托管和开发验证；高敏感生产环境需要自行完成代码审阅、威胁建模、压测、密钥管理和应急预案。</p>

      <h2 id="ios">为什么 iOS 不能直接安装？</h2>
      <p>当前 Release 是未签名 IPA，需要自己的签名和 provisioning。它不是 App Store 分发版本。</p>`,
  },
];

function releaseBadge(release) {
  return `<span class="release-pill"><span class="release-pill__dot"></span>${escapeHtml(
    release.tag
  )}<small>${formatDate(release.publishedAt)}</small></span>`;
}

function findAsset(release, key) {
  return normalizeAssets(release).find((asset) => asset.key === key);
}

function downloadLink(asset, label, className = "button button--primary") {
  if (!asset) return `<a class="${className}" href="${SITE.releases}">${label}</a>`;
  return `<a class="${className}" href="${escapeHtml(asset.url)}" data-download-key="${asset.key}">${label}</a>`;
}

export function renderHome({ release }) {
  const windows = findAsset(release, "windows-x64");
  return `
    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__mesh" aria-hidden="true"></div>
        <div class="container hero__grid">
          <div class="hero__copy reveal">
            <div class="hero__meta">${releaseBadge(release)}<span class="status-chip">Open source · MIT</span></div>
            <p class="eyebrow">Encrypted virtual LAN · P2P first</p>
            <h1 id="hero-title">让分散在不同网络的设备，<span>像在同一个局域网。</span></h1>
            <p class="hero__lead">P2WLAN 优先建立局域网或公网 UDP 直连；复杂网络下自动回退到加密 Relay。桌面、移动、Linux CLI 和服务端都可以自托管。</p>
            <div class="hero__actions">
              <a class="button button--primary button--large" href="/download/" data-smart-download>下载 ${escapeHtml(
                release.tag
              )}</a>
              <a class="button button--secondary button--large" href="/docs/getting-started/">五分钟开始</a>
            </div>
            <div class="hero__trust"><span>✓ P2P 优先</span><span>✓ 端到端加密数据面</span><span>✓ Relay 自动回退</span><span>✓ 可自托管</span></div>
          </div>

          <div class="network-demo reveal" data-network-demo aria-label="P2WLAN 连接路径交互演示">
            <div class="network-demo__header"><div><span class="eyebrow">Live path model</span><h2>连接路径会自己选择</h2></div><span class="path-badge" data-path-badge>Direct</span></div>
            <div class="network-stage" data-stage="home">
              <div class="stage-grid" aria-hidden="true"></div>
              <div class="device-node device-node--a"><span class="device-node__icon">A</span><strong>MacBook</strong><small>10.20.0.2</small></div>
              <div class="device-node device-node--b"><span class="device-node__icon">B</span><strong>Home Server</strong><small>10.20.0.5</small></div>
              <div class="control-node"><span>Control</span><small>identity · signaling</small></div>
              <div class="relay-node"><span>Relay</span><small>encrypted frames</small></div>
              <svg class="network-lines" viewBox="0 0 720 350" role="img" aria-label="设备、控制面和 Relay 连接图">
                <path class="line line--control line--control-a" d="M152 92 C265 38 330 54 360 94" />
                <path class="line line--control line--control-b" d="M568 92 C455 38 390 54 360 94" />
                <path class="line line--direct" data-direct-line d="M166 174 C280 126 440 126 554 174" />
                <path class="line line--relay-a" data-relay-line d="M166 190 C260 278 310 286 360 278" />
                <path class="line line--relay-b" data-relay-line d="M554 190 C460 278 410 286 360 278" />
              </svg>
              <div class="packet packet--one" aria-hidden="true"></div><div class="packet packet--two" aria-hidden="true"></div>
            </div>
            <div class="scenario-tabs" role="tablist" aria-label="网络场景">
              <button type="button" class="is-active" data-scenario="home">普通家庭 NAT</button>
              <button type="button" data-scenario="lan">同一局域网</button>
              <button type="button" data-scenario="hard">双端 Hard NAT</button>
              <button type="button" data-scenario="blocked">UDP 被阻断</button>
            </div>
            <div class="scenario-result"><strong data-scenario-title>Public UDP Direct</strong><p data-scenario-copy>通过 STUN 候选和双向探测建立公网 UDP 直连，Relay 保持后备。</p></div>
          </div>
        </div>
      </section>

      <section class="signal-bar" aria-label="项目状态"><div class="container signal-bar__inner"><span>Latest <strong>${escapeHtml(
        release.tag
      )}</strong></span><span>${normalizeAssets(release).length} 个平台资产</span><span>Flutter + Rust + Go</span><span>Preview · 未独立安全审计</span></div></section>

      <section class="section" id="use-cases"><div class="container"><div class="section-heading reveal"><p class="eyebrow">Use cases</p><h2>不是再造一个聊天工具，而是把普通网络应用直接连起来</h2><p>建立虚拟 IP 后，现有工具不需要理解 NAT、候选或 Relay。</p></div>
        <div class="feature-grid feature-grid--three">
          <article class="feature-card reveal"><div class="feature-card__number">01</div><h3>远程开发与运维</h3><p>通过虚拟 IP 使用 SSH、RDP、数据库、Web 管理面板，不为每个服务维护公网端口。</p><span>SSH · RDP · DB</span></article>
          <article class="feature-card reveal"><div class="feature-card__number">02</div><h3>HomeLab 与 NAS</h3><p>连接家中服务器、NAS、软路由和云主机；Direct 不通时保留 Relay 可用性。</p><span>NAS · Media · Admin</span></article>
          <article class="feature-card reveal"><div class="feature-card__number">03</div><h3>跨地域测试网络</h3><p>在家庭宽带、校园网、移动热点和不同云厂商间验证真实 NAT 与路径行为。</p><span>CGNAT · Mobile · Cloud</span></article>
        </div>
      </div></section>

      <section class="section section--tinted" id="product"><div class="container product-grid"><div class="section-heading reveal"><p class="eyebrow">One virtual network</p><h2>把复杂路径收敛成一个稳定的虚拟 IP</h2><p>应用只连接 <code>10.20.x.x</code>。daemon 在底层处理 TUN、加密、候选、路径提交和回退。</p><ul class="check-list"><li>路径状态清晰区分 LAN Direct、Direct 与 Relay。</li><li>Linux CLI 提供 status、doctor、logs 与完整配置入口。</li><li>Control Plane 与 Relay 均可部署在自己的 Linux 主机。</li></ul><a class="text-link" href="/docs/networking/">理解连接模型 <span>→</span></a></div>
        <div class="app-preview reveal" aria-label="P2WLAN 客户端信息结构预览"><div class="app-preview__chrome"><span></span><span></span><span></span><b>P2WLAN</b></div><div class="app-preview__body"><aside><div class="app-mark">P</div><i class="active"></i><i></i><i></i><i></i></aside><div class="app-main"><div class="app-main__top"><div><small>Virtual network</small><strong>default</strong></div><span class="online-dot">Connected</span></div><div class="app-stat-row"><div><small>Virtual IP</small><strong>10.20.0.2</strong></div><div><small>Peers online</small><strong>3</strong></div><div><small>Current path</small><strong>Direct</strong></div></div><div class="peer-list"><div><span class="peer-avatar">H</span><div><strong>Home Server</strong><small>10.20.0.5 · 12 ms</small></div><b class="direct-label">Direct</b></div><div><span class="peer-avatar">W</span><div><strong>Windows PC</strong><small>10.20.0.8 · 28 ms</small></div><b class="relay-label">Relay</b></div><div><span class="peer-avatar">A</span><div><strong>Android</strong><small>10.20.0.11 · offline</small></div><b class="offline-label">Offline</b></div></div></div></div><p class="preview-caption">信息结构预览，不代表特定 Release 的逐像素界面。</p></div>
      </div></section>

      <section class="section" id="how-it-works"><div class="container"><div class="section-heading section-heading--center reveal"><p class="eyebrow">How it works</p><h2>协调、直连与回退各司其职</h2></div><div class="process-grid"><article class="process-card reveal"><span>1</span><h3>Control Plane 协调</h3><p>认证设备、分配虚拟 IP、交换候选和信令，并签发 Relay ticket。</p></article><article class="process-card reveal"><span>2</span><h3>尝试 UDP Direct</h3><p>收集 LAN、STUN、端口映射和预测候选，执行有界双向探测。</p></article><article class="process-card reveal"><span>3</span><h3>建立加密会话</h3><p>端点使用 WireGuard-like Noise 数据面保护业务载荷。</p></article><article class="process-card reveal"><span>4</span><h3>Relay 保证可用性</h3><p>Direct 暂不可用时转发密文，后续仍可继续尝试更优路径。</p></article></div></div></section>

      <section class="section section--dark" id="security"><div class="container security-grid"><div class="section-heading reveal"><p class="eyebrow">Security boundaries</p><h2>明确说明保护了什么，也明确说明没有承诺什么</h2><p>业务数据面加密、Relay TLS、控制面 HTTPS、终端安全和发布供应链是不同层次。</p><a class="button button--ghost" href="/docs/security/">阅读安全边界</a></div><div class="boundary-list reveal"><article><span>Protected</span><h3>端点间业务载荷</h3><p>Relay 按设计不持有会话私钥，转发 opaque encrypted frames。</p></article><article><span>Visible metadata</span><h3>连接关系与流量特征</h3><p>Relay 仍可能看到节点标识、时间、方向和帧大小。</p></article><article class="boundary-list__warning"><span>Preview risk</span><h3>未完成独立安全审计</h3><p>高敏感生产环境必须自行完成评估；当前 CLI 默认公共控制面还使用 HTTP。</p></article></div></div></section>

      <section class="section" id="platforms"><div class="container"><div class="section-heading reveal"><p class="eyebrow">Cross-platform</p><h2>从桌面到服务器，选择对应客户端</h2></div><div class="platform-grid">
        ${normalizeAssets(release)
          .slice(0, 8)
          .map(
            (asset) => `<article class="platform-card reveal"><div class="platform-card__top"><span>${asset.platform.slice(
              0,
              1
            )}</span><small>${asset.status}</small></div><h3>${asset.platform}</h3><p>${asset.detail}</p><div class="platform-card__footer"><span>${formatBytes(
              asset.size
            )}</span><a href="${escapeHtml(asset.url)}">下载</a></div></article>`
          )
          .join("")}
      </div><div class="section-cta reveal"><div><strong>不确定该下载哪个？</strong><p>下载页会根据当前系统推荐，并列出每个资产的 SHA-256。</p></div><a class="button button--primary" href="/download/">打开下载中心</a></div></div></section>

      <section class="section section--docs" id="docs"><div class="container docs-promo"><div class="docs-promo__copy reveal"><p class="eyebrow">Documentation</p><h2>从“能跑”到“知道为什么”</h2><p>文档已按客户端、网络原理、部署运维和项目开发重组，每页拥有独立 URL、目录与全文搜索。</p><div class="hero__actions"><a class="button button--primary" href="/docs/">打开文档</a><button class="button button--secondary" type="button" data-open-search>搜索文档 <kbd>⌘ K</kbd></button></div></div><div class="docs-promo__links reveal"><a href="/docs/getting-started/"><span>Start</span><strong>五分钟快速开始</strong><small>安装、登录、第一次组网</small></a><a href="/docs/nat-traversal/"><span>Network</span><strong>NAT 穿透</strong><small>STUN、预测候选与 Hard NAT</small></a><a href="/docs/self-hosting/"><span>Deploy</span><strong>自托管</strong><small>Control Plane、Relay 与 TLS</small></a><a href="/docs/troubleshooting/"><span>Operate</span><strong>故障排查</strong><small>按层次收集证据</small></a></div></div></section>

      <section class="final-cta"><div class="container final-cta__inner reveal"><div><p class="eyebrow">Build your own network</p><h2>从两台设备开始，验证第一条加密路径。</h2><p>${escapeHtml(release.tag)} · ${formatDate(
    release.publishedAt
  )} · Preview</p></div><div class="hero__actions">${downloadLink(
    windows,
    "下载最新版",
    "button button--light button--large"
  )}<a class="button button--outline-light button--large" href="${SITE.repository}">查看源码</a></div></div></section>
    </main>`;
}

export function renderDownload({ release }) {
  const assets = normalizeAssets(release);
  return `
    <main class="page-main">
      <section class="page-hero page-hero--download"><div class="container"><div class="page-hero__copy reveal"><p class="eyebrow">Download center</p><h1>下载 P2WLAN ${escapeHtml(
        release.tag
      )}</h1><p>根据平台选择官方 GitHub Release 资产。每个文件都展示大小与 SHA-256，安装前可直接校验。</p><div class="page-hero__meta">${releaseBadge(
    release
  )}<span class="status-chip">${assets.length} assets</span></div></div></div></section>
      <section class="section section--tight"><div class="container"><div class="smart-download reveal" data-smart-panel><div><p class="eyebrow">Recommended for this device</p><h2 data-smart-title>正在识别你的系统…</h2><p data-smart-description>你仍可以从下方手动选择全部平台资产。</p></div><a class="button button--primary button--large" href="${SITE.releases}" data-smart-download>查看推荐下载</a></div>
        <div class="download-grid">
          ${assets
            .map(
              (asset) => `<article class="download-card reveal" id="${asset.key}" data-platform-card="${asset.key}"><div class="download-card__head"><span class="download-card__icon">${asset.platform.slice(
                0,
                1
              )}</span><div><small>${asset.status}</small><h2>${asset.platform}</h2><p>${asset.detail}</p></div></div><dl><div><dt>文件</dt><dd><code>${escapeHtml(
                asset.name
              )}</code></dd></div><div><dt>大小</dt><dd>${formatBytes(asset.size)}</dd></div><div><dt>SHA-256</dt><dd><code class="digest">${escapeHtml(
                asset.digest?.replace(/^sha256:/, "") || "GitHub 未提供"
              )}</code></dd></div></dl><div class="download-card__actions"><a class="button button--primary" href="${escapeHtml(
                asset.url
              )}" data-download-key="${asset.key}">下载安装包</a><button class="button button--secondary" type="button" data-copy-text="${escapeHtml(
                asset.digest?.replace(/^sha256:/, "") || ""
              )}">复制 SHA-256</button></div></article>`
            )
            .join("")}
        </div>
        <div class="download-notes"><article class="reveal"><h2>安装前</h2><ul><li>确认域名为 <code>github.com</code>。</li><li>核对 SHA-256 与本站展示一致。</li><li>Preview 构建触发系统提示时，不要跳过来源检查。</li></ul></article><article class="reveal"><h2>移动端说明</h2><ul><li>Android APK 需要侧载和 VPN 权限。</li><li>iOS IPA 未签名，需要自行签名。</li><li>移动后台稳定性受系统电池策略影响。</li></ul></article><article class="reveal"><h2>完整 Release</h2><p>需要历史版本、源码压缩包或查看发布记录时，前往 GitHub Releases。</p><a class="text-link" href="${escapeHtml(
          release.url
        )}">查看 ${escapeHtml(release.tag)} Release <span>→</span></a></article></div>
      </div></section>
    </main>`;
}

export function renderChangelog({ release }) {
  return `
    <main class="page-main"><section class="page-hero"><div class="container"><div class="page-hero__copy reveal"><p class="eyebrow">Release status</p><h1>版本与项目状态</h1><p>官网自动同步最新正式 Release 的版本、时间、下载资产和摘要；详细变更以 GitHub Release 与对应 tag 为准。</p></div></div></section><section class="section section--tight"><div class="container narrow"><article class="release-panel reveal"><div class="release-panel__top"><div><span class="status-chip">Latest stable preview</span><h2>${escapeHtml(
    release.tag
  )}</h2><p>发布于 ${formatDate(release.publishedAt)}</p></div><a class="button button--primary" href="${escapeHtml(
    release.url
  )}">查看 GitHub Release</a></div><div class="release-panel__stats"><div><strong>${normalizeAssets(release).length}</strong><span>平台资产</span></div><div><strong>MIT</strong><span>开源许可</span></div><div><strong>Preview</strong><span>成熟度</span></div></div></article><section class="prose-block reveal"><h2>如何理解版本</h2><p>Release 表示已经由发布工作流生成并上传的预编译资产。主分支可能包含尚未发布的修改，文档不会把这些改动自动描述为当前 Release 已支持。</p><h2>发布安全边界</h2><p>GitHub 为资产提供 SHA-256 digest，本站会同步展示。摘要一致不是独立安全审计、代码签名或可复现构建证明。</p><h2>获取历史版本</h2><p>历史 Release、源代码归档和完整发布记录均保留在 GitHub。遇到回归时，请记录“正常的最后版本”和“首次异常版本”。</p></section></div></section></main>`;
}
