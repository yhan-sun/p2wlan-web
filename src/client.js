const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const html = document.documentElement;
const body = document.body;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileViewport = window.matchMedia("(max-width: 960px)");
const icons = {
  sun: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.3A8.2 8.2 0 0 1 8.7 4 8.2 8.2 0 1 0 20 15.3Z"/></svg>',
  copy: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>',
};

function setTheme(theme, save = false) {
  html.dataset.theme = theme;
  if (save) { try { localStorage.setItem("p2wlan-theme", theme); } catch {} }
  const target = $("[data-theme-icon]");
  if (target) target.innerHTML = theme === "dark" ? icons.sun : icons.moon;
  $("[data-theme-toggle]")?.setAttribute("aria-label", theme === "dark" ? "切换到亮色主题" : "切换到暗色主题");
  $("meta[name='theme-color']")?.setAttribute("content", theme === "dark" ? "#080a0e" : "#f6f7fa");
}
setTheme(html.dataset.theme === "light" ? "light" : "dark");
$("[data-theme-toggle]")?.addEventListener("click", () => setTheme(html.dataset.theme === "dark" ? "light" : "dark", true));
const isApple = /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent);
$$("[data-shortcut-hint]").forEach((hint) => { hint.textContent = isApple ? "⌘ K" : "Ctrl K"; });

const mobileButton = $("[data-mobile-menu-button]");
const mobileMenu = $("[data-mobile-menu]");
const docsSidebar = $("[data-docs-sidebar]");
const docsOpen = $("[data-open-docs-menu]");
let docsReturnFocus = null;
function setMobileMenu(open, restore = true) {
  if (!mobileMenu || !mobileButton) return;
  const wasOpen = !mobileMenu.hidden;
  mobileMenu.hidden = !open;
  mobileButton.setAttribute("aria-expanded", String(open));
  $(".sr-only", mobileButton).textContent = open ? "关闭菜单" : "打开菜单";
  body.classList.toggle("mobile-menu-open", open);
  $("main").inert = open;
  $(".site-footer").inert = open;
  if (open) $("a", mobileMenu)?.focus();
  else if (wasOpen && restore) mobileButton.focus();
}
mobileButton?.addEventListener("click", () => { setDocsMenu(false, false); setMobileMenu(mobileMenu.hidden); });
$$("a", mobileMenu || document.createElement("div")).forEach((link) => link.addEventListener("click", () => setMobileMenu(false, false)));

function setDocsMenu(open, restore = true) {
  if (!docsSidebar || !docsOpen) return;
  const wasOpen = docsSidebar.classList.contains("is-open");
  if (open) { setMobileMenu(false, false); docsReturnFocus = document.activeElement; }
  docsSidebar.classList.toggle("is-open", open);
  docsOpen.setAttribute("aria-expanded", String(open));
  body.classList.toggle("docs-menu-open", open);
  $("[data-docs-backdrop]").hidden = !open;
  docsSidebar.inert = mobileViewport.matches && !open;
  if (open || wasOpen) {
    $$(".site-header, .site-footer, .docs-mobile-toolbar, [data-doc-article], .doc-toc").forEach((element) => { element.inert = open; });
  }
  if (open) {
    docsSidebar.setAttribute("role", "dialog");
    docsSidebar.setAttribute("aria-modal", "true");
    $("[data-close-docs-menu]", docsSidebar)?.focus({ preventScroll: true });
  } else {
    docsSidebar.removeAttribute("role");
    docsSidebar.removeAttribute("aria-modal");
    if (wasOpen && restore) (docsReturnFocus || docsOpen).focus({ preventScroll: true });
  }
}
setDocsMenu(false, false);
docsOpen?.addEventListener("click", () => setDocsMenu(true));
$$("[data-close-docs-menu]").forEach((button) => button.addEventListener("click", () => setDocsMenu(false)));
mobileViewport.addEventListener("change", () => { setMobileMenu(false); setDocsMenu(false); });

function trapFocus(event, panel) {
  const items = $$("a[href], button:not([disabled]), input, select, [tabindex='0']", panel).filter((element) => element.getClientRects().length && !element.inert);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
}

