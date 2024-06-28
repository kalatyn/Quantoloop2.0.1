// document.querySelector('#back_video').addEventListener('click', function (event) {
//   event.preventDefault();
// });
// document.querySelector('#back_video').addEventListener('play', function() {
//   this.currentTime = 0;
// });

// document.addEventListener("DOMContentLoaded", function () {
//   window.addEventListener("scroll", function () {
//     let element = document.querySelector("#back_video");
//     let bounding = element.getBoundingClientRect();
//     let viewportHeight = window.innerHeight || document.documentElement.clientHeight;
//     let triggerHeight = viewportHeight * 0.3;

//     // Проверяем, если верх элемента на расстоянии 30% от верхнего края окна
//     if (bounding.top >= triggerHeight && bounding.bottom <= viewportHeight) {
//       element.style.borderRadius = "0px";
//       element.style.width = "100%";
//     }
//     // Проверяем, если верх элемента выше триггерной высоты
//     else if (bounding.top < triggerHeight) {
//       let scrollPosition = triggerHeight - bounding.top;
//       let newSize = Math.max(50, 100 - scrollPosition * 0.01); // Ограничиваем минимальный размер до 50%
//       element.style.width = newSize + "%";

//       let borderRadius = Math.min(40, scrollPosition * 0.05);
//       element.style.borderRadius = borderRadius + "px";
//     }
//     // Восстанавливаем размер, если элемент ниже триггерной высоты
//     else if (bounding.top > triggerHeight) {
//       element.style.width = "100%";
//       element.style.borderRadius = "30px"; // Устанавливаем borderRadius для консистентности
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    const container = document.querySelector(".interactive_section");
    const cards = document.querySelectorAll(".inter_card");
    let viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    let bounding = container.getBoundingClientRect();
    const triggerHeight = viewportHeight * 0.2;

    if (bounding.top >= triggerHeight && bounding.bottom <= viewportHeight) {
      container.style.borderRadius = "0px";
      container.style.width = "100vw";
    }
    // Проверяем, если верх элемента выше триггерной высоты
    else if (bounding.top < triggerHeight) {
      let scrollPosition = triggerHeight - bounding.top;
      let newSize = Math.max(90, 100 - scrollPosition * 0.01);
      container.style.width = newSize + "%";
      container.style.borderRadius = scrollPosition / 50 + "px";
    }

    // Проверка ширины экрана
    if (window.innerWidth >= 576) {
      // Восстанавливаем размер, если элемент ниже триггерной высоты
      if (bounding.top <= triggerHeight && bounding.bottom >= 0) {
        let scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        cards.forEach((card) => {
          let offset = (bounding.top - scrollTop) * 0.6;
          card.style.transform = `translateY(${offset}px)`;
        });
      }
    } else {
      // Сброс смещения карточек на маленьких экранах
      cards.forEach((card) => {
        card.style.transform = "translateY(0px)";
      });
    }
  });
});

// let scrollSection = document.querySelector(".horizontal-scroll-section");
function scrollleft() {
  let scrollSection = document.querySelector(".horizontal-scroll-section");
  let scrollAmount = Math.max(
    scrollSection.scrollLeft - getElementWidthWithMargin(),
    0
  );
  scrollSection.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
}

function scrollright() {
  let scrollSection = document.querySelector(".horizontal-scroll-section");
  let scrollAmount = Math.min(
    scrollSection.scrollLeft + getElementWidthWithMargin(),
    scrollSection.scrollWidth - scrollSection.clientWidth
  );
  scrollSection.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
}

function getElementWidthWithMargin() {
  let element = scrollSection.firstElementChild; // Assuming the first child is the element you want to scroll
  let style = getComputedStyle(element);
  let width = element.offsetWidth;
  let margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  return width + margin;
}

// window.addEventListener("scroll", function () {
//   let element = document.querySelector("#scrolling__container");
//   let bounding = element.getBoundingClientRect();
//   let viewportHeight =
//     window.innerHeight || document.documentElement.clientHeight;

//   if (bounding.top >= 0 && bounding.bottom <= viewportHeight) {
//     element.style.borderRadius = "0px";
//     element.style.width = "100%";
//   } else if (bounding.top <= 0) {
//     let scrollPosition = Math.abs(bounding.top);
//     let newSize = 100 - scrollPosition * 0.015;
//     element.style.width = newSize + "%";

