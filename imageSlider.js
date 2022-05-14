let currentIndex = 0;
let animation = null;
let intervalId = null;
const slides = document.querySelectorAll('.image-slide');

const SLIDE_OUT_LEFT_ANIMATION = [
  { transform: 'translateX(0) scale(1)' },
  { transform: 'translateX(-100%) scale(0.3)' },
];
const SLIDE_OUT_RIGHT_ANIMATION = [
  { transform: 'translateX(0) scale(1)' },
  { transform: 'translateX(100%) scale(0.3)' },
];
const SLIDE_OUT_TIMING = { duration: 500, fill: 'forwards' };
const SLIDE_IN_RIGHT_ANIMATION = [
  { transform: 'translateX(100%) scale(0.3)' },
  { transform: 'translateX(0) scale(1)' },
];
const SLIDE_IN_LEFT_ANIMATION = [
  { transform: 'translateX(-100%) scale(0.3)' },
  { transform: 'translateX(0) scale(1)' },
];
const SLIDE_IN_TIMING = { duration: 350, fill: 'forwards' };

function next() {
  if (animation !== null) {
    return;
  }

  const currentSlide = slides[currentIndex];
  currentIndex += 1;
  if (currentIndex === slides.length) {
    currentIndex = 0;
  }
  const nextSlide = slides[currentIndex];

  animation = currentSlide.animate(SLIDE_OUT_LEFT_ANIMATION, SLIDE_OUT_TIMING);
  animation.addEventListener('finish', () => {
    currentSlide.style.display = 'none';
    nextSlide.style.position = 'relative';
    nextSlide.style.zIndex = 'initial';
    animation = null;
    clearInterval(intervalId);
    intervalId = setTimeout(next, 5000);
  });

  nextSlide.style.display = 'block';
  nextSlide.style.position = 'absolute';
  nextSlide.style.zIndex = '1000';
  nextSlide.animate(SLIDE_IN_RIGHT_ANIMATION, SLIDE_IN_TIMING);
}

function previous() {
  if (animation !== null) {
    return;
  }
  const currentSlide = slides[currentIndex];
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  const previousSlide = slides[currentIndex];

  animation = currentSlide.animate(SLIDE_OUT_RIGHT_ANIMATION, SLIDE_OUT_TIMING);
  animation.addEventListener('finish', () => {
    currentSlide.style.display = 'none';
    previousSlide.style.position = 'relative';
    previousSlide.style.zIndex = 'initial';
    animation = null;
    clearInterval(intervalId);
    intervalId = setTimeout(next, 5000);
  });

  previousSlide.style.display = 'block';
  previousSlide.style.position = 'absolute';
  previousSlide.style.zIndex = '1000';
  previousSlide.animate(SLIDE_IN_LEFT_ANIMATION, SLIDE_IN_TIMING);
}

function initImageSlider() {
  const leftArrow = document.querySelector('.image-slider-left');
  leftArrow.addEventListener('click', previous);
  const rightArrow = document.querySelector('.image-slider-right');
  rightArrow.addEventListener('click', next);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      previous();
    } else if (event.key === 'ArrowRight') {
      next();
    }
  });
  intervalId = setTimeout(next, 5000);
}

export default initImageSlider;
