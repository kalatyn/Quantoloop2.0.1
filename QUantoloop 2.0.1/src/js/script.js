document.querySelector('#back_video').addEventListener('click', function (event) {
  event.preventDefault();
});
document.querySelector('#back_video').addEventListener('play', function() {
  this.currentTime = 0;
});

document.addEventListener("DOMContentLoaded", function () {
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
    let newSize = 100 - scrollPosition * 0.03;
    element.style.width = newSize + "%";

    let borderRadius = Math.min(40, scrollPosition * 0.05);
    element.style.borderRadius = borderRadius + "px";
  } if (bounding.top > 1) {
    element.style.width = "100%";
  }
});

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

    moreAbout.forEach((element) => {
      element.addEventListener("click", () => {
        descriptions.forEach((desc) => {
          desc.classList.toggle("show");
        });
        // Добавляем класс блокировки прокрутки к body
        document.body.classList.add("scroll-lock");
      });
    });

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



// document.addEventListener("DOMContentLoaded", function () {
//   for (let i = 1; i <= 5; i++) {
//     const openBtn = document.querySelector(`#open${i}`);
//     const rightWrapper = document.querySelector(`#right_side_wrapper${i}`);
//     openBtn.addEventListener("click", function () {
//       // Закрываем все контейнеры перед открытием нового
//       for (let j = 1; j <= 5; j++) {
//         if (j !== i) {
//           const otherRightWrapper = document.querySelector(`#right_side_wrapper${j}`);
//           otherRightWrapper.style.width = "0%";
//           const otherOpenBtn = document.querySelector(`#open${j}`);
//           otherOpenBtn.style.transform = "rotate(0deg)";
//         }
//       }
      
//       // Преобразуем значение ширины из строки в число
//       const width = parseInt(rightWrapper.style.width);
      
//       if (width === 67) {
//         rightWrapper.style.width = "0%";
//         openBtn.style.transform = "rotate(0deg)";
//       } else {
//         rightWrapper.style.width = "67%";
//         openBtn.style.transform = "rotate(45deg)";
//       }
//     });
//   }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const mainContainer = document.querySelector("#main__scrolling__container");
//   const contentContainer = document.querySelector("#content_container");
//   const links = document.querySelectorAll(".nav-link");
//   let lastScrollTop = 0;

//   window.addEventListener("scroll", function () {
//     const mainContainerRect = mainContainer.getBoundingClientRect();
//     const contentScrollHeight = contentContainer.scrollHeight;
//     const contentScrollTop = contentContainer.scrollTop;
//     const mainContainerHeight = mainContainer.clientHeight;
//     const isContentFullyScrolled = contentScrollTop + mainContainerHeight >= contentScrollHeight;
//     const isContentAtTop = contentScrollTop === 0;
//     const currentScrollTop = window.scrollY;

//     if (mainContainerRect.top <= 0 && currentScrollTop > lastScrollTop && !isContentFullyScrolled) {
//       // Прокрутка вниз: фиксируем контейнер и разрешаем прокрутку внутри него
//       mainContainer.classList.add('fixed');
//       document.body.classList.add("scroll-lock");
//       contentContainer.style.overflowY = "scroll";
//     } else if (isContentFullyScrolled && mainContainerRect.top <= 0) {
//       // Конец содержимого контейнера при прокрутке вниз
//       mainContainer.classList.remove('fixed');
//       contentContainer.style.overflowY = "hidden";
//       document.body.classList.remove("scroll-lock");
//     } else if (mainContainerRect.top > 0 && isContentAtTop) {
//       // Начало содержимого контейнера при прокрутке вверх
//       mainContainer.classList.remove('fixed');
//       contentContainer.style.overflowY = "hidden";
//       document.body.classList.remove("scroll-lock");
//     } else if (currentScrollTop < lastScrollTop && mainContainerRect.bottom >= window.innerHeight) {
//       // Прокрутка вверх: фиксируем контейнер и разрешаем прокрутку внутри него
//       mainContainer.classList.add('fixed');
//       document.body.classList.add("scroll-lock");
//       contentContainer.style.overflowY = "scroll";
//     } else if (mainContainerRect.bottom < window.innerHeight) {
//       // Открепляем контейнер, когда его нижняя граница выше видимой области
//       mainContainer.classList.remove('fixed');
//       contentContainer.style.overflowY = "hidden";
//       document.body.classList.remove("scroll-lock");
//     }

//     lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
//   });

//   contentContainer.addEventListener("scroll", function () {
//     const contentScrollHeight = contentContainer.scrollHeight;
//     const contentScrollTop = contentContainer.scrollTop;
//     const mainContainerHeight = contentContainer.clientHeight;
//     const isContentFullyScrolled = contentScrollTop + mainContainerHeight >= contentScrollHeight;
//     const isContentAtTop = contentScrollTop === 0;

