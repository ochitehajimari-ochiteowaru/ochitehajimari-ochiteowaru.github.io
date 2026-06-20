/** 現在の実行環境におけるフル西暦 */
const currentYear = new Date().getFullYear();

// 実行時の年が、あらかじめ設定した開始年よりも進んでいるかを確認する
if (currentYear > 2026) {
  /** 画面上の年を表示させたい要素 */
  const displayTargetElement = document.getElementById('copyright-year');
  // 指定した要素が存在する場合のみ、表示内容を更新する
  if (displayTargetElement) {
    displayTargetElement.textContent = " - " + currentYear;
  }
}

/** ページの読み込み完了を待機するイベント */
document.addEventListener('DOMContentLoaded', () => {
  /** スマホ用メニューの開閉を制御するチェックボックス */
  const menuCheck = document.querySelector('#menu-btn-check');
  /** ナビゲーション内の各リンクのリスト */
  const menuLinks = document.querySelectorAll('.menu-content a');
  /** ページ内の各セクションのリスト */
  const sections = document.querySelectorAll('section');

  // メニューのリンクをクリックした時にメニューを閉じる処理
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuCheck) {
        menuCheck.checked = false;
      }
    });
  });

  // スクロールに応じて要素を表示させる処理
  const showSections = () => {
    /** 現在のスクロール位置 */
    const scrollPos = window.scrollY;
    sections.forEach(section => {
      /** セクションの上端の位置 */
      const sectionTop = section.offsetTop;
      if (scrollPos > sectionTop - 600) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  };
  showSections();
  window.addEventListener('scroll', showSections);
});

// ============================================
// スクロール
// ============================================
/** 画面全体を管理する対象 */
const docElement = document;

docElement.addEventListener('click', (e) => {
  /** クリックされた要素から最も近いリンク */
  const anchorLink = e.target.closest('a');
  if (anchorLink && anchorLink.hash && anchorLink.hash.startsWith('#')) {
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
      const menuToggle = docElement.getElementById('menu-btn-check');
      if (menuToggle && menuToggle.checked) {
        menuToggle.checked = false;
      }
    }
  }
});

// ============================================
// モーダルウィンドウ
// ============================================
/** チーム紹介ボタン */
const TEAM_openBtn = document.getElementById('open-window-btn');
/** フォームボタン */
const Form_openBtn = document.getElementById('open-form-btn');
/** チーム紹介閉じるボタン */
const TEAM_closeBtn = document.getElementById('close-window-btn');
/** フォーム閉じるボタン */
const form_closeBtn = document.getElementById('close-form-btn');
/** チーム紹介モーダル */
const TEAM_modal = document.getElementById('TEAM_modal-overlay');
/** フォームモーダル */
const Form_modal = document.getElementById('GoogleForm_modal-overlay');

// 各ボタンとモーダルが存在する場合のみイベントを設定する
if (TEAM_openBtn && TEAM_modal) {
  TEAM_openBtn.addEventListener('click', () => {
    TEAM_modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  });
}
if (Form_openBtn && Form_modal) {
  Form_openBtn.addEventListener('click', () => {
    Form_modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  });
}
if (TEAM_closeBtn && TEAM_modal) {
  TEAM_closeBtn.addEventListener('click', () => {
    TEAM_modal.classList.remove('is-active');
    document.body.style.overflow = 'auto';
  });
}
if (form_closeBtn && Form_modal) {
  form_closeBtn.addEventListener('click', () => {
    Form_modal.classList.remove('is-active');
    document.body.style.overflow = 'auto';
  });
}
if (TEAM_modal) {
  TEAM_modal.addEventListener('click', (e) => {
    if (e.target === TEAM_modal) {
      TEAM_modal.classList.remove('is-active');
      document.body.style.overflow = 'auto';
    }
  });
}
if (Form_modal) {
  Form_modal.addEventListener('click', (e) => {
    if (e.target === Form_modal) {
      Form_modal.classList.remove('is-active');
      document.body.style.overflow = 'auto';
    }
  });
}

// ============================================
// フォント変更
// ============================================
/** フォント切り替えボタン */
const fontChangeButton = document.getElementById('change-font-btn');
if (fontChangeButton) {
  fontChangeButton.addEventListener('click', () => {
    document.body.classList.toggle('font-changed');
  });
}

// ============================================
// カーソル変更（ルートディレクトリのみ）
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  /** 現在のURLパス */
  const currentPath = window.location.pathname;
  // ルートまたはindex.htmlの場合のみ実行
  if (currentPath === '/' || currentPath.endsWith('index.html')) {
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
    const interactiveElements = document.querySelectorAll('button, a, .btn');
    interactiveElements.forEach((targetElement) => {
      targetElement.style.cursor = cursorStyleValue;
    });
  }
});

// ============================================
// コピー処理（通知機能付き）
// ============================================
/** コピーを実行するためのボタン要素 */
const copyButton = document.getElementById('copy-target-btn');
/** コピー完了を通知する吹き出し要素 */
const tooltipElement = document.getElementById('copy-tooltip');

// ボタンと通知要素がHTML内に存在する場合のみ実行する
if (copyButton && tooltipElement) {
  copyButton.addEventListener('click', () => {
    /** ボタンのdata属性から取得したコピー対象の文字列 */
    const textToCopy = copyButton.getAttribute('data-copy');

    // クリップボードに文字を書き込む処理を実行
    navigator.clipboard.writeText(textToCopy).then(() => {
      // 成功時に「show」クラスを追加して通知を表示する
      tooltipElement.classList.add('show');

      // 1.5秒後に表示を消すためのタイマーを設定
      setTimeout(() => {
        tooltipElement.classList.remove('show');
      }, 1500);
    }).catch(err => {
      // 失敗時のログ出力
      console.error('コピーに失敗しました', err);
    });
  });
}