const copyTimers = new WeakMap();
async function copyText(value, button) {
  if (!value) return;
  let success = true;
  try { await navigator.clipboard.writeText(value); }
  catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.cssText = "position:fixed;opacity:0;";
    body.append(textarea);
    textarea.select();
    try { success = document.execCommand("copy"); } catch { success = false; }
    textarea.remove();
    button?.focus({ preventScroll: true });
  }
  if (!button) return;
  clearTimeout(copyTimers.get(button));
  const label = $("span", button);
  const previous = button.dataset.copyOriginal || label?.textContent || button.textContent;
  button.dataset.copyOriginal = previous;
  const announcement = success ? "已复制" : "复制失败，请手动选择";
  if (label) label.textContent = announcement;
  else button.textContent = button.classList.contains("heading-link") ? (success ? "✓" : "!") : announcement;
  button.classList.toggle("is-copied", success);
  const status = $("[data-copy-status]");
  if (status) status.textContent = announcement;
  copyTimers.set(button, setTimeout(() => {
    if (label) label.textContent = previous;
    else button.textContent = previous;
    button.classList.remove("is-copied");
  }, 1600));
}
const copyStatus = document.createElement("span");
copyStatus.className = "sr-only";
copyStatus.dataset.copyStatus = "";
copyStatus.setAttribute("role", "status");
body.append(copyStatus);
$$("[data-copy-text]").forEach((button) => button.addEventListener("click", () => copyText(button.dataset.copyText, button)));
$$(".code-frame").forEach((frame) => {
  const bar = $(".code-frame__bar", frame);
  const code = $("code", frame);
  if (!bar || !code || $(".code-copy", bar)) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "code-copy";
  button.innerHTML = `${icons.copy}<span>复制</span>`;
  button.setAttribute("aria-label", "复制代码");
  button.addEventListener("click", () => copyText(code.textContent, button));
  bar.append(button);
});
$$(".doc-content h2[id]").forEach((heading) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "heading-link";
  button.textContent = "#";
  button.setAttribute("aria-label", `复制“${heading.textContent.trim()}”章节链接`);
  button.addEventListener("click", () => {
    const target = new URL(location.href);
    target.hash = heading.id;
    copyText(target.toString(), button);
  });
  heading.append(button);
});

