import { memo, useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Check,
  Download,
  Eye,
  Github,
  Globe,
  Laptop,
  LockKeyhole,
  Menu,
  MonitorSmartphone,
  Moon,
  MousePointer2,
  Network,
  Radar,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  WandSparkles,
  X,
} from "lucide-react";

type Theme = "dark" | "light";

const EASE: [number, number, number, number] = [0.2, 0, 0, 1];

const revealInitial = { opacity: 0, y: 22 };
const revealInView = { opacity: 1, y: 0 };
const revealTransition = { duration: 0.56, ease: EASE };

const links = {
  releases: "https://github.com/yhan-sun/p2wlan/releases",
  repo: "https://github.com/yhan-sun/p2wlan",
  docs: "https://github.com/yhan-sun/p2wlan#readme",
};

const heroSignals = [
  { label: "开源协议", value: "MIT License" },
  { label: "连接方式", value: "P2P 优先" },
  { label: "部署方式", value: "可自托管" },
];

const ambientParticles = [
  [7, 18, 3, 16], [14, 72, 2, 10], [23, 36, 2, 18], [31, 87, 3, 12],
  [42, 14, 2, 20], [49, 61, 3, 14], [58, 28, 2, 17], [66, 83, 2, 11],
  [73, 46, 3, 19], [81, 17, 2, 13], [88, 67, 3, 16], [94, 38, 2, 10],
] as const;

const trustCards = [
  {
    icon: ShieldCheck,
    title: "开源免费，无激活码",
    text: "客户端、Rust 守护进程、Go 控制面与中继全部开源，Release 产物免费分发。不存在付费版本、激活码或会员解锁。",
  },
  {
    icon: LockKeyhole,
    title: "完整自托管",
    text: "控制面、SQLite 数据库和中继服务都可以部署在你自己的公网 Linux 服务器上，密钥、凭据和网络行为由你掌控。",
  },
  {
    icon: Check,
    title: "诚实的安全边界",
    text: "Preview 阶段尚未完成独立安全审计。中继只能看到节点标识、时间和包大小，不能解密业务数据；高敏感流量请先自行审查。",
  },
];

const coreCards = [
  {
    eyebrow: "HOLE PUNCHING",
    title: "P2P 优先，真实打洞。",
    description:
      "守护进程收集本地与 STUN 观测候选，执行 UDP hole punching，学习 peer-reflexive 端点，并持续保活与重试。直连被 NAT、CGNAT、企业防火墙或云安全组阻断时，才自动回退到加密中继。",
    proof: "host + server-reflexive + peer-reflexive candidates",
    icon: Radar,
    stats: ["局域网直连", "公网 UDP 直连", "中继回退"],
    featured: true,
  },
  {
    eyebrow: "CRYPTO",
    title: "加密数据面。",
    description:
      "设备流量通过 WireGuard-like Noise 会话加密传输：X25519 密钥交换、ChaCha20-Poly1305 AEAD、BLAKE2s KDF；中继只转发密文，不解密业务数据。",
    proof: "Noise_IKpsk2_25519_ChaChaPoly_BLAKE2s",
    icon: LockKeyhole,
    stats: ["X25519", "ChaCha20-Poly1305", "Ed25519 设备认证"],
  },
  {
    eyebrow: "OBSERVABILITY",
    title: "连接状态，一目了然。",
    description:
      "客户端直接展示当前路径：局域网直连、公网 UDP 直连、加密中继、连接中还是离线，并附带延迟、端点候选、路径切换原因和本地诊断 JSON。问题发生在哪一层，打开就能判断。",
    proof: "Dashboard / CLI / GET /status",
    icon: Eye,
    stats: ["路径直读", "延迟与端点", "诊断 JSON"],
    wide: true,
  },
];

