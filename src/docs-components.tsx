import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clipboard,
  Download,
  ExternalLink,
  Github,
  Info,
} from "lucide-react";

const REPO = "https://github.com/yhan-sun/p2wlan";
const RELEASES = `${REPO}/releases/latest`;
const ISSUES = `${REPO}/issues`;

export function Callout({
  children,
  kind = "note",
  title,
}: {
  children: ReactNode;
  kind?: "note" | "warning" | "tip";
  title?: string;
}) {
  const Icon =
    kind === "warning" ? AlertTriangle : kind === "tip" ? CheckCircle2 : Info;

  return (
    <div className={`callout ${kind}`}>
      <Icon aria-hidden="true" />
      <div>
        {title && <strong>{title}</strong>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export function CodeBlock({
  children,
  label = "示例",
}: {
  children: string;
  label?: string;
}) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  const copy = async () => {
    const fallbackCopy = () => {
      const textarea = document.createElement("textarea");
      textarea.value = children;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        if (!document.execCommand("copy")) throw new Error("copy failed");
      } finally {
        textarea.remove();
      }
    };

    try {
      if (typeof navigator.clipboard?.writeText === "function") {
        try {
          await navigator.clipboard.writeText(children);
        } catch {
          fallbackCopy();
        }
      } else {
        fallbackCopy();
      }
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => {
      setCopyState("idle");
      resetTimerRef.current = null;
    }, 1500);
  };

  return (
    <div className="code">
      <div className="code-toolbar">
        <span className="code-label">{label}</span>
        <button
          type="button"
          className={copyState === "copied" ? "copied" : copyState === "error" ? "copy-error" : ""}
          onClick={() => void copy()}
          aria-label={
            copyState === "copied"
              ? `已复制${label}`
              : copyState === "error"
                ? `复制${label}失败，请重试`
                : `复制${label}`
          }
        >
          {copyState === "copied" ? (
            <Check aria-hidden="true" />
          ) : copyState === "error" ? (
            <AlertTriangle aria-hidden="true" />
          ) : (
            <Clipboard aria-hidden="true" />
          )}
          {copyState === "copied" ? "已复制" : copyState === "error" ? "复制失败" : "复制"}
        </button>
      </div>
      <pre tabIndex={0} aria-label={`${label}代码`}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function DocImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="doc-image">
      <img
        src={`./images/${src}`}
        alt={alt}
        width="1200"
        height="800"
        loading="lazy"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function Steps({
  items,
}: {
  items: Array<{ title: string; text: ReactNode }>;
}) {
  return (
    <ol className="doc-steps">
      {items.map((item, index) => (
        <li key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ReleaseLink() {
  return (
    <a className="doc-link" href={RELEASES} target="_blank" rel="noreferrer">
      <Download aria-hidden="true" />
      <span>
        <b>打开官方 Latest Release</b>
        <small>只从 github.com/yhan-sun/p2wlan 下载</small>
      </span>
      <ExternalLink aria-hidden="true" />
    </a>
  );
}

export function IssuesLink() {
  return (
    <a className="doc-link" href={ISSUES} target="_blank" rel="noreferrer">
      <Github aria-hidden="true" />
      <span>
        <b>前往 GitHub Issues</b>
        <small>先搜索已有问题，再提交脱敏后的复现信息</small>
      </span>
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="inline-kbd">{children}</kbd>;
}
