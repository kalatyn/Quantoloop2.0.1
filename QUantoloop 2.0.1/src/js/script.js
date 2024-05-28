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

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");

  for (let i = 1; i <= 5; i++) {
    const moreAbout = document.querySelectorAll(`.more__about${i}`); 
    const description = document.querySelectorAll(`#card__disc${i}`);
    const exit = document.querySelectorAll(`.exit__button${i}`);

    moreAbout.forEach((element) => {
      element.addEventListener("click", () => {
        description.forEach((desc) => {
          desc.classList.toggle("show");
        });
        // Добавляем класс блокировки прокрутки к body
        document.body.classList.add("scroll-lock");
      });
    });

    exit.forEach((element) => {
      element.addEventListener("click", () => {
        description.forEach((desc) => {
          desc.classList.toggle("show");
        });
        // Убираем класс блокировки прокрутки у body
        document.body.classList.remove("scroll-lock");
      });
    });
  }

  links.forEach(link => {
    link.addEventListener("click", function () {
      document.body.classList.remove("scroll-lock");
      discription.forEach((element) => {
        if(element.classList.contains("show")) {
          element.classList.remove("show");
        }
        
      });
    });
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

// document.addEventListener("DOMContentLoaded", function () {
//   const mainContainer = document.querySelector("#main__scrolling__container");
//   const contentContainer = document.querySelector("#content_container");

//   const links = document.querySelectorAll(".nav-link");
  

//   let lastScrollTop = 0; // Для отслеживания направления прокрутки

//   window.addEventListener("scroll", function () {
//       const mainContainerTop = mainContainer.getBoundingClientRect().top;
//       const contentScrollHeight = contentContainer.scrollHeight;
//       const contentScrollTop = contentContainer.scrollTop;
//       const mainContainerHeight = mainContainer.clientHeight;
//       const isContentFullyScrolled = contentScrollTop + mainContainerHeight >= contentScrollHeight;
//       const isContentAtTop = contentScrollTop === 0;

//       let currentScrollTop = window.scrollY;

//       if (mainContainerTop <= 10 && !isContentFullyScrolled) {
//         mainContainer.classList.add('fixed');
//         document.body.classList.add("scroll-lock");
//         contentContainer.style.overflowY = "scroll";
//       } else if (isContentFullyScrolled && mainContainerTop <= 10) {
//         mainContainer.classList.remove('fixed');
//         contentContainer.style.overflowY = "hidden";
//         document.body.classList.remove("scroll-lock");
//       } else if (mainContainerTop > 10 && isContentAtTop) {
//         mainContainer.classList.remove('fixed');
//         contentContainer.style.overflowY = "hidden";
//         document.body.classList.remove("scroll-lock");
//       } else if (currentScrollTop < lastScrollTop && mainContainerTop <= 10 && !isContentAtTop) {
//         mainContainer.classList.add('fixed');
//         document.body.classList.add("scroll-lock");
//         contentContainer.style.overflowY = "scroll";
//       }

//   });

//   contentContainer.addEventListener("scroll", function (event) {
//       const contentScrollHeight = contentContainer.scrollHeight;
//       const contentScrollTop = contentContainer.scrollTop;
//       const mainContainerHeight = contentContainer.clientHeight;

//       const isContentFullyScrolled = contentScrollTop + mainContainerHeight >= contentScrollHeight;

//       if (isContentFullyScrolled) {
//         contentContainer.style.overflowY = "hidden";
//         mainContainer.classList.remove('fixed');
//         document.body.classList.remove("scroll-lock");
//       } else if (contentScrollTop && window.scrollY <= lastScrollTop) {
//         mainContainer.classList.add('fixed');
//         document.body.classList.add("scroll-lock");
//         contentContainer.style.overflowY = "scroll";
//       }
      
//   });
//   links.forEach(link => {
//         link.addEventListener("click", function () {
//           mainContainer.classList.remove("fixed");
//           document.body.classList.remove("scroll-lock");
//           contentContainer.style.overflow = "hidden";
//         });
//       });

// });


document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector("#main__scrolling__container");
  contentContainer = document.querySelector("#content_container");
  const initialOffsetTop = mainContainer.offsetTop;

  window.addEventListener("scroll", function () {
    const mainContainerTop = mainContainer.getBoundingClientRect().top;

    if (mainContainerTop <= 10) {
      mainContainer.classList.add('fixed');
      contentContainer.style.overflowY = "scroll";
      mainContainer.classList.remove('fixed');
      
    } else if (window.pageYOffset = initialOffsetTop) {
      mainContainer.classList.remove('fixed');
    }
  });
});



// radar

document.addEventListener('DOMContentLoaded', function() {
  const radarArea = document.querySelector('.radar__area');
  const radar = document.querySelector('.radar');
  const popUp = document.querySelector('.popup');
  const closePopup = document.querySelector('.close-popup');
  const btn = document.querySelector('#displayBtn');
  const popUpTitel = document.querySelector('.popup__title');
  const popUpText = document.querySelector('.popup__text');


  const linesData = [
    { angle: 0, info: 'Information 1', titel: 'Titel 1' },
    { angle: 72, info: 'Information 2', titel: 'Titel 2' },
    { angle: 144, info: 'Information 3', titel: 'Titel 3' },
    { angle: 216, info: 'Information 4', titel: 'Titel 4' },
    { angle: 288, info: 'Information 5', titel: 'Titel 5' },
  ];

  linesData.forEach(line => {
    const lineElem = document.createElement('div');
    lineElem.classList.add('line');
    // line.innerText = line.titel;
    lineElem.style.transform = `rotate(${line.angle}deg)`;
    lineElem.setAttribute('data-titel', line.titel);
    lineElem.addEventListener('click', () => {
      popUp.style.display = 'block';
      popUpTitel.textContent = line.titel;
      popUpTitel.classList.add('popup__title');
      popUpText.textContent = line.info;
      popUpText.classList.add('popup__text');
    })

    radar.appendChild(lineElem);
  });
  closePopup.addEventListener('click', () => {
    popUp.style.display = 'none';
  });

});