const flowSteps = [
  { icon: MousePointer2, label: "注册", text: "设备通过控制面认证、注册并分配稳定的虚拟 IP。" },
  { icon: Radar, label: "探测", text: "UDP socket pool 持续发送 authenticated probe，收集候选端点。" },
  { icon: Check, label: "确认", text: "收到 probe ACK 或加密数据后确认直连，否则切换中继。" },
  { icon: Activity, label: "保活", text: "定期握手与重试，路径切换原因可查询、可复盘。" },
];

const pathRows = [
  {
    name: "局域网直连",
    code: "LAN DIRECT",
    signal: "低延迟",
    description: "两台设备可在本地网络直接互通，延迟最低。",
    env: "家庭 LAN、办公网络、实验室网络",
  },
  {
    name: "公网 UDP 直连",
    code: "PUBLIC UDP",
    signal: "NAT 穿透",
    description: "通过公网 UDP 端点完成 NAT 穿透、peer-reflexive 发现或显式 UDP 暴露。",
    env: "云服务器固定端口、限制较少的 NAT",
  },
  {
    name: "加密中继",
    code: "RELAY",
    signal: "兜底可用",
    description: "直连未确认，流量通过 DERP-like 中继转发密文。",
    env: "CGNAT、UDP 被阻断、云安全组未放行",
  },
  {
    name: "连接中 / 确认中",
    code: "PROBING",
    signal: "等待确认",
    description: "已看到对端，正在等待直连或 relay peer 确认。",
    env: "daemon 刚启动、候选刷新、对端重连",
  },
  {
    name: "离线 / 不可达",
    code: "OFFLINE",
    signal: "需要排查",
    description: "控制面标记对端离线，或当前没有确认可用的直连/中继路径。",
    env: "对端未运行、凭据过期、网络分区",
  },
];

const experiences = [
  {
    number: "01",
    label: "TUN",
    title: "真实虚拟网卡，不只是代理。",
    description: "基于 macOS utun、Windows Wintun 和 Linux TUN 创建系统虚拟网卡，分配 10.20.x.x 私有地址。虚拟 IP 可以直接用于 ping、SSH、RDP、数据库和浏览器访问。",
    icon: Network,
    media: (
      <pre className="terminal-block">{`$ ping 10.20.0.5
PING 10.20.0.5 (10.20.0.5): 56 data bytes
64 bytes from 10.20.0.5: icmp_seq=0 ttl=64 time=8.412 ms
64 bytes from 10.20.0.5: icmp_seq=1 ttl=64 time=7.903 ms
64 bytes from 10.20.0.5: icmp_seq=2 ttl=64 time=8.021 ms
--- 10.20.0.5 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss`}</pre>
    ),
  },
  {
    number: "02",
    label: "CLIENT",
    title: "桌面客户端与 CLI 双通道。",
    description: "Flutter 客户端提供 Dashboard、设备、隧道和诊断视图，并接管 daemon 生命周期；服务器、NAS 和无桌面环境继续使用轻量 CLI 与 daemon 包。",
    icon: MonitorSmartphone,
    media: (
      <pre className="terminal-block">{`$ p2wlan login -u you@example.com
✓ authenticated
$ p2wlan up
✓ virtual interface up (10.20.0.5)
$ p2wlan status
path   direct (public UDP)   rtt 8ms
relay  fallback ready        region: hk-1
$ p2wlan doctor
✓ daemon healthy · control connected`}</pre>
    ),
  },
  {
    number: "03",
    label: "SELF-HOST",
    title: "控制面与中继，自己掌控。",
    description: "控制面（Go + SQLite）负责认证、设备、IP 分配与信令；中继只做密文转发并同步撤销信息。一台小型公网服务器就足够个人或小规模自用。",
    icon: Server,
    media: (
      <pre className="terminal-block">{`$ go build -o p2wlan-control .
$ go build -o p2wlan-relay ./relay

JWT_SECRET="long-random-secret" \\
DB_PATH="./data/p2wlan.db" \\
PORT=18080 \\
RELAY_SERVERS="default@relay.example.com:18081" \\
./p2wlan-control`}</pre>
    ),
  },
];