const header = $("[data-site-header]");
const docsProgress = $("[data-docs-progress]");
const docArticle = $("[data-doc-article]");
const tocLinks = $$("[data-toc-link]");
const tocHeadings = [...new Set(tocLinks.map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1)))))] .filter(Boolean);
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
  if (docsProgress && docArticle) {
    const start = docArticle.getBoundingClientRect().top + window.scrollY - 120;
    const length = Math.max(1, docArticle.offsetHeight - window.innerHeight + 160);
    const progress = Math.min(1, Math.max(0, (window.scrollY - start) / length));
    docsProgress.style.transform = `scaleX(${progress})`;
  }
  if (tocHeadings.length) {
    const current = tocHeadings.findLast((heading) => heading.getBoundingClientRect().top < 180) || tocHeadings[0];
    tocLinks.forEach((link) => {
      const active = link.hash === `#${current.id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
}
const queueScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); };
updateScroll();
window.addEventListener("scroll", queueScroll, { passive: true });
window.addEventListener("resize", queueScroll, { passive: true });
window.addEventListener("load", queueScroll, { once: true });

const revealElements = $$("[data-reveal]");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    entry.target.classList.remove("reveal-pending");
    revealObserver.unobserve(entry.target);
  }), { threshold: .08 });
  revealElements.forEach((element) => { element.classList.add("reveal-pending"); revealObserver.observe(element); });
}

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
$$("[data-optical-scene]").forEach((scene) => {
  const depth = $(".optical-scene__depth", scene);
  const section = scene.closest("section");
  const image = $("img", scene);
  image.decode().catch(() => {}).then(() => scene.classList.add("is-ready"));
  let visible = false;
  let seen = false;
  let revision = 0;
  let lightFrame = 0;
  let pointerFrame = 0;
  function reset() {
    revision++;
    cancelAnimationFrame(lightFrame);
    cancelAnimationFrame(pointerFrame);
    scene.classList.remove("is-lit");
    scene.style.setProperty("--tilt-x", "0deg");
    scene.style.setProperty("--tilt-y", "0deg");
  }
  function illuminate() {
    if (!visible || reducedMotion.matches || document.hidden) return;
    const current = ++revision;
    image.decode().catch(() => {}).then(() => {
      if (current !== revision || !visible || reducedMotion.matches) return;
      cancelAnimationFrame(lightFrame);
      scene.classList.remove("is-lit");
      depth.getAnimations({ subtree: true });
      lightFrame = requestAnimationFrame(() => scene.classList.add("is-lit"));
    });
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => entries.forEach((entry) => {
      visible = entry.isIntersecting;
      if (!visible) { reset(); return; }
      if (!seen) { seen = true; illuminate(); }
    }), { threshold: .3 }).observe(scene);
  }
  section?.addEventListener("pointermove", (event) => {
    if (!visible || !finePointer.matches || reducedMotion.matches) return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      const rect = scene.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      scene.style.setProperty("--tilt-x", `${-y * .8}deg`);
      scene.style.setProperty("--tilt-y", `${x * 1.2}deg`);
    });
  }, { passive: true });
  section?.addEventListener("pointerleave", () => {
    cancelAnimationFrame(pointerFrame);
    scene.style.setProperty("--tilt-x", "0deg");
    scene.style.setProperty("--tilt-y", "0deg");
  });
  scene.closest("figure")?.querySelector("[data-optical-replay]")?.addEventListener("click", illuminate);
  reducedMotion.addEventListener("change", () => { if (reducedMotion.matches) reset(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) reset(); });
});

const network = $("[data-network-demo]");
if (network) {
  const steps = [
    { stage: "ready", state: "Ready", title: "两台设备，位于不同的网络。", copy: "为示意设备分配虚拟地址，等待连接协调。", path: "准备建立连接" },
    { stage: "exchange", state: "Signal", title: "控制面协调身份，交换可用候选。", copy: "协调信息经过 Control Plane，业务数据不在此转发。", path: "交换网络候选" },
    { stage: "probe", state: "Probe", title: "尝试 NAT 穿透，确认可达路径。", copy: "UDP 探测可能受 NAT、过滤规则或防火墙限制。", path: "尝试 UDP 直连" },
    { stage: "connected", state: "Direct", title: "直连建立，数据在两端之间传输。", copy: "应用继续使用虚拟 IP，Control Plane 负责协调。", path: "端点间加密直连" },
  ];
  const relayResult = { stage: "connected", state: "Relay", title: "直连受限，切换至加密 Relay。", copy: "中继配置且可达时转发密文，应用仍使用同一个虚拟 IP。", path: "直连不可用" };
  let step = 3;
  let route = "direct";
  let timer = 0;
  let flowTimer = 0;
  let flowFrame = 0;
  let deadline = 0;
  let flowDeadline = 0;
  let remaining = 0;
  let flowRemaining = 0;
  let playing = false;
  let paused = false;
  let touched = false;
  let pausedAnimations = [];
  let textAnimations = [];
  const replay = $("[data-network-replay]", network);
  const topology = $(".network-topology", network);
  const status = $(".network-demo__status", network);
  const durations = [850, 1450, 1850, 2850];
  function playback(mode) {
    network.dataset.playback = mode;
    $("[data-replay-label]", replay).textContent = { idle: "重播", playing: "暂停", paused: "继续" }[mode];
    replay.setAttribute("aria-label", { idle: "重新播放连接过程", playing: "暂停连接演示", paused: "继续连接演示" }[mode]);
  }
  function schedule(delay) {
    deadline = performance.now() + delay;
    timer = setTimeout(advance, delay);
  }
  function endFlowAfter(delay) {
    flowDeadline = performance.now() + delay;
    flowTimer = setTimeout(() => network.classList.remove("is-flowing"), delay);
  }
  function draw(next) {
    step = next;
    const state = step === 3 && route === "relay" ? relayResult : steps[step];
    textAnimations.forEach((animation) => animation.cancel());
    textAnimations = [];
    const changed = $("[data-network-title]", network).textContent !== state.title;
    network.dataset.stage = state.stage;
    network.dataset.route = route;
    $("[data-network-state]", network).textContent = state.state;
    $("[data-network-title]", network).textContent = state.title;
    $("[data-network-copy]", network).textContent = state.copy;
    $("[data-network-path]", network).textContent = state.path;
    $("[data-relay-state]", network).textContent = route === "relay" && step === 3 ? "正在转发密文" : "回退路径待命";
    $("[data-network-description]", network).textContent = `${state.title}${state.copy}连接过程与地址为示意。`;
    $$("[data-network-step]", network).forEach((button) => button.setAttribute("aria-pressed", String(Number(button.dataset.networkStep) === step)));
    $$("[data-network-route]", network).forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.networkRoute === route)));
    network.classList.remove("is-flowing");
    clearTimeout(flowTimer);
    cancelAnimationFrame(flowFrame);
    if (!reducedMotion.matches) {
      // Resolve the removed animation before restarting, including repeated stage selections.
      topology.getAnimations({ subtree: true });
      if (changed) {
        textAnimations = $$("[data-network-title], [data-network-copy]", status).map((element, index) =>
          element.animate([{ opacity: .45, transform: "translateY(3px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 240, delay: index * 30, easing: "cubic-bezier(.22, 1, .36, 1)" }));
      }
      flowFrame = requestAnimationFrame(() => {
        flowFrame = 0;
        network.classList.add("is-flowing");
        endFlowAfter(2850);
      });
    }
  }
  function stop() {
    clearTimeout(timer);
    clearTimeout(flowTimer);
    cancelAnimationFrame(flowFrame);
    flowFrame = 0;
    pausedAnimations.forEach((animation) => reducedMotion.matches ? animation.cancel() : animation.play());
    pausedAnimations = [];
    playing = false;
    paused = false;
    network.classList.remove("is-flowing");
    playback("idle");
  }
  function pause() {
    remaining = Math.max(0, deadline - performance.now());
    flowRemaining = Math.max(0, flowDeadline - performance.now());
    clearTimeout(timer);
    clearTimeout(flowTimer);
    if (flowFrame) {
      cancelAnimationFrame(flowFrame);
      flowFrame = 0;
      network.classList.add("is-flowing");
      flowRemaining = 2850;
    }
    pausedAnimations = [topology, status].flatMap((element) => element.getAnimations({ subtree: true }))
      .filter((animation) => animation.playState === "running");
    pausedAnimations.forEach((animation) => {
      const time = animation.currentTime ?? 0;
      animation.pause();
      // Resolve the pending pause immediately instead of advancing one render frame.
      animation.currentTime = time;
    });
    playing = false;
    paused = true;
    playback("paused");
  }
  function resume() {
    playing = true;
    paused = false;
    playback("playing");
    pausedAnimations.forEach((animation) => animation.play());
    pausedAnimations = [];
    schedule(remaining);
    endFlowAfter(flowRemaining);
  }
  function advance() {
    if (!playing) return;
    if (step < 3) { draw(step + 1); schedule(durations[step]); }
    else stop();
  }
  function play() {
    stop();
    if (reducedMotion.matches) { draw(3); return; }
    playing = true;
    playback("playing");
    draw(0);
    schedule(durations[0]);
  }
  $$("[data-network-step]", network).forEach((button) => button.addEventListener("click", () => { touched = true; stop(); draw(Number(button.dataset.networkStep)); }));
  $$("[data-network-route]", network).forEach((button) => button.addEventListener("click", () => { touched = true; stop(); route = button.dataset.networkRoute; draw(3); }));
  replay.addEventListener("click", () => { touched = true; if (playing) pause(); else if (paused) resume(); else play(); });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) { if (playing) pause(); return; }
      if (!touched && !reducedMotion.matches) { touched = true; play(); }
    }), { threshold: .25 });
    observer.observe(network);
  }
  document.addEventListener("visibilitychange", () => { if (document.hidden && playing) pause(); });
  reducedMotion.addEventListener("change", () => { stop(); network.classList.remove("is-flowing"); draw(3); });
}

$$("[data-product-gallery]").forEach((gallery) => {
  const tabs = $$("[data-screenshot-tab]", gallery);
  const viewport = $(".product-gallery__viewport", gallery);
  let activeIndex = 0;
  let revision = 0;
  let layer = null;
  let fade = null;
  function clearFade() {
    fade?.cancel();
    fade = null;
    layer?.remove();
    layer = null;
  }
  function selectTab(index, focus = false) {
    if (index === activeIndex) { if (focus) tabs[index].focus(); return; }
    const previous = document.getElementById(tabs[activeIndex].getAttribute("aria-controls"));
    const source = $("img", previous);
    const current = ++revision;
    fade?.cancel();
    fade = null;
    if (reducedMotion.matches) clearFade();
    else if (!layer && source.complete && source.naturalWidth) {
      layer = source.cloneNode();
      layer.alt = "";
      layer.setAttribute("aria-hidden", "true");
      layer.className = "product-gallery__crossfade";
      layer.loading = "eager";
      viewport.append(layer);
    }
    activeIndex = index;
    tabs.forEach((tab, current) => {
      const active = current === index;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !active;
    });
    if (focus) tabs[index].focus();
    const image = $("img", document.getElementById(tabs[index].getAttribute("aria-controls")));
    image.decode().catch(() => {}).then(() => {
      if (current !== revision || !layer) return;
      if (reducedMotion.matches) { clearFade(); return; }
      fade = layer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "forwards" });
      fade.onfinish = clearFade;
    });
  }
  reducedMotion.addEventListener("change", () => { if (reducedMotion.matches) clearFade(); });
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(index));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(next, true); }
    });
  });
});

const downloads = JSON.parse($("[data-download-assets]")?.textContent || "[]");
const downloadSelect = $("[data-download-select]");
const initialSmartMeta = $("[data-smart-meta]")?.textContent || "";
let manualDownload = false;
const downloadByKey = (key) => downloads.find((asset) => asset.key === key);
function formatBytes(bytes) {
  const amount = Number(bytes) / 1048576;
  return `${amount >= 10 ? amount.toFixed(0) : amount.toFixed(1)} MB`;
}
function recommend(key, detected = null) {
  const asset = downloadByKey(key);
  body.dataset.platform = asset?.key || "";
  const title = $("[data-smart-title]");
  const description = $("[data-smart-description]");
  if (title) title.textContent = asset ? `${asset.platform} · ${asset.architecture}` : detected?.title || "选择适合你的安装包";
  if (description) description.textContent = asset ? `${asset.detail}。${asset.platform === "Android" ? "请确认设备支持 arm64，并授予系统 VPN 权限。" : asset.platform === "Linux GUI" ? "桌面使用图形客户端；无桌面环境请选择 CLI。" : "请根据安装指南完成系统权限配置。"}` : detected?.description || "按系统与处理器架构选择。";
  if (downloadSelect) downloadSelect.value = asset?.key || "";
  $$("[data-smart-download]").forEach((link) => {
    link.href = asset?.url || (body.dataset.pageKind === "download" ? `#platform-${detected?.family || ""}` : `/download/${detected?.family ? `#platform-${detected.family}` : ""}`);
    if (!asset && body.dataset.pageKind === "download" && !detected?.family) link.href = "#platforms";
    const label = $("span", link);
    if (label) label.textContent = asset ? body.dataset.pageKind === "download" ? `下载 ${asset.extension}` : `下载 ${asset.platform.replace(/ (GUI|CLI)/, "")} 版` : body.dataset.pageKind === "download" ? "选择安装包" : "下载 P2WLAN";
  });
  const file = $("[data-smart-file]");
  const meta = $("[data-smart-meta]");
  if (file) file.textContent = asset?.name || "安装包直接来自 GitHub Releases";
  if (meta) meta.textContent = asset ? `${formatBytes(asset.size)} · ${asset.extension} · 免费` : initialSmartMeta;
  $$(".package-link, .asset-row").forEach((element) => element.classList.toggle("is-recommended", element.dataset.downloadKey === key || element.dataset.platformCard === key));
}
async function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.userAgentData?.platform || navigator.platform || "").toLowerCase();
  let architecture = "";
  let bitness = "";
  try {
    const hints = await navigator.userAgentData?.getHighEntropyValues(["architecture", "bitness"]);
    architecture = hints?.architecture || "";
    bitness = hints?.bitness || "";
  } catch {}
  if (/iphone|ipad|ipod/.test(ua) || (platform.includes("mac") && navigator.maxTouchPoints > 1)) return { key: "", title: "这台设备使用 iOS / iPadOS", description: "当前主要客户端面向 Windows、macOS、Linux 与 Android。未签名 IPA 可在高级资产中查看。" };
  if (ua.includes("android")) return architecture === "x86" || bitness === "32" || /i[3-6]86|x86_64|armv7/.test(ua) ? { key: "", family: "android", title: "Android，确认你的架构", description: "当前 APK 仅支持 arm64。请确认设备架构后选择。" } : { key: "android-arm64", family: "android" };
  if (platform.includes("win")) return architecture === "arm" || /arm64/.test(ua) ? { key: "", family: "windows", title: "Windows ARM 设备", description: "当前发布的是 x64 安装包。请先确认系统的 x64 应用兼容性。" } : /win64|wow64|x64/.test(ua) || (architecture === "x86" && bitness === "64") ? { key: "windows-x64", family: "windows" } : { key: "", family: "windows", title: "Windows，确认你的架构", description: "当前安装包为 x64。请确认系统架构后选择。" };
  if (platform.includes("mac")) return architecture === "arm" ? { key: "macos-arm64", family: "macos" } : architecture === "x86" ? { key: "macos-x64", family: "macos" } : { key: "", family: "macos", title: "macOS，选择你的处理器", description: "在「关于本机」查看芯片。Apple Silicon 使用 arm64，Intel 使用 x64。" };
  if (platform.includes("linux") || ua.includes("linux")) return /aarch64|arm64/.test(ua) || (architecture === "arm" && bitness === "64") ? { key: "linux-cli-arm64", family: "linux" } : /x86_64|x64/.test(ua) || (architecture === "x86" && bitness === "64") ? { key: "linux-gui-x64", family: "linux" } : { key: "", family: "linux", title: "Linux，选择你的架构", description: "桌面 GUI 支持 x64；CLI 支持 x64 与 arm64。" };
  return { key: "", title: "选择适合你的安装包", description: "未能可靠识别当前系统，请按平台与架构手动选择。" };
}
downloadSelect?.addEventListener("change", () => { manualDownload = true; recommend(downloadSelect.value); $("[data-smart-kicker]").textContent = "你选择的安装包"; });
detectPlatform().then((detected) => { if (!manualDownload) recommend(detected.key, detected); });

