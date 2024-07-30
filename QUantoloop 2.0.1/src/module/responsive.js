export function initResponsive() {
  const infoSec = document.querySelector("#info__section");
  const growthRight = document.querySelector(".growth_right");
  const growthLeft = document.querySelector(".growth_left");
  const growthArea = document.querySelector("#growth_area");
  const growth = document.querySelector("#growth");
  const growthItems = document.querySelectorAll(".growth_item");
  const growthTitle = document.querySelector(".growth_title");
  const itemPics = document.querySelectorAll(".item_bottom_img");
  const cardSection = document.querySelector("#cardfield");
  const form = document.querySelector("form");
  const brand = document.querySelector(".brand");
  const slogen = document.querySelector(".slogen");
  const interCards = document.querySelectorAll(".inter_card");
  const interSec = document.querySelector("#interactive_section");
  const radar = document.querySelector(".radar");
  const radarArea = document.querySelector("#radar__area");
  const contactLinks = document.querySelectorAll(".jetzt_starten");
  const contactArea = document.querySelector("#contact_us");
  const interSection2 = document.querySelector(".interactive_section2");
  const interSection2Left = document.querySelector(
    ".interactive_container_left"
  );

  // infoSec.style.height = "25vh";
  growthRight.style.display = "none";
  growthLeft.style.width = "100%";
  growth.style.justifyContent = "space-around";
  // growthItems.forEach((item) => {
  //   item.style.width = "100%";
  // });
  itemPics.forEach((pic) => {
    pic.style.display = "block";
    pic.style.width = "500px";
    pic.style.height = "300px";
    pic.style.margin = "0 auto 20px auto";
  });
  cardSection.style.height = "60vh";
  form.style.width = "70vw";
  brand.style.fontSize = "60px";
  brand.style.marginBottom = "30px";
  slogen.style.fontSize = "20px";
  radar.style.width = "30vw";
  radar.style.height = "30vw";
  growthArea.style.height = "1024px";
  radarArea.style.height = "50vh";
  interSec.style.height = "50vh";
  contactLinks.forEach((link) => {
    link.style.fontSize = "0.7rem";
    link.style.position = "relative";
    link.style.left = "0";
    link.style.top = "20px";
  });
  interSection2.style.height = "55vh";
  interSection2Left.style.justifyContent = "space-around";
  contactArea.style.marginTop = "150px";
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
