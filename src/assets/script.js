function openNav() {
    const nav = document.getElementById("js-nav");
    nav.classList.add("nav__slideout--open");
}

function closeNav() {
    const nav = document.getElementById("js-nav");
    nav.classList.add("nav__slideout--deleting");
    setTimeout(() => {
        nav.classList.remove("nav__slideout--open");
        nav.classList.remove("nav__slideout--deleting");
    }, 350);
}

(function () {
    const navbtn = document.getElementById("js-navmobile-btn");
    navbtn.onclick = openNav;

    const closebtn = document.getElementById("js-navclosebtn");
    closebtn.onclick = closeNav;
})();
