export function drawRadar() {
  const radar = document.querySelector(".radar");
  const popUp = document.querySelector(".popup");
  const closePopup = document.querySelector(".close-popup");
  const popUpTitleS = document.querySelector(".popup__titleS");
  const popUpTitleL = document.querySelector(".popup__titleL");
  const popUpText = document.querySelector(".popup__text");
  const popUpImg = document.querySelector(".popup__img");
  const navbar = document.querySelector("#navbar");
  const footerPopup = document.querySelector(".footer_title_popup");
  let scale = 1;
  let selectedLine = null;
  let currentRotation = 0;
  let linesData = [];

  async function loadJson() {
    try {
      const response = await fetch("/data/linedata.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      linesData = await response.json();

      createLines();
    } catch (error) {
      console.error("Loading JSON failed", error);
    }
  }

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
        document.body.classList.add("scroll-lock");
        if (selectedLine) {
          selectedLine.classList.remove("selected");
          footerPopup.classList.remove("footer_popup_visible");
        }

        lineElem.classList.add("selected");
        selectedLine = lineElem;
        if (window.innerWidth >= 576) {
          radar.style.scale = "1.7";
          radar.style.left = "-60%";
        }

        const targetAngle = 90;
        let additionalRotation =
          targetAngle - ((line.angle + currentRotation) % 360);
        if (additionalRotation < 0) {
          additionalRotation += 360;
        }
        currentRotation += additionalRotation;

        radar.style.transform = `rotate(${currentRotation}deg)`;
        radar.style.transition = "all 0.5s ease";
        popUpTitleS.textContent = line.titelS;
        popUpTitleL.textContent = line.titel;
        popUpText.textContent = line.info;
        popUpImg.setAttribute("src", line.img);
        popUpImg.setAttribute("alt", line.titelS);

        updateAllLineClasses();
        updateStageClasses();
      });
      radar.appendChild(lineElem);
    });
  }

  function updateLineClass(lineElem, angle) {
    const adjustedAngle = (angle + currentRotation) % 360;
    if (adjustedAngle > 180 && adjustedAngle < 360) {
      lineElem.classList.add("leftLine");
      lineElem.style.setProperty("--text-align", "end");
    } else {
      lineElem.classList.remove("leftLine");
      lineElem.style.setProperty("--text-align", "start");
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

  closePopup.addEventListener("click", () => {
    if (selectedLine) {
      selectedLine.classList.remove("selected");
    }
    popUp.classList.remove("popup-show");
    footerPopup.classList.remove("footer_popup_visible");
    document.body.classList.remove("scroll-lock");
    radar.style.scale = "1";
    radar.style.left = "0";
    radar.style.transition = "all 0.5s ease";
    scale = 1;
    updateAllLineClasses();
    updateStageClasses();
  });

  loadJson();
}
