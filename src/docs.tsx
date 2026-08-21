import { type ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileCheck2,
  KeyRound,
  ListChecks,
  MonitorDown,
  MousePointer2,
  Network,
  PanelLeft,
  Play,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  TerminalSquare,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Callout,
  CodeBlock,
  DocImage,
  IssuesLink,
  Kbd,
  ReleaseLink,
  Steps,
} from "./docs-components";

const EASE: [number, number, number, number] = [0.2, 0, 0, 1];
const revealInitial = { opacity: 0, y: 22 };
const revealInView = { opacity: 1, y: 0 };
const revealTransition = { duration: 0.56, ease: EASE };

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : revealInitial}
      whileInView={reduceMotion ? undefined : revealInView}
      viewport={{ once: true, amount: 0.12 }}
      transition={revealTransition}
    >
      {children}
    </motion.div>
  );
}

export const REPO = "https://github.com/yhan-sun/p2wlan";
export const RELEASES = `${REPO}/releases`;
export const DOCS_VERSION = "v0.1-preview";
export const DOCS_VERIFIED_DATE = "2026-08-21";

export interface DocPage {
  id: string;
  label: string;
  group: string;
  summary: string;
  keywords: string[];
  reading: string;
  level: "入门" | "基础" | "进阶";
  goal: string;
  prerequisite: string;
  outcome: string;
}

export interface DocEntry {
  over: string;
  title: string;
  desc: string;
  body: ReactNode;
}

export const DOC_PAGES: DocPage[] = [
  {
    id: "intro",
    label: "文档首页",
    group: "开始",
    summary: "了解产品定位、能力边界与推荐阅读路径。",
    keywords: ["介绍", "能力", "发行版", "Preview"],
    reading: "6 分钟",
    level: "入门",
    goal: "确认完整发行版、公开源码与文档范围，选择最适合自己的阅读路径。",
    prerequisite: "无需安装软件。",
    outcome: "知道从哪里下载、哪些能力可用，以及下一篇应该读什么。",
  },
  {
    id: "install",
    label: "下载与安装",
    group: "开始",
    summary: "为 Windows 或 macOS 选择正确的发行包。",
    keywords: ["Windows", "macOS", "安装包", "便携版", "DMG", "EXE"],
    reading: "8 分钟",
    level: "入门",
    goal: "按操作系统、处理器架构和使用方式选择正确安装包。",
    prerequisite: "能访问官方 GitHub Releases，并知道电脑的系统类型。",
    outcome: "应用安装完成或便携版已正确解压，能够从固定位置启动。",
  },
  {
    id: "verify",
    label: "校验安装包",
    group: "开始",
    summary: "使用 SHA-256 核对从 Releases 下载的文件。",
    keywords: ["checksum", "SHA256", "安全", "签名"],
    reading: "5 分钟",
    level: "入门",
    goal: "用 Release 提供的 SHA-256 摘要确认下载文件没有损坏或被替换。",
    prerequisite: "安装包与 checksums.sha256 来自同一个 Release。",
    outcome: "本机计算出的 64 位摘要与校验表完全一致。",
  },
  {
    id: "first-run",
    label: "5 分钟快速上手",
    group: "开始",
    summary: "完成连接、验证与第一次端到端连通。",
    keywords: ["首次启动", "设置", "快速开始", "ping"],
    reading: "7 分钟",
    level: "入门",
    goal: "从空白状态完成安装、启动守护进程，并用一条端到端连通验证环境。",
    prerequisite: "应用已安装，准备一个可写目录与一台可连通的对端设备。",
    outcome: "虚拟网卡已启动，能通过虚拟 IP ping 通对端，并能读取连接路径状态。",
  },
  {
    id: "interface",
    label: "界面与导航",
    group: "开始",
    summary: "认识 Dashboard、设备、隧道与诊断视图。",
    keywords: ["界面", "Dashboard", "导航", "托盘", "诊断", "CLI"],
    reading: "6 分钟",
    level: "入门",
    goal: "理解主要区域的职责，并能从任何页面快速到达目标功能。",
    prerequisite: "至少启动过一次应用。",
    outcome: "能独立找到设备、隧道、诊断与设置入口。",
  },
  {
    id: "account",
    label: "连接控制面",
    group: "基础使用",
    summary: "登录控制面、注册设备与管理凭据。",
    keywords: ["登录", "设备", "虚拟 IP", "凭据", "JWT"],
    reading: "8 分钟",
    level: "基础",
    goal: "安全完成控制面登录，理解设备注册与凭据状态。",
    prerequisite: "控制面可达，或已自托管一台公网 Linux 服务器。",
    outcome: "设备注册成功，获得稳定虚拟 IP，登录状态校验通过。",
  },
  {
    id: "tunnel",
    label: "连接路径与诊断",
    group: "基础使用",
    summary: "理解直连、中继与离线状态，学会读诊断信息。",
    keywords: ["直连", "中继", "路径", "RTT", "candidates", "doctor"],
    reading: "7 分钟",
    level: "基础",
    goal: "掌握五种连接路径的含义，并能用 CLI 与诊断接口定位网络问题。",
    prerequisite: "设备已注册并启动守护进程。",
    outcome: "能根据当前路径判断网络状况，并跑通一次 doctor 诊断。",
  },
  {
    id: "self-host",
    label: "自托管控制面与中继",
    group: "内容管理",
    summary: "把控制面、数据库与中继部署在自己的服务器上。",
    keywords: ["Go", "SQLite", "relay", "TLS", "JWT", "反向代理"],
    reading: "12 分钟",
    level: "基础",
    goal: "在自己的公网 Linux 服务器上部署控制面与中继，并理解 TLS 与凭据要求。",
    prerequisite: "有一台公网 Linux 服务器，开放 443 入站。",
    outcome: "控制面与中继运行中，客户端能注册并建立加密连接。",
  },
  {
    id: "crypto",
    label: "协议边界与安全模型",
    group: "内容管理",
    summary: "理解加密数据面、设备认证与中继可见范围。",
    keywords: ["Noise", "X25519", "ChaCha20-Poly1305", "Ed25519", "DERP"],
    reading: "10 分钟",
    level: "基础",
    goal: "理解数据面握手、设备认证职责划分，以及谁能看到什么数据。",
    prerequisite: "已理解连接路径与自托管部署。",
    outcome: "能向他人解释中继为何只看到元数据，以及生产部署需要补什么。",
  },
  {
    id: "troubleshooting",
    label: "故障排查",
    group: "安全与帮助",
    summary: "按启动、连接、直连、中继和自托管分类定位问题。",
    keywords: ["无法启动", "直连失败", "中继", "MTU", "日志", "Issue"],
    reading: "15 分钟",
    level: "基础",
    goal: "按症状走完最短排查路径，避免同时修改多个变量。",
    prerequisite: "准备系统版本、应用版本、安装方式和脱敏错误文本。",
    outcome: "问题得到解决，或形成足够清楚且不含敏感信息的 Issue。",
  },
  {
    id: "faq",
    label: "常见问题",
    group: "安全与帮助",
    summary: "快速了解费用、平台、源码、风险和反馈渠道。",
    keywords: ["收费", "开源", "Linux", "Intel", "平台", "反馈"],
    reading: "8 分钟",
    level: "入门",
    goal: "快速确认费用、平台、源码、更新、账号和进阶能力边界。",
    prerequisite: "无。",
    outcome: "常见疑问得到直接回答，并能跳转到对应详细章节。",
  },
];

