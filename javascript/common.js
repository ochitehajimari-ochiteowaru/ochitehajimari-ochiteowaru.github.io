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
    const scrollPos = window.scrollY;
    sections.forEach((section) => {
      /** 各セクションのトップ位置からブラウザ上部までの距離 */
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      // スクロール位置がセクションのトップを超えたら表示させる
      if (scrollPos > sectionTop - window.innerHeight * 0.8) {
        section.classList.add("is-active");
      }
    });
  };

  // スクロールイベントを監視する
  window.addEventListener("scroll", showSections);
  showSections();

  // 特定のパスでのみ実行されるカーソル変更処理
  /** 現在のURLパス */
  const currentPath = window.location.pathname;
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

// ===========================================
// コピー処理（通知機能付き）
// ===========================================
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
    navigator.clipboard.writeText(textToCopy).then(() => {
      // 成功時に「show」クラスを追加して通知を表示する
      tooltipElement.classList.add("show");
      // 2秒後に通知を隠す
      setTimeout(() => {
        tooltipElement.classList.remove("show");
      }, 2000);
    });
  });
}
