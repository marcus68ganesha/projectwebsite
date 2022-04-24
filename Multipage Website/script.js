var home = document.querySelector("#home");
var spotlight = document.querySelector("#spotlight");
var gallery = document.querySelector("#gallery");

var visiblePage = home;

function showHome() {
    if (visiblePage != home) {
        visiblePage.style.display = "none";
        home.style.display = "block";
        visiblePage = home;
    }
}

function showSpotlight() {
    if (visiblePage != spotlight) {
        visiblePage.style.display = "none";
        spotlight.style.display = "block";
        visiblePage = spotlight;
    }
}

function showGallery() {
    if (visiblePage != gallery) {
        visiblePage.style.display = "none";
        gallery.style.display = "block";
        visiblePage = gallery;
    }
}