const searchDialog = $("[data-search-dialog]");
const searchInput = $("[data-search-input]");
const searchResults = $("[data-search-results]");
const searchHint = $("[data-search-hint]");
const searchStatus = $("[data-search-status]");
let searchIndex = null;
let searchPromise = null;
let activeResult = -1;
let closeTimer = 0;
let searchReturnFocus = null;
function escapeSearchHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
function excerpt(text, query) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  const start = Math.max(0, index < 0 ? 0 : index - 45);
  const fragment = text.slice(start, start + 135).trim();
  return `${start > 0 ? "…" : ""}${fragment}${start + 135 < text.length ? "…" : ""}`;
}
function scorePage(page, query) {
  const normalized = query.toLowerCase().trim();
  const terms = normalized.split(/\s+/).filter(Boolean);
  const fields = { title: page.title.toLowerCase(), headings: (page.headings || []).join(" ").toLowerCase(), keywords: (page.keywords || []).join(" ").toLowerCase(), description: page.description.toLowerCase(), text: page.text.toLowerCase() };
  let score = 0;
  for (const term of terms) {
    if (fields.title === term) score += 50;
    if (fields.title.includes(term)) score += 22;
    if (fields.headings.includes(term)) score += 13;
    if (fields.keywords.includes(term)) score += 10;
    if (fields.description.includes(term)) score += 7;
    score += Math.min(fields.text.split(term).length - 1, 8) * 2;
  }
  if (fields.text.includes(normalized)) score += 12;
  return score;
}
function updateActiveResult(next) {
  const items = $$(".search-result", searchResults);
  if (!items.length) return;
  activeResult = Math.max(0, Math.min(items.length - 1, next));
  items.forEach((item, index) => {
    item.classList.toggle("is-active", index === activeResult);
    item.setAttribute("aria-selected", String(index === activeResult));
  });
  searchInput.setAttribute("aria-activedescendant", items[activeResult].id);
  items[activeResult].scrollIntoView({ block: "nearest", behavior: "instant" });
}
function renderSearch(query) {
  if (!searchResults || !searchIndex) return;
  const trimmed = query.trim();
  activeResult = -1;
  searchInput.removeAttribute("aria-activedescendant");
  if (!trimmed) {
    searchResults.innerHTML = "";
    searchResults.hidden = true;
    searchHint.hidden = false;
    searchHint.textContent = "例如：Relay、对称 NAT、status --json、TLS。";
    searchInput.setAttribute("aria-expanded", "false");
    searchStatus.textContent = "输入关键词搜索站内内容";
    return;
  }
  const ranked = searchIndex.pages.map((page) => ({ page, score: scorePage(page, trimmed) })).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).slice(0, 10);
  searchHint.hidden = true;
  searchInput.setAttribute("aria-expanded", String(ranked.length > 0));
  searchStatus.textContent = ranked.length ? `找到 ${ranked.length} 条结果` : "没有找到匹配内容";
  if (!ranked.length) {
    searchResults.innerHTML = "";
    searchResults.hidden = true;
    searchHint.hidden = false;
    searchHint.textContent = "没有找到匹配内容。尝试更短的关键词，或从文档首页按任务浏览。";
    return;
  }
  searchResults.hidden = false;
  searchResults.innerHTML = ranked.map(({ page }, index) => `<a class="search-result" id="search-result-${index}" role="option" tabindex="-1" aria-selected="false" href="${escapeSearchHtml(page.url)}"><span>${escapeSearchHtml(page.section)}</span><strong>${escapeSearchHtml(page.title)}</strong><p>${escapeSearchHtml(excerpt(page.text, trimmed))}</p></a>`).join("");
  updateActiveResult(0);
}
async function ensureSearchIndex() {
  if (searchIndex) return searchIndex;
  if (!searchPromise) searchPromise = fetch("/search-index.json", { credentials: "same-origin" }).then((response) => {
    if (!response.ok) throw new Error(`search index ${response.status}`);
    return response.json();
  }).then((data) => { searchIndex = data; return data; }).catch((error) => { searchPromise = null; throw error; });
  return searchPromise;
}
async function openSearch() {
  if (!searchDialog || !searchInput) return;
  clearTimeout(closeTimer);
  searchDialog.classList.remove("is-closing");
  if (!searchDialog.open) searchReturnFocus = docsSidebar?.contains(document.activeElement) && mobileViewport.matches ? docsOpen : document.activeElement;
  setMobileMenu(false, false);
  setDocsMenu(false, false);
  if (!searchDialog.open) searchDialog.showModal();
  body.classList.add("search-open");
  searchInput.focus();
  searchHint.hidden = false;
  searchHint.textContent = searchIndex ? "例如：Relay、对称 NAT、status --json、TLS。" : "正在加载搜索索引…";
  searchStatus.textContent = searchHint.textContent;
  try { await ensureSearchIndex(); renderSearch(searchInput.value); }
  catch {
    searchHint.hidden = false;
    searchHint.textContent = "搜索索引加载失败。重新打开可重试，也可从文档首页浏览。";
    searchStatus.textContent = searchHint.textContent;
  }
}
function closeSearch() {
  if (!searchDialog?.open) return;
  clearTimeout(closeTimer);
  searchDialog.classList.add("is-closing");
  const finish = () => {
    searchDialog.close();
    searchDialog.classList.remove("is-closing");
    body.classList.remove("search-open");
    searchInput.setAttribute("aria-expanded", "false");
    if (searchReturnFocus?.getClientRects().length && !searchReturnFocus.inert) searchReturnFocus.focus({ preventScroll: true });
  };
  if (reducedMotion.matches) finish();
  else closeTimer = setTimeout(finish, 240);
}
$$("[data-open-search]").forEach((button) => button.addEventListener("click", openSearch));
$("[data-close-search]")?.addEventListener("click", closeSearch);
searchInput?.addEventListener("input", () => renderSearch(searchInput.value));
searchDialog?.addEventListener("click", (event) => { if (event.target === searchDialog) closeSearch(); });
searchDialog?.addEventListener("cancel", (event) => { event.preventDefault(); closeSearch(); });
searchDialog?.addEventListener("close", () => body.classList.remove("search-open"));
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); return; }
  if (event.key === "Escape") {
    if (searchDialog?.open) { event.preventDefault(); closeSearch(); }
    else { setMobileMenu(false); setDocsMenu(false); }
    return;
  }
  if (event.key === "Tab") {
    if (docsSidebar?.classList.contains("is-open")) trapFocus(event, docsSidebar);
    else if (mobileMenu && !mobileMenu.hidden) trapFocus(event, header);
  }
  if (!searchDialog?.open || !searchResults) return;
  if (event.key === "ArrowDown") { event.preventDefault(); updateActiveResult(activeResult + 1); }
  if (event.key === "ArrowUp") { event.preventDefault(); updateActiveResult(activeResult <= 0 ? 0 : activeResult - 1); }
  if (event.key === "Enter" && activeResult >= 0 && document.activeElement === searchInput) {
    const active = $$(".search-result", searchResults)[activeResult];
    if (active) { event.preventDefault(); location.href = active.href; }
  }
});
