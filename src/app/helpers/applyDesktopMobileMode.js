const DESKTOP_CANVAS_WIDTH = 1024;
// Keep the compressed desktop-like mode for phones, not tablets like iPad mini.
const MOBILE_BREAKPOINT = 767;

let resizeObserver = null;
let observedCanvas = null;
let resizeHandlerAttached = false;

function clearDesktopMobileMode(page, canvas) {
    document.body.classList.remove("body--desktop-mobile-home");
    page.classList.remove("page--desktop-mobile-active");
    page.style.height = "";
    page.style.overflow = "";

    canvas.style.width = "";
    canvas.style.transform = "";
    canvas.style.transformOrigin = "";
}

function syncDesktopMobileMode() {
    const page = document.querySelector(".page--desktop-mobile");
    const canvas = page?.querySelector(".page__canvas");

    if (!page || !canvas) return;

    if (window.innerWidth > MOBILE_BREAKPOINT) {
        clearDesktopMobileMode(page, canvas);
        return;
    }

    document.body.classList.add("body--desktop-mobile-home");
    page.classList.add("page--desktop-mobile-active");
    canvas.style.width = `${DESKTOP_CANVAS_WIDTH}px`;
    canvas.style.transform = "";
    canvas.style.transformOrigin = "top left";

    const scale = Math.min(page.clientWidth / DESKTOP_CANVAS_WIDTH, 1);
    const height = canvas.scrollHeight * scale;

    page.style.height = `${height}px`;
    page.style.overflow = "hidden";

    canvas.style.transform = `scale(${scale})`;
}

function disconnectObserver() {
    if (!resizeObserver) return;

    resizeObserver.disconnect();
    resizeObserver = null;
    observedCanvas = null;
}

export default function applyDesktopMobileMode() {
    const page = document.querySelector(".page--desktop-mobile");
    const canvas = page?.querySelector(".page__canvas");

    if (!page || !canvas) {
        document.body.classList.remove("body--desktop-mobile-home");
        disconnectObserver();
        return;
    }

    if (observedCanvas !== canvas) {
        disconnectObserver();

        resizeObserver = new ResizeObserver(syncDesktopMobileMode);
        resizeObserver.observe(canvas);
        observedCanvas = canvas;
    }

    if (!resizeHandlerAttached) {
        window.addEventListener("resize", syncDesktopMobileMode);
        resizeHandlerAttached = true;
    }

    syncDesktopMobileMode();
}
