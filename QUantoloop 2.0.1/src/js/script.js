//canvas
// const canvas = document.getElementById("network");
// const ctx = canvas.getContext("2d");

// let width = (canvas.width = window.innerWidth * 2);
// let height = (canvas.height = window.innerHeight * 2);
// canvas.style.width = window.innerWidth + "px";
// canvas.style.height = window.innerHeight + "px";
// ctx.scale(2, 2);

// const mouse = { x: width / 2, y: height / 2 };
// const points = [];
// const numPoints = 200; // Reduced number of points
// const pointRadius = 3;
// const lineDistance = 200;

// class Point {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.vx = (Math.random() - 0.5) * 0.7; // Reduced speed
//     this.vy = (Math.random() - 0.5) * 0.7; // Reduced speed
//   }

//   update() {
//     this.x += this.vx;
//     this.y += this.vy;

//     if (this.x < 0 || this.x > width) this.vx *= -1;
//     if (this.y < 0 || this.y > height) this.vy *= -1;
//   }

//   draw() {
//     ctx.beginPath();
//     ctx.arc(this.x / 2, this.y / 2, pointRadius, 0, Math.PI * 2);
//     ctx.fillStyle = "rgba(0, 128, 255, 0.8)";
//     ctx.fill();
//   }
// }

// function createPoints() {
//   for (let i = 0; i < numPoints; i++) {
//     points.push(new Point(Math.random() * width, Math.random() * height));
//   }
// }

// function drawLines() {
//   for (let i = 0; i < points.length; i++) {
//     for (let j = i + 1; j < points.length; j++) {
//       const dist = Math.hypot(
//         points[i].x - points[j].x,
//         points[i].y - points[j].y
//       );
//       const alpha = 1 - dist / lineDistance;
//       ctx.strokeStyle = `rgba(0, 128, 255, ${alpha})`;
//       ctx.lineWidth = 0.3;
//       ctx.beginPath();
//       ctx.moveTo(points[i].x / 2, points[i].y / 2);
//       ctx.lineTo(points[j].x / 2, points[j].y / 2);
//       ctx.stroke();
//     }
//   }
// }

// function animate() {
//   ctx.clearRect(0, 0, width, height);

//   points.forEach((point) => {
//     point.update();
//     point.draw();
//   });

//   drawLines();
//   requestAnimationFrame(animate);
// }

// canvas.addEventListener("mousemove", (e) => {
//   mouse.x = e.clientX * 2;
//   mouse.y = e.clientY * 2;
//   points.forEach((point) => {
//     const dist = Math.hypot(point.x - mouse.x, point.y - mouse.y);
//     if (dist < 100) {
//       point.vx += (mouse.x - point.x) * 0.008; // Reduced interaction
//       point.vy += (mouse.y - point.y) * 0.008; // Reduced interaction
//     }
//   });
// });

// window.addEventListener("resize", () => {
//   width = canvas.width = window.innerWidth * 2;
//   height = canvas.height = window.innerHeight * 2;
//   canvas.style.width = window.innerWidth + "px";
//   canvas.style.height = window.innerHeight + "px";
//   ctx.scale(2, 2);
// });

// createPoints();
// animate();
//end canvas

