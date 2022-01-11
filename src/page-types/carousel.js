import "./common";
import "../sass/carousel.scss";

import France from "../assets/image/pic-1-min.jpg";
import Switzerland from "../assets/image/pic-2-min.jpg";
import Rome from "../assets/image/pic-3-min.jpg";

function realizeCarousel(el) {
  // eslint-disable-next-line no-param-reassign
  el.innerHTML = `
    <div class="slider__item"></div>
    <div class="slider__item"></div>
    <div class="slider__item"></div>
    <a class="slider__next">&#10095;</a>
    <a class="slider__prev">&#10094;</a>
    `;
  const slides = document.querySelectorAll(".slider__item");
  const nextBtn = document.querySelector(".slider__next");
  const prevBtn = document.querySelector(".slider__prev");
  let num = 0;

  [...slides].map((item) => {
    const picArr = [France, Switzerland, Rome];
    const img = document.createElement("img");
    item.append(img);
    img.src = picArr[num];
    num += 1;
    return img;
  });

  let slideIndex = 1;

  showSlides(slideIndex);

  function nextSlide() {
    showSlides((slideIndex += 1));
  }

  function prevSlide() {
    showSlides((slideIndex -= 1));
  }

  function showSlides(n) {
    let k;
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (k = 0; k < slides.length; k += 1) {
      slides[k].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
}

realizeCarousel(document.querySelector(".slider"));
