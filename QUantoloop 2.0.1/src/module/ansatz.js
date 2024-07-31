import { initInfoWindow } from "./windowSize.js";

export function initUnserAnsatz() {
  let currentOpenIndex = 1;
  const growthItems = document.querySelectorAll(".growth_item");
  const itemTops = document.querySelectorAll(".item_top");
  const itemBottoms = document.querySelectorAll(".item_bottom");

  // Устанавливаем начальную высоту элементов growthItems
  growthItems.forEach((item, index) => {
    if (itemTops[index] && itemBottoms[index]) {
      const totalHeight = itemTops[index].offsetHeight;

      item.style.height = totalHeight + "px";
    }
  });

  function updateState(newIndex) {
    const currentBtn = document.querySelector(`#open${currentOpenIndex}`);
    const currentItem = document.querySelector(
      `#growth_item${currentOpenIndex}`
    );
    if (currentBtn && currentItem) {
      currentBtn.style.transform = "scale(1)";
      currentItem.classList.remove("growth_item_full");
      currentItem.style.height =
        itemTops[currentOpenIndex - 1].offsetHeight + "px"; // Устанавливаем высоту только для item_top
    }

    const newBtn = document.querySelector(`#open${newIndex}`);
    const newItem = document.querySelector(`#growth_item${newIndex}`);
    if (newBtn && newItem) {
      newBtn.style.transform = "scale(-1)";
      newItem.classList.add("growth_item_full");
      newItem.style.height =
        itemTops[newIndex - 1].offsetHeight +
        itemBottoms[newIndex - 1].offsetHeight +
        "px"; // Устанавливаем высоту для item_top и item_bottom
    }

    const img = document.querySelector("#growth_img");
    if (img) {
      img.style.opacity = 0;
      setTimeout(() => {
        img.setAttribute("src", `img/Unser_Ansatz/${newIndex}.jpg`);
        img.style.opacity = 1;
      }, 100);
    }

    currentOpenIndex = newIndex;
  }

  for (let i = 1; i <= 5; i++) {
    const btn = document.querySelector(`#top${i}`);
    if (btn) {
      btn.addEventListener("click", function () {
        if (i !== currentOpenIndex) {
          updateState(i);
        }
      });
    }
  }

  updateState(currentOpenIndex);
}
