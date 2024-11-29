let slideIndex = 0; // Índice do primeiro slide

function nextSlide() {
  const slides = document.querySelectorAll('.carousel-images img'); // Seleciona todas as imagens
  const totalSlides = slides.length;

  slideIndex++; // Vai para o próximo conjunto de 3 imagens

  if (slideIndex >= totalSlides - 2) { // Se passar da última possibilidade de 3 imagens
    slideIndex = 0; // Volta para o início
  }

  // Muda a posição das imagens para mostrar apenas 3 por vez
  const carousel = document.querySelector('.carousel-images');
  carousel.style.transform = `translateX(-${slideIndex * 33.33}%)`; // Exibe 3 imagens por vez (33.33% cada)
}

// Troca de slide a cada 3 segundos
setInterval(nextSlide, 3000);
