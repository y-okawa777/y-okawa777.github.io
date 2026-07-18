// プライバシーポリシーページ用: 問い合わせフォーム送信 + メールアドレスコピー
// 表示文言はフォーム/ボタンの data-* 属性から取得する (ja.html / en.html で共通利用)
(function () {
  "use strict";

  // --- フォーム (Formspree AJAX送信) ---
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = document.getElementById("form-status");
      const submitBtn = form.querySelector(".form-submit");
      const label = submitBtn.querySelector("span");
      const idle = label.textContent;
      submitBtn.disabled = true;
      label.textContent = form.dataset.sending;
      status.hidden = true;
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then((res) => {
          status.hidden = false;
          if (res.ok) {
            status.textContent = form.dataset.success;
            status.classList.remove("is-error");
            form.reset();
          } else {
            status.textContent = form.dataset.error;
            status.classList.add("is-error");
          }
        })
        .catch(() => {
          status.hidden = false;
          status.textContent = form.dataset.error;
          status.classList.add("is-error");
        })
        .finally(() => {
          submitBtn.disabled = false;
          label.textContent = idle;
        });
    });
  }

  // --- メールアドレスコピー ---
  const copyBtn = document.getElementById("copy-email");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const address = document.getElementById("contact-address").textContent;
      const idle = copyBtn.textContent;
      const done = () => {
        copyBtn.textContent = copyBtn.dataset.copied;
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = idle;
          copyBtn.classList.remove("copied");
        }, 2000);
      };
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
  }
})();
