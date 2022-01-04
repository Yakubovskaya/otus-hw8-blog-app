window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const navItem = document.querySelectorAll(".nav_item");
  const hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger_active");
    menu.classList.toggle("menu_active");
  });

  navItem.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger_active");
      menu.classList.toggle("menu_active");
    });
  });
});
