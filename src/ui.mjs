export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function formatDate(value) {
  if (!value) return "未知日期";
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

export function formatBytes(value) {
  const bytes = Number(value || 0);
  if (!Number.isFinite(bytes) || bytes <= 0) return "未知大小";
  const units = ["B", "KB", "MB", "GB"];
  let amount = bytes;
  let index = 0;
  while (amount >= 1024 && index < units.length - 1) {
    amount /= 1024;
    index += 1;
  }
  return `${amount >= 10 || index === 0 ? amount.toFixed(0) : amount.toFixed(1)} ${units[index]}`;
}

export function assetByKey(assets, key) {
  return assets.find((asset) => asset.key === key) || null;
}

export function assetLink(asset, label, className = "button button--primary") {
  if (!asset) return `<a class="${className}" href="/download/">${escapeHtml(label)}</a>`;
  return `<a class="${className}" href="${escapeHtml(asset.url)}" data-download-key="${escapeHtml(
    asset.key
  )}">${escapeHtml(label)}</a>`;
}

export function textAssetLink(asset, label) {
  if (!asset) return `<a class="inline-action" href="/download/">${escapeHtml(label)} <span>→</span></a>`;
  return `<a class="inline-action" href="${escapeHtml(asset.url)}" data-download-key="${escapeHtml(
    asset.key
  )}">${escapeHtml(label)} <span>↓</span></a>`;
}

export function icon(name, className = "") {
  const attrs = `class="icon ${escapeHtml(className)}" viewBox="0 0 24 24" aria-hidden="true"`;
  const icons = {
    arrow: `<svg ${attrs}><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
    download: `<svg ${attrs}><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14"/></svg>`,
    github: `<svg ${attrs}><path d="M9 19c-4 1.2-4-2-5-2.5M14 21v-3.1c0-.9.3-1.6.8-2-2.7-.3-5.6-1.3-5.6-6A4.7 4.7 0 0 1 10.5 6c-.1-.3-.6-1.6.1-3.2 0 0 1.1-.3 3.4 1.3a11.8 11.8 0 0 1 6 0c2.3-1.6 3.4-1.3 3.4-1.3.7 1.6.2 2.9.1 3.2a4.7 4.7 0 0 1 1.3 3.2c0 4.7-2.9 5.7-5.6 6 .5.4.8 1.2.8 2.3V21" transform="translate(-5 0)"/></svg>`,
    search: `<svg ${attrs}><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>`,
    sun: `<svg ${attrs}><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
    shield: `<svg ${attrs}><path d="M12 3 5 6v5c0 4.5 2.9 8 7 10 4.1-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/></svg>`,
    server: `<svg ${attrs}><rect x="4" y="4" width="16" height="6" rx="2"/><rect x="4" y="14" width="16" height="6" rx="2"/><path d="M8 7h.01M8 17h.01"/></svg>`,
    route: `<svg ${attrs}><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h4a4 4 0 0 1 4 4v2M16 12v4"/></svg>`,
    key: `<svg ${attrs}><circle cx="8.5" cy="12" r="3.5"/><path d="M12 12h8m-3 0v3m-3-3v2"/></svg>`,
    terminal: `<svg ${attrs}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3m6 0h4"/></svg>`,
    monitor: `<svg ${attrs}><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>`,
    mobile: `<svg ${attrs}><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>`,
    copy: `<svg ${attrs}><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>`,
    check: `<svg ${attrs}><path d="m5 12 4 4L19 6"/></svg>`,
    chevron: `<svg ${attrs}><path d="m9 6 6 6-6 6"/></svg>`,
    menu: `<svg ${attrs}><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
    close: `<svg ${attrs}><path d="m6 6 12 12M18 6 6 18"/></svg>`,
  };
  return icons[name] || "";
}
