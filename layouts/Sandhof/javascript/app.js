function initApp() {

    selt.modules.update();

};


if (document.readyState === "loading") {  // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", initApp);
} else {  // `DOMContentLoaded` has already fired
    initApp();
}