const platforms = [
  {
    name: "macOS",
    tech: "Apple Silicon / Intel",
    file: "p2wlan-flutter-macos-*.dmg",
    icon: Laptop,
    note: "arm64 / x64 分别打包",
  },
  {
    name: "Windows",
    tech: "Windows 10/11 x64",
    file: "p2wlan-flutter-windows-x64-setup.exe",
    icon: MonitorSmartphone,
    note: "Wintun 虚拟网卡",
  },
  {
    name: "Linux",
    tech: "x64 桌面 / arm64 服务器",
    file: "flutter bundle + CLI tarball",
    icon: Server,
    note: "无桌面环境走 CLI",
  },
  {
    name: "Android",
    tech: "arm64",
    file: "p2wlan-flutter-android-arm64.apk",
    icon: Smartphone,
    note: "Release 仅发布 arm64",
  },
  {
    name: "iOS",
    tech: "arm64（需签名安装）",
    file: "unsigned p2wlan-flutter-ios.ipa",
    icon: Globe,
    note: "后续 Network Extension 路径",
  },
];

function readInitialTheme(): Theme {
  const saved = window.localStorage.getItem("p2wlan-site-theme");
  if (saved === "dark" || saved === "light") return saved;
  return "dark";
}

function AmbientEffects() {
  const reduceMotion = useReducedMotion();
  const particlesRef = useRef<Array<HTMLSpanElement | null>>([]);

  const setParticleRef = useCallback(
    (index: number) => (element: HTMLSpanElement | null) => {
      particlesRef.current[index] = element;
    },
    [],
  );

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let latestX = window.innerWidth / 2;
    let latestY = window.innerHeight / 2;

    const render = () => {
      frame = 0;
      const offsetX = latestX / window.innerWidth - 0.5;
      const offsetY = latestY / window.innerHeight - 0.5;
      document.documentElement.style.setProperty("--cursor-x", `${latestX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${latestY}px`);
      particlesRef.current.forEach((particle, index) => {
        if (!particle) return;
        const depth = 8 + (index % 5) * 4;
        particle.style.transform = `translate3d(${offsetX * depth}px, ${offsetY * depth}px, 0)`;
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      latestX = event.clientX;
      latestY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <div className="ambient-effects" aria-hidden="true">
      <span className="cursor-glow" />
      <span className="cursor-glow cursor-glow-secondary" />
      {ambientParticles.map(([x, y, size, opacity], index) => (
        <span
          className="ambient-particle"
          key={`${x}-${y}`}
          ref={setParticleRef(index)}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity / 100,
          }}
        />
      ))}
    </div>
  );
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="P2WLAN 首页">
      <span className="brand-mark">
        <img src="./images/p2wlan-icon.svg" alt="" />
      </span>
      <span>P2WLAN</span>
    </a>
  );
}

function IconButton({ label, children, onClick }: { label: string; children: ReactNode; onClick: (event: ReactMouseEvent<HTMLButtonElement>) => void }) {
  return (
    <button className="icon-button" type="button" onClick={onClick} aria-label={label} title={label}>
      {children}
    </button>
  );
}

