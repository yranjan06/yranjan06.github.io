// Enhanced lazy loading with better skeleton handling
const loadImage = (img) => {
    const src = img.dataset.src;
    if (!src) return;
    
    // Create a new image to preload
    const tempImg = new Image();
    
    tempImg.onload = () => {
        // Smooth transition from skeleton to actual image
        img.src = src;
        
        // Small delay to ensure image is rendered
        setTimeout(() => {
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-loaded');
            delete img.dataset.src;
        }, 100);
    };
    
    tempImg.onerror = () => {
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-error');
    };
    
    // Start loading
    tempImg.src = src;
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