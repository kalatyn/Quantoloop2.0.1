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
    let viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    let triggerHeight = viewportHeight * 0.3;

    // Проверяем, если верх элемента на расстоянии 30% от верхнего края окна
    if (bounding.top >= triggerHeight && bounding.bottom <= viewportHeight) {
      element.style.borderRadius = "0px";
      element.style.width = "100%";
    } 
    // Проверяем, если верх элемента выше триггерной высоты
    else if (bounding.top < triggerHeight) {
      let scrollPosition = triggerHeight - bounding.top;
      let newSize = Math.max(50, 100 - scrollPosition * 0.01); // Ограничиваем минимальный размер до 50%
      element.style.width = newSize + "%";

      let borderRadius = Math.min(40, scrollPosition * 0.05);
      element.style.borderRadius = borderRadius + "px";
    } 
    // Восстанавливаем размер, если элемент ниже триггерной высоты
    else if (bounding.top > triggerHeight) {
      element.style.width = "100%";
      element.style.borderRadius = "0px"; // Устанавливаем borderRadius для консистентности
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
        }
      }

      item.classList.toggle('growth_item_full');
      img.style.opacity = 0; // Сначала скрываем текущее изображение
      
      setTimeout(() => {
        if (item.classList.contains('growth_item_full')) {
          icon.style.transform = 'scale(-1)';
          img.setAttribute('src', `img/number-${i}.png`);
        } else {
          icon.style.transform = 'scale(1)';
          img.setAttribute('src', 'icons/QL-Logo-Farbe.svg');
        }
        img.style.opacity = 1; // Показываем новое изображение
      }, 500); // Таймаут на полсекунды для плавного перехода
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
    });
  }

});






// radar

document.addEventListener('DOMContentLoaded', function() {
  const radar = document.querySelector('.radar');
  const popUp = document.querySelector('.popup');
  const closePopup = document.querySelector('.close-popup');
  const popUpTitleS = document.querySelector('.popup__titleS');
  const popUpTitleL = document.querySelector('.popup__titleL');
  const popUpText = document.querySelector('.popup__text');
  
  
  let selectedLine = null;
  let currentRotation = 0; // Текущий угол поворота

  function createLines() {
    linesData.forEach(line => {
      const lineElem = document.createElement('div');
      lineElem.classList.add('line');
      lineElem.style.transform = `rotate(${line.angle}deg)`;
      lineElem.style.zIndex = `${line.zIndex}`;
      lineElem.setAttribute('data-titel', line.titel);
      updateLineClass(lineElem, line.angle); // Обновляем класс линии

      lineElem.addEventListener('click', () => {
        lineElem.classList.remove('leftLine');
        popUp.classList.add('popup-show');
        if (selectedLine) {
          selectedLine.classList.remove('selected');
        }
        
        lineElem.classList.add('selected');
        selectedLine = lineElem;
        radar.style.scale = '2';
        radar.style.left = '-50%';

        // Вычисление угла поворота относительно текущего угла
        const targetAngle = 90;
        const additionalRotation = targetAngle - (line.angle + currentRotation) % 360;
        currentRotation += additionalRotation; // Обновляем текущий угол

        radar.style.transform = `rotate(${currentRotation}deg)`;
        radar.style.transition = 'all 0.5s ease';
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
    if ((angle + currentRotation) % 360 > 181 && (angle + currentRotation) % 360 < 360) {
      lineElem.classList.add('leftLine');
    } else {
      lineElem.classList.remove('leftLine');
    }
  }

  function updateAllLineClasses() {
    const lineElements = radar.querySelectorAll('.line');
    lineElements.forEach(lineElem => {
      const angle = parseFloat(lineElem.style.transform.replace(/[^0-9.-]+/g, ''));
      updateLineClass(lineElem, angle);
    });
  }

  function updateStageClasses() {
    // Очистка предыдущих закрашенных элементов stage
    const stages = document.querySelectorAll('.stage');
    stages.forEach(stage => {
      stage.classList.remove('colored');
    });

    // Закрашивание элементов на основе выбранной линии
    if (selectedLine) {
      const zIndex = parseInt(selectedLine.style.zIndex);
      const stageNum = Math.round(zIndex / 2);

      for (let i = 0; i < stageNum; i++) {
        if (stages[i]) {
          stages[i].classList.add('colored');
        }
      }
    }
  }

  createLines();

  closePopup.addEventListener('click', () => {
    if (selectedLine) {
      selectedLine.classList.remove('selected');
    }
    popUp.classList.remove('popup-show');
    radar.style.scale = '1';
    radar.style.left = '0';
    radar.style.transition = 'all 0.5s ease';
    updateAllLineClasses(); // Обновляем классы всех линий после закрытия попапа
    updateStageClasses(); // Обновляем закраску элементов stage после закрытия попапа
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const content = document.querySelector('.radar');
  let scale = 1;
  let lastScale = 1;
  let posX = 0;
  let posY = 0;
  let lastPosX = 0;
  let lastPosY = 0;
  let maxPosX = 0;
  let maxPosY = 0;

  function initializeHammer() {
      const hammer = new Hammer(content);
      hammer.get('pinch').set({ enable: true });
      hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

      hammer.on('pinchstart', function() {
          lastScale = scale;
      });

      hammer.on('pinch', function(event) {
          scale = Math.max(0.5, Math.min(lastScale * event.scale, 3)); // ограничение масштабирования
          maxPosX = Math.max(0, (content.clientWidth * scale - window.innerWidth) / 2);
          maxPosY = Math.max(0, (content.clientHeight * scale - window.innerHeight) / 2);
          content.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
      });

      hammer.on('pinchend', function() {
          lastScale = scale;
      });

      hammer.on('panstart', function() {
          lastPosX = posX;
          lastPosY = posY;
      });

      hammer.on('pan', function(event) {
          posX = Math.max(-maxPosX, Math.min(lastPosX + event.deltaX, maxPosX));
          posY = Math.max(-maxPosY, Math.min(lastPosY + event.deltaY, maxPosY));
          content.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
      });

      hammer.on('panend', function() {
          lastPosX = posX;
          lastPosY = posY;
      });
  }

  if (window.innerWidth < 576) {
      initializeHammer();
  }

  window.addEventListener('resize', function() {
      if (window.innerWidth < 576 && !Hammer.Manager) {
          initializeHammer();
      } else if (window.innerWidth >= 576 && Hammer.Manager) {
          content.style.transform = 'scale(1) translate(0, 0)';
          Hammer.Manager = null; // Отключение Hammer.js
      }
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