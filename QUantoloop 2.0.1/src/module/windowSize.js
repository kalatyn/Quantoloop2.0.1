export function initInfoWindow() {
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
}