document.addEventListener("DOMContentLoaded", (event) => {
  const pics = document.querySelectorAll("img");

  pics.forEach((pic) => {
    pic.setAttribute("loading", "lazy");
  });
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

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    const container = document.querySelector(".interactive_section");
    const cards = document.querySelectorAll(".inter_card");
    let viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    let bounding = container.getBoundingClientRect();
    const triggerHeight = viewportHeight / 1.3;
    let containerHeight = bounding.height;

    // Определение границ для масштабирования
    const lowerThreshold = containerHeight * 0.2;
    const upperThreshold = containerHeight * 0.6;

    if (window.innerWidth >= 576) {
      if (bounding.top <= triggerHeight && bounding.bottom >= 0) {
        let scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        cards.forEach((card) => {
          let offset = triggerHeight - bounding.top;
          let cardTop = card.getBoundingClientRect().top - bounding.top;
          let cardBottom = card.getBoundingClientRect().bottom - bounding.top;

          // Движение карточек
          card.style.transform = `translateY(-${Math.max(offset, 0) / 1.3}px)`;

          // Проверяем, находится ли карточка в заданном диапазоне для масштабирования
          if (cardTop > lowerThreshold && cardTop < upperThreshold) {
            card.style.transform += " scale(1.1)"; // Увеличиваем размер на 10%
          } else {
            card.style.transform += " scale(1.0)"; // Возвращаем к исходному размеру
          }
        });
      } else {
        // Сброс позиции карточек, если они вне диапазона скроллинга
        cards.forEach((card) => {
          card.style.transform = `translateY(0) scale(1.0)`;
        });
      }
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

document.addEventListener("DOMContentLoaded", function () {
  const cardfield = document.querySelector("#card_section");
  const growthArea = document.querySelector("#growth_area");
  const radarArea = document.querySelector("#radar__area");

  // const card = document.querySelector('.cards');

  cardfield.addEventListener("click", function () {
    cardfield.scrollIntoView({ behavior: "instant" });
  });
  growthArea.addEventListener("click", function () {
    growthArea.scrollIntoView({ behavior: "instant" });
  });
  radarArea.addEventListener("click", function () {
    radarArea.scrollIntoView({ behavior: "smooth" });
  });
});

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
  let currentOpenIndex = 1;

  function updateState(newIndex) {
    const currentBtn = document.querySelector(`#open${currentOpenIndex}`);
    const currentItem = document.querySelector(
      `#growth_item${currentOpenIndex}`
    );
    currentBtn.style.transform = "scale(1)";
    currentItem.classList.remove("growth_item_full");

    const newBtn = document.querySelector(`#open${newIndex}`);
    const newItem = document.querySelector(`#growth_item${newIndex}`);
    newBtn.style.transform = "scale(-1)";
    newItem.classList.add("growth_item_full");

    const img = document.querySelector("#growth_img");
    img.style.opacity = 0;
    setTimeout(() => {
      img.setAttribute("src", `img/Unser_Ansatz/${newIndex}.jpg`);
      img.style.opacity = 1;
    }, 100);

    currentOpenIndex = newIndex;
  }

  for (let i = 1; i <= 5; i++) {
    const btn = document.querySelector(`#top${i}`);

    btn.addEventListener("click", function () {
      if (i !== currentOpenIndex) {
        updateState(i);
      }
    });
  }

  updateState(currentOpenIndex);
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

// window.addEventListener('scroll', function(){
//   const element = document.querySelector('.interactive_container');
//   const card1= document.querySelector('#icr_card1');
//   const card2= document.querySelector('#icr_card2');
//   const card3= document.querySelector('#icr_card3');
//   let bounding = element.getBoundingClientRect();
//   let windowHeight = window.innerHeight;

//   if (bounding.top <= windowHeight / 2 && bounding.top >= 0){
//     const scrollPosition = Math.min((windowHeight / 2 - bounding.top) / (windowHeight /4), 1);

//     const newScale1 = 1 - scrollPosition * 0.2;
//     const newRotation1 = -10 * scrollPosition;
//     const newTranslateX1 = -200 * scrollPosition;
//     const newScale2 = 1 - scrollPosition * 0.1;
//     const newRotation2 = 0 * scrollPosition;
//     const newTranslateX2 = -450 * scrollPosition;
//     const newScale3 = 1;
//     const newRotation3 = 10 * scrollPosition;
//     const newTranslateX3 = -550 * scrollPosition;
//     const newTranslateY3 = 130 * scrollPosition;

//     card1.style.transform = `scale3d(${newScale1},${newScale1},${newScale1}) rotate(${newRotation1}deg) translateX(${newTranslateX1}px)`;
//     card2.style.transform = `scale3d(${newScale2},${newScale2},${newScale2}) rotate(${newRotation2}deg) translateX(${newTranslateX2}px)`;
//     card3.style.transform = `scale3d(${newScale3},${newScale3},${newScale3}) rotate(${newRotation3}deg) translateX(${newTranslateX3}px) translateY(${newTranslateY3}px)`;

//   } else if (boundimg.top > windowHeight/2) {
//     card1.style.transform = 'scale3d(1,1,1) rotate(0deg) translateX(0)';
//     card2.style.transform = 'rotate(10deg) scale3d(0.9, 0.9, 0.9) translateX(0)';
//   }

// })
window.addEventListener("scroll", function () {
  const element = document.querySelector(".interactive_container");
  const card1 = document.querySelector("#icr_card1");
  const card2 = document.querySelector("#icr_card2");
  const card3 = document.querySelector("#icr_card3");
  let bounding = element.getBoundingClientRect();
  let windowHeight = window.innerHeight;

  // Рассчитаем начальную позицию скролла относительно viewport
  let startScrollPosition = bounding.top - windowHeight / 2;

  // Изменим формулу расчета позиции скролла для более плавного перехода
  if (bounding.top <= windowHeight / 2 && window.innerWidth > 576) {
    const scrollPosition = Math.min(
      ((windowHeight / 2 - bounding.top) / (windowHeight / 2)) * 1,
      1
    );

    const newScale1 = 1 - scrollPosition * 0.2;
    const newRotation1 = -10 * scrollPosition;
    const newTranslateX1 = -8 * scrollPosition; // in vw
    const newScale2 = 1 - scrollPosition * 0.1;
    const newRotation2 = 10 - 10 * scrollPosition;
    const newTranslateX2 = -20 * scrollPosition; // in vw
    const newScale3 = 1;
    const newRotation3 = 10 * scrollPosition;
    const newTranslateX3 = -28 * scrollPosition; // in vw
    const newTranslateY3 = 11 * scrollPosition; // in vh

    card1.style.transform = `scale3d(${newScale1}, ${newScale1}, ${newScale1}) rotate(${newRotation1}deg) translateX(${newTranslateX1}vw)`;
    card2.style.transform = `scale3d(${newScale2}, ${newScale2}, ${newScale2}) rotate(${newRotation2}deg) translateX(${newTranslateX2}vw)`;
    card3.style.transform = `scale3d(${newScale3}, ${newScale3}, ${newScale3}) rotate(${newRotation3}deg) translateX(${newTranslateX3}vw) translateY(${newTranslateY3}vh)`;
  } else {
    card1.style.transform = "scale3d(1, 1, 1) rotate(0deg) translateX(0)";
    card2.style.transform =
      "rotate(10deg) scale3d(0.9, 0.9, 0.9) translateX(0)";
    card3.style.transform = "scale3d(1, 1, 1) rotate(0deg) translateX(0)";
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

document.addEventListener("DOMContentLoaded", function () {
  const radar = document.querySelector(".radar");
  const popUp = document.querySelector(".popup");
  const closePopup = document.querySelector(".close-popup");
  const popUpTitleS = document.querySelector(".popup__titleS");
  const popUpTitleL = document.querySelector(".popup__titleL");
  const popUpText = document.querySelector(".popup__text");
  const popUpImg = document.querySelector(".popup__img");
  const navbar = document.querySelector("#navbar");
  const zoomIn = document.querySelector("#zoom_in");
  const zoomOut = document.querySelector("#zoom_out");

  let scale = 1;
  let selectedLine = null;
  let currentRotation = 0;

  const linesData = [
    {
      angle: 0,
      info: "Klimabilanzen werden für Transport- und Logistikdienstleister immer wichtiger, da Kunden über CO2-Emissionen informiert werden möchten, um ihre eigene Umweltbilanz zu verbessern. Emissionen sind zunehmend ein Qualitätsmerkmal in der Logistikkette, und umweltfreundliche Produkte sollen möglichst emissionsarm transportiert werden. Eine wirksame Klimaschutzstrategie beginnt im eigenen Unternehmen mit Maßnahmen zur Vermeidung und Reduktion von Treibhausgasen sowie dem Einsatz erneuerbarer Energien. Darüber hinaus tragen auch Kompensationen zu einem umfassenden Klimaschutz bei. Digitale Zwillinge können zur Bewertung und Optimierung von Routen eingesetzt werden, und Risikomanagement in Bezug auf ESG (Environmental, Social, Governance) gewinnt an Bedeutung.",
      titel: "Carbon Footprint",
      titelS: "Social Responsibility & Green Logistics",
      zIndex: "5",
      textRot: "-90deg",
      img: "img/Trends/Social_Responsibility_&_Green_Logistics/Carbon_Footprint.jpg",
    },
    {
      angle: 12,
      info: "In der Sharing Economy erhalten Verbraucher, ob Privatpersonen oder Organisationen, temporären Zugang zu Ressourcen, Services oder Fähigkeiten, die sonst ungenutzt blieben. Dies ermöglicht eine effizientere, wirtschaftlichere und umweltfreundlichere Nutzung von Ressourcen. Die Logistik spielt eine Schlüsselrolle beim Aufbau dieser neuen Ökonomie des Teilens, da neue digitale Plattformen und Geschäftsmodelle das Prinzip „Teilen statt Besitzen“ fördern. Diese Entwicklung bietet erhebliche Möglichkeiten für die Logistikindustrie, entlang der gesamten Wertschöpfungskette nachhaltige Verbesserungen zu erzielen. Zudem schafft die Sharing Economy neue Geschäftsmöglichkeiten und transformiert den Logistikbetrieb grundlegend. ",
      titel: "Sharing Economy",
      titelS: "Social Responsibility & Green Logistics",
      zIndex: "7",
      textRot: "-90deg",
      img: "img/Trends/Social_Responsibility_&_Green_Logistics/Sharing_Economy.jpg",
    },
    {
      angle: 24,
      info: "Die Circular Economy zielt darauf ab, Ressourcen durch Wiederverwendung, Recycling und innovative Lösungen effizient zu nutzen. Der Einsatz von RFID-Technologie minimiert Behälterschwund, indem er eine präzise Verfolgung und Verwaltung von Behältern ermöglicht. Nachhaltige Verpackungslösungen reduzieren Abfall und Umweltbelastungen. Maschinelles Lernen (ML) optimiert die Packung von Paletten, wodurch der Platz effizienter genutzt und Transportkosten gesenkt werden. Diese Ansätze fördern eine nachhaltigere und ressourcenschonende Wirtschaft.",
      titel: "Circular Economy",
      titelS: "Social Responsibility & Green Logistics",
      zIndex: "7",
      textRot: "-90deg",
      img: "img/Trends/Social_Responsibility_&_Green_Logistics/Circular_Economy.jpg",
    },
    {
      angle: 48,
      info: "Business Intelligence (BI) zielt darauf ab, das Berichtswesen durch die Nutzung von IT-generierten Daten zu standardisieren und zu optimieren. Anstatt diese Analysen direkt in ERP-Systemen durchzuführen, werden sie in einem separaten Data Warehouse (DWH) abgewickelt. Der Low Code-Ansatz ermöglicht es, BI-Prozesse effizienter zu gestalten, indem er die Entwicklung und Integration von Anwendungen erleichtert und beschleunigt. Dadurch können Unternehmen schnell und flexibel auf Daten zugreifen, um fundierte Entscheidungen zu treffen, die das gesamte Unternehmen oder einzelne Geschäftsbereiche betreffen. Mit straffen Prozessen, standardisierten Reports und vollständiger Datenintegration sorgt BI für aktuelle, verlässliche und nachvollziehbare Daten, was die Transparenz und Steuerbarkeit aller Geschäftsprozesse erheblich verbessert. ",
      titel: "Business Intelligence",
      titelS: "Resilienz",
      zIndex: "1",
      textRot: "-90deg",
      img: "img/Trends/Resilienz/Business-Intelligence.jpg",
    },
    {
      angle: 60,
      info: "Mit dem Fortschritt der Digitalisierung werden Ladungsträger und Transportverpackungen zunehmend intelligenter. Sie entwickeln sich von einfachen Transportbehältern zu cyber-physischen Objekten, die mit übergeordneten IT-Systemen kommunizieren. An Kisten oder Paletten angebrachte Sensoren erfassen Daten wie Temperatur, Feuchtigkeit, Erschütterungen, Standort und entnommene Produktmengen und übermitteln diese in Echtzeit an Anwendungen auf Computern, Tablets oder Smartphones. RFID- und NFC-Chips gewährleisten einen effektiven Schutz vor Fälschung und Diebstahl. Diese intelligenten Container und Paletten verbessern die Transparenz und Effizienz in der Lieferkette erheblich, indem sie eine präzise Überwachung und Steuerung ermöglichen.",
      titel: "Intelligent Goods",
      titelS: "Resilienz",
      zIndex: "3",
      textRot: "-90deg",
      img: "img/Trends/Resilienz/Intelligent_Container_Pallets.jpg",
    },
    {
      angle: 72,
      info: "In der modernen Wirtschaft ist Transparenz entlang der Lieferketten entscheidend. Unternehmen müssen Herkunft, Qualität und Nachhaltigkeit ihrer Produkte offenlegen, um Vertrauen bei Verbrauchern und Regierungen zu gewinnen. Supply Chain Visibility bedeutet nicht nur die Verfolgung von Produkten, sondern auch den effektiven Informationsaustausch zwischen Partnern zur Risikominimierung und verbesserten Planung. Diese Entwicklung bietet Unternehmen nicht nur Schutz vor neuen Bedrohungen, sondern auch strategische Chancen zur Stärkung ihrer Marktstellung in einer globalisierten Welt. Der Schwerpunkt liegt auf den Track-and-Trace-Bedingungen, prädiktiven Prognosen, Nachfragedaten sowie einer verbesserten Übersicht über vor- und nachgelagerte Geschäftspartner.",
      titel: "Supply Chain Visibility",
      titelS: "Resilienz",
      zIndex: "5",
      textRot: "-90deg",
      img: "img/Trends/Resilienz/supply_chain_visibility.jpg",
    },
    {
      angle: 84,
      info: "Predictive Analytics nutzt historische und aktuelle Daten, um zukünftige Szenarien vorherzusagen und Handlungsempfehlungen zu geben. Diese Software basiert auf quantitativen und qualitativen Daten sowie fortschrittlichen Analyseverfahren, um den wahrscheinlichen zukünftigen Zustand eines Systems, wie z.B. Fabriken, Lager oder Lieferketten, zu simulieren. Das Ziel ist beispielsweise die effiziente Nutzung von Ressourcen wie Personal. Zukünftig wird Predictive Analytics auch verstärkt zur Vorhersage menschlichen Verhaltens genutzt, um automatisierte Entscheidungsprozesse vorzubereiten und zu unterstützen",
      titel: "Predictive Analytics",
      titelS: "Resilienz",
      zIndex: "7",
      textRot: "-90deg",
      img: "img/Trends/Resilienz/predictive_analytics.jpg",
    },
    {
      angle: 96,
      info: "Die Diversifizierung der Lieferketten umfasst die strategische Neuausrichtung, um das Netzwerk der Lieferanten zu erweitern und sowohl die Fertigungs- als auch die Vertriebskapazitäten zu stärken. Dieser Trend ist darauf ausgerichtet, die Belastbarkeit, Agilität, Reaktionsfähigkeit und Wettbewerbsfähigkeit eines Unternehmens zu erhöhen. Durch die Erweiterung des Lieferantenökosystems können Risiken diversifiziert und Engpässe minimiert werden, was essentiell ist für eine resiliente Lieferkette. Professionell gesteuerte Diversifizierungsstrategien ermöglichen es Unternehmen, flexibler auf Marktveränderungen zu reagieren und ihre globalen Lieferketten effektiver zu gestalten, um langfristig erfolgreich zu sein.",
      titel: "Diversified Supply Chain",
      titelS: "Resilienz",
      zIndex: "7",
      textRot: "-90deg",
      img: "img/Trends/Resilienz/Diversifizierung_der_Lieferketten.jpg",
    },
    {
      angle: 120,
      info: "Machine Customers sind nicht-menschliche Wirtschaftsakteure, die eigenständig Waren oder Dienstleistungen gegen Bezahlung beziehen. Typische Beispiele hierfür sind IoT-verbundene Geräte oder Anlagen, die automatisch Bestellungen aufgeben, sowie intelligente Algorithmen für die Lagerhaltung und smarte Assistenten, die Verbrauchern gezielte Angebote unterbreiten. Diese Entwicklung zeigt, wie Technologie autonom Entscheidungen trifft und Transaktionen durchführt, was neue Möglichkeiten für effizientere Geschäftsprozesse und personalisierten Kundenservice eröffnet.",
      titel: "Machine Customers",
      titelS: "Connected Logistics",
      zIndex: "1",
      textRot: "-90deg",
      img: "img/Trends/Connected_Logistics/Machine_Customers.jpg",
    },
    {
      angle: 132,
      info: "Quantum Computing basiert auf den Prinzipien der Quantenmechanik und ermöglicht eine exponentielle Steigerung der Rechenleistung im Vergleich zu herkömmlichen digitalen Computern. Diese Technologie, etwa hundert Millionen Mal schneller, beschleunigt die Datenbank-Suche, ermöglicht komplexe Simulationen und birgt Potenzial zum Knacken heutiger Verschlüsselungstechnologien. Kommerzielles Quantencomputing kann zukünftig beispielsweise über Quanten-Clouds erreicht werden. Dies könnte eine neue Ära der Hypercomputing-Plattformen einläuten, bereitgestellt von großen IT-Unternehmen als Schlüssel zur Zukunft der Rechenleistung.",
      titel: "Quantum Computing",
      titelS: "Connected Logistics",
      zIndex: "3",
      textRot: "-90deg",
      img: "img/Trends/Connected_Logistics/Quantum_Computing.jpg",
    },
    {
      angle: 144,
      info: "Next-Generation Humanoid Working Robots vereinen sensorische Wahrnehmung mit mobiler Manipulation und dynamischer Fortbewegung, um komplexe Aufgaben auszuführen, die bisher menschlichen Arbeitern vorbehalten waren. Diese Roboter imitieren typischerweise den menschlichen Körper: Sie verfügen über einen kopfseitigen Sensor- und Kamerabereich zur Umgebungswahrnehmung, einen Körper für Energie und Mechanik, Arme mit Greifern zur Manipulation von Gegenständen sowie Beine für dynamische Bewegungen. Diese Technologie verspricht eine neue Ära in der Automatisierung und könnte wesentlich zur Effizienzsteigerung beispielsweise in der Kommissionierung beitragen.",
      titel: "Humanoid Robots ",
      titelS: "Connected Logistics",
      zIndex: "5",
      textRot: "-90deg",
      img: "img/Trends/Connected_Logistics/Next-Generation_Humanoid_Working_Robots.jpg",
    },
    {
      angle: 156,
      info: "Automated Loading & Unloading, bekannt als ATLS (Automatic Truck Loading Systems), automatisiert das Be- und Entladen von LKWs durch Robotertechnik mit minimalem Bedieneraufwand. Dieses System optimiert das Handling von Paletten in Herstellungs- und Verteilungszentren entscheidend. Es minimiert Platzbedarf und Verladezeiten, was direkte Auswirkungen auf den Durchsatz und die Standzeiten der LKW hat. Konventionelle Flurförderzeuge und deren Fahrer werden durch dieses automatisierte Verfahren reduziert, was auch die Sicherheitsrisiken verringert. Die Entwicklung zielt darauf ab, das Palettenhandling an Verladerampen effizienter und sicherer zu gestalten.",
      titel: "Automated Loading",
      titelS: "Connected Logistics",
      zIndex: "7",
      textRot: "-90deg",
      img: "img/Trends/Connected_Logistics/Automated_Loading&Unloading.jpg",
    },
    {
      angle: 168,
      info: "Swarm Intelligence im Kontext des Internet of Things (IoT) nutzt Prinzipien aus der Natur, wie sie bei Insektenkolonien oder Schwärmen zu finden sind, um komplexe Probleme zu lösen. Die automatische Identifikation erfolgt überwiegends mittels RFID oder QR-Codes. Kleinste integrierbare Sensoren oder Machine-Sensing-Verfahren sorgen dafür, dass in Zukunft nahezu alle physischen Objekte miteinander in Verbindung stehen. Anwendungen reichen von der effizienten Logistik bis zur Überwachung großer Infrastrukturnetzwerke. Mit dem kommenden 5G-Standard wird die Echtzeitkommunikation und -steuerung dieser vernetzten Geräte weiter verbessert. So lassen sich zukünftig mehr als 200 Milliarden Geräte weltweit nicht nur vernetzen, sondern in Echtzeit steuern.",
      titel: "Swarm Intelligence ",
      titelS: "Connected Logistics",
      zIndex: "7",
      textRot: "-90deg",
      img: "img/Trends/Connected_Logistics/Swarm_Intelligence.jpg",
    },
    {
      angle: 192,
      info: "Ein digitaler Zwilling ist wie eine virtuelle Kopie eines physischen Objekts, die sein Verhalten in Echtzeit nachbildet. Durch ständige Updates passt er sich den Veränderungen der realen Welt an und ermöglicht präzise Vorhersagen auf Basis vergangener Daten. Diese Technologie optimiert nicht nur aktuelle Betriebsabläufe, sondern transformiert auch traditionelle Lieferketten, indem sie datengesteuerte Entscheidungen fördert und verbesserte Zusammenarbeit ermöglicht. Auf professioneller Ebene unterstützt der digitale Zwilling optimierte Geschäftsprozesse und die Entwicklung neuer Geschäftsmodelle, während er gleichzeitig zu einem tieferen Verständnis komplexer Systeme beiträgt.",
      titel: "Digital Twin",
      titelS: "Operational Excellence",
      zIndex: "1",
      textRot: "90deg",
      img: "img/Trends/Operational_Excellence/Digital_Twin.jpg",
    },
    {
      angle: 204,
      info: "Bei Pick-by-X Systemen werden verschiedene manuelle (wie Pick-by-Voice, -Vision, -Light) und vollautomatische (Pick-by-Robot) Methoden eingesetzt, um Mitarbeiter intuitiv durch den Kommissionierprozess zu führen oder diesen durch Roboter ausführen zu lassen. Die Wahl der Methode hängt von Lagerstruktur, Branche und Temperaturbereich ab und bietet entsprechend unterschiedliche Vorteile. Häufig werden die Systeme parallel eingesetzt, um den spezifischen Anforderungen gerecht zu werden und Effizienzsteigerungen zu erzielen, indem sie die Kommissioniergeschwindigkeit und - genauigkeit verbessern.",
      titel: "Pick-by-X",
      titelS: "Operational Excellence",
      zIndex: "3",
      textRot: "90deg",
      img: "img/Trends/Operational_Excellence/Pick-by-X.jpg",
    },
    {
      angle: 216,
      info: "Unbemannte Luftfahrzeuge (Drohnen) haben sich in den letzten zehn Jahren von einem ambitionierten Konzept zu einem Vorreiter der Logistikbranche entwickelt. Sie sind kleine, autonome Roboter, die entweder ferngesteuert oder autonom fliegen können. Trotz der Erwartungen und Zweifel, die sie wecken, bieten Drohnen das Potenzial, Gegenstände schnell zu transportieren, Lagerbestände zu überprüfen und schwer zugängliche Bereiche zu erkunden. Aktuell sind jedoch ihre Tragfähigkeit, Reichweite und Akkulaufzeit begrenzt. Wenn sich die Technologie weiterentwickelt, könnten Drohnen die Lieferkettenprozesse revolutionieren und ein neues Zeitalter der Logistik einläuten.",
      titel: "Unmanned Vehicles",
      titelS: "Operational Excellence",
      zIndex: "5",
      textRot: "90deg",
      img: "img/Trends/Operational_Excellence/Unmanned_Aerial_Vehicles.jpg",
    },
    {
      angle: 228,
      info: "Autonome Fahrzeuge und Lastwagen werden in den kommenden Jahren die Mobilität revolutionieren. Ausgestattet mit fortschrittlichen Radar-, Lidar- und Kamerasystemen erfassen sie ihre Umgebung präziser als menschliche Fahrer. Diese Technologien stärken auch autonome Drohnen und könnten ihren wirtschaftlichen Durchbruch ermöglichen. Künstliche Intelligenz spielt hierbei eine entscheidende Rolle, indem sie den Fahrzeugen durch ein umfangreiches Training basierend auf Bildmaterialdaten, die nötige Entscheidungsfähigkeit verleiht. Das Ziel ist, Maschinen eine eigene Vorstellungskraft zu geben, um auf unvorhergesehene Ereignisse reagieren zu können. Letztlich müssen autonome Fahrzeuge und Flugzeuge ihre Überlegenheit in jeder Hinsicht gegenüber menschlichen Fahrern beweisen, um gesellschaftlich akzeptiert zu werden.",
      titel: "Autonomous Driving",
      titelS: "Operational Excellence",
      zIndex: "7",
      textRot: "90deg",
      img: "img/Trends/Operational_Excellence/Autonomous_Driving.jpg",
    },
    {
      angle: 240,
      info: "Digital-Marketplace Plattformen koordinieren Angebot und Nachfrage von Logistikdienstleistungen über Plattformen, was zu niedrigeren Kosten und höherer Anlagenauslastung führt. Die Datenaggregation diverser vernetzter Sensoren im Lager und an den Verkehrsträgern minimiert Ineffizienzen in aktuellen Lieferketten und ermöglicht eine intelligente Logistikinfrastruktur. Diese Entwicklung gleicht einem biologischen Nervensystem, das den Materialfluss intelligent steigert und Erfahrungen für optimierte Produkte und Dienstleistungen zurückführt.",
      titel: "Digital Marketplace",
      titelS: "Operational Excellence",
      zIndex: "7",
      textRot: "90deg",
      img: "img/Trends/Operational_Excellence/Digital_Marketplace_Platform.jpg",
    },
    {
      angle: 264,
      info: "Die Blockchain-Technologie bietet eine sichere Alternative zu zentralisierten Datenbanksystemen, indem sie Transaktionen wie Warenbewegungen entlang einer Lieferkette in verschlüsselten Blöcken speichert. Diese dezentrale Struktur macht sie manipulationssicher, da mehrere Teilnehmer die Blöcke verifizieren. Das Vertrauen in die Technologie reduziert die Notwendigkeit für Intermediäre wie Banken oder staatliche Institutionen erheblich. Besonders bedeutend sind Smart Contracts, digitale Anwendungen auf der Blockchain, die Vertragsbedingungen abbilden und automatisch Transaktionen auslösen können. In der Logistik können Smart Contracts Zahlungen initiieren und Leasingverträge überwachen, was zu effizienteren und transparenteren Geschäftsprozessen führt.",
      titel: "Blockchain",
      titelS: "Cybersecurity",
      zIndex: "1",
      textRot: "90deg",
      img: "img/Trends/Cybersecurity/Blockchain.jpg",
    },
    {
      angle: 276,
      info: "Der Zero-Trust-Ansatz fordert Unternehmen heraus, traditionelle Sicherheitsmodelle zu überdenken, indem er betont, dass Vertrauen weder innerhalb noch außerhalb von Unternehmensnetzwerken selbstverständlich ist. In einer Zeit, geprägt von zunehmender Geschäftskomplexität und digitaler Transformation, wird Zero Trust zu einem essentiellen Element moderner Sicherheitsstrategien. Durch strikte Zugangskontrollen und kontinuierliche Überwachung können Unternehmen potenzielle Sicherheitsbedrohungen frühzeitig erkennen und abwehren. Dies ermöglicht es, sensible Daten und Netzwerke effektiv zu schützen, während sie gleichzeitig die Flexibilität und Agilität ihrer Geschäftsprozesse bewahren.",
      titel: "Zero-Trust-Ansatz",
      titelS: "Cybersecurity",
      zIndex: "3",
      textRot: "90deg",
      img: "img/Trends/Cybersecurity/Zero-Trust-Ansatz.jpg",
    },
    {
      angle: 288,
      info: "Fuzz-Tests haben sich zu einem bedeutenden Trend in der Test- und Sicherheitslandschaft entwickelt, indem sie automatisiert ungültige oder unerwartete Eingaben in ein System einführen, um potenzielle Softwarefehler und Schwachstellen aufzudecken. Diese Methode wird zunehmend von Unternehmen übernommen, wie Forrester berichtet, wobei 65% der Sicherheitsentscheidungsträger bereits Fuzz-Tests einsetzen und weitere 16% deren Implementierung planen. Technologiegiganten wie Microsoft und Google haben diese Technologie frühzeitig eingesetzt, um ihre Systeme zu testen.",
      titel: "Fuzz-Tests",
      titelS: "Cybersecurity",
      zIndex: "5",
      textRot: "90deg",
      img: "img/Trends/Cybersecurity/Fuzz-Tests.jpg",
    },
    {
      angle: 300,
      info: "Web3 repräsentiert eine neue Ära des Internets, basierend auf Blockchain-Technologie, die Dezentralisierung und eine tokenbasierte Wirtschaft fördert. Im Gegensatz zur zentralisierten Kontrolle durch große Technologieunternehmen wird das Eigentum auf Ersteller und Nutzer verteilt, wobei allen ein gleichberechtigter Zugang gewährt wird. Transaktionen und Zahlungen erfolgen über Kryptowährungen, unabhängig von traditionellen Banken und Zahlungsdienstleistern, was eine neue, berechtigungsfreie Infrastruktur schafft. Diese Entwicklung verspricht eine revolutionäre Umgestaltung der Internetlandschaft, indem sie die Kontrolle über Daten und Transaktionen direkt in die Hände der Nutzer legt und traditionelle Vermittler überflüssig macht.",
      titel: "Web3",
      titelS: "Cybersecurity",
      zIndex: "7",
      textRot: "90deg",
      img: "img/Trends/Cybersecurity/Web3.jpg",
    },
    {
      angle: 312,
      info: "GenAI (Generative Artificial Intelligence) zeigt großes Potenzial, um die Cybersicherheit zu stärken, insbesondere durch innovative Anwendungen wie die Überprüfung von Lieferanten in der Logistik. Diese Technologie verspricht nicht nur Produktivitätssteigerungen und die Schließung von Qualifikationslücken, sondern auch eine verbesserte Sicherheit durch präzisere und automatisierte Prüfungen. Sicherheitsverantwortliche können durch den Einsatz von GenAI effizienter auf potenzielle Bedrohungen reagieren und gleichzeitig die Compliance und Sicherheitsstandards in komplexen Lieferkettenumgebungen erhöhen.",
      titel: "GenAI",
      titelS: "Cybersecurity",
      zIndex: "7",
      textRot: "90deg",
      img: "img/Trends/Cybersecurity/GenAI.jpg",
    },
    {
      angle: 336,
      info: "Die steigende weltweite Gesetzgebung im Bereich der Nachhaltigkeit zwingt Unternehmen, von freiwilligen zu verpflichtenden Maßnahmen überzugehen. Gesetze wie das deutsche Lieferkettensorgfaltspflichtengesetz (LkSG) verlangen präzise Nachhaltigkeitsdaten entlang der gesamten Lieferkette, um Menschenrechte und Umweltstandards zu gewährleisten. Unternehmen müssen diese Daten auf ein Investitionsniveau anheben, um sowohl gesetzliche Anforderungen als auch die Erwartungen der Interessengruppen zu erfüllen und interne Entscheidungen zu unterstützen. Nachhaltige Lieferketten bieten zudem Vorteile wie Rechtskonformität, verbessertes Unternehmensimage, Wettbewerbsvorteile und effektiveres Risikomanagement. Eine end-to-end nachhaltige Lieferkette ist somit unerlässlich für langfristigen wirtschaftlichen Erfolg und gesellschaftliche Verantwortung.",
      titel: "E2E Sustainability",
      titelS: "Social Responsibility & Green Logistics",
      zIndex: "1",
      textRot: "90deg",
      img: "img/Trends/Social_Responsibility_&_Green_Logistics/End-to-end_Sustainable_Supply_Chains.jpg",
    },
    {
      angle: 348,
      info: "Das Smart Grid wird traditionelle Stromnetze ersetzen, die bisher auf die konstante Stromversorgung aus zentralen Kraftwerken ausgerichtet waren. Mit dem Aufstieg der erneuerbaren Energien, wie Wind- und Solarkraft, die dezentral und ungleichmäßig Strom erzeugen, wird eine dynamische Netzsteuerung notwendig. Ehemalige Stromverbraucher werden zu Prosumern, die selbst erzeugte Energie ins Netz einspeisen. Intelligente Netze müssen daher die Erzeugung, den Verbrauch und die Speicherung von Energie in Echtzeit steuern. So könnten beispielsweise Elektroautos als Speicher für Haushaltsstrom dienen, was zur Stabilität des gesamten Systems beiträgt.",
      titel: "Smart Grid",
      titelS: "Social Responsibility & Green Logistics",
      zIndex: "3",
      textRot: "90deg",
      img: "img/Trends/Social_Responsibility_&_Green_Logistics/Smart_Grid.jpg",
    },
  ];

  function createLines() {
    linesData.forEach((line) => {
      const lineElem = document.createElement("div");
      lineElem.classList.add("line");
      lineElem.style.transform = `rotate(${line.angle}deg)`;
      lineElem.style.zIndex = `${line.zIndex}`;
      lineElem.setAttribute("data-titel", line.titel);
      updateLineClass(lineElem, line.angle);

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
        if (window.innerWidth >= 576) {
          radar.style.scale = "1.7";
          radar.style.left = "-60%";
        }

        const targetAngle = 90;
        const additionalRotation =
          targetAngle - ((line.angle + currentRotation) % 360);
        currentRotation += additionalRotation;

        radar.style.transform = `rotate(${currentRotation}deg)`;
        radar.style.transition = "all 0.5s ease";
        popUpTitleS.textContent = line.titelS;
        popUpTitleL.textContent = line.titel;
        popUpText.textContent = line.info;
        popUpImg.setAttribute("src", line.img);

        updateAllLineClasses();
        updateStageClasses();
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
    const stages = document.querySelectorAll(".stage");
    stages.forEach((stage) => {
      stage.classList.remove("colored");
    });

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
    scale = 1;
    updateAllLineClasses();
    updateStageClasses();
  });

  // function updateScale() {
  //   radar.style.transform = `scale(${scale})`;
  //   radar.style.transition = "all 0.5s ease";
  // }

  // zoomIn.addEventListener("click", () => {
  //   scale += 0.2;
  //   updateScale();
  //   if (scale > 1.5) {
  //     zoomIn.style.visibility = "hidden";
  //   } else if (scale > 0.7) {
  //     zoomOut.style.visibility = "visible";
  //   }
  // });

  // zoomOut.addEventListener("click", () => {
  //   scale -= 0.2;
  //   updateScale();
  //   if (scale < 0.7) {
  //     zoomOut.style.visibility = "hidden";
  //   } else if (scale < 1.5) {
  //     zoomIn.style.visibility = "visible";
  //   }
  // });
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
    const growthArea = document.querySelector("#growth_area");
    const growth = document.querySelector("#growth");
    const form = document.querySelector("form");
    const brand = document.querySelector(".brand");
    const slogen = document.querySelector(".slogen");
    const interCards = document.querySelectorAll(".inter_card");
    const interSec = document.querySelector("#interactive_section");
    const radar = document.querySelector(".radar");
    const radarArea = document.querySelector("#radar__area");

    infoSec.style.height = "25vh";
    growthRight.style.width = "40%";
    growthRight.style.float = "right";
    growth.style.justifyContent = "space-around";
    form.style.width = "70vw";
    brand.style.fontSize = "60px";
    slogen.style.fontSize = "20px";
    radar.style.width = "30vw";
    radar.style.height = "30vw";
    growthArea.style.height = "1024px";
    radarArea.style.height = "50vh";
    interSec.style.height = "50vh";
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

  container.addEventListener("mousemove", function (event) {
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const radius = 200;

    container.style.background = `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent, #00000091)`;

    container.addEventListener("mouseleave", function () {
      container.style.background = "";
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
