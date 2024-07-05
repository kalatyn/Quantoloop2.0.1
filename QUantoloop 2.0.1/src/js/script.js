//canvas
const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
const mouse = { x: width / 2, y: height / 2 };
const points = [];
const numPoints = 100;
const pointRadius = 3;
const lineDistance = 150;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, pointRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#202e51";
    ctx.fill();
  }
}

function createPoints() {
  for (let i = 0; i < numPoints; i++) {
    points.push(new Point(Math.random() * width, Math.random() * height));
  }
}

function drawLines() {
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = Math.hypot(
        points[i].x - points[j].x,
        points[i].y - points[j].y
      );
      if (dist < lineDistance) {
        const alpha = 1 - dist / lineDistance;
        ctx.strokeStyle = `rgba(32,46,81, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  points.forEach((point) => {
    point.update();
    point.draw();
  });

  drawLines();
  requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  points.forEach((point) => {
    const dist = Math.hypot(point.x - mouse.x, point.y - mouse.y);
    if (dist < 100) {
      point.vx += (mouse.x - point.x) * 0.001;
      point.vy += (mouse.y - point.y) * 0.001;
    }
  });
});

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

createPoints();
animate();
//end canvas

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
    } else if (bounding.top < triggerHeight) {
      let scrollPosition = triggerHeight - bounding.top;
      let newSize = Math.max(90, 100 - scrollPosition * 0.01);
      container.style.transform = `scale(${newSize / 100})`;
      container.style.borderRadius = scrollPosition / 50 + "px";
    }

    if (window.innerWidth >= 576) {
      if (bounding.top <= triggerHeight && bounding.bottom >= 0) {
        let scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        cards.forEach((card) => {
          let offset = (bounding.top - scrollTop) * 0.3;
          card.style.transform = `translateY(${offset}px)`;
        });
      }
    } else {
      cards.forEach((card) => {
        card.style.transform = "translateY(0px)";
      });
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
      img.setAttribute("src", `img/useCase-${newIndex}.png`);
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

  if (bounding.top <= windowHeight / 2) {
    const scrollPosition = Math.min(((windowHeight / 2 - bounding.top) / (windowHeight / 2)) *2,
      1 
    );

    const newScale1 = 1 - scrollPosition * 0.2;
    const newRotation1 = -10 * scrollPosition;
    const newTranslateX1 = -200 * scrollPosition;
    const newScale2 = 1 - scrollPosition * 0.1;
    const newRotation2 = 10 -10 * scrollPosition ;
    const newTranslateX2 = -450 * scrollPosition;
    const newScale3 = 1;
    const newRotation3 = 10 * scrollPosition;
    const newTranslateX3 = -550 * scrollPosition;
    const newTranslateY3 = 130 * scrollPosition;

    card1.style.transform = `scale3d(${newScale1},${newScale1},${newScale1}) rotate(${newRotation1}deg) translateX(${newTranslateX1}px)`;
    card2.style.transform = `scale3d(${newScale2},${newScale2},${newScale2}) rotate(${newRotation2}deg) translateX(${newTranslateX2}px)`;
    card3.style.transform = `scale3d(${newScale3},${newScale3},${newScale3}) rotate(${newRotation3}deg) translateX(${newTranslateX3}px) translateY(${newTranslateY3}px)`;
  } else {
    card1.style.transform = "scale3d(1,1,1) rotate(0deg) translateX(0)";
    card2.style.transform =
      "rotate(10deg) scale3d(0.9, 0.9, 0.9) translateX(0)";
    card3.style.transform = "scale3d(1,1,1) rotate(0deg) translateX(0)";
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

document.addEventListener("DOMContentLoaded", function () {
  const radar = document.querySelector(".radar");
  const popUp = document.querySelector(".popup");
  const closePopup = document.querySelector(".close-popup");
  const popUpTitleS = document.querySelector(".popup__titleS");
  const popUpTitleL = document.querySelector(".popup__titleL");
  const popUpText = document.querySelector(".popup__text");
  const navbar = document.querySelector("#navbar");

  let selectedLine = null;
  let currentRotation = 0;

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
        radar.style.scale = "1.7";
        radar.style.left = "-50%";

        const targetAngle = 90;
        const additionalRotation =
          targetAngle - ((line.angle + currentRotation) % 360);
        currentRotation += additionalRotation;

        radar.style.transform = `rotate(${currentRotation}deg)`;
        radar.style.transition = "all 0.5s ease";
        popUpTitleS.textContent = line.titel;
        popUpTitleL.textContent = line.titelS;
        popUpText.textContent = line.info;

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
    updateAllLineClasses();
    updateStageClasses();
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
