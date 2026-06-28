/**
 * 現在の実行環境におけるフル西暦
 *
 * @format
 */

const currentYear = new Date().getFullYear();

// 実行時の年が、あらかじめ設定した開始年よりも進んでいるかを確認する
if (currentYear > 2026) {
  /** 画面上の年を表示させたい要素 */
  const displayTargetElement = document.getElementById("copyright-year");
  // 指定した要素が存在する場合のみ、表示内容を更新する
  if (displayTargetElement) {
    displayTargetElement.textContent = " - " + currentYear;
  }
}

/** ページの読み込み完了を待機するイベント */
document.addEventListener("DOMContentLoaded", () => {
  /** スマホ用メニューの開閉を制御するチェックボックス */
  const menuCheck = document.querySelector("#menu-btn-check");
  /** ナビゲーション内の各リンクのリスト */
  const menuLinks = document.querySelectorAll(".menu-content a");
  /** ページ内の各セクションのリスト */
  const sections = document.querySelectorAll("section");

  const getScrollTop = () => window.pageYOffset;

  const setScrollTop = (value) => window.scrollTo(0, value);

  // メニューのリンクをクリックした時にメニューを閉じる処理
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuCheck) {
        menuCheck.checked = false;
      }
    });
  });

  // スクロールに応じて要素を表示させる処理
  const showSections = () => {
    /** 現在のスクロール位置 */
    const scrollPos = getScrollTop();
    sections.forEach((section) => {
      /** セクションの上端の位置 */
      const sectionTop = section.offsetTop;
      if (scrollPos > sectionTop - 600) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  };

  showSections();
  window.addEventListener("scroll", showSections, { passive: true });
});

// ============================================
// スクロール
// ============================================
/** 画面全体を管理する対象 */
const docElement = document;

docElement.addEventListener("click", (e) => {
  /** クリックされた要素から最も近いリンク */
  const anchorLink = e.target.closest("a");
  if (anchorLink && anchorLink.hash && anchorLink.hash.startsWith("#")) {
    /** 移動先のID名 */
    const idName = anchorLink.hash;
    /** 移動先の要素本体 */
    const targetSection = docElement.querySelector(idName);
    if (targetSection) {
      e.preventDefault();
      /** スクロール開始時の位置 */
      const startPos = window.pageYOffset;
      /** 目的地の位置 */
      const endPos = targetSection.getBoundingClientRect().top + startPos;
      /** アニメーション時間 */
      const duration = 600;
      /** 開始時刻 */
      let startTime = null;

      /**
       * イージング関数
       * @param {number} t 現在の経過時間
       * @param {number} b 開始位置
       * @param {number} c 移動距離
       * @param {number} d 合計時間
       */
      const easeOutQuad = (t, b, c, d) => {
        t /= d;
        return -c * t * (t - 2) + b;
      };

      /**
       * 描画ループ
       * @param {number} currentTime 現在時刻
       */
      const loop = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        /** 経過時間 */
        const timeElapsed = currentTime - startTime;
        /** 次の位置 */
        const nextPos = easeOutQuad(timeElapsed, startPos, endPos - startPos, duration);
        window.scrollTo(0, nextPos);
        if (timeElapsed < duration) {
          window.requestAnimationFrame(loop);
        } else {
          window.scrollTo(0, endPos);
        }
      };
      window.requestAnimationFrame(loop);

      /** メニューの開閉スイッチ */
      const menuToggle = docElement.getElementById("menu-btn-check");
      if (menuToggle && menuToggle.checked) {
        menuToggle.checked = false;
      }
    }
  }
});

// ============================================
// モーダルウィンドウ
// ============================================
/** チーム紹介の開くボタン */
const teamOpenBtn = document.getElementById("open-window-btn");
/** フォームの開くボタン */
const formOpenBtn = document.getElementById("open-form-btn");
/** ニュースの開くボタン */
const newsOpenBtn = document.getElementById("open-news-btn");
/** チーム紹介の閉じるボタン */
const teamCloseBtn = document.getElementById("close-window-btn");
/** フォームの閉じるボタン */
const formCloseBtn = document.getElementById("close-form-btn");
/** ニュースの閉じるボタン */
const newsCloseBtn = document.getElementById("close-news-btn");
/** チーム紹介のモーダル要素 */
const teamModal = document.getElementById("TEAM_modal-overlay");
/** ニュースのモーダル要素 */
const newsModal = document.getElementById("news_modal-overlay");
/** フォームのモーダル要素 */
const formModal = document.getElementById("GoogleForm_modal-overlay");

const toggleScrollLock = (shouldLock) => {
  document.documentElement.classList.toggle("modal-open", shouldLock);
  document.body.classList.toggle("modal-open", shouldLock);
  document.body.style.overflow = shouldLock ? "hidden" : "";
  document.documentElement.style.overflow = shouldLock ? "hidden" : "";
};

