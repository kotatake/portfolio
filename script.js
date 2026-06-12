document.addEventListener('DOMContentLoaded', () => {
  // すべてのゲージ（インナー）を取得
  const progressBars = document.querySelectorAll('.progress-inner');

  // Intersection Observerのオプション
  const observerOptions = {
    root: null, // ビューポートを基準にする
    rootMargin: '0px',
    threshold: 0.1 // 要素が10%でも画面に入ったら発火
  };

  // 交差時に実行するコールバック関数
  const animateProgress = (entries, observer) => {
    entries.forEach(entry => {
      // 画面内に入ったか判定
      if (entry.isIntersecting) {
        const bar = entry.target;
        // HTMLの data-level に設定した値を width に適用
        const level = bar.getAttribute('data-level');
        bar.style.width = level;

        // 一度アニメーションしたら監視を終了する（スクロールで戻るたびに動かさないため）
        observer.unobserve(bar);
      }
    });
  };

  // 監視インスタンスの生成
  const observer = new IntersectionObserver(animateProgress, observerOptions);

  // 各ゲージの監視を開始
  progressBars.forEach(bar => {
    observer.observe(bar);
  });
});