//     let borderRadius = Math.min(40, scrollPosition * 0.04);
//     element.style.borderRadius = borderRadius + "px";
//   } if (bounding.top > 1) {
//     element.style.width = "100%";
//   }
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
        // Добавляем класс блокировки прокрутки к body
        document.body.classList.add("scroll-lock");
      });
    });
    // moreAbout.forEach((element) => {
    //   element.addEventListener("click", () => {
    //     descriptions.forEach((desc) => {
    //       desc.classList.toggle("show");
    //     });
    //     // Добавляем класс блокировки прокрутки к body
    //     document.body.classList.add("scroll-lock");
    //   });
    // });

    exits.forEach((element) => {
      element.addEventListener("click", () => {
        descriptions.forEach((desc) => {
          desc.classList.toggle("show");
        });
        // Убираем класс блокировки прокрутки у body
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

// var element = document.getElementById("myFixedElement");
// var scrollStart = 3500; // Начало диапазона
// var scrollEnd = 4500; // Конец диапазона

// window.onscroll = function () {
//   scrollFunction();
// };

// function scrollFunction() {
//   var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

//   if (currentScroll > scrollStart && currentScroll < scrollEnd) {
//     // Если скролл находится в диапазоне, показываем элемент
//     element.style.bottom = "20px";
//     setTimeout(function () {
//       let circle = document.getElementById("myFixedElement");
//       circle.classList.add("fixed-element-text");
//     }, 2000); // Позиция появления элемента
//   } else {
//     // Если скролл вне диапазона, скрываем элемент
//     element.style.bottom = "-100px"; // Скрываем элемент
//   }
// }

// setTimeout(function () {
//   let circle = document.getElementById("myFixedElement");
//   circle.classList.add("fixed-element-text");
// }, 2000);

document.addEventListener("DOMContentLoaded", function () {
  for (let i = 1; i <= 5; i++) {
    const btn = document.querySelector(`#top${i}`);
    const item = document.querySelector(`#growth_item${i}`);
    const icon = document.querySelector(`#open${i}`);
    const img = document.querySelector("#growth_img");

    btn.addEventListener("click", function () {
      for (let j = 1; j <= 5; j++) {
        if (i !== j) {
          const otherBtn = document.querySelector(`#open${j}`);
          const otherItem = document.querySelector(`#growth_item${j}`);

          otherBtn.style.transform = "scale(1)";
          otherItem.classList.remove("growth_item_full");
        }
      }

      item.classList.toggle("growth_item_full");
      img.style.opacity = 0; // Сначала скрываем текущее изображение

      setTimeout(() => {
        if (item.classList.contains("growth_item_full")) {
          icon.style.transform = "scale(-1)";
          img.setAttribute("src", `img/number-${i}.png`);
        } else {
          icon.style.transform = "scale(1)";
          img.setAttribute("src", "icons/QL-Logo-Farbe.svg");
        }
        img.style.opacity = 1; // Показываем новое изображение
      }, 100); // Таймаут на полсекунды для плавного перехода
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

// radar

document.addEventListener("DOMContentLoaded", function () {
  const radar = document.querySelector(".radar");
  const popUp = document.querySelector(".popup");
  const closePopup = document.querySelector(".close-popup");
  const popUpTitleS = document.querySelector(".popup__titleS");
  const popUpTitleL = document.querySelector(".popup__titleL");
  const popUpText = document.querySelector(".popup__text");
  const navbar = document.querySelector("#navbar");

  let selectedLine = null;
  let currentRotation = 0; // Текущий угол поворота

  const linesData = [
    {
      angle: 0,
      info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita dignissimos cum suscipit eius. Alias cupiditate sunt corporis iste dolorum, amet reiciendis. Vero delectus ab velit cum consequuntur voluptatem incidunt esse?",
      titel: "Titel 1",
      titelS: "Titel 1",
      zIndex: "5",
      textRot: "-90deg",
    },
    {
      angle: 12,
      info: "Information 3",
      titel: "Titel 1",
      titelS: "Titel 1",
      zIndex: "7",
      textRot: "-90deg",
    },
    {
      angle: 24,
      info: "Information 4",
      titel: "Titel 1",
      titelS: "Titel 1",
      zIndex: "7",
      textRot: "-90deg",
    },
    {
      angle: 48,
      info: "Information 5",
      titel: "Titel 2",
      titelS: "Titel 1",
      zIndex: "1",
      textRot: "-90deg",
    },
    {
      angle: 60,
      info: "Information 6",
      titel: "Titel 2",
      titelS: "Titel 1",
      zIndex: "3",
      textRot: "-90deg",
    },
    {
      angle: 72,
      info: "Information 7",
      titel: "Titel 2",
      titelS: "Titel 1",
      zIndex: "5",
      textRot: "-90deg",
    },
    {
      angle: 84,
      info: "Information 8",
      titel: "Titel 2",
      titelS: "Titel 1",
      zIndex: "7",
      textRot: "-90deg",
    },
    {
      angle: 96,
      info: "Information 9",
      titel: "Titel 2",
      titelS: "Titel 1",
      zIndex: "7",
      textRot: "-90deg",
    },
    {
      angle: 120,
      info: "Information 10",
      titel: "Titel 3",
      titelS: "Titel 1",
      zIndex: "1",
      textRot: "-90deg",
    },
    {
      angle: 132,
      info: "Information 11",
      titel: "Titel 3",
      titelS: "Titel 1",
      zIndex: "3",
      textRot: "-90deg",
    },
    {
      angle: 144,
      info: "Information 12",
      titel: "Titel 3",
      titelS: "Titel 1",
      zIndex: "5",
      textRot: "-90deg",
    },
    {
      angle: 156,
      info: "Information 13",
      titel: "Titel 3",
      titelS: "Titel 1",
      zIndex: "7",
      textRot: "-90deg",
    },
    {
      angle: 168,
      info: "Information 14",
      titel: "Titel 3",
      titelS: "Titel 1",
      zIndex: "7",
      textRot: "-90deg",
    },
    {
      angle: 192,
      info: "Information 15",
      titel: "Titel 4",
      titelS: "Titel 1",
      zIndex: "1",
      textRot: "90deg",
    },
    {
      angle: 204,
      info: "Information 16",
      titel: "Titel 4",
      titelS: "Titel 1",
      zIndex: "3",
      textRot: "90deg",
    },
    {
      angle: 216,
      info: "Information 17",
      titel: "Titel 4",
      titelS: "Titel 1",
      zIndex: "5",
      textRot: "90deg",
    },
    {
      angle: 228,
      info: "Information 18",
      titel: "Titel 4",
      titelS: "Titel 1",
      zIndex: "7",
      textRot: "90deg",
    },
    {
      angle: 240,
      info: "Information 19",
      titel: "Titel 4",
      titelS: "Titel 1",
      zIndex: "7",
      textRot: "90deg",
    },
    {
      angle: 264,
      info: "Information 20",
      titel: "Titel 5",
      titelS: "Titel 1",
      zIndex: "1",
      textRot: "90deg",
    },
    {
      angle: 276,
      info: "Information 21",
      titel: "Titel 5",
      titelS: "Titel 1",
      zIndex: "3",
      textRot: "90deg",
    },
    {
      angle: 288,
      info: "Information 22",
      titel: "Titel 5",
      titelS: "Titel 1",
      zIndex: "5",
      textRot: "90deg",
    },
    {
      angle: 300,
      info: "Information 23",
      titel: "Titel 5",
      titelS: "Titel 1",
      zIndex: "7",
      textRot: "90deg",
    },
    {
      angle: 312,
      info: "Information 24",
      titel: "Titel 5",
      titelS: "Titel 1",
      zIndex: "7",
      textRot: "90deg",
    },
    {
      angle: 336,
      info: "Information 25",
      titel: "Titel 1",
      titelS: "Titel 1",
      zIndex: "1",
      textRot: "90deg",
    },
    {
      angle: 348,
      info: "Information 1",
      titel: "Titel 1",
      titelS: "Titel 1",
      zIndex: "3",
      textRot: "90deg",
    },
  ];

  function createLines() {
    linesData.forEach((line) => {
      const lineElem = document.createElement("div");
      lineElem.classList.add("line");
      lineElem.style.transform = `rotate(${line.angle}deg)`;
      lineElem.style.zIndex = `${line.zIndex}`;
      lineElem.setAttribute("data-titel", line.titel);
      updateLineClass(lineElem, line.angle); // Обновляем класс линии

      lineElem.addEventListener("click", () => {
        lineElem.classList.remove("leftLine");
        popUp.classList.add("popup-show");
        navbar.style.zIndex = "0";
        if (selectedLine) {
          selectedLine.classList.remove("selected");
        }
        if (navbar.style.zIndex === "0") {
          document.body.classList.add("scroll-lock");
        }

        lineElem.classList.add("selected");
        selectedLine = lineElem;
        radar.style.scale = "1.7";
        radar.style.left = "-50%";

        // Вычисление угла поворота относительно текущего угла
        const targetAngle = 90;
        const additionalRotation =
          targetAngle - ((line.angle + currentRotation) % 360);
        currentRotation += additionalRotation; // Обновляем текущий угол

        radar.style.transform = `rotate(${currentRotation}deg)`;
        radar.style.transition = "all 0.5s ease";
        popUpTitleS.textContent = line.titel;
        popUpTitleL.textContent = line.titelS;
        popUpText.textContent = line.info;

        updateAllLineClasses(); // Обновляем классы всех линий после поворота
        updateStageClasses(); // Обновляем закраску элементов stage
      });
      radar.appendChild(lineElem);
    });
  }

  function updateLineClass(lineElem, angle) {
    if (
      (angle + currentRotation) % 360 > 180 &&
      (angle + currentRotation) % 360 < 360
    ) {
      lineElem.classList.add("leftLine");
    } else {
      lineElem.classList.remove("leftLine");
    }
  }

  function updateAllLineClasses() {
    const lineElements = radar.querySelectorAll(".line");
    lineElements.forEach((lineElem) => {
      const angle = parseFloat(
        lineElem.style.transform.replace(/[^0-9.-]+/g, "")
      );
      updateLineClass(lineElem, angle);
    });
  }

  function updateStageClasses() {
    // Очистка предыдущих закрашенных элементов stage
    const stages = document.querySelectorAll(".stage");
    stages.forEach((stage) => {
      stage.classList.remove("colored");
    });

    // Закрашивание элементов на основе выбранной линии
    if (selectedLine) {
      const zIndex = parseInt(selectedLine.style.zIndex);
      const stageNum = Math.round(zIndex / 2);

      for (let i = 0; i < stageNum; i++) {
        if (stages[i]) {
          stages[i].classList.add("colored");
        }
      }
    }
  }

  createLines();

  closePopup.addEventListener("click", () => {
    if (selectedLine) {
      selectedLine.classList.remove("selected");
    }
    popUp.classList.remove("popup-show");
    document.body.classList.remove("scroll-lock");
    radar.style.scale = "1";
    radar.style.left = "0";
    radar.style.transition = "all 0.5s ease";
    navbar.style.zIndex = "100";
    updateAllLineClasses(); // Обновляем классы всех линий после закрытия попапа
    updateStageClasses(); // Обновляем закраску элементов stage после закрытия попапа
  });
});

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

window.addEventListener("scroll", function () {
  let laptop_area = document.querySelector(".laptop_area");
  let laptop = document.querySelector(".laptop");
  let laptop_area_top = laptop_area.getBoundingClientRect().top;
  let laptop_info = document.querySelector(".laptop_info");
  if (laptop_area_top < window.innerHeight / 3) {
    let scale =
      1 -
      (window.innerHeight / 2 - laptop_area_top) / (window.innerHeight / 0.3);
    scale = Math.max(scale, 0.5);

    let inverseScale = 1 + (1.2 - scale / 0.8);

    laptop.style.transform = `scale(${scale})`;
    laptop_info.style.transform = `scale(${inverseScale})`;
  }
});

// if (window.innerWidth < 766) {
//   const navLinks = document.querySelectorAll('.nav-item');
//   const menuToggle = document.getElementById('navbarSupportedContent');
//   const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

//   navLinks.forEach((l) => {
//       l.addEventListener('click', () => { bsCollapse.toggle() });
//   });
// }

window.addEventListener("DOMContentLoaded", function () {
  if (window.innerHeight > window.innerWidth) {
    
    const infoSec = document.querySelector("#info__section");
    const growthRight = document.querySelector(".growth_right");
    const growth = document.querySelector("#growth");
    const form = document.querySelector("form");
    const brand = document.querySelector(".brand");
    const slogen = document.querySelector(".slogen");
    const interCards = document.querySelectorAll(".inter_card");

    
    infoSec.style.height = "25vh";
    growthRight.style.width = "40%";
    growthRight.style.float = "right";
    growth.style.justifyContent = "space-around";
    form.style.width = "70vw";
    brand.style.fontSize = "60px";
    slogen.style.fontSize = "20px";
    interCards.forEach((card) => {
      card.style.padding = "3%";

      const par = card.querySelector("p");
      const header = card.querySelector('h3');
      if (header){
        header.style.marginBottom = '5px'
      }
      if (par) {
        par.style.overflowWrap = "break-word";
      }
      
    });
    

    if (window.innerHeight > window.innerWidth && window.innerWidth < 850 && window.innerWidth > 576) {
      const interSec = document.querySelector("#interactive_section");
      const radar = document.querySelector(".radar");
      radar.style.width = "50vw";
      radar.style.height = "50vw";
      interSec.style.height = "50vh";
      const items = document.querySelectorAll('.growth_item');
      items.forEach((item) => {
        item.style.width = "300px";
        const num = item.querySelector('span');
        if (num) {
          num.style.fontSize = '2rem';
        }
        const titel = item.querySelector('h3');
        if (titel) {
          titel.style.setProperty('font-size', '2rem', 'important'); // Переопределение с !important
        }
      });
    }
  }
});