const openModal = (modal) => {
  if (!modal) return;
  modal.classList.add("is-active");
  toggleScrollLock(true);
};

const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove("is-active");
  if (!document.querySelector(".modal-overlay.is-active")) {
    toggleScrollLock(false);
  }
};

// モーダル表示中は背景のスクロールを止め、モーダル本体のスクロールだけを残す
if (typeof window !== "undefined") {
  document.addEventListener(
    "touchmove",
    (e) => {
      if (!document.body.classList.contains("modal-open")) return;
      const insideModal = e.target instanceof Element && e.target.closest(".modal-content");
      const insideModalBody = e.target instanceof Element && e.target.closest(".modal-body");
      if (!insideModalBody && insideModal) {
        e.preventDefault();
      }
    },
    { passive: false },
  );
}

// チーム紹介のモーダルを開く処理
if (teamOpenBtn && teamModal) {
  teamOpenBtn.addEventListener("click", () => openModal(teamModal));
}

// フォームのモーダルを開く処理
if (formOpenBtn && formModal) {
  formOpenBtn.addEventListener("click", () => openModal(formModal));
}

// ニュースのモーダルを開く処理
if (newsOpenBtn && newsModal) {
  newsOpenBtn.addEventListener("click", () => openModal(newsModal));
}

// チーム紹介のモーダルを閉じる処理
if (teamCloseBtn && teamModal) {
  teamCloseBtn.addEventListener("click", () => closeModal(teamModal));
}

// フォームのモーダルを閉じる処理
if (formCloseBtn && formModal) {
  formCloseBtn.addEventListener("click", () => closeModal(formModal));
}

// ニュースのモーダルを閉じる処理
if (newsCloseBtn && newsModal) {
  newsCloseBtn.addEventListener("click", () => closeModal(newsModal));
}

// チーム紹介の背景クリック時の処理
if (teamModal) {
  teamModal.addEventListener("click", (e) => {
    if (e.target === teamModal) {
      closeModal(teamModal);
    }
  });
}

// フォームの背景クリック時の処理
if (formModal) {
  formModal.addEventListener("click", (e) => {
    if (e.target === formModal) {
      closeModal(formModal);
    }
  });
}

// ニュースの背景クリック時の処理
if (newsModal) {
  newsModal.addEventListener("click", (e) => {
    if (e.target === newsModal) {
      closeModal(newsModal);
    }
  });
}

// ============================================
// フォント変更
// ============================================
/** フォント切り替えボタン */
const fontChangeButton = document.getElementById("change-font-btn");
if (fontChangeButton) {
  fontChangeButton.addEventListener("click", () => {
    document.body.classList.toggle("font-changed");
  });
}

// ============================================
// カーソル変更（ルートディレクトリのみ）
// ============================================
window.addEventListener("DOMContentLoaded", () => {
  /** 現在のURLパス */
  const currentPath = window.location.pathname;
  // ルートまたはindex.htmlの場合のみ実行
  if (currentPath === "/" || currentPath.endsWith("index.html")) {
    /** カーソル画像パス */
    const cursorImagePath = "./image/cursor.png";
    /** カーソルのスタイル設定値 */
    const cursorStyleValue = `url("${cursorImagePath}"), auto`;
    /** ボディ要素 */
    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.cursor = cursorStyleValue;
    }
    /** インタラクティブ要素のリスト */
    const interactiveElements = document.querySelectorAll("button, a, .btn");
    interactiveElements.forEach((targetElement) => {
      targetElement.style.cursor = cursorStyleValue;
    });
  }
});

// ============================================
// コピー処理（通知機能付き）
// ============================================
/** コピーを実行するためのボタン要素 */
const copyButton = document.getElementById("copy-target-btn");
/** コピー完了を通知する吹き出し要素 */
const tooltipElement = document.getElementById("copy-tooltip");

// ボタンと通知要素がHTML内に存在する場合のみ実行する
if (copyButton && tooltipElement) {
  copyButton.addEventListener("click", () => {
    /** ボタンのdata属性から取得したコピー対象の文字列 */
    const textToCopy = copyButton.getAttribute("data-copy");

    // クリップボードに文字を書き込む処理を実行
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // 成功時に「show」クラスを追加して通知を表示する
        tooltipElement.classList.add("show");

        // 1.5秒後に表示を消すためのタイマーを設定
        setTimeout(() => {
          tooltipElement.classList.remove("show");
        }, 1500);
      })
      .catch((err) => {
        // 失敗時のログ出力
        console.error("コピーに失敗しました", err);
      });
  });
}
