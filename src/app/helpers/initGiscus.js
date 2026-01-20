/**
 * Initialize Giscus widget after DOM is rendered
 * This is needed because script tags in innerHTML don't execute
 */
export default function initGiscus() {
    const container = document.querySelector('.giscus-container[data-giscus-config]');

    if (!container) return;

    // Parse config from data attribute
    const config = JSON.parse(container.dataset.giscusConfig);

    // Remove any existing giscus script and widget
    const existingScript = document.querySelector('script[src="https://giscus.app/client.js"]');
    if (existingScript) existingScript.remove();

    const existingWidget = container.querySelector('.giscus-frame');
    if (existingWidget) existingWidget.remove();

    // Create and append the giscus script
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', config.repo);
    script.setAttribute('data-repo-id', config.repoId);
    script.setAttribute('data-category', config.category);
    script.setAttribute('data-category-id', config.categoryId);
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', config.term);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', config.theme);
    script.setAttribute('data-lang', config.lang);
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    container.appendChild(script);
}
