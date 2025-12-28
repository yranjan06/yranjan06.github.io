// Enhanced lazy loading with better skeleton handling and responsive images
const loadImage = (img) => {
    const src = img.dataset.src;
    if (!src) return;
    
    // Create a new image to preload
    const tempImg = new Image();
    
    tempImg.onload = () => {
        // Set source and srcset if available
        img.src = src;
        if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            delete img.dataset.srcset;
        }
        
        // Smooth transition from skeleton to actual image
        setTimeout(() => {
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-loaded');
            delete img.dataset.src;
        }, 50);
    };
    
    tempImg.onerror = () => {
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-error');
    };
    
    // Start loading
    tempImg.src = src;
};

// Reduced rootMargin to only load images when closer to viewport (50px instead of 100px)
const observer = window.IntersectionObserver ? new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadImage(entry.target);
            obs.unobserve(entry.target);
        }
    });
}, { rootMargin: '50px' }) : null;

export default {
    observeAll: () => document.querySelectorAll('img[data-src]').forEach(img => 
        observer ? observer.observe(img) : loadImage(img)
    ),
    refresh: () => document.querySelectorAll('img[data-src]').forEach(img => 
        observer ? observer.observe(img) : loadImage(img)
    )
};