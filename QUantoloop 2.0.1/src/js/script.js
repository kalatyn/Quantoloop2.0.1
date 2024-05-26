window.addEventListener("scroll", function () {
  let element = document.querySelector("#back_video");
  let bounding = element.getBoundingClientRect();
  let viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  if (bounding.top >= 0 && bounding.bottom <= viewportHeight) {
    element.style.borderRadius = "0px";
    element.style.width = "100%";
  } else if (bounding.top <= 0) {
    let scrollPosition = Math.abs(bounding.top);
    let newSize = 100 - scrollPosition * 0.015;
    element.style.width = newSize + "%";

    let borderRadius = Math.min(40, scrollPosition * 0.04);
    element.style.borderRadius = borderRadius + "px";
  } if (bounding.top > 1) {
    element.style.width = "100%";
  }
});

let scrollSection = document.querySelector(".horizontal-scroll-section");
function scrollleft() {
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

window.addEventListener("scroll", function () {
  let element = document.querySelector("#scrolling__container");
  let bounding = element.getBoundingClientRect();
  let viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  if (bounding.top >= 0 && bounding.bottom <= viewportHeight) {
    element.style.borderRadius = "0px";
    element.style.width = "100%";
  } else if (bounding.top <= 0) {
    let scrollPosition = Math.abs(bounding.top);
    let newSize = 100 - scrollPosition * 0.015;
    element.style.width = newSize + "%";

    let borderRadius = Math.min(40, scrollPosition * 0.04);
    element.style.borderRadius = borderRadius + "px";
  } if (bounding.top > 1) {
    element.style.width = "100%";
  }
});



const moreAbout = document.querySelectorAll(".more__about");
const discription = document.querySelectorAll("#card__disc");
const exit = document.querySelectorAll(".exit__button");

moreAbout.forEach((element) => {
  element.addEventListener("click", () => {
    discription.forEach((element) => {
      element.classList.toggle("show");
    });
    // Добавляем класс блокировки прокрутки к body
    document.body.classList.add("scroll-lock");
  });
});

exit.forEach((element) => {
  element.addEventListener("click", () => {
    discription.forEach((element) => {
      element.classList.toggle("show");
    });
    // Убираем класс блокировки прокрутки у body
    document.body.classList.remove("scroll-lock");
  });
});

const moreAbout2 = document.querySelectorAll(".more__about2");
const discription2 = document.querySelectorAll("#card__disc2");
const exit2 = document.querySelectorAll(".exit__button2");

moreAbout2.forEach((element) => {
  element.addEventListener("click", () => {
    discription2.forEach((element) => {
      element.classList.toggle("show");
    });
    // Добавляем класс блокировки прокрутки к body
    document.body.classList.add("scroll-lock");
  });
});

exit2.forEach((element) => {
  element.addEventListener("click", () => {
    discription2.forEach((element) => {
      element.classList.toggle("show");
    });
    // Убираем класс блокировки прокрутки у body
    document.body.classList.remove("scroll-lock");
  });
});

const moreAbout3 = document.querySelectorAll(".more__about3");
const discription3 = document.querySelectorAll("#card__disc3");
const exit3 = document.querySelectorAll(".exit__button3");

moreAbout3.forEach((element) => {
  element.addEventListener("click", () => {
    discription3.forEach((element) => {
      element.classList.toggle("show");
    });
    // Добавляем класс блокировки прокрутки к body
    document.body.classList.add("scroll-lock");
  });
});

exit3.forEach((element) => {
  element.addEventListener("click", () => {
    discription3.forEach((element) => {
      element.classList.toggle("show");
    });
    // Убираем класс блокировки прокрутки у body
    document.body.classList.remove("scroll-lock");
  });
});

var element = document.getElementById("myFixedElement");
var scrollStart = 3500; // Начало диапазона
var scrollEnd = 4500; // Конец диапазона

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > scrollStart && currentScroll < scrollEnd) {
    // Если скролл находится в диапазоне, показываем элемент
    element.style.bottom = "20px";
    setTimeout(function () {
      let circle = document.getElementById("myFixedElement");
      circle.classList.add("fixed-element-text");
    }, 2000); // Позиция появления элемента
  } else {
    // Если скролл вне диапазона, скрываем элемент
    element.style.bottom = "-100px"; // Скрываем элемент
  }
}

setTimeout(function () {
  let circle = document.getElementById("myFixedElement");
  circle.classList.add("fixed-element-text");
}, 2000);

// window.addEventListener("scroll", function () {
//   let element = document.querySelector("#scrolling__info");
//   let boundingTop = element.getBoundingClientRect().top;
//   let boundingBottom = element.getBoundingClientRect().bottom;
//   let viewportHeight =
//     window.innerHeight || document.documentElement.clientHeight;

