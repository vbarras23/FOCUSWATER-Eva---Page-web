window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});

const burger = document.querySelector("[data-burger]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.remove("is-open"));
  });
}

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.18 });

revealElements.forEach((element) => revealObserver.observe(element));

const parallaxImages = document.querySelectorAll("[data-parallax]");
const horizontalSection = document.querySelector("[data-horizontal-section]");
const horizontalTrack = document.querySelector("[data-horizontal-track]");

function handleScroll() {
  const scrollY = window.scrollY;

parallaxImages.forEach((image) => {
  if (window.innerWidth <= 900) {
    image.style.transform = "none";
    return;
  }

  const speed = Number(image.dataset.parallax);
  const rect = image.getBoundingClientRect();
  const rawOffset = (window.innerHeight - rect.top) * speed;
  const offset = Math.max(Math.min(rawOffset, 50), -50);
  image.style.transform = `translateY(${offset}px)`;
});

  if (horizontalSection && horizontalTrack && window.innerWidth > 900) {
    const sectionTop = horizontalSection.offsetTop;
    const sectionHeight = horizontalSection.offsetHeight;
    const stickyHeight = window.innerHeight;
    const maxScroll = sectionHeight - stickyHeight;
    const progress = Math.min(Math.max((scrollY - sectionTop) / maxScroll, 0), 1);
    const distance = horizontalTrack.scrollWidth - window.innerWidth;
    horizontalTrack.style.transform = `translateX(${-distance * progress}px)`;
  }
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleScroll);
handleScroll();
