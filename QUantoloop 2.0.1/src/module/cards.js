import { initInfoWindow } from "./windowSize.js";

export function initCards() {
  for (let i = 1; i <= 5; i++) {
    const moreAbout = document.querySelectorAll(`.more__about${i}`);
    const descriptions = document.querySelectorAll(`#card__disc${i}`);
    const exits = document.querySelectorAll(`.exit__button${i}`);
    const card = document.querySelectorAll(`#card${i}`);

    card.forEach((element) => {
      element.addEventListener("click", () => {
        descriptions.forEach((desc) => {
          desc.classList.toggle("show");
          initInfoWindow();
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
}
