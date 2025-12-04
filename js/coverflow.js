const track = document.querySelector(".carousel-track");
const dotContainer = document.querySelector(".carousel-dots");

let slides = Array.from(track.children);
let realCount = slides.length;

let slideWidth = 260; // width + gap
let index = 1;
let autoSlide;

/* ------------------ CLONING FOR INFINITE LOOP ----------------- */
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.classList.add("clone");
lastClone.classList.add("clone");

track.insertBefore(lastClone, slides[0]);
track.appendChild(firstClone);

slides = Array.from(track.children);

track.style.transform = `translateX(${-slideWidth * index}px)`;

/* ------------------ NAVIGATION DOTS ----------------- */
for (let i = 0; i < realCount; i++) {
  const dot = document.createElement("div");
  dot.classList.add("carousel-dot");
  if (i === index - 1) dot.classList.add("active");
  dot.dataset.index = i;
  dotContainer.appendChild(dot);
}

function updateDots() {
  document.querySelectorAll(".carousel-dot").forEach(dot => {
    dot.classList.remove("active");
  });
  document.querySelector(`.carousel-dot[data-index="${(index - 1 + realCount) % realCount}"]`)
    .classList.add("active");
}

/* ------------------ UI UPDATE ----------------- */
function updateClasses() {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
  updateDots();
}

function moveToIndex(i) {
  index = i;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(${-slideWidth * index}px)`;
  updateClasses();
}

function next() { moveToIndex(index + 1); }
function prev() { moveToIndex(index - 1); }

/* Infinite Loop Fix */
track.addEventListener("transitionend", () => {
  if (slides[index].classList.contains("clone")) {
    track.style.transition = "none";

    if (index === slides.length - 1) index = 1;
    if (index === 0) index = slides.length - 2;

    track.style.transform = `translateX(${-slideWidth * index}px)`;
    updateClasses();
  }
});

/* Click slide to center */
slides.forEach((slide, i) => {
  slide.addEventListener("click", () => {
    moveToIndex(i);
  });
});

/* Click dots */
document.querySelectorAll(".carousel-dot").forEach(dot => {
  dot.addEventListener("click", () => {
    let dotIndex = Number(dot.dataset.index);
    moveToIndex(dotIndex + 1);
  });
});

/* Buttons */
document.querySelector(".next").addEventListener("click", () => {
  stopAuto();
  next();
  startAuto();
});

document.querySelector(".prev").addEventListener("click", () => {
  stopAuto();
  prev();
  startAuto();
});

/* Auto slide + pause on hover */
function startAuto() { autoSlide = setInterval(next, 3000); }
function stopAuto() { clearInterval(autoSlide); }

document.querySelector(".carousel-wrapper").addEventListener("mouseenter", stopAuto);
document.querySelector(".carousel-wrapper").addEventListener("mouseleave", startAuto);

/* Init */
updateClasses();
startAuto();
