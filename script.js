document.addEventListener('DOMContentLoaded', () => {
  // 1. ゲージのアニメーション設定
  const progressBars = document.querySelectorAll('.progress-inner');
  const barOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animateProgress = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const level = bar.getAttribute('data-level');
        bar.style.width = level;
        observer.unobserve(bar);
      }
    });
  };

  const barObserver = new IntersectionObserver(animateProgress, barOptions);
  progressBars.forEach(bar => barObserver.observe(bar));


  // 2. スクロールフェードインのアニメーション設定
  // フェードインさせたい要素を自動でターゲットに指定
  const fadeTargets = document.querySelectorAll('#about > div, .skill-category, .work');
  
  fadeTargets.forEach(el => {
    el.classList.add('fade-in-el'); // CSSの初期状態クラスを付与
  });

  const fadeOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px', // 画面の下端より少し手前で発火させる
    threshold: 0.1
  };

  const animateFade = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const fadeObserver = new IntersectionObserver(animateFade, fadeOptions);
  fadeTargets.forEach(target => fadeObserver.observe(target));
});