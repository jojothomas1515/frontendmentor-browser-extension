const cardContainer = document.querySelector(".card-container");
const linkAll = document.querySelector("#filter-all");
const linkActive = document.querySelector("#filter-active");
const linkInactive = document.querySelector("#filter-inactive");
let Ext;

fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    Ext = data;
    filteringExtension();
  });

function loadExt(data, index) {
  cardContainer.innerHTML += `<div class="card">
            <div class="card-content-con">
                <img alt="Dev Lens extension" src="${data.logo}">
                <div class="content">
                    <h5>${data.name}</h5>
                    <p>${data.description}</p>
                </div>
            </div>
            <div class="controls">
                <button class="remove-ext-button" data-index=${index}>Remove</button>
                <div class="active-switch ${
                  data.isActive ? "active" : ""
                }" data-isActive=${data.isActive} data-index=${index}>
                        <span class="slider"></span>
                </div>
            </div>
        </div>`;
}

function flipSwitch(e) {
  const isActive = e.target.classList.toggle("active");
  e.target.toggleAttribute("data-isActive");
  const index = e.target.getAttribute("data-index");
  Ext[index].isActive = isActive;
  filteringExtension();
}

function removeExt(e) {
  const index = e.target.getAttribute("data-index");
  Ext.splice(index, 1);
  filteringExtension();
}

function toggleScheme() {
  let light = document.querySelector(".light");
  let dark = document.querySelector(".dark");
  let cScheme = document.documentElement.style.colorScheme;
  document.documentElement.style.colorScheme =
    cScheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", document.documentElement.style.colorScheme);

  light.classList.toggle("active");
  dark.classList.toggle("active");
}

// Event Listeners

document.addEventListener("DOMContentLoaded", (e) => {
  const cScheme = localStorage.getItem("theme");
  document.documentElement.style.colorScheme =
    cScheme === "dark" ? "dark" : "light";
  filtering();
});

onhashchange = (h) => {
  filtering();
  filteringExtension();
};

// Todo: filter mechanism

function filteringExtension() {
  const hash = new URL(window.location.href).hash;
  cardContainer.innerHTML = "";

  {
    let index = 0;
    for (d of Ext) {
      if (hash === "#active") {
        if (d.isActive) loadExt(d, index);
      } else if (hash === "#inactive") {
        if (!d.isActive) loadExt(d, index);
      } else loadExt(d, index);
      index++;
    }
    const switches = document.querySelectorAll(".active-switch");
    const removalButtons = document.querySelectorAll(".remove-ext-button");
    removalButtons.forEach((rm) => {
      rm.addEventListener("click", (e) => {
        removeExt(e);
      });
    });
    switches.forEach((s) => {
      s.addEventListener("click", (e) => {
        flipSwitch(e);
      });
    });
  }
}

function filtering() {
  const hash = new URL(window.location.href).hash;
  hash === ""
    ? linkAll.classList.add("active")
    : linkAll.classList.remove("active");
  hash === "#active"
    ? linkActive.classList.add("active")
    : linkActive.classList.remove("active");
  hash === "#inactive"
    ? linkInactive.classList.add("active")
    : linkInactive.classList.remove("active");
}