function Header({ theme, onThemeToggle }: { theme: Theme; onThemeToggle: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <Brand />
      <nav className="desktop-nav" aria-label="主导航">
        <a href="#core">核心能力</a>
        <a href="#paths">连接路径</a>
        <a href="#experience">体验</a>
        <a href="#download">下载</a>
        <a className="nav-github" href={links.repo} target="_blank" rel="noreferrer">
          <Github aria-hidden="true" />
          GitHub
        </a>
      </nav>
      <div className="header-actions">
        <IconButton label={theme === "dark" ? "切换到亮色主题" : "切换到暗色主题"} onClick={onThemeToggle}>
          <span className="theme-icon-stack" aria-hidden="true">
            <Sun className={theme === "dark" ? "theme-icon-active" : ""} />
            <Moon className={theme === "light" ? "theme-icon-active" : ""} />
          </span>
        </IconButton>
        <button
          className="icon-button mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            className="mobile-nav"
            aria-label="移动端导航"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <a href="#core" onClick={closeMenu}>核心能力</a>
            <a href="#paths" onClick={closeMenu}>连接路径</a>
            <a href="#experience" onClick={closeMenu}>体验</a>
            <a href="#download" onClick={closeMenu}>下载</a>
            <a href={links.repo} target="_blank" rel="noreferrer">GitHub</a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function ActionLink({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) {
  return (
    <a className={primary ? "button button-primary" : "button button-secondary"} href={href}>
      {children}
    </a>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
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

function SectionLead({ kicker, title, muted }: { kicker: string; title: string; muted: string }) {
  return (
    <Reveal className="section-lead">
      <span className="section-kicker">
        <Sparkles aria-hidden="true" />
        {kicker}
      </span>
      <h2>{title}<span>{muted}</span></h2>
    </Reveal>
  );
}

function HeroPathConsole() {
  return (
    <div className="hero-path-console" aria-hidden="true">
      <div className="console-bar">
        <span className="console-dot" />
        <span className="console-dot" />
        <span className="console-dot" />
        <span className="console-title">p2wlan status</span>
        <span className="console-live">● live</span>
      </div>
      <div className="console-body">
        <div className="console-line">
          <small>Virtual IP</small>
          <code>10.20.0.5</code>
        </div>
        <div className="console-line">
          <small>Path</small>
          <code className="console-direct">
            <span className="console-pulse" />
            Direct UDP
          </code>
        </div>
        <div className="console-line">
          <small>Endpoint</small>
          <code>220.181.x.x:30000</code>
        </div>
        <div className="console-line">
          <small>RTT</small>
          <code>8 ms · last ok 2 s ago</code>
        </div>
        <div className="console-line">
          <small>Probes</small>
          <code>12 sent · 9 acked</code>
        </div>
        <div className="console-line">
          <small>Reason</small>
          <code>encrypted data path confirmed</code>
        </div>
      </div>
    </div>
  );
}

function HeroBackdropImage({ src, className, active }: { src: string; className: string; active: boolean }) {
  return (
    <img
      className={className}
      src={active ? src : undefined}
      alt=""
      loading="eager"
      decoding="async"
      fetchPriority={active ? "high" : "low"}
      onError={(event) => {
        (event.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

function Hero({ theme }: { theme: Theme }) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      document.documentElement.style.setProperty(
        "--hero-anim-play",
        entries[0].isIntersecting ? "running" : "paused",
      );
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-topology" />
        <HeroBackdropImage
          className="hero-backdrop-image hero-backdrop-image-dark"
          src="./images/hero-workspace-dark.jpg"
          active={theme === "dark"}
        />
        <HeroBackdropImage
          className="hero-backdrop-image hero-backdrop-image-light"
          src="./images/hero-workspace-light.jpg"
          active={theme === "light"}
        />
      </div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, ease: EASE }}
        >
          <span className="hero-eyebrow">
            <Radar aria-hidden="true" />
            Peer-first encrypted virtual LAN
          </span>
          <h1 aria-label="P2WLAN">
            <span>P2W</span>
            <span className="spectral-text">LAN.</span>
          </h1>
        </motion.div>
        <motion.div
          className="hero-side"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, delay: 0.1, ease: EASE }}
        >
          <p className="hero-tagline">
            <strong>把分散在不同网络里的设备，连成一张真正可用的加密虚拟局域网。</strong>
            <span>Mac、Windows、Linux、云服务器、NAS、家庭设备，都可以拥有稳定的私有虚拟 IP。直连优先，中继兜底，连接状态一目了然。</span>
          </p>
          <div className="hero-actions">
            <ActionLink href={links.releases} primary>
              下载客户端
              <ArrowDown aria-hidden="true" />
            </ActionLink>
            <ActionLink href={links.docs}>
              阅读文档
              <ArrowRight aria-hidden="true" />
            </ActionLink>
          </div>
          <HeroPathConsole />
          <div className="hero-console">
            {heroSignals.map((signal) => (
              <span key={signal.label}>
                <small>{signal.label}</small>
                {signal.value}
              </span>
            ))}
          </div>
          <p className="hero-proof-note">请从 GitHub Releases 下载官方发行版。当前为 Preview 阶段，尚未完成独立安全审计，用于高敏感流量前请先完成自己的安全审查。</p>
        </motion.div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="trust-section" id="trust">
      <div className="section-inner trust-inner">
        <Reveal className="trust-copy">
          <span className="section-kicker">
            <ShieldCheck aria-hidden="true" />
            Open and honest
          </span>
          <h2>开源免费，<span>也把边界说清楚。</span></h2>
          <p>
            P2WLAN 的客户端、守护进程、控制面与中继全部开源，官方发行版免费。请从 GitHub 官方仓库下载，不要从第三方渠道购买安装包或激活码。安全边界在文档里逐条写明：谁能看到什么、Preview 阶段还没有什么。
          </p>
        </Reveal>
        <div className="trust-card-grid">
          {trustCards.map((card) => {
            const Icon = card.icon;
            return (
              <Reveal className="trust-card" key={card.title}>
                <Icon aria-hidden="true" />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CoreSection() {
  return (
    <section className="section intelligence-section" id="core">
      <div className="section-inner">
        <SectionLead kicker="Core engine" title="不止是组网，" muted="它把每一跳都说清楚。" />
        <div className="intelligence-layout">
          {coreCards.map((card) => {
            const Icon = card.icon;
            return (
              <Reveal
                className={[
                  "intelligence-card",
                  card.featured && "intelligence-card-featured",
                  card.wide && "intelligence-card-automation",
                ].filter(Boolean).join(" ")}
                key={card.eyebrow}
              >
                <div className="intelligence-head">
                  <span>{card.eyebrow}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="intelligence-proof">{card.proof}</div>
                <div className="chip-row">
                  {card.stats.map((stat) => <span key={stat}>{stat}</span>)}
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="workflow-strip">
          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article className="flow-step" key={step.label}>
                <div className="flow-mark">
                  <Icon aria-hidden="true" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h4>{step.label}</h4>
                <p>{step.text}</p>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function PathsSection() {
  return (
    <section className="section paths-section" id="paths">
      <div className="section-inner">
        <SectionLead kicker="Path matrix" title="连接路径，" muted="不再是一个模糊的在线。" />
        <Reveal className="feature-matrix">
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
              {pathRows.map((row) => (
                <tr key={row.name}>
                  <td>
                    <span className="matrix-feature-name">
                      <span>
                        <small>{row.code}</small>
                        <strong>{row.name}</strong>
                      </span>
                    </span>
                  </td>
                  <td>{row.description}</td>
                  <td><span className="matrix-signal">{row.env}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <Reveal className="paths-note">
          <p>
            直连候选来自本地地址、STUN 观测、公网手动配置、peer-reflexive 观测和少量受限预测。复杂 NAT 下，直连成功率取决于两端 NAT 映射与过滤行为；如果希望被公网 UDP 直连，请固定 UDP 监听端口，并在云安全组和操作系统防火墙中放行入站规则。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="section experience-section" id="experience">
      <div className="section-inner">
        <SectionLead kicker="Product feel" title="从组网到使用，" muted="每一层都看得见。" />
        <div className="feature-list">
          {experiences.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="feature-row" key={feature.label}>
                <Reveal className="feature-copy">
                  <span className="feature-index">{feature.number} / {feature.label}</span>
                  <span className="feature-icon"><Icon aria-hidden="true" /></span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </Reveal>
                <Reveal className="feature-media">
                  {feature.media}
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="manifesto-section" aria-label="产品理念">
      <Reveal className="manifesto-inner">
        <p>
          NAT 让设备藏在墙后，<span>P2WLAN 把它们连回来。</span>
          能直连就直连，不能就加密中继；每一次切换，都有原因可查。
        </p>
      </Reveal>
    </section>
  );
}

function DownloadSection() {
  return (
    <section className="download-section" id="download">
      <Reveal className="download-inner">
        <span className="section-kicker">
          <WandSparkles aria-hidden="true" />
          Get P2WLAN
        </span>
        <h2>选择你的平台，<span>从官方渠道下载。</span></h2>
        <p>Release 会发布 Flutter 客户端安装包，同时保留适合服务器、NAS 和无桌面环境的 Linux CLI / daemon 包。所有产物免费，可核对 Release 附带的 checksums。</p>
        <div className="platform-grid" id="platforms">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <article className="platform-card" key={platform.name}>
                <div className="platform-head">
                  <span className="platform-icon"><Icon aria-hidden="true" /></span>
                  <span className="platform-tech">{platform.tech}</span>
                </div>
                <h3>{platform.name}</h3>
                <small>{platform.file}</small>
                <span className="platform-note">{platform.note}</span>
                <div className="platform-actions">
                  <ActionLink href={links.releases} primary>
                    <Download aria-hidden="true" />
                    下载
                  </ActionLink>
                  <ActionLink href={links.repo}>
                    <Github aria-hidden="true" />
                    源码
                  </ActionLink>
                </div>
              </article>
            );
          })}
        </div>
        <small>Preview 构建可能尚未完成 Apple 公证，如果 Gatekeeper 阻止首次启动，请在 Finder 中右键应用并选择 Open。</small>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <Brand />
      <p>Peer-first. Encrypted. Self-hosted.</p>
      <div>
        <a href={links.docs} target="_blank" rel="noreferrer">文档</a>
        <a href={links.releases} target="_blank" rel="noreferrer">Releases</a>
        <a href={links.repo} target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </footer>
  );
}

const themeBackgrounds: Record<Theme, string> = {
  dark: "#0a0f1c",
  light: "#f6f7fb",
};

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  document.documentElement.style.colorScheme = next;
  window.localStorage.setItem("p2wlan-site-theme", next);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeBackgrounds[next]);
}

const MemoAmbientEffects = memo(AmbientEffects);
const MemoHeader = memo(Header);
const MemoHero = memo(Hero);
const MemoTrustSection = memo(TrustSection);
const MemoCoreSection = memo(CoreSection);
const MemoPathsSection = memo(PathsSection);
const MemoExperienceSection = memo(ExperienceSection);
const MemoManifestoSection = memo(ManifestoSection);
const MemoDownloadSection = memo(DownloadSection);
const MemoFooter = memo(Footer);

export default function App() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const flashRef = useRef<HTMLDivElement>(null);
  const flashingRef = useRef(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const commit = () => {
      applyTheme(next);
      setTheme(next);
    };
    const flash = flashRef.current;
    const reduceMotion =
      typeof window.matchMedia === "function"
        && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!flash || reduceMotion || flashingRef.current) {
      commit();
      return;
    }

    flashingRef.current = true;
    flash.style.transition = "none";
    flash.style.backgroundColor = themeBackgrounds[next];
    flash.style.opacity = "0";
    window.requestAnimationFrame(() => {
      flash.style.transition = "opacity 130ms ease";
      flash.style.opacity = "1";
    });
    window.setTimeout(() => {
      commit();
      flash.style.transition = "opacity 220ms ease";
      flash.style.opacity = "0";
    }, 150);
    window.setTimeout(() => {
      flashingRef.current = false;
    }, 420);
  }, [theme]);

  return (
    <>
      <div className="theme-flash" ref={flashRef} aria-hidden="true" />
      <MemoAmbientEffects />
      <MemoHeader theme={theme} onThemeToggle={toggleTheme} />
      <main>
        <MemoHero theme={theme} />
        <MemoTrustSection />
        <MemoCoreSection />
        <MemoPathsSection />
        <MemoExperienceSection />
        <MemoManifestoSection />
        <MemoDownloadSection />
      </main>
      <MemoFooter />
    </>
  );
}
