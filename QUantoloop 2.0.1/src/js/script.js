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
    let newSize = 100 - scrollPosition * 0.01;
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
    let newSize = 100 - scrollPosition * 0.01;
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

window.addEventListener("scroll", function () {
  let element = document.querySelector("#scrolling__info");
  let bounding = element.getBoundingClientRect();
  let viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  if (bounding.top >= 0 && bounding.bottom <= viewportHeight) {
    element.style.borderRadius = "0px";
  } else if (bounding.bottom < 1000) {
    let scrollPosition = Math.abs(bounding.top);
    let newSize = 100 - scrollPosition * 0.01;
    element.style.width = newSize + "%";
    let borderRadius = Math.min(40, scrollPosition * 0.04);
    element.style.borderRadius = borderRadius + "px";
  }
});

// const timeline__item_hidden = document.getElementById("timeline__item_hidden");
// const timeline__item_main = document.getElementById("timeline__item_main");
// timeline__item_main.addEventListener("click", () => {
//   timeline__item_hidden.style.display = "block";
// });
