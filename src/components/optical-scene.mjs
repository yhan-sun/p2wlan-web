// Generated material and live vector light share the same 1774 × 887 coordinate space.
export function renderOpticalScene(className, eager = false) {
  return `<div class="optical-scene ${className}" data-optical-scene aria-hidden="true">
    <div class="optical-scene__depth">
      <img src="/images/brand/network-light-path-v1.webp" width="1774" height="887" alt="" loading="${eager ? "eager" : "lazy"}" decoding="async"/>
      <svg viewBox="0 0 1774 887" fill="none">
        <defs><mask id="optical-material-${className}" class="optical-material"><image href="/images/brand/network-light-path-v1.webp" width="1774" height="887"/></mask></defs>
        <g mask="url(#optical-material-${className})">
        <g class="optical-light optical-light--near" stroke-linecap="round">
          <path d="M392 584C718 713 1052 700 1512 468" stroke-width="9" opacity=".12"/>
          <path d="M392 584C718 713 1052 700 1512 468" stroke-width="2"/>
        </g>
        <g class="optical-light optical-light--far" stroke-linecap="round">
          <path d="M388 612C761 737 997 501 1280 328S1688 154 1672 397" stroke-width="7" opacity=".1"/>
          <path d="M388 612C761 737 997 501 1280 328S1688 154 1672 397" stroke-width="1.5"/>
        </g>
        </g>
      </svg>
    </div>
  </div>`;
}
