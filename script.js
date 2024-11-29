let slideIndex = 0;

function nextSlide() {
  const slides = document.querySelectorAll('.carousel-images img');
  const totalSlides = slides.length;

  slideIndex++;

  if (slideIndex >= totalSlides - 2) {
    slideIndex = 0;
  }

  const carousel = document.querySelector('.carousel-images');
  carousel.style.transform = `translateX(-${slideIndex * 33.33}%)`;
}

setInterval(nextSlide, 3000);

const btnMobile = document.getElementById('btn-mobile');

function toggleMenu() {
  const nav = document.getElementById('nav'); 
  nav.classList.toggle('active');
}

btnMobile.addEventListener('click', toggleMenu);
