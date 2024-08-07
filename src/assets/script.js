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

    initCarousel();
})();

/**
 * Embla Carousel
 * https://www.embla-carousel.com/
 */
function initCarousel() {
    const mainCarousel = document.getElementById("js-embla-carousel-main");
    const thumbCarousel = document.getElementById("js-embla-carousel-thumbs");
    const emblaApiMain = EmblaCarousel(mainCarousel, {
        startIndex: 2,
    });
    const emblaApiThumb = EmblaCarousel(thumbCarousel, {
        containScroll: "keepSnaps",
        dragFree: true,
        startIndex: 2,
    });
    carouselClickHandlers(emblaApiMain, emblaApiThumb);
    carouselThumbsBtnsActive(emblaApiMain, emblaApiThumb);
}

function carouselClickHandlers(emblaApiMain, emblaApiThumb) {
    const slidesThumbs = emblaApiThumb.slideNodes();

    const scrollToIndex = slidesThumbs.map(
        (_, index) => () => emblaApiMain.scrollTo(index)
    );

    slidesThumbs.forEach((slideNode, index) => {
        slideNode.addEventListener("click", scrollToIndex[index], false);
    });

    return () => {
        slidesThumbs.forEach((slideNode, index) => {
            slideNode.removeEventListener("click", scrollToIndex[index], false);
        });
    };
}

function carouselThumbsBtnsActive(emblaApiMain, emblaApiThumb) {
    const slidesThumbs = emblaApiThumb.slideNodes();

    const toggleThumbBtnsState = () => {
        emblaApiThumb.scrollTo(emblaApiMain.selectedScrollSnap());
        const previous = emblaApiMain.previousScrollSnap();
        const selected = emblaApiMain.selectedScrollSnap();
        slidesThumbs[previous].classList.remove(
            "servicesthumbs__item--active"
        );
        slidesThumbs[selected].classList.add("servicesthumbs__item--active");
    };

    emblaApiMain.on("select", toggleThumbBtnsState);
    emblaApiThumb.on("init", toggleThumbBtnsState);

    return () => {
        const selected = emblaApiMain.selectedScrollSnap();
        slidesThumbs[selected].classList.remove(
            "servicesthumbs__item--active"
        );
    };
}
