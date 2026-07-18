// ============================================================
// メインスクリプト
// - 言語判定: ブラウザ言語が日本語なら ja、それ以外は en
//   (手動切替は localStorage に保存され次回以降も維持される)
// - カード描画 / カテゴリフィルタ / 検索
// - アプリアイコンは iTunes Lookup API から取得し localStorage に24hキャッシュ
// ============================================================
(function () {
  "use strict";

  // ---------- 言語 ----------
  const stored = localStorage.getItem("lang");
  let lang = stored || (navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en");

  const t = (key) => (I18N[lang] && I18N[lang][key]) || key;
  const storeCountry = () => (lang === "ja" ? "jp" : "us");
  const appUrl = (app) => `https://apps.apple.com/${storeCountry()}/app/${app.slug}/id${app.id}`;

  function applyI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
      // グリッチ演出は data-text 属性の複製テキストを使う
      if (el.classList.contains("glitch")) el.setAttribute("data-text", el.textContent);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    // プライバシーポリシーは言語別ファイルへリンク
    const privacyLink = document.getElementById("privacy-link");
    if (privacyLink) privacyLink.href = lang === "ja" ? "privacy/ja.md" : "privacy/en.md";
  }

  // ---------- ターミナル演出 (1行ずつタイプ表示) ----------
  function runTerminal() {
    const body = document.getElementById("terminal-body");
    if (!body) return;
    const lines = ["terminal.l1", "terminal.l2", "terminal.l3", "terminal.l4"].map(t);
    body.innerHTML = "";
    let li = 0, ci = 0, text = "";
    function tick() {
      if (li >= lines.length) {
        body.innerHTML = text + '<span class="cursor">█</span>';
        return;
      }
      if (ci < lines[li].length) {
        text += lines[li][ci++];
      } else {
        text += "\n"; li++; ci = 0;
      }
      body.innerHTML = text + '<span class="cursor">█</span>';
      setTimeout(tick, ci === 0 ? 260 : 18);
    }
    tick();
  }

  // ---------- 統計カウントアップ ----------
  function animateCount(el, target) {
    const dur = 1200, start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ---------- フィルタ ----------
  let activeFilter = "all";
  let searchQuery = "";

  function renderFilters() {
    const wrap = document.getElementById("filters");
    const cats = [...new Set(APPS.map((a) => a.category))];
    wrap.innerHTML = "";
    const mkBtn = (key, label) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "filter-btn" + (activeFilter === key ? " active" : "");
      b.textContent = label;
      b.addEventListener("click", () => {
        activeFilter = key;
        renderFilters();
        renderCards();
      });
      return b;
    };
    wrap.appendChild(mkBtn("all", t("filter.all")));
    cats.forEach((c) => wrap.appendChild(mkBtn(c, CATEGORY_LABELS[c][lang])));
  }

  // ---------- カード描画 ----------
  const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); }
    }),
    { threshold: 0.08 }
  );

  function matches(app) {
    if (activeFilter !== "all" && app.category !== activeFilter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      app.name.ja.toLowerCase().includes(q) ||
      app.name.en.toLowerCase().includes(q) ||
      app.desc[lang].toLowerCase().includes(q)
    );
  }

  function renderCards() {
    const grid = document.getElementById("app-grid");
    const empty = document.getElementById("empty-msg");
    grid.innerHTML = "";
    const shown = APPS.filter(matches);
    empty.hidden = shown.length > 0;

    shown.forEach((app) => {
      const card = document.createElement("article");
      card.className = "app-card";
      card.dataset.accent = app.accent;

      const head = document.createElement("div");
      head.className = "card-head";

      // アイコン: 取得済みならimg、未取得なら頭文字プレースホルダ
      const iconUrl = iconCache.icons[app.id];
      if (iconUrl) {
        const img = document.createElement("img");
        img.className = "app-icon";
        img.src = iconUrl;
        img.alt = "";
        img.loading = "lazy";
        head.appendChild(img);
      } else {
        const ph = document.createElement("div");
        ph.className = "app-icon-ph";
        ph.dataset.accent = app.accent;
        ph.textContent = app.name.en.replace(/[^A-Za-z0-9]/g, "").charAt(0) || "A";
        head.appendChild(ph);
      }

      const meta = document.createElement("div");
      const nameEl = document.createElement("h3");
      nameEl.className = "app-name";
      nameEl.textContent = app.name[lang];
      const catEl = document.createElement("span");
      catEl.className = "app-category";
      catEl.textContent = CATEGORY_LABELS[app.category][lang];
      meta.appendChild(nameEl);
      meta.appendChild(catEl);
      head.appendChild(meta);

      const desc = document.createElement("p");
      desc.className = "app-desc";
      desc.textContent = app.desc[lang];

      const link = document.createElement("a");
      link.className = "app-link";
      link.href = appUrl(app);
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "▸ " + t("card.appstore");

      card.appendChild(head);
      card.appendChild(desc);
      card.appendChild(link);
      grid.appendChild(card);
      revealObserver.observe(card);
    });
  }

  // ---------- アイコン取得 (iTunes Lookup API / 24hキャッシュ) ----------
  const CACHE_KEY = "iconCache_v1";
  const CACHE_TTL = 24 * 60 * 60 * 1000;
  let iconCache = { time: 0, icons: {} };
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (c && Date.now() - c.time < CACHE_TTL) iconCache = c;
  } catch (_) { /* 壊れたキャッシュは無視 */ }

  // fetch+CORSはブラウザ環境により失敗することがあるため、
  // iTunes APIが公式サポートするJSONP (callbackパラメータ) で取得する
  function fetchIcons() {
    if (Object.keys(iconCache.icons).length >= APPS.length) return;
    const ids = APPS.map((a) => a.id).join(",");
    window.__itunesIconsCb = function (data) {
      (data.results || []).forEach((r) => {
        if (r.trackId && r.artworkUrl100) {
          iconCache.icons[String(r.trackId)] = r.artworkUrl100.replace("100x100", "128x128");
        }
      });
      iconCache.time = Date.now();
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(iconCache)); } catch (_) {}
      renderCards(); // 取得できたアイコンで再描画
      cleanup();
    };
    const script = document.createElement("script");
    script.src = `https://itunes.apple.com/lookup?id=${ids}&country=${storeCountry()}&callback=__itunesIconsCb`;
    script.onerror = cleanup; // オフライン等はプレースホルダのまま
    function cleanup() {
      delete window.__itunesIconsCb;
      script.remove();
    }
    document.head.appendChild(script);
  }

  // ---------- 初期化 ----------
  function refreshAll() {
    applyI18n();
    renderFilters();
    renderCards();
    runTerminal();
  }

  document.getElementById("lang-toggle").addEventListener("click", () => {
    lang = lang === "ja" ? "en" : "ja";
    localStorage.setItem("lang", lang);
    refreshAll();
  });

  document.getElementById("app-search").addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderCards();
  });

  // メールアドレスのコピーボタン (メールアプリ未設定環境向け)
  document.getElementById("copy-email").addEventListener("click", function () {
    const btn = this;
    const address = document.getElementById("contact-address").textContent;
    const done = () => {
      btn.textContent = t("contact.copied");
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = t("contact.copy");
        btn.classList.remove("copied");
      }, 2000);
    };
    // 古いブラウザ・Clipboard API拒否時のフォールバック
    const fallbackCopy = () => {
      const ta = document.createElement("textarea");
      ta.value = address;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      done();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(done).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  refreshAll();
  fetchIcons();
  animateCount(document.getElementById("stat-apps"), APPS.length);
  animateCount(document.getElementById("stat-cats"), new Set(APPS.map((a) => a.category)).size);
})();
