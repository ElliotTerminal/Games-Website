(function () {
  "use strict";

  /** @typedef {{ name: string, banner?: string, bannerAlt?: string, summary?: string, meta?: Record<string, string>, body?: string[], links?: Record<string, string> }} Game */

  const listEl = document.getElementById("game-list");
  const overlay = document.getElementById("overlay");
  const panel = document.getElementById("detail-panel");
  const detailBanner = document.getElementById("detail-banner");
  const detailMedia = detailBanner.closest(".detail-panel__media");
  const detailTitle = document.getElementById("detail-title");
  const detailMeta = document.getElementById("detail-meta");
  const detailContent = document.getElementById("detail-content");
  const detailLinks = document.getElementById("detail-links");
  const btnClose = document.getElementById("detail-close");

  /** @type {Game[]} */
  const games = Array.isArray(window.GAMES_DATA) ? window.GAMES_DATA : [];
  const desktopPreviewQuery = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  let lastOpenedIndex = null;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(s) {
    return escapeHtml(String(s)).replace(/\n/g, " ");
  }

  function getPreviewText(game) {
    if (game.summary) return game.summary;
    if (Array.isArray(game.body) && game.body.length > 0) return game.body[0];
    return "Quick preview available. Click to open full details.";
  }

  function renderList() {
    listEl.innerHTML = "";
    if (games.length === 0) {
      const p = document.createElement("p");
      p.className = "site-tagline";
      p.style.textAlign = "center";
      p.textContent =
        "No games yet. Add entries to js/games-data.js and reload.";
      listEl.appendChild(p);
      return;
    }

    games.forEach((game, index) => {
      const bannerSrc = game.banner || "";
      const name = game.name || `Game ${index + 1}`;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "game-card";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-haspopup", "dialog");
      btn.dataset.index = String(index);
      const previewText = getPreviewText(game);

      btn.innerHTML = `
        <span class="game-card__thumb" aria-hidden="true">
          <span class="game-card__banner-wrap">
          ${
            bannerSrc
              ? `<img class="game-card__banner" src="${escapeHtml(
                  bannerSrc
                )}" alt="" loading="lazy" />`
              : `<span class="game-card__banner game-card__banner--placeholder"></span>`
          }
          </span>
          <span class="game-card__quick-preview">
            <span class="game-card__quick-preview-title">${escapeHtml(name)}</span>
            <span class="game-card__quick-preview-text">${escapeHtml(previewText)}</span>
            <span class="game-card__quick-preview-cta">Click to open details</span>
          </span>
        </span>
        <span class="game-card__name">${escapeHtml(name)}</span>
      `;
      btn.setAttribute(
        "aria-label",
        `${escapeAttr(name)} — open details`
      );

      let previewTimer = null;
      function clearPreviewState() {
        if (previewTimer) {
          window.clearTimeout(previewTimer);
          previewTimer = null;
        }
        btn.classList.remove("game-card--preview");
      }

      btn.addEventListener("mouseenter", () => {
        if (!desktopPreviewQuery.matches) return;
        if (previewTimer) window.clearTimeout(previewTimer);
        previewTimer = window.setTimeout(() => {
          btn.classList.add("game-card--preview");
          previewTimer = null;
        }, 180);
      });
      btn.addEventListener("mouseleave", clearPreviewState);

      btn.addEventListener("click", () => openDetail(index));
      btn.addEventListener("click", clearPreviewState);
      listEl.appendChild(btn);
    });
  }

  function openDetail(index) {
    const game = games[index];
    if (!game) return;

    lastOpenedIndex = index;

    detailTitle.textContent = game.name || "Game";

    const bannerSrc = game.banner || "";
    const alt =
      game.bannerAlt || `Banner for ${game.name || "game"}`;
    detailBanner.alt = alt;
    if (bannerSrc) {
      detailMedia.classList.remove("detail-panel__media--empty");
      detailBanner.removeAttribute("hidden");
      detailBanner.src = bannerSrc;
    } else {
      detailMedia.classList.add("detail-panel__media--empty");
      detailBanner.removeAttribute("src");
      detailBanner.setAttribute("hidden", "");
    }

    detailMeta.innerHTML = "";
    const meta = game.meta && typeof game.meta === "object" ? game.meta : null;
    if (meta) {
      Object.keys(meta).forEach((key) => {
        const dt = document.createElement("dt");
        dt.textContent = key;
        const dd = document.createElement("dd");
        dd.textContent = meta[key];
        detailMeta.appendChild(dt);
        detailMeta.appendChild(dd);
      });
    }

    detailContent.innerHTML = "";
    if (game.summary) {
      const lead = document.createElement("p");
      lead.innerHTML = `<strong>${escapeHtml(game.summary)}</strong>`;
      detailContent.appendChild(lead);
    }
    const body = Array.isArray(game.body) ? game.body : [];
    body.forEach((para) => {
      const p = document.createElement("p");
      p.textContent = para;
      detailContent.appendChild(p);
    });
    if (!game.summary && body.length === 0 && !meta) {
      const p = document.createElement("p");
      p.className = "site-tagline";
      p.style.marginTop = "0";
      p.textContent = "No public details yet — add summary, meta, or body in games-data.js.";
      detailContent.appendChild(p);
    }

    detailLinks.innerHTML = "";
    const links = game.links && typeof game.links === "object" ? game.links : {};
    const linkEntries = Object.keys(links);
    if (linkEntries.length > 0) {
      linkEntries.forEach((label) => {
        const href = links[label];
        if (!href) return;
        const a = document.createElement("a");
        a.href = href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = label;
        detailLinks.appendChild(a);
      });
    }

    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    panel.hidden = false;
    document.body.classList.add("detail-open");

    btnClose.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";

    listEl.querySelectorAll(".game-card").forEach((btn) => {
      const i = btn.dataset.index;
      btn.setAttribute("aria-expanded", i === String(index) ? "true" : "false");
    });
  }

  function closeDetail() {
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    panel.hidden = true;
    document.body.classList.remove("detail-open");
    document.body.style.overflow = "";
    listEl.querySelectorAll(".game-card").forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
    });
    if (
      typeof lastOpenedIndex === "number" &&
      games.length > lastOpenedIndex &&
      games[lastOpenedIndex]
    ) {
      const back = listEl.querySelector(
        `[data-index="${lastOpenedIndex}"]`
      );
      if (back) back.focus({ preventScroll: true });
    }
  }

  function onCloseTrigger(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    closeDetail();
  }

  btnClose.addEventListener("click", onCloseTrigger);
  overlay.addEventListener("click", onCloseTrigger);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) {
      closeDetail();
    }
  });

  renderList();
})();
