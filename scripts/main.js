const cardContainer = document.querySelector('.card-container');

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

document.addEventListener("DOMContentLoaded", e => {
    const cScheme = localStorage.getItem('theme');
    document.documentElement.style.colorScheme = cScheme === "dark" ? "dark" : "light";
});

// Todo: filter mechanism
