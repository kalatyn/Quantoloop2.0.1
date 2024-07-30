import { initUnserAnsatz } from "../module/ansatz.js";
import { initCanvas } from "../module/canvas.js";
import { initInsights } from "../module/insights.js";
import { initTransparent } from "../module/transparent.js";
import { drawRadar } from "/module/Radar.js";

drawRadar();
initCanvas();
initUnserAnsatz();

window.addEventListener("scroll", function () {
  initTransparent();
  initInsights();
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

document.addEventListener("DOMContentLoaded", function () {
  const windowsInfo = document.querySelectorAll(".window_info");

  // Функция для обновления высоты одного окна window_info в зависимости от его window_par
  function updateWindowInfoHeight(windowInfo) {
    const windowPar = windowInfo.querySelector(".window_par");
    if (windowPar) {
      windowInfo.style.height = `${windowPar.scrollHeight + 250}px`;
    }
  }

  // Инициализация высоты всех окон при загрузке
  windowsInfo.forEach((windowInfo) => {
    updateWindowInfoHeight(windowInfo);
  });

  // Подписка на изменения размера окна
  window.addEventListener("resize", () => {
    windowsInfo.forEach((windowInfo) => {
      updateWindowInfoHeight(windowInfo);
    });
  });

  // Для более динамичного содержимого можно использовать MutationObserver
  windowsInfo.forEach((windowInfo) => {
    const windowPar = windowInfo.querySelector(".window_par");
    if (windowPar) {
      new MutationObserver(() => {
        updateWindowInfoHeight(windowInfo);
      }).observe(windowPar, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  });
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
let scrollSection2 = document.querySelector(".software_cards");
function scrollleft2() {
  let scrollAmount = Math.max(
    scrollSection2.scrollLeft - getElementWidthWithMargin(),
    0
  );
  scrollSection2.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
}

function scrollright2() {
  let scrollAmount = Math.min(
    scrollSection2.scrollLeft + getElementWidthWithMargin(),
    scrollSection2.scrollWidth - scrollSection.clientWidth
  );
  scrollSection2.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
}

function getElementWidthWithMargin() {
  let element = scrollSection.firstElementChild;
  let style = getComputedStyle(element);
  let width = element.offsetWidth;
  let margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  return width + margin;
}

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
    const moreAbout = document.querySelectorAll(`.more__about${i}`);
    const descriptions = document.querySelectorAll(`#card__disc${i}`);
    const exits = document.querySelectorAll(`.exit__button${i}`);
    const card = document.querySelectorAll(`#card${i}`);

    card.forEach((element) => {
      element.addEventListener("click", () => {
        descriptions.forEach((desc) => {
          desc.classList.toggle("show");
        });

        document.body.classList.add("scroll-lock");
      });
    });

    exits.forEach((element) => {
      element.addEventListener("click", () => {
        descriptions.forEach((desc) => {
          desc.classList.toggle("show");
        });

        document.body.classList.remove("scroll-lock");
      });
    });

    descriptions.forEach((desc) => {
      desc.addEventListener("click", (event) => {
        if (event.target === desc) {
          desc.classList.toggle("show");
          document.body.classList.remove("scroll-lock");
        }
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  for (let i = 1; i <= 5; i++) {
    const btn = document.querySelector(`#plus${i}`);
    const window = document.querySelector(`#plus_info${i}`);

    btn.addEventListener("click", function () {
      window.classList.add("show");
      document.body.classList.add("scroll-lock");
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

window.addEventListener("scroll", function () {
  let element = document.querySelector("#growth");
  let bounding = element.getBoundingClientRect();
  let viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  let middleOfViewport = viewportHeight / 2;

  if (bounding.top < viewportHeight && bounding.bottom > 0) {
    if (bounding.top <= viewportHeight && bounding.top >= middleOfViewport) {
      let percentScrolled =
        (viewportHeight - bounding.top) / (viewportHeight - middleOfViewport);
      let newSize = 0.9 + percentScrolled * 0.1;
      element.style.transform = `scale(${newSize})`;
    } else if (
      bounding.top < middleOfViewport &&
      bounding.bottom > middleOfViewport
    ) {
      element.style.transform = `scale(1)`;
    } else if (bounding.bottom <= middleOfViewport) {
      let percentScrolled =
        (middleOfViewport - bounding.bottom) / middleOfViewport;
      let newSize = 1 - percentScrolled * 0.1;
      element.style.transform = `scale(${newSize})`;
    }
  } else {
    element.style.transform = `scale(0.9)`;
  }
});

window.addEventListener("scroll", function () {
  let element = document.querySelector("#radar_border");
  let bounding = element.getBoundingClientRect();
  let viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  let middleOfViewport = viewportHeight / 2;

  if (bounding.top < viewportHeight && bounding.bottom > 0) {
    if (bounding.top <= viewportHeight && bounding.top >= middleOfViewport) {
      let percentScrolled =
        (viewportHeight - bounding.top) / (viewportHeight - middleOfViewport);
      let newSize = 0.8 + percentScrolled * 0.2;
      element.style.transform = `scale(${newSize})`;
    } else if (
      bounding.top < middleOfViewport &&
      bounding.bottom > middleOfViewport
    ) {
      element.style.transform = `scale(1)`;
    }
  }
});

window.addEventListener("scroll", function () {
  let element = document.querySelector(".interactive_container");
  let bounding = element.getBoundingClientRect();
  let viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  let middleOfViewport = viewportHeight / 2;

  if (bounding.top < viewportHeight && bounding.bottom > 0) {
    if (bounding.top <= viewportHeight && bounding.top >= middleOfViewport) {
      let percentScrolled =
        (viewportHeight - bounding.top) / (viewportHeight - middleOfViewport);
      let newSize = 0.8 + percentScrolled * 0.2;
      element.style.transform = `scale(${newSize})`;
    } else if (
      bounding.top < middleOfViewport &&
      bounding.bottom > middleOfViewport
    ) {
      element.style.transform = `scale(1)`;
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {});

let numbers = document.querySelectorAll(".info div");

numbers.forEach(function (number) {
  let numberTop = number.getBoundingClientRect().top;
  let start = +number.innerHTML;
  let end = +number.dataset.max;

  window.addEventListener("scroll", function onScroll() {
    if (window.pageYOffset > numberTop - window.innerHeight / 1.5) {
      this.removeEventListener("scroll", onScroll);
      let interval = setInterval(function () {
        number.innerHTML = `${++start}%`;
        if (start == end) {
          clearInterval(interval);
        }
      }, 20);
    }
  });
});

// radar mobile zoom

//laptop Animation
window.addEventListener("scroll", function () {
  let laptop_area = document.querySelector(".laptop_area");
  let laptop = document.querySelector(".laptop");
  let laptop_area_top = laptop_area.getBoundingClientRect().top;
  let laptop_info = document.querySelector(".laptop_info");
  if (laptop_area_top < window.innerHeight / 3) {
    let scale =
      1 -
      (window.innerHeight / 2 - laptop_area_top) / (window.innerHeight / 0.3);
    scale = Math.max(scale, 0.3);

    let inverseScale = 1 + (1.2 - scale / 0.6);

    laptop.style.transform = `scale(${scale})`;
    laptop_info.style.transform = `scale(${inverseScale})`;
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

window.addEventListener("DOMContentLoaded", function () {
  if (window.innerHeight > window.innerWidth && window.innerWidth > 576) {
    const infoSec = document.querySelector("#info__section");
    const growthRight = document.querySelector(".growth_right");
    const growthLeft = document.querySelector(".growth_left");
    const growthArea = document.querySelector("#growth_area");
    const growth = document.querySelector("#growth");
    const growthItems = document.querySelectorAll(".growth_item");
    const growthTitle = document.querySelector(".growth_title");
    const itemPics = document.querySelectorAll(".item_bottom_img");
    const cardSection = document.querySelector("#cardfield");
    const form = document.querySelector("form");
    const brand = document.querySelector(".brand");
    const slogen = document.querySelector(".slogen");
    const interCards = document.querySelectorAll(".inter_card");
    const interSec = document.querySelector("#interactive_section");
    const radar = document.querySelector(".radar");
    const radarArea = document.querySelector("#radar__area");
    const contactLinks = document.querySelectorAll(".jetzt_starten");
    const contactArea = document.querySelector("#contact_us");
    const interSection2 = document.querySelector(".interactive_section2");
    const interSection2Left = document.querySelector(
      ".interactive_container_left"
    );

    // infoSec.style.height = "25vh";
    growthRight.style.display = "none";
    growthLeft.style.width = "100%";
    growth.style.justifyContent = "space-around";
    // growthItems.forEach((item) => {
    //   item.style.width = "100%";
    // });
    itemPics.forEach((pic) => {
      pic.style.display = "block";
      pic.style.width = "500px";
      pic.style.height = "300px";
      pic.style.margin = "0 auto 20px auto";
    });
    cardSection.style.height = "60vh";
    form.style.width = "70vw";
    brand.style.fontSize = "60px";
    brand.style.marginBottom = "30px";
    slogen.style.fontSize = "20px";
    radar.style.width = "30vw";
    radar.style.height = "30vw";
    growthArea.style.height = "1024px";
    radarArea.style.height = "50vh";
    interSec.style.height = "50vh";
    contactLinks.forEach((link) => {
      link.style.fontSize = "0.7rem";
      link.style.position = "relative";
      link.style.left = "0";
      link.style.top = "20px";
    });
    interSection2.style.height = "55vh";
    interSection2Left.style.justifyContent = "space-around";
    contactArea.style.marginTop = "150px";
    interCards.forEach((card) => {
      card.style.padding = "3%";

      const par = card.querySelector("p");
      const header = card.querySelector("h3");
      if (header) {
        header.style.marginBottom = "5px";
      }
      if (par) {
        par.style.overflowWrap = "break-word";
      }
    });

    if (
      window.innerHeight > window.innerWidth &&
      window.innerWidth < 850 &&
      window.innerWidth > 576
    ) {
      const interSec = document.querySelector("#interactive_section");
      const radar = document.querySelector(".radar");
      radar.style.width = "37vw";
      radar.style.height = "37vw";
      interSec.style.height = "50vh";
      const items = document.querySelectorAll(".growth_item");
      items.forEach((item) => {
        item.style.width = "300px";
        const num = item.querySelector("span");
        if (num) {
          num.style.fontSize = "2rem";
        }
        const titel = item.querySelector("h3");
        if (titel) {
          titel.style.setProperty("font-size", "2rem", "important");
        }
      });
    }
  }
});

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