export const DOC_CONTENT: Record<string, DocEntry> = {
  intro: {
    over: "DOCUMENTATION",
    title: "P2WLAN 使用文档",
    desc: "从正确下载安装包开始，逐步掌握连接、自托管、协议边界与故障排查。",
    body: (
      <>
        <div className="doc-lead">
          <span>完整发行版</span>
          <strong>Rust 守护进程 + Flutter 客户端</strong>
          <p>
            客户端、Rust 守护进程、Go 控制面与中继全部开源，Release 产物免费分发。
            请从 GitHub 官方仓库下载。
          </p>
        </div>

        <h2>先确认你需要哪一种</h2>
        <div className="doc-grid">
          <a href="#/docs/install">
            <MonitorDown />
            <b>直接使用软件</b>
            <span>普通用户从 Releases 下载完整桌面应用，不需要自行编译。</span>
            <ArrowRight />
          </a>
          <a href="#/docs/first-run">
            <CheckCircle2 />
            <b>完成首次配置</b>
            <span>启动守护进程，用一台对端设备验证端到端连通。</span>
            <ArrowRight />
          </a>
          <a href="#/docs/self-host">
            <Network />
            <b>自托管控制面</b>
            <span>把控制面与中继部署在自己的服务器上，数据自己掌控。</span>
            <ArrowRight />
          </a>
        </div>

        <h2>产品能力地图</h2>
        <div className="capability-map">
          <div>
            <MousePointer2 />
            <strong>连接</strong>
            <span>虚拟网卡、UDP 直连、NAT 打洞、中继回退。</span>
          </div>
          <div>
            <Download />
            <strong>可观测</strong>
            <span>连接路径、延迟、端点候选与本地诊断 JSON。</span>
          </div>
          <div>
            <Play />
            <strong>自托管</strong>
            <span>Go 控制面、SQLite、中继服务与撤销源。</span>
          </div>
          <div>
            <ShieldCheck />
            <strong>安全</strong>
            <span>Noise 加密、Ed25519 认证、中继只转发密文。</span>
          </div>
        </div>

        <h2>发行版与公开源码的区别</h2>
        <p>
          GitHub Releases 提供完整可用的桌面应用。公开仓库中的源码是可运行的{" "}
          <strong>Open Shell</strong>，保留 React UI、组件、mock bridge、mock
          backend 和协作边界，不包含真实平台连接器、签名、Cookie
          处理、下载解析或发布密钥。
        </p>
        <Callout kind="warning" title="不要把公开 Demo 当作完整应用">
          <p>
            需要正常使用完整功能，请下载 Release。公开源码适合查看
            UI、改进体验和使用模拟数据进行开发。
          </p>
        </Callout>

        <h2>推荐阅读顺序</h2>
        <Steps
          items={[
            {
              title: "下载安装",
              text: <>根据系统与架构选择发行包。</>,
            },
            {
              title: "首次配置",
              text: <>启动守护进程，登录控制面并完成一次端到端验证。</>,
            },
            {
              title: "掌握核心流程",
              text: <>依次阅读连接路径、自托管、协议边界与故障排查。</>,
            },
            {
              title: "生产化前阅读",
              text: <>高敏感流量请先自行完成安全审查。</>,
            },
          ]}
        />
        <Callout title="唯一官方来源">
          <p>
            后续发行包以 <a href={REPO}>yhan-sun/p2wlan</a> 为准。
          </p>
        </Callout>
      </>
    ),
  },

  install: {
    over: "INSTALLATION",
    title: "下载与安装",
    desc: "先识别系统、处理器架构和发行包类型，再从官方 Releases 完成安装。",
    body: (
      <>
        <h2>当前发行平台</h2>
        <p>
          发行文件会随版本调整。以下依据当前主仓库 Release
          结构整理，下载时仍应以 Latest Release 的 Assets 为准。
        </p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>平台</th>
                <th>架构</th>
                <th>推荐文件</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>macOS</td>
                <td>Apple Silicon arm64</td>
                <td>
                  <code>p2wlan-flutter-macos-arm64.dmg</code>
                </td>
                <td>适用于 M1、M2、M3、M4 等 Apple 芯片。</td>
              </tr>
              <tr>
                <td>macOS</td>
                <td>Intel x64</td>
                <td>
                  <code>p2wlan-flutter-macos-x64.dmg</code>
                </td>
                <td>适用于 Intel Mac。</td>
              </tr>
              <tr>
                <td>Windows</td>
                <td>Windows 10/11 x64</td>
                <td>
                  <code>p2wlan-flutter-windows-x64-setup.exe</code>
                </td>
                <td>推荐，大多数用户直接安装。</td>
              </tr>
              <tr>
                <td>Linux</td>
                <td>x64 桌面 / arm64 服务器</td>
                <td>
                  <code>p2wlan-flutter-linux-x64.tar.gz</code>
                </td>
                <td>桌面诊断客户端；服务器与 NAS 走 CLI 包。</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Callout kind="warning" title="不要下载错文件">
          <p>
            <code>*.sig</code>、<code>latest.json</code>、
            <code>windows.json</code>、<code>darwin.json</code> 和 updater
            文件主要供更新机制使用，不是普通用户的安装入口。
          </p>
        </Callout>
        <ReleaseLink />

        <h2>macOS 安装</h2>
        <Steps
          items={[
            {
              title: "确认芯片",
              text: (
                <>
                  点击“ → 关于本机”，确认芯片显示 Apple M 系列或 Intel。
                  文件名中的 <code>arm64</code> 对应 Apple Silicon。
                </>
              ),
            },
            {
              title: "下载 DMG",
              text: (
                <>
                  Apple 芯片下载 <code>macos-arm64.dmg</code>，
                  Intel Mac 下载 <code>macos-x64.dmg</code>。
                </>
              ),
            },
            {
              title: "拖入应用程序",
              text: (
                <>
                  打开 DMG，将 P2WLAN 拖入“应用程序”文件夹，再从
                  应用程序目录启动。
                </>
              ),
            },
            {
              title: "处理首次打开提示",
              text: (
                <>
                  若系统阻止打开，请先确认来源与 checksum，然后在 Finder
                  中右键应用选择“打开”，或前往“隐私与安全性”确认。
                </>
              ),
            },
          ]}
        />
        <h3>仍然无法打开：移除下载隔离标记</h3>
        <p>
          如果已经从官方 Release 下载并完成 checksum 校验，但 macOS
          仍提示“无法验证开发者”或应用没有反应，可以先在 Finder
          中右键应用选择“打开”。如果仍被拦截，再在终端对这个明确的应用路径执行下面两行命令：
        </p>
        <CodeBlock label="Terminal">{`sudo xattr -r -d com.apple.quarantine "/Applications/P2WLAN.app"
open "/Applications/P2WLAN.app"`}</CodeBlock>
        <p>
          执行第一行时系统会要求输入你的 macOS
          登录密码；终端不会回显密码字符，输入完成后直接按回车即可。
        </p>
        <Callout kind="warning" title="只处理已核对的官方应用">
          <p>
            如果你把应用放在其他目录，请替换命令中的路径。不要对整个磁盘使用
            <code>xattr</code>，也不要用“关闭
            Gatekeeper”之类的方法绕过系统防护。
          </p>
        </Callout>

        <h2>Windows 安装</h2>
        <Steps
          items={[
            {
              title: "确认系统架构",
              text: (
                <>
                  打开“设置 → 系统 → 系统信息”，确认系统类型为 64
                  位操作系统、x64 处理器。
                </>
              ),
            },
            {
              title: "下载安装器",
              text: (
                <>
                  从 Latest Release 下载名称以{" "}
                  <code>windows-x64-setup.exe</code> 结尾的文件。
                </>
              ),
            },
            {
              title: "核对文件",
              text: (
                <>
                  下载同一 Release 中的 <code>checksums.sha256</code>
                  ，按下一篇文档完成 SHA-256 校验。
                </>
              ),
            },
            {
              title: "完成安装",
              text: (
                <>
                  退出旧版本与正在运行的任务，运行安装器并按提示完成安装。
                  Windows ARM64 安装包暂未提供。
                </>
              ),
            },
          ]}
        />

        <h2>Linux 安装</h2>
        <p>
          Linux 桌面可下载 <code>p2wlan-flutter-linux-x64.tar.gz</code>{" "}
          运行 Flutter 诊断客户端。服务器、NAS 和无桌面环境继续使用
          x64 / arm64 CLI/daemon 包：
        </p>
        <CodeBlock label="Terminal">{`curl -fsSL https://raw.githubusercontent.com/yhan-sun/p2wlan/main/scripts/install-linux-cli.sh -o /tmp/p2wlan-install.sh
sudo sh /tmp/p2wlan-install.sh

p2wlan login -u you@example.com
p2wlan up
p2wlan status`}</CodeBlock>

        <h2>升级已有版本</h2>
        <ul className="check-list">
          <li>等待活动任务结束，或先暂停任务。</li>
          <li>记录当前下载目录和重要自定义配置。</li>
          <li>完全退出应用后再安装新版本。</li>
          <li>启动后检查版本号、设备状态与虚拟 IP。</li>
        </ul>
      </>
    ),
  },

  verify: {
    over: "INTEGRITY",
    title: "校验安装包",
    desc: "Release 同时提供 checksums.sha256 与 checksums.json，用于确认文件完整且未被第三方替换。",
    body: (
      <>
        <h2>为什么要校验</h2>
        <p>
          SHA-256 可以确认你下载的文件与发布者生成校验表时的文件完全一致。
          尤其是在浏览器提示重复下载、使用下载工具、经过代理或从本地备份恢复时，建议执行校验。
        </p>

        <h2>准备文件</h2>
        <ol>
          <li>从同一个 Release 下载目标安装包。</li>
          <li>
            下载该 Release 的 <code>checksums.sha256</code>。
          </li>
          <li>将两者放在同一个目录，方便比对。</li>
        </ol>

        <h2>Windows PowerShell</h2>
        <CodeBlock label="PowerShell">{`Get-FileHash .\\p2wlan-*.exe -Algorithm SHA256`}</CodeBlock>
        <p>
          复制输出中的 Hash，在 <code>checksums.sha256</code>{" "}
          中查找对应文件名。字母大小写不影响结果，但所有字符必须一致。
        </p>

        <h2>macOS Terminal</h2>
        <CodeBlock label="Terminal">{`shasum -a 256 p2wlan-*.dmg`}</CodeBlock>
        <p>
          将输出的 64 位摘要与 <code>checksums.sha256</code>{" "}
          中同名文件的摘要逐字比对。
        </p>

        <h2>结果不一致怎么办</h2>
        <Steps
          items={[
            {
              title: "不要运行文件",
              text: <>立即停止安装，不要尝试忽略差异。</>,
            },
            {
              title: "删除并重新下载",
              text: (
                <>清除浏览器缓存或换一个稳定网络，再从官方 Release 重新下载。</>
              ),
            },
            {
              title: "确认版本一致",
              text: <>安装包与校验文件必须来自同一个 tag，不能跨版本比对。</>,
            },
            {
              title: "仍然不一致",
              text: (
                <>
                  保留文件名与 Release 链接，在 GitHub Issues
                  报告，不要上传可疑二进制文件。
                </>
              ),
            },
          ]}
        />
        <Callout kind="tip" title="校验成功的含义">
          <p>
            校验成功能证明文件与 Release
            校验表一致，但不能替代账号安全、系统权限和合法使用方面的判断。
          </p>
        </Callout>
      </>
    ),
  },

  "first-run": {
    over: "FIRST RUN",
    title: "5 分钟快速上手",
    desc: "先跑通一条完整路径，再逐项调整配置与自托管部署。",
    body: (
      <>
        <h2>开始前准备</h2>
        <ul className="check-list">
          <li>一台可正常使用的电脑，已从官方 Release 安装应用。</li>
          <li>一台可连通的对端设备，或一台已部署的自托管控制面。</li>
          <li>一条可用于验证的物理网络，建议先用局域网直连测试。</li>
          <li>先关闭代理、AI 自动发送、MCP 写操作和自动化监控。</li>
        </ul>

        <h2>完成第一次端到端任务</h2>
        <Steps
          items={[
            {
              title: "第 1 分钟：启动守护进程",
              text: (
                <>
                  打开应用或运行 <code>p2wlan up</code>，确认虚拟网卡已启动，
                  获得 <code>10.20.x.x</code> 私有地址。
                </>
              ),
            },
            {
              title: "第 2 分钟：登录控制面",
              text: (
                <>
                  使用 <code>p2wlan login</code> 或 Dashboard 完成认证，
                  确认设备已注册。
                </>
              ),
            },
            {
              title: "第 3 分钟：读取状态",
              text: (
                <>
                  运行 <code>p2wlan status</code>，记录当前连接路径、RTT
                  与端点候选。
                </>
              ),
            },
            {
              title: "第 4 分钟：连通验证",
              text: (
                <>
                  对端运行 <code>ping 10.20.0.5</code>，确认 ICMP 可达。
                </>
              ),
            },
            {
              title: "第 5 分钟：诊断复核",
              text: (
                <>
                  运行 <code>p2wlan doctor</code>，确认守护进程健康、
                  控制面已连接。
                </>
              ),
            },
          ]}
        />

        <Callout kind="tip" title="为什么只测一次局域网直连">
          <p>
            这样可以把变量降到最低。局域网直连成功后，再分别测试公网 UDP
            直连、中继回退和不同网络环境。
          </p>
        </Callout>

        <h2>判断首次配置是否成功</h2>
        <ul className="check-list">
          <li>虚拟网卡已启动，私有 IP 在 <code>10.20.x.x</code> 段内。</li>
          <li>对端可通过虚拟 IP 完成 <code>ping</code>。</li>
          <li><code>p2wlan status</code> 明确显示直连、中继或连接中状态。</li>
          <li><code>p2wlan doctor</code> 报告 daemon healthy。</li>
        </ul>
        <Callout kind="warning" title="先不要开启自动写操作">
          <p>
            自动化监控与持续探测都应在基础连通稳定后逐项测试。
          </p>
        </Callout>

        <h2>接下来怎么读</h2>
        <div className="doc-grid">
          <a href="#/docs/tunnel">
            <Network />
            <b>理解连接路径</b>
            <span>弄清直连、中继与离线分别意味着什么。</span>
            <ArrowRight />
          </a>
          <a href="#/docs/self-host">
            <Settings2 />
            <b>自托管控制面</b>
            <span>把数据与信令部署在自己的服务器上。</span>
            <ArrowRight />
          </a>
          <a href="#/docs/troubleshooting">
            <ListChecks />
            <b>遇到问题</b>
            <span>按最小复现路径定位启动、网络或凭据错误。</span>
            <ArrowRight />
          </a>
        </div>
      </>
    ),
  },

  interface: {
    over: "INTERFACE",
    title: "界面与导航",
    desc: "认识 Dashboard、设备、隧道与诊断视图，以及 CLI 通道。",
    body: (
      <>
        <h2>界面由四个区域组成</h2>
        <div className="capability-map">
          <div>
            <PanelLeft />
            <strong>Dashboard</strong>
            <span>设备状态、连接路径与快速操作入口。</span>
          </div>
          <div>
            <MousePointer2 />
            <strong>设备与隧道</strong>
            <span>管理已注册设备、虚拟 IP 与隧道状态。</span>
          </div>
          <div>
            <TerminalSquare />
            <strong>诊断视图</strong>
            <span>本地 diagnostics JSON、路径原因与候选端点。</span>
          </div>
          <div>
            <Settings2 />
            <strong>设置与控制面</strong>
            <span>登录、自托管部署、凭据与中继配置。</span>
          </div>
        </div>

        <h2>CLI 通道</h2>
        <p>
          服务器、NAS 和无桌面环境继续使用轻量 CLI 与 daemon 包。常用命令：
        </p>
        <CodeBlock label="Terminal">{`p2wlan login -u you@example.com
p2wlan up
p2wlan status
p2wlan doctor
p2wlan logs -f
p2wlan down`}</CodeBlock>

        <h2>两个高频命令入口</h2>
        <div className="do-dont">
          <div>
            <strong>
              <Kbd>p2wlan status</Kbd>
            </strong>
            <ul>
              <li>展示当前连接路径与 RTT。</li>
              <li>直连失败时显示回退原因。</li>
              <li>诊断 JSON 可直接用于 Issue。</li>
            </ul>
          </div>
          <div>
            <strong>
              <Kbd>p2wlan doctor</Kbd>
            </strong>
            <ul>
              <li>确认 daemon 与控制面健康状态。</li>
              <li>提示虚拟网卡与路由是否正常。</li>
              <li>异常时输出结构化风险码。</li>
            </ul>
          </div>
        </div>

        <h2>诊断视图</h2>
        <p>
          客户端直接展示当前路径：局域网直连、公网 UDP 直连、加密中继、
          连接中还是离线，并附带延迟、端点候选、路径切换原因和本地诊断
          JSON。问题发生在哪一层，打开就能判断。
        </p>
        <Steps
          items={[
            {
              title: "读取路径",
              text: <>先看 <code>p2wlan status</code> 的 path 字段。</>,
            },
            {
              title: "核对端点",
              text: <>检查 endpoint 与 RTT 是否合理。</>,
            },
            {
              title: "运行 doctor",
              text: <>异常时运行 <code>p2wlan doctor</code> 获取风险码。</>,
            },
            {
              title: "收集诊断",
              text: <>导出诊断 JSON，提交前脱敏。</>,
            },
          ]}
        />
      </>
    ),
  },

  account: {
    over: "ACCOUNT",
    title: "连接控制面",
    desc: "登录控制面、注册设备、管理凭据与虚拟 IP 分配。",
    body: (
      <>
        <h2>推荐：使用 CLI 登录</h2>
        <p>
          运行 <code>p2wlan login -u you@example.com</code>，按提示完成认证。
          设备认证使用 Ed25519 challenge-response，凭据保存在本机。
        </p>
        <Steps
          items={[
            {
              title: "选择认证方式",
              text: <>使用控制面提供的账号信息完成登录。</>,
            },
            {
              title: "等待设备注册",
              text: (
                <>
                  回到应用后确认设备出现在设备列表，并获得稳定虚拟 IP。
                </>
              ),
            },
            {
              title: "核对状态",
              text: <>运行 <code>p2wlan status</code> 确认已连接控制面。</>,
            },
          ]}
        />

        <h2>设备与虚拟 IP</h2>
        <p>
          控制面（Go + SQLite）负责认证、设备注册、IP 分配与信令。每台
          设备获得 <code>10.20.x.x</code> 段内的稳定私有地址。
        </p>
        <Callout title="切换后的检查">
          <p>
            添加或移除设备后，先刷新设备列表与连接状态，确认看到的是目标
            设备的数据，再执行连通测试。
          </p>
        </Callout>

        <h2>凭据管理</h2>
        <p>
          设备凭据与 JWT 保存在本机应用数据中。不要把凭据截图、上传或粘贴
          到 Issue。账号异常时先在控制面吊销旧凭据并重新注册。
        </p>
        <Callout kind="warning" title="凭据等同于敏感信息">
          <ul>
            <li>不要发到群聊、Issue、截图、录屏或第三方网站。</li>
            <li>不要使用来源不明的凭据，也不要替他人保管。</li>
            <li>定期轮换 JWT secret、中继令牌与设备凭据。</li>
          </ul>
        </Callout>
      </>
    ),
  },

  tunnel: {
    over: "PATHS",
    title: "连接路径与诊断",
    desc: "理解直连、中继与离线状态，学会读诊断信息定位网络问题。",
    body: (
      <>
        <h2>连接路径矩阵</h2>
        <p>客户端直接展示当前使用的路径，方便快速定位网络问题发生在哪一层。</p>
        <div className="feature-matrix">
          <div className="feature-matrix-heading">
            <span>Connection paths</span>
            <p>客户端直接展示当前使用的路径，方便快速定位网络问题发生在哪一层。</p>
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col">路径</th>
                <th scope="col">含义</th>
                <th scope="col">常见环境</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="matrix-feature-name">
                    <span>
                      <small>LAN DIRECT</small>
                      <strong>局域网直连</strong>
                    </span>
                  </span>
                </td>
                <td>两台设备可在本地网络直接互通，延迟最低。</td>
                <td><span className="matrix-signal">家庭 LAN、办公网络、实验室网络</span></td>
              </tr>
              <tr>
                <td>
                  <span className="matrix-feature-name">
                    <span>
                      <small>PUBLIC UDP</small>
                      <strong>公网 UDP 直连</strong>
                    </span>
                  </span>
                </td>
                <td>通过公网 UDP 端点完成 NAT 穿透、peer-reflexive 发现或显式 UDP 暴露。</td>
                <td><span className="matrix-signal">云服务器固定端口、限制较少的 NAT</span></td>
              </tr>
              <tr>
                <td>
                  <span className="matrix-feature-name">
                    <span>
                      <small>RELAY</small>
                      <strong>加密中继</strong>
                    </span>
                  </span>
                </td>
                <td>直连未确认，流量通过 DERP-like 中继转发密文。</td>
                <td><span className="matrix-signal">CGNAT、UDP 被阻断、云安全组未放行</span></td>
              </tr>
              <tr>
                <td>
                  <span className="matrix-feature-name">
                    <span>
                      <small>PROBING</small>
                      <strong>连接中 / 确认中</strong>
                    </span>
                  </span>
                </td>
                <td>已看到对端，正在等待直连或 relay peer 确认。</td>
                <td><span className="matrix-signal">daemon 刚启动、候选刷新、对端重连</span></td>
              </tr>
              <tr>
                <td>
                  <span className="matrix-feature-name">
                    <span>
                      <small>OFFLINE</small>
                      <strong>离线 / 不可达</strong>
                    </span>
                  </span>
                </td>
                <td>控制面标记对端离线，或当前没有确认可用的直连/中继路径。</td>
                <td><span className="matrix-signal">对端未运行、凭据过期、网络分区</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <Reveal className="paths-note">
          <p>
            直连候选来自本地地址、STUN 观测、公网手动配置、peer-reflexive
            观测和少量受限预测。复杂 NAT 下，直连成功率取决于两端 NAT
            映射与过滤行为；如果希望被公网 UDP 直连，请固定 UDP
            监听端口，并在云安全组和操作系统防火墙中放行入站规则。
          </p>
        </Reveal>

        <h2>诊断命令</h2>
        <CodeBlock label="Terminal">{`$ p2wlan status
path   direct (public UDP)   rtt 8ms
relay  fallback ready        region: hk-1
$ p2wlan doctor
✓ daemon healthy · control connected`}</CodeBlock>
        <p>
          <code>p2wlan doctor</code> 和本地 diagnostics <code>/status</code>
          会在观察到 relay 路径且 MTU 高于 <code>1380</code> 时给出结构化
          风险码和建议降级值。
        </p>
      </>
    ),
  },
  "self-host": {
    over: "SELF-HOST",
    title: "自托管控制面与中继",
    desc: "把控制面、数据库与中继部署在自己的公网 Linux 服务器上。",
    body: (
      <>
        <h2>部署步骤</h2>
        <p>
          控制面与中继都可以部署在你自己的公网 Linux 服务器上。个人测试
          或小规模自用场景，一台小型服务器通常就足够。
        </p>
        <CodeBlock label="Terminal">{`cd server
mkdir -p data
go build -o p2wlan-control .
go build -o p2wlan-relay ./relay`}</CodeBlock>

        <h2>控制面配置</h2>
        <p>真实部署时由 secret manager 注入值，不要把密钥写进仓库：</p>
        <CodeBlock label="Terminal">{`set -a
. ../deploy/staging/control.env.example
set +a
./p2wlan-control`}</CodeBlock>

        <h2>中继配置</h2>
        <p>
          真实 staging/production 的 catalog 必须使用 <code>tls://host:port</code>；
          旧的 <code>RELAY_SERVERS</code>/明文 relay 仅保留给本地兼容测试，
          不能作为真实发布拓扑。
        </p>
        <CodeBlock label="Terminal">{`RELAY_BIND=":443" \\
RELAY_TLS_CERT="/run/secrets/p2wlan/relay/fullchain.pem" \\
RELAY_TLS_KEY="/run/secrets/p2wlan/relay/privkey.pem" \\
RELAY_REQUIRE_AUTH=true \\
RELAY_ALLOW_INSECURE_PLAINTEXT=false \\
RELAY_TICKET_KEYRING_JSON='{"<kid>":"<public-key-hex>"}' \\
RELAY_AUDIENCE="relay-cn-test-1" \\
RELAY_REGION="cn-test" \\
RELAY_REVOCATION_FEED_URL="https://control.example.com/api/v1/relay/revocations" \\
RELAY_REVOCATION_FEED_TOKEN="same-token-as-control-plane" \\
RELAY_METRICS_BIND="127.0.0.1:9090" \\
./p2wlan-relay`}</CodeBlock>

        <h2>公网部署建议</h2>
        <ul className="check-list">
          <li>在控制面前放置 HTTPS/WSS 反向代理。</li>
          <li>在公网中继上启用 TLS。</li>
          <li>妥善保护 SQLite 文件、诊断端点和中继令牌。</li>
          <li>定期轮换 JWT secret、中继撤销源令牌和设备凭据。</li>
          <li>metrics 绑定 loopback，通过 SSH tunnel 读取。</li>
        </ul>
        <Callout kind="warning" title="中继仍暴露元数据">
          <p>
            中继只能看到节点标识、时间和包大小，不能解密业务数据，
            但它仍是连接元数据观察点。
          </p>
        </Callout>
      </>
    ),
  },

  crypto: {
    over: "PROTOCOL",
    title: "协议边界与安全模型",
    desc: "理解加密数据面、设备认证与中继可见范围。",
    body: (
      <>
        <h2>数据面握手</h2>
        <p>
          P2WLAN 当前采用自研的 WireGuard-like 数据面，而不是直接调用内核
          WireGuard 或 <code>wireguard-go</code>。
        </p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>边界</th>
                <th>当前实现</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>数据面握手</td>
                <td>
                  <code>Noise_IKpsk2_25519_ChaChaPoly_BLAKE2s</code> 风格
                </td>
                <td>贴近 WireGuard 的 Noise IK 结构，但不声明官方 WireGuard 互操作兼容。</td>
              </tr>
              <tr>
                <td>密钥交换</td>
                <td>X25519</td>
                <td>用于设备间加密会话协商。</td>
              </tr>
              <tr>
                <td>加密算法</td>
                <td>ChaCha20-Poly1305</td>
                <td>用于握手消息和传输数据的 AEAD。</td>
              </tr>
              <tr>
                <td>哈希 / KDF</td>
                <td>BLAKE2s / HKDF-BLAKE2s</td>
                <td>保持 WireGuard 风格语义，不使用 BLAKE3。</td>
              </tr>
              <tr>
                <td>设备认证</td>
                <td>Ed25519 challenge-response</td>
                <td>用于控制面的设备凭据和信令身份绑定。</td>
              </tr>
              <tr>
                <td>控制信令</td>
                <td>HTTPS / WSS 上的 JSON 消息</td>
                <td>便于调试。</td>
              </tr>
              <tr>
                <td>中继</td>
                <td>DERP-like TCP/TLS 密文转发</td>
                <td>不是标准 TURN；中继不解密业务载荷。</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>职责划分</h2>
        <p>
          X25519 节点身份用于数据面握手；Ed25519 设备身份用于控制面挑战签名
          和信令身份绑定，两者职责不同。
        </p>
        <div className="security-facts">
          <div>
            <ShieldCheck />
            <b>信任边界</b>
            <span>加入同一虚拟网络的设备应被视为同一信任边界内的节点。</span>
          </div>
          <div>
            <Network />
            <b>控制面可见</b>
            <span>账号、设备身份、虚拟 IP、候选端点、中继票据和连接元数据。</span>
          </div>
          <div>
            <KeyRound />
            <b>中继可见</b>
            <span>节点标识、时间和包大小，只转发加密后的业务载荷。</span>
          </div>
        </div>

        <h2>生产化前的验收项</h2>
        <p>
          生产化前的完整验收项见{" "}
          <a href={REPO} target="_blank" rel="noreferrer">
            生产化验收清单
          </a>
          ，真实网络验证模板见 NAT 穿透验收矩阵，长期技术路线见 v2
          架构路线图。
        </p>
        <Callout kind="warning" title="尚未完成独立安全审计">
          <p>
            Preview 版本尚未完成独立安全审计。高敏感场景建议自托管、
            启用 TLS、轮换中继令牌、审查发布产物，并在可接受的风险边界内
            逐步放量。
          </p>
        </Callout>
      </>
    ),
  },

  troubleshooting: {
    over: "TROUBLESHOOTING",
    title: "故障排查",
    desc: "按最小复现路径检查版本、连接、直连、中继和自托管问题。",
    body: (
      <>
        <h2>先做五项基础检查</h2>
        <ol>
          <li>确认使用的是官方 Latest Release，而不是公开 mock Demo。</li>
          <li>记录操作系统、应用版本与安装包类型。</li>
          <li>确认控制面可达且设备凭据有效。</li>
          <li>暂停自动化与持续探测。</li>
          <li>用同一网段内的另一台设备复现，排除单个端点问题。</li>
        </ol>

        <h2>常见症状</h2>
        <div className="table-scroll wide">
          <table>
            <thead>
              <tr>
                <th>症状</th>
                <th>优先检查</th>
                <th>下一步</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>应用无法启动</td>
                <td>系统与架构是否匹配，文件是否校验成功。</td>
                <td>重新下载官方安装包，查看系统安全提示。</td>
              </tr>
              <tr>
                <td>虚拟网卡未启动</td>
                <td>权限、TUN/Wintun/utun 驱动与提权状态。</td>
                <td>运行 <code>p2wlan doctor</code> 查看风险码。</td>
              </tr>
              <tr>
                <td>对端显示在线但无法直连</td>
                <td>两端防火墙、UDP 监听端口、STUN 可达性、云安全组入站 UDP。</td>
                <td>先验证中继回退是否可用。</td>
              </tr>
              <tr>
                <td>总是走中继</td>
                <td>CGNAT、企业/校园网 UDP 限制、symmetric NAT、候选端点是否过期。</td>
                <td>按 NAT 穿透验收矩阵逐项记录。</td>
              </tr>
              <tr>
                <td>ping 正常但 SSH/RDP 卡顿</td>
                <td>MTU 过高、PMTU blackhole、relay 延迟或丢包。</td>
                <td>把 MTU 调低到 1380 / 1360 / 1280。</td>
              </tr>
              <tr>
                <td>自托管 relay 连接失败</td>
                <td>relay 地址格式、TLS 证书、撤销源令牌、控制面下发的 relay catalog。</td>
                <td>确认使用 <code>tls://</code> 格式。</td>
              </tr>
              <tr>
                <td>设备凭据异常</td>
                <td>Ed25519 keypair、challenge-response、控制面时间与 credential 状态。</td>
                <td>重新注册设备并轮换凭据。</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>应用无法启动或启动后空白</h2>
        <Steps
          items={[
            {
              title: "核对发行文件",
              text: (
                <>
                  Windows 需要 x64 文件；Apple 芯片 Mac 需要 arm64 文件。
                  不要把 updater、签名或 metadata 当作安装包。
                </>
              ),
            },
            {
              title: "重新校验 SHA-256",
              text: (
                <>
                  如果文件经过网盘、下载器、代理或多次恢复，重新从官方
                  Release 下载并校验。
                </>
              ),
            },
            {
              title: "查看系统拦截提示",
              text: (
                <>
                  Windows 查看安全提示；macOS 在确认来源与校验值后，
                  从 Finder 右键选择“打开”或检查“隐私与安全性”。
                </>
              ),
            },
            {
              title: "排除旧进程",
              text: (
                <>
                  完全退出残留窗口和后台进程，再启动一次。
                </>
              ),
            },
            {
              title: "仍然失败",
              text: (
                <>
                  记录系统版本、架构、安装包完整文件名和出现提示的阶段，
                  不要只写“打不开”。
                </>
              ),
            },
          ]}
        />

        <h2>直连失败但中继可用</h2>
        <p>按以下顺序判断：</p>
        <ol>
          <li>确认两端 UDP 监听端口已固定并在防火墙放行。</li>
          <li>检查 STUN 服务器可达性与候选端点是否过期。</li>
          <li>在云安全组中放行入站 UDP。</li>
          <li>若出现验证或限流提示，停止连续重试并等待恢复。</li>
        </ol>
        <Callout title="连接中不一定是程序错误">
          <p>
            daemon 刚启动、候选端点刷新或对端刚重连时都会显示连接中。
            使用公开对照对象可以最快区分。
          </p>
        </Callout>

        <h2>MTU 与性能问题</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>检查项</th>
                <th>验证方法</th>
                <th>恢复后表现</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>MTU 过高</td>
                <td>小包 ping 正常但大流量异常，把 MTU 调低到 1380。</td>
                <td>大包不再丢失，SSH 与网页加载正常。</td>
              </tr>
              <tr>
                <td>PMTU blackhole</td>
                <td>底层网络丢弃 ICMP fragmentation-needed。</td>
                <td>后续自动 PMTU 探测需要重点解决。</td>
              </tr>
              <tr>
                <td>中继路径延迟</td>
                <td>relay 使用 TCP/TLS 承载密文包，行为不同于直连 UDP。</td>
                <td>确认是否可接受，或优先排查直连。</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>提交 Issue 前脱敏</h2>
        <div className="do-dont">
          <div>
            <strong>应该提供</strong>
            <ul>
              <li>系统与应用版本。</li>
              <li>清晰的复现步骤。</li>
              <li>预期结果与实际结果。</li>
              <li>经过脱敏的诊断 JSON。</li>
            </ul>
          </div>
          <div>
            <strong>绝对不要提供</strong>
            <ul>
              <li>JWT、设备凭据、中继 Token。</li>
              <li>私密会话或未公开个人资料。</li>
              <li>包含用户名的本地绝对路径。</li>
              <li>真实平台内部请求信息。</li>
            </ul>
          </div>
        </div>
        <IssuesLink />
      </>
    ),
  },

  faq: {
    over: "FAQ",
    title: "常见问题",
    desc: "关于费用、平台、源码、风险和反馈渠道的快速回答。",
    body: (
      <div className="faq">
        <details open>
          <summary>
            软件收费吗？
            <ArrowRight />
          </summary>
          <p>
            不收费。官方没有付费版、激活码、会员解锁或收费代下。
            项目采用 MIT License，Release 产物免费分发。
          </p>
        </details>
        <details>
          <summary>
            公开仓库是完整源码吗？
            <ArrowRight />
          </summary>
          <p>
            不是。公开源码是 Open Shell，包含 UI、mock bridge、mock
            backend 与协作边界。完整可用应用在 Releases。
          </p>
        </details>
        <details>
          <summary>
            支持哪些平台？
            <ArrowRight />
          </summary>
          <p>
            当前 Release 提供 macOS Apple Silicon / Intel、Windows 10/11
            x64 和 Linux x64 桌面客户端；服务器与 NAS 走 CLI/daemon 包。
            Android arm64 与 iOS arm64 也在发布路径中。是否新增平台以
            未来 Release 的 Assets 为准。
          </p>
        </details>
        <details>
          <summary>
            安装器与便携版怎么选？
            <ArrowRight />
          </summary>
          <p>
            普通用户优先安装器或 DMG。便携版适合希望手动管理目录的用户，
            必须完整解压后运行。
          </p>
        </details>
        <details>
          <summary>
            macOS 提示无法验证开发者怎么办？
            <ArrowRight />
          </summary>
          <p>
            先确认下载的是官方 Release，并完成同版本的 SHA-256 校验。
            然后在 Finder 中右键应用选择“打开”；如果仍被拦截，可以只对
            已核对的应用移除 quarantine 标记：
          </p>
          <CodeBlock label="Terminal">{`sudo xattr -r -d com.apple.quarantine "/Applications/P2WLAN.app"
open "/Applications/P2WLAN.app"`}</CodeBlock>
          <p>
            应用不在“应用程序”目录时替换路径，不要关闭
            Gatekeeper，也不要对未知来源的文件执行这条命令。
          </p>
        </details>
        <details>
          <summary>
            可以从第三方网盘下载吗？
            <ArrowRight />
          </summary>
          <p>
            不建议。只使用官方 Releases，并用同一版本的
            checksums.sha256 校验文件。
          </p>
        </details>
        <details>
          <summary>
            虚拟 IP 是多少？
            <ArrowRight />
          </summary>
          <p>
            设备由控制面分配 <code>10.20.x.x</code> 段内的稳定私有地址，
            可直接用于 ping、SSH、RDP 和数据库访问。
          </p>
        </details>
        <details>
          <summary>
            直连失败时会自动切中继吗？
            <ArrowRight />
          </summary>
          <p>
            会。守护进程持续保活与重试，直连未确认时自动回退到加密中继，
            并在路径切换原因中记录原因。
          </p>
        </details>
        <details>
          <summary>
            中继能看到我的数据吗？
            <ArrowRight />
          </summary>
          <p>
            中继只转发密文，不解密业务载荷。但它能看到节点标识、时间
            和包大小等连接元数据。
          </p>
        </details>
        <details>
          <summary>
            自托管需要什么？
            <ArrowRight />
          </summary>
          <p>
            一台公网 Linux 服务器，开放 443 入站，安装 Go 1.22+。
            控制面与中继都可以部署在同一台或不同服务器上。
          </p>
        </details>
        <details>
          <summary>
            使用会不会导致账号风险？
            <ArrowRight />
          </summary>
          <p>
            不能承诺零风险。Preview 版本尚未完成独立安全审计，用于高敏感
            流量前请先完成自己的安全审查。
          </p>
        </details>
        <details>
          <summary>
            去哪里反馈问题？
            <ArrowRight />
          </summary>
          <p>
            前往 GitHub Issues，先搜索已有问题，再提供版本、系统、复现
            步骤和脱敏后的诊断信息。
          </p>
        </details>
      </div>
    ),
  },
};