document.querySelectorAll('.carousel').forEach(carousel => {

  const track = carousel.querySelector('.carousel__track');
  const slides = Array.from(track.children);

  const prevBtn = carousel.querySelector('.carousel__button--prev');
  const nextBtn = carousel.querySelector('.carousel__button--next');
  const dotsContainer = carousel.querySelector('.carousel__dots');

  const styles = getComputedStyle(document.documentElement);
  const AUTOPLAY_INTERVAL = parseInt(styles.getPropertyValue('--autoplay-interval')) || 3000;
  const TRANSITION_TIME = parseInt(styles.getPropertyValue('--transition-time')) || 600;

  let currentIndex = 0;
  let autoplayTimer = null;
  let isPaused = false;

  // Create dots dynamically
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
    track.style.transform = `translateX(${-currentIndex * 100}%)`;
    dots.forEach((d, i) => {
      d.setAttribute('aria-pressed', i === currentIndex ? 'true' : 'false');
    });
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    update();
    restartAutoplay();
  }

  function nextSlide() { goToSlide(currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex - 1); }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      if (!isPaused) nextSlide();
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  function restartAutoplay() {
    stopAutoplay();
    setTimeout(startAutoplay, TRANSITION_TIME);
  }

  // Pause on hover or focus
  ["mouseenter", "focusin"].forEach(evt => {
    carousel.addEventListener(evt, () => isPaused = true);
  });
  ["mouseleave", "focusout"].forEach(evt => {
    carousel.addEventListener(evt, () => isPaused = false);
  });

  // Keyboard
  carousel.tabIndex = 0;
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  update();
  startAutoplay();

  window.addEventListener('resize', update);
});
