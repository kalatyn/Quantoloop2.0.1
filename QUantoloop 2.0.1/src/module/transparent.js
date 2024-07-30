export function initTransparent() {
  const container = document.querySelector(".interactive_section");
  const cards = document.querySelectorAll(".inter_card");
  let viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  let bounding = container.getBoundingClientRect();
  const triggerHeight = viewportHeight / 2;
  let containerHeight = bounding.height;

  // Определение границ для масштабирования
  const lowerThreshold = containerHeight * 0.2;
  const upperThreshold = containerHeight * 0.6;

  if (window.innerWidth >= 576) {
    if (bounding.top <= triggerHeight && bounding.bottom >= 0) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
}