//   if (boundingTop >= 0 && boundingBottom <= viewportHeight) {
//     element.style.borderRadius = "0px";
//   } else if (boundingBottom < 1000) {
//     let scrollPosition = Math.abs(bounding.top);
//     let newSize = 100 - scrollPosition * 0.01;
//     element.style.width = newSize + "%";
//     let borderRadius = Math.min(40, scrollPosition * 0.04);
//     element.style.borderRadius = borderRadius + "px";
//   }
// });

// let currentlyOpenContainer = null;

// function toggleContainer(container, button) {
//   button.addEventListener("click", () => {
//     if (currentlyOpenContainer && currentlyOpenContainer !== container) {
//       currentlyOpenContainer.style.width = "40%";
//       currentlyOpenContainer.previousButton.style.transform = "rotate(0deg)";
//     }
    
//     if (container.style.width === "100%") {
//       container.style.width = "40%";
//       button.style.transform = "rotate(0deg)";
//       currentlyOpenContainer = null;
      
//     } else {
//       container.style.width = "100%";
//       button.style.transform = "rotate(45deg)";
//       currentlyOpenContainer = container;
//       currentlyOpenContainer.previousButton = button;
//     }
//   });
// }

// const pairs = [
//   { container: "#content_item_wrapper1", button: "#open1" },
//   { container: "#content_item_wrapper2", button: "#open2" },
//   { container: "#content_item_wrapper3", button: "#open3" },
//   { container: "#content_item_wrapper4", button: "#open4" },
//   { container: "#content_item_wrapper5", button: "#open5" },
// ];

// pairs.forEach(pair => {
//   const container = document.querySelector(pair.container);
//   const button = document.querySelector(pair.button);
//   toggleContainer(container, button);
// });

document.addEventListener("DOMContentLoaded", function () {
  for (let i = 1; i <= 5; i++) {
    const openBtn = document.querySelector(`#open${i}`);
    const rightWrapper = document.querySelector(`#right_side_wrapper${i}`);
    openBtn.addEventListener("click", function () {
      // Закрываем все контейнеры перед открытием нового
      for (let j = 1; j <= 5; j++) {
        if (j !== i) {
          const otherRightWrapper = document.querySelector(`#right_side_wrapper${j}`);
          otherRightWrapper.style.width = "0%";
          const otherOpenBtn = document.querySelector(`#open${j}`);
          otherOpenBtn.style.transform = "rotate(0deg)";
        }
      }
      
      // Преобразуем значение ширины из строки в число
      const width = parseInt(rightWrapper.style.width);
      
      if (width === 67) {
        rightWrapper.style.width = "0%";
        openBtn.style.transform = "rotate(0deg)";
      } else {
        rightWrapper.style.width = "67%";
        openBtn.style.transform = "rotate(45deg)";
      }
    });
  }
});
  
document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector("#main__scrolling__container");
  const contentContainer = document.querySelector("#content_container");
  

  let lastScrollTop = 0; // Для отслеживания направления прокрутки

  window.addEventListener("scroll", function () {
      const mainContainerTop = mainContainer.getBoundingClientRect().top;
      const contentScrollHeight = contentContainer.scrollHeight;
      const contentScrollTop = contentContainer.scrollTop;
      const mainContainerHeight = mainContainer.clientHeight;
      const isContentFullyScrolled = contentScrollTop + mainContainerHeight >= contentScrollHeight;
      const isContentAtTop = contentScrollTop === 0;

      let currentScrollTop = window.scrollY;

      if (mainContainerTop <= 10 && !isContentFullyScrolled) {
          mainContainer.classList.add('fixed');
          document.body.classList.add("scroll-lock");
          contentContainer.style.overflowY = "scroll";
      } else if (isContentFullyScrolled && mainContainerTop <= 10) {
          mainContainer.classList.remove('fixed');
          contentContainer.style.overflowY = "hidden";
          document.body.classList.remove("scroll-lock");
      } else if (mainContainerTop > 10 && isContentAtTop) {
          mainContainer.classList.remove('fixed');
          contentContainer.style.overflowY = "hidden";
          document.body.classList.remove("scroll-lock");
      } else if (currentScrollTop < lastScrollTop && mainContainerTop <= 10 && !isContentAtTop) {
          mainContainer.classList.add('fixed');
          document.body.classList.add("scroll-lock");
          contentContainer.style.overflowY = "scroll";
      }

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Для Firefox
  });

  contentContainer.addEventListener("scroll", function () {
      const contentScrollHeight = contentContainer.scrollHeight;
      const contentScrollTop = contentContainer.scrollTop;
      const mainContainerHeight = contentContainer.clientHeight;

      const isContentFullyScrolled = contentScrollTop + mainContainerHeight >= contentScrollHeight;

      if (isContentFullyScrolled) {
          contentContainer.style.overflowY = "hidden";
          mainContainer.classList.remove('fixed');
          document.body.classList.remove("scroll-lock");
      } else if (contentScrollTop && window.scrollY <= lastScrollTop) {
          mainContainer.classList.add('fixed');
          document.body.classList.add("scroll-lock");
          contentContainer.style.overflowY = "scroll";
      }
      
  });

});


