export function initLaptop() {
  let laptop_area = document.querySelector(".laptop_area");
  let laptop = document.querySelector(".laptop");
  let laptop_area_top = laptop_area.getBoundingClientRect().top;
  let laptop_info = document.querySelector(".laptop_info");
  if (laptop_area_top < window.innerHeight / 3) {
    let scale =
      1 -
      (window.innerHeight / 2 - laptop_area_top) / (window.innerHeight / 0.3);
    scale = Math.max(scale, 0.3);

    const inverseScale = 1 + (1.2 - scale / 0.6);

    laptop.style.transform = `scale(${scale})`;
    // laptop_info.style.transform = `scale(${inverseScale})`;
  }
}