//     if (isContentFullyScrolled) {
//       contentContainer.style.overflowY = "hidden";
//       mainContainer.classList.remove('fixed');
//       document.body.classList.remove("scroll-lock");
//     } else if (isContentAtTop && window.scrollY <= lastScrollTop) {
//       mainContainer.classList.add('fixed');
//       document.body.classList.add("scroll-lock");
//       contentContainer.style.overflowY = "scroll";
//     }
//   });

//   links.forEach(link => {
//     link.addEventListener("click", function () {
//       mainContainer.classList.remove("fixed");
//       document.body.classList.remove("scroll-lock");
//       contentContainer.style.overflow = "hidden";
//     });
//   });
// });




// document.addEventListener("DOMContentLoaded", function () {
//   const mainContainer = document.querySelector("#main__scrolling__container");
//   contentContainer = document.querySelector("#content_container");
//   const initialOffsetTop = mainContainer.offsetTop;

//   window.addEventListener("scroll", function () {
//     const mainContainerTop = mainContainer.getBoundingClientRect().top;

//     if (mainContainerTop <= 10) {
//       mainContainer.classList.add('fixed');
//       contentContainer.style.overflowY = "scroll";
//       mainContainer.classList.remove('fixed');
      
//     } else {
//       contentContainer.style.overflowY = "hidden";
//     }
//   });
// });

//new section

document.addEventListener('DOMContentLoaded', function() {
  
  for (let i = 1; i <= 5; i++) {
    const btn = document.querySelector(`#top${i}`);
    const item = document.querySelector(`#growth_item${i}`);
    const icon = document.querySelector(`#open${i}`);
    const img = document.querySelector('#growth_img');
    
    btn.addEventListener('click', function() {
      for (let j = 1; j <= 5; j++) {
        if (i !== j) {
          const otherBtn = document.querySelector(`#open${j}`);
          const otherItem = document.querySelector(`#growth_item${j}`);
          
          otherBtn.style.transform = 'scale(1)';
          otherItem.classList.remove('growth_item_full');
          img.setAttribute('src', `img/number-${i}.png`);
        }
      }
    item.classList.toggle('growth_item_full');

    if (item.classList.contains('growth_item_full')) {
      icon.style.transform = 'scale(-1)';
    } else {
      icon.style.transform = 'scale(1)';
      img.setAttribute('src', 'icons/QL-Logo-Farbe.svg');

    }
  });
  }
  
});

document.addEventListener('DOMContentLoaded', function() {

  for (let i = 1; i <= 5; i++) {
    const btn = document.querySelector(`#plus${i}`);
    const window = document.querySelector(`#plus_info${i}`);


    btn.addEventListener('click', function() {
      window.classList.add('show');
      document.body.classList.add("scroll-lock");
    });
    const close = document.querySelector(`#wClose${i}`);

    close.addEventListener('click', function() {
      window.classList.remove('show');
      document.body.classList.remove("scroll-lock");
    });
    window.addEventListener('click', function(event) {
      if (event.target === window) {
        window.classList.remove('show');
        document.body.classList.remove("scroll-lock");
      }
    })
  }

});






// radar

