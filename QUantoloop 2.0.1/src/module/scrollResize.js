// scrollEffects.js

function handleScrollGrowth() {
  let element = document.querySelector("#growth");
  if (element) {
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
  }
}

function handleScrollRadarBorder() {
  let element = document.querySelector("#radar_border");
  if (element) {
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
  }
}

function handleScrollInteractiveContainer() {
  let element = document.querySelector(".interactive_container");
  if (element) {
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
  }
}

export {
  handleScrollGrowth,
  handleScrollRadarBorder,
  handleScrollInteractiveContainer,
};
