const cardContainer = document.querySelector('.card-container');
const linkAll = document.querySelector("#filter-all");
const linkActive = document.querySelector("#filter-active");
const linkInactive = document.querySelector("#filter-inactive");

fetch("./data.json")
    .then(res => res.json())
    .then(data => {
        let index = 0;
        for (d of data) {
            loadExt(d);
        }
        const switches = document.querySelectorAll('.active-switch');
        switches.forEach((s) => {

            s.addEventListener("click", (e) => {
                flipSwitch(e)
            })
        })

    })




function loadExt(data) {
    cardContainer.innerHTML +=
        `<div class="card">
            <div class="card-content-con">
                <img alt="Dev Lens extension" src="${data.logo}">
                <div class="content">
                    <h5>${data.name}</h5>
                    <p>${data.description}</p>
                </div>
            </div>
            <div class="controls">
                <button onclick="removeSelf">Remove</button>
                <div class="active-switch ${data.isActive ? 'active' : ''}" data-isActive=${data.isActive}>
                        <span class="slider"></span>
                </div>
            </div>
        </div>`
}


function flipSwitch(e) {
    e.target.classList.toggle('active');
    e.target.toggleAttribute("data-isActive");

}

function toggleScheme() {
    let light = document.querySelector(".light");
    let dark = document.querySelector(".dark");
    let cScheme = document.documentElement.style.colorScheme;
    document.documentElement.style.colorScheme = cScheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme",
        document.documentElement.style.colorScheme
    )

    light.classList.toggle("active");
    dark.classList.toggle("active");
}

// Event Listeners

document.addEventListener("DOMContentLoaded", e => {
    const cScheme = localStorage.getItem('theme');
    document.documentElement.style.colorScheme = cScheme === "dark" ? "dark" : "light";
    filtering();
});

onhashchange = (h) => {
    console.log(h);
    filtering();
}

// Todo: filter mechanism



function filtering() {
    const hash = new URL(window.location.href).hash
    hash === "" ? linkAll.classList.add("active") : linkAll.classList.remove("active");
    hash === "#active" ? linkActive.classList.add("active") : linkActive.classList.remove("active");
    hash === "#inactive" ? linkInactive.classList.add("active") : linkInactive.classList.remove("active");
}
