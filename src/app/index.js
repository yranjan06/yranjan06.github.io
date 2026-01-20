import Layout from "./views/Layout";
import routes from "./consts/routes";
import startTitleAnimation from "./helpers/startTitleAnimation";
import localeHandler from "./helpers/localeHandler";
import loadCssFile from "./helpers/loadCssFile";
import replacePath from "./helpers/replacePath";
import lazyLoader from "./helpers/lazyLoading";
import initGiscus from "./helpers/initGiscus";

import "styles/styles.sass";

const rootId = "root";
async function render() {
    const path = routes[window.location.pathname] ?? routes["/404"];

    loadCssFile(path.name);
    startTitleAnimation(path.name);

    document.getElementById(rootId).innerHTML = await Layout(
        (await import(`./views/${path.element}`)).default,
        path
    );

    // Reinitialize lazy loading and giscus after content change
    setTimeout(() => {
        lazyLoader.refresh();
        initGiscus();
    }, 100);
}

replacePath()
    .then(render)
    .then(localeHandler)
    .then(() => {
        setTimeout(lazyLoader.observeAll, 100);
        window.addEventListener('popstate', () => render().then(() => setTimeout(() => {
            lazyLoader.refresh();
            initGiscus();
        }, 100)));
    });
