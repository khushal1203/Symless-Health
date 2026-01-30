// Optimized Scroll-based Loading
document.addEventListener("DOMContentLoaded", function () {
  // Immediately show hero section
  const heroSection = document.querySelector(".hero");
  const heroImages = document.querySelectorAll(
    ".hero-img, .hero-section-img, .logo-img",
  );
  const heroContent = document.querySelector(".hero-content");

  // Make hero visible immediately
  if (heroSection) heroSection.style.opacity = "1";
  if (heroContent) heroContent.style.opacity = "1";

  heroImages.forEach((img) => {
    img.style.opacity = "1";
    img.classList.add("loaded");
  });

  // Throttled scroll handler for better performance
  let ticking = false;

  const scrollElements = document.querySelectorAll(
    ".info, .specialties, .full-video, .why, .footer",
  );

  scrollElements.forEach((el) => {
    el.classList.add("scroll-reveal");
  });

  const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= window.innerHeight * 0.8;
  };

  const displayScrollElement = (element) => {
    element.classList.add("revealed");

    // Load images in this section
    const images = element.querySelectorAll("img:not(.loaded)");
    images.forEach((img) => {
      img.style.opacity = "1";
      img.classList.add("loaded");
    });
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el)) {
        displayScrollElement(el);
      }
    });
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(handleScrollAnimation);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  // Initial check
  handleScrollAnimation();
});
