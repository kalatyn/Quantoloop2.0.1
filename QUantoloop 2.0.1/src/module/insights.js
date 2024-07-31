export function initInsights() {
  const element = document.querySelector(".interactive_container");
  const card1 = document.querySelector("#icr_card1");
  const card2 = document.querySelector("#icr_card2");
  const card3 = document.querySelector("#icr_card3");
  let bounding = element.getBoundingClientRect();
  let windowHeight = window.innerHeight;

  // Рассчитаем начальную позицию скролла относительно viewport
  let startScrollPosition = bounding.top - windowHeight / 2;
  const scrollPosition = Math.min(
    ((windowHeight / 2 - bounding.top) / (windowHeight / 2)) * 1,
    1
  );
  // Изменим формулу расчета позиции скролла для более плавного перехода
  if (bounding.top <= windowHeight / 2 && window.innerWidth > 767) {
    const newScale1 = 1 - scrollPosition * 0.2;
    const newRotation1 = -10 * scrollPosition;
    const newTranslateX1 = -10 * scrollPosition; // in vw
    const newScale2 = 1 - scrollPosition * 0.1;
    const newRotation2 = 10 - 10 * scrollPosition;
    const newTranslateX2 = -20 * scrollPosition; // in vw
    const newScale3 = 1;
    const newRotation3 = 10 * scrollPosition;
    const newTranslateX3 = -26 * scrollPosition; // in vw
    const newTranslateY3 = 9 * scrollPosition; // in vh

    card1.style.transform = `scale3d(${newScale1}, ${newScale1}, ${newScale1}) rotate(${newRotation1}deg) translateX(${newTranslateX1}vw)`;
    card2.style.transform = `scale3d(${newScale2}, ${newScale2}, ${newScale2}) rotate(${newRotation2}deg) translateX(${newTranslateX2}vw)`;
    card3.style.transform = `scale3d(${newScale3}, ${newScale3}, ${newScale3}) rotate(${newRotation3}deg) translateX(${newTranslateX3}vw) translateY(${newTranslateY3}vh)`;
  } else {
    card1.style.transform = "scale3d(1, 1, 1) rotate(0deg) translateX(0)";
    card2.style.transform =
      "rotate(10deg) scale3d(0.9, 0.9, 0.9) translateX(0)";
    card3.style.transform = "scale3d(1, 1, 1) rotate(0deg) translateX(0)";
  }
  if (window.innerHeight > window.innerWidth && window.innerWidth > 767) {
    const scrollPosition = Math.min(
      ((windowHeight / 2 - bounding.top) / (windowHeight / 2)) * 1,
      1
    );
    const newScale1 = 1 - scrollPosition * 0.02;
    const newRotation1 = -10 * scrollPosition;
    const newTranslateX1 = -22 * scrollPosition; // in vw
    const newScale2 = 1 - scrollPosition * 0.01;
    const newRotation2 = 10 - 10 * scrollPosition;
    const newTranslateX2 = -30 * scrollPosition; // in vw
    // const newTranslateY2 = 5 * scrollPosition;
    const newScale3 = 1.1;
    const newRotation3 = 10 * scrollPosition;
    const newTranslateX3 = -32 * scrollPosition; // in vw
    const newTranslateY3 = 6 * scrollPosition; // in vh

    card1.style.transform = `scale3d(${newScale1}, ${newScale1}, ${newScale1}) rotate(${newRotation1}deg) translateX(${newTranslateX1}vw)`;
    card2.style.transform = `scale3d(${newScale2}, ${newScale2}, ${newScale2}) rotate(${newRotation2}deg) translateX(${newTranslateX2}vw )`;
    card3.style.transform = `scale3d(${newScale3}, ${newScale3}, ${newScale3}) rotate(${newRotation3}deg) translateX(${newTranslateX3}vw) translateY(${newTranslateY3}vh)`;
  }
}
