import { initUnserAnsatz } from "../module/ansatz.js";
import { initCanvas } from "../module/canvas.js";
import { initCards } from "../module/cards.js";
import { initInsights } from "../module/insights.js";
import { initLaptop } from "../module/laptop.js";
import { initResponsive } from "../module/responsive.js";
import { initTransparent } from "../module/transparent.js";
import { initInfoWindow } from "../module/windowSize.js";
import { drawRadar } from "/module/Radar.js";
import {
  handleScrollGrowth,
  handleScrollRadarBorder,
  handleScrollInteractiveContainer,
} from "../module/scrollResize.js";

function initRadarObserver() {
  const radar = document.querySelector("#radar__area");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          drawRadar();
          observer.disconnect(radar);
        }
      });
    },
    {
      threshold: 0.1,
      root: null,
      rootMargin: "0px",
    }
  );

  observer.observe(radar);
}

document.addEventListener("DOMContentLoaded", () => {
  initRadarObserver();
});
drawRadar();
// initCanvas();
initUnserAnsatz();
initCards();

if (window.innerHeight > window.innerWidth && window.innerWidth > 576) {
  initResponsive();
}

window.addEventListener("scroll", function () {
  initTransparent();
  initInsights();
  initLaptop();
  handleScrollGrowth();
  handleScrollRadarBorder();
  handleScrollInteractiveContainer();
});

document.addEventListener("DOMContentLoaded", function () {
  // Проверяем, что ширина окна браузера больше или равна 768 пикселям
  if (window.innerWidth >= 768) {
    const sections = document.querySelectorAll(".link_section");
    const navLinks = document.querySelectorAll(".nav-link");

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === id) {
              link.classList.add("active");
            }
          });
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });
  }
});

let scrollSection = document.querySelector(".horizontal-scroll-section");
export function scrollleft() {
  let scrollAmount = Math.max(
    scrollSection.scrollLeft - getElementWidthWithMargin(),
    0
  );
  scrollSection.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
}

export function scrollright() {
  let scrollAmount = Math.min(
    scrollSection.scrollLeft + getElementWidthWithMargin(),
    scrollSection.scrollWidth - scrollSection.clientWidth
  );
  scrollSection.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
}

function getElementWidthWithMargin(element) {
  const style = window.getComputedStyle(element);
  const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  return element.offsetWidth + margin;
}

// Функция для прокрутки секции на определенное количество пикселей
function scrollSectionByAmount(scrollSection2, amount) {
  scrollSection2.scrollTo({
    left: amount,
    behavior: "smooth",
  });
}
function scrollLeft() {
  const scrollSection2 = document.querySelector(".horizontal-scroll-section");
  const card = scrollSection2.firstElementChild; // Получаем первый элемент в секции
  const scrollAmount = Math.max(
    scrollSection2.scrollLeft - getElementWidthWithMargin(card),
    0
  );
  scrollSectionByAmount(scrollSection2, scrollAmount);
}

// Функция для прокрутки вправо
function scrollRight() {
  const scrollSection2 = document.querySelector(".horizontal-scroll-section");
  const card = scrollSection2.firstElementChild; // Получаем первый элемент в секции
  const scrollAmount = Math.min(
    scrollSection2.scrollLeft + getElementWidthWithMargin(card),
    scrollSection2.scrollWidth - scrollSection2.clientWidth
  );
  scrollSectionByAmount(scrollSection2, scrollAmount);
}
// Функция для прокрутки влево
function scrollLeft2() {
  const scrollSection2 = document.querySelector(".software_cards");
  const card = scrollSection2.firstElementChild; // Получаем первый элемент в секции
  const scrollAmount = Math.max(
    scrollSection2.scrollLeft - getElementWidthWithMargin(card),
    0
  );
  scrollSectionByAmount(scrollSection2, scrollAmount);
}

// Функция для прокрутки вправо
function scrollRight2() {
  const scrollSection2 = document.querySelector(".software_cards");
  const card = scrollSection2.firstElementChild; // Получаем первый элемент в секции
  const scrollAmount = Math.min(
    scrollSection2.scrollLeft + getElementWidthWithMargin(card),
    scrollSection2.scrollWidth - scrollSection2.clientWidth
  );
  scrollSectionByAmount(scrollSection2, scrollAmount);
}

// Добавляем обработчики событий для кнопок
document
  .querySelector("#scrollLeftButton")
  .addEventListener("click", scrollLeft);
document
  .querySelector("#scrollRightButton")
  .addEventListener("click", scrollRight);
document.querySelector(".scrollleft2").addEventListener("click", scrollLeft2);
document.querySelector(".scrollright2").addEventListener("click", scrollRight2);

// document.addEventListener("DOMContentLoaded", function () {
//   const cardfield = document.querySelector("#card_section");
//   const growthArea = document.querySelector("#growth_area");
//   const radarArea = document.querySelector("#radar__area");

//   // const card = document.querySelector('.cards');

//   cardfield.addEventListener("click", function () {
//     cardfield.scrollIntoView({ behavior: "instant" });
//   });
//   growthArea.addEventListener("click", function () {
//     growthArea.scrollIntoView({ behavior: "instant" });
//   });
//   radarArea.addEventListener("click", function () {
//     radarArea.scrollIntoView({ behavior: "smooth" });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  for (let i = 1; i <= 5; i++) {
    const btn = document.querySelector(`#plus${i}`);
    const window = document.querySelector(`#plus_info${i}`);

    btn.addEventListener("click", function () {
      window.classList.add("show");
      document.body.classList.add("scroll-lock");
      initInfoWindow();
    });
    const close = document.querySelector(`#wClose${i}`);

    close.addEventListener("click", function () {
      window.classList.remove("show");
      document.body.classList.remove("scroll-lock");
    });
    window.addEventListener("click", function (event) {
      if (event.target === window) {
        window.classList.remove("show");
        document.body.classList.remove("scroll-lock");
      }
    });
  }
});

if (window.innerWidth < 766) {
  const navLinks = document.querySelectorAll(".nav-item");
  const menuToggle = document.getElementById("navbarSupportedContent");
  const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

  navLinks.forEach((l) => {
    l.addEventListener("click", () => {
      bsCollapse.toggle();
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".latern");

  container.style.background = "#00000091";

  container.addEventListener("mousemove", function (event) {
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const radius = 200;

    container.style.background = `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent, #00000091)`;

    container.addEventListener("mouseleave", function () {
      container.style.background = "#00000091";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".openForm");
  const contactForm = document.querySelector(".contact_form");
  const closeBtn = document.querySelector(".exit__contact");
  const startenBtns = document.querySelectorAll(".jetzt_starten");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      contactForm.classList.add("visible");
      document.body.classList.add("scroll-lock");
    });
  });
  startenBtns.forEach(function (button) {
    button.addEventListener("click", function () {
      contactForm.classList.add("visible");
      document.body.classList.add("scroll-lock");
    });
  });

  closeBtn.addEventListener("click", function () {
    contactForm.classList.remove("visible");
    document.body.classList.remove("scroll-lock");
  });
});

//send form

document
  .getElementById("formular")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "contact.php", true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        document.getElementById("formular").reset();
        alert("Das Formular wurde erfolgreich gesendet.");
      } else {
        alert("Es gab ein Problem beim Senden des Formulars.");
      }
    };

    xhr.onerror = function () {
      alert("Es gab ein Problem beim Senden des Formulars.");
    };

    xhr.send(formData);
  });
