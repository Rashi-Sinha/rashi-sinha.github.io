(function(){
  const carousel = document.getElementById('carousel');
  const track = document.getElementById('track');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dots');

  const styles = getComputedStyle(document.documentElement);
  const AUTOPLAY_INTERVAL = parseInt(styles.getPropertyValue('--autoplay-interval')) || 3000;
  const TRANSITION_TIME = parseInt(styles.getPropertyValue('--transition-time')) || 600;

  let currentIndex = 0;
  let autoplayTimer = null;
  let isPaused = false;

  // Create dots
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'carousel__dot';
    btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    btn.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    btn.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(btn);
  });
  const dots = Array.from(dotsContainer.children);

  function update() {
    track.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
    dots.forEach((d, i) =>
      d.setAttribute('aria-pressed', i === currentIndex ? 'true' : 'false')
    );
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    update();
    restartAutoplay();
  }

  function nextSlide(){ goToSlide(currentIndex + 1); }
  function prevSlide(){ goToSlide(currentIndex - 1); }

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      if (!isPaused) nextSlide();
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function restartAutoplay() {
    stopAutoplay();
    setTimeout(startAutoplay, Math.max(200, TRANSITION_TIME));
  }

  // Pause on hover/focus
  ['mouseenter','focusin'].forEach(evt => {
    carousel.addEventListener(evt, () => { isPaused = true; });
  });
  ['mouseleave','focusout'].forEach(evt => {
    carousel.addEventListener(evt, () => { isPaused = false; });
  });

  // Keyboard
  carousel.tabIndex = 0;
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Init
  update();
  startAutoplay();

  // responsive correction
  window.addEventListener('resize', update);
})();