document.addEventListener('DOMContentLoaded', function() {
  const radar = document.querySelector('.radar');
  const popUp = document.querySelector('.popup');
  const closePopup = document.querySelector('.close-popup');
  // const popUpImg = document.querySelector('.popup__img');
  const popUpTitleS = document.querySelector('.popup__titleS');
  const popUpTitleL = document.querySelector('.popup__titleL');
  const popUpText = document.querySelector('.popup__text');
  const links = document.querySelectorAll(".nav-link");
  


  const linesData = [
    { angle: 0, info: 'Information 2', titel: 'Titel 1', titelS: 'Titel 1', zIndex: '5', textRot: '-90deg' },
    { angle: 12, info: 'Information 3', titel: 'Titel 1',titelS: 'Titel 1',  zIndex: '7', textRot: '-90deg' },
    { angle: 24, info: 'Information 4', titel: 'Titel 1',titelS: 'Titel 1',  zIndex: '7', textRot: '-90deg' },
    { angle: 48, info: 'Information 5', titel: 'Titel 2',titelS: 'Titel 1',  zIndex: '1', textRot: '-90deg'  },
    { angle: 60, info: 'Information 6', titel: 'Titel 2',titelS: 'Titel 1',  zIndex: '3', textRot: '-90deg' },
    { angle: 72, info: 'Information 7', titel: 'Titel 2',titelS: 'Titel 1',  zIndex: '5', textRot: '-90deg' },
    { angle: 84, info: 'Information 8', titel: 'Titel 2',titelS: 'Titel 1',  zIndex: '7', textRot: '-90deg' },
    { angle: 96, info: 'Information 9', titel: 'Titel 2',titelS: 'Titel 1',  zIndex: '7', textRot: '-90deg' },
    { angle: 120, info: 'Information 10', titel: 'Titel 3',titelS: 'Titel 1',  zIndex: '1', textRot: '-90deg' },
    { angle: 132, info: 'Information 11', titel: 'Titel 3',titelS: 'Titel 1',  zIndex: '3', textRot: '-90deg' },
    { angle: 144, info: 'Information 12', titel: 'Titel 3',titelS: 'Titel 1',  zIndex: '5', textRot: '-90deg' },
    { angle: 156, info: 'Information 13', titel: 'Titel 3',titelS: 'Titel 1',  zIndex: '7', textRot: '-90deg' },
    { angle: 168, info: 'Information 14', titel: 'Titel 3',titelS: 'Titel 1',  zIndex: '7', textRot: '-90deg' },
    { angle: 192, info: 'Information 15', titel: 'Titel 4',titelS: 'Titel 1',  zIndex: '1', textRot: '90deg' },
    { angle: 204, info: 'Information 16', titel: 'Titel 4',titelS: 'Titel 1',  zIndex: '3', textRot: '90deg' },
    { angle: 216, info: 'Information 17', titel: 'Titel 4',titelS: 'Titel 1',  zIndex: '5', textRot: '90deg' },
    { angle: 228, info: 'Information 18', titel: 'Titel 4',titelS: 'Titel 1',  zIndex: '7', textRot: '90deg' },
    { angle: 240, info: 'Information 19', titel: 'Titel 4',titelS: 'Titel 1',  zIndex: '7', textRot: '90deg' },
    { angle: 264, info: 'Information 20', titel: 'Titel 5',titelS: 'Titel 1',  zIndex: '1', textRot: '90deg' },
    { angle: 276, info: 'Information 21', titel: 'Titel 5',titelS: 'Titel 1',  zIndex: '3', textRot: '90deg' },
    { angle: 288, info: 'Information 22', titel: 'Titel 5',titelS: 'Titel 1',  zIndex: '5', textRot: '90deg' },
    { angle: 300, info: 'Information 23', titel: 'Titel 5',titelS: 'Titel 1',  zIndex: '7', textRot: '90deg' },
    { angle: 312, info: 'Information 24', titel: 'Titel 5',titelS: 'Titel 1',  zIndex: '7', textRot: '90deg' },
    { angle: 336, info: 'Information 25', titel: 'Titel 1',titelS: 'Titel 1',  zIndex: '1', textRot: '90deg' },
    { angle: 348, info: 'Information 1', titel: 'Titel 1',titelS: 'Titel 1',  zIndex: '3', textRot: '90deg' },
  ];



  

  linesData.forEach(line => {
    const lineElem = document.createElement('div');
    const radar = document.querySelector('.radar');
    lineElem.classList.add('line');
    lineElem.style.transform = `rotate(${line.angle}deg)`;
    lineElem.style.zIndex = `${line.zIndex}`;

    lineElem.setAttribute('data-titel', line.titel);
    
    lineElem.addEventListener('click', () => {
      popUp.classList.add('popup-show');
      radar.style.scale = '2';
      radar.style.transition = 'scale 0.5s ease';
      popUpTitleS.textContent = line.titel;
      
      popUpTitleL.textContent = line.titelS;
      
      popUpText.textContent = line.info;
      
      
    });

    radar.appendChild(lineElem);
  });
  closePopup.addEventListener('click', () => {

    popUp.classList.remove('popup-show');
      radar.style.scale = '1';
      radar.style.transition = 'scale 0.5s ease';
  });

  links.forEach(link => {
    link.addEventListener("click", function () {
      popUp.classList.remove("popup-show");
    });
  });
});

let numbers = document.querySelectorAll('.info div');

numbers.forEach(function(number) {
  let numberTop = number.getBoundingClientRect().top;
  let start = +number.innerHTML;
  let end = +number.dataset.max;

  window.addEventListener('scroll', function onScroll() {
    if (window.pageYOffset > numberTop - window.innerHeight / 1.5) {
      this.removeEventListener('scroll', onScroll);
      let interval = setInterval(function() {
        number.innerHTML = ++start;
        if (start == end) {
          clearInterval(interval);
        }
      }, 10);
    }
  });
});



window.addEventListener('scroll', function() {
  let laptop_area = document.querySelector('.laptop_area');
  let laptop = document.querySelector('.laptop');
  let laptop_area_top = laptop_area.getBoundingClientRect().top;
  let laptop_info = document.querySelector('.laptop_info');
  if (laptop_area_top < window.innerHeight / 3 ) {
    let scale = 1 - (window.innerHeight / 2 - laptop_area_top) / (window.innerHeight /0.2);
    scale = Math.max(scale, 0.5);

    let inverseScale = 1 + (1- scale / 0.9);

    laptop.style.transform = `scale(${scale})`;
    laptop_info.style.transform = `scale(${inverseScale})`;
  }
});