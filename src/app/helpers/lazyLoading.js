// Lightweight lazy loading utility
const loadImage = (img) => {
    const src = img.dataset.src;
    if (!src) return;
    
    img.onload = () => {
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
        delete img.dataset.src;
    };
    img.src = src;
};

const observer = window.IntersectionObserver ? new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadImage(entry.target);
            obs.unobserve(entry.target);
        }
    });
}, { rootMargin: '100px' }) : null;

export default {
    observeAll: () => document.querySelectorAll('img[data-src]').forEach(img => 
        observer ? observer.observe(img) : loadImage(img)
    ),
    refresh: () => document.querySelectorAll('img[data-src]').forEach(img => 
        observer ? observer.observe(img) : loadImage(img)
    )
};