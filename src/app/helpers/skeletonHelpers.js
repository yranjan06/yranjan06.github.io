/**
 * Skeleton loading helper functions
 */

export const skeletonText = (type = 'medium', customWidth = null) => {
    const width = customWidth ? `style="width: ${customWidth}"` : '';
    return `<div class="skeleton-text skeleton-text--${type}" ${width}></div>`;
};

export const skeletonImage = (className = '', minHeight = '200px') => {
    return `<div class="lazy-loading ${className}" style="min-height: ${minHeight}"></div>`;
};

export const skeletonCard = (hasImage = true, textLines = 3) => {
    const imageHTML = hasImage ? skeletonImage('', '150px') : '';
    const textHTML = Array(textLines).fill(0).map((_, i) => 
        skeletonText(i === 0 ? 'large' : i === textLines - 1 ? 'small' : 'medium')
    ).join('');
    
    return `
        <div class="skeleton-card">
            ${imageHTML}
            ${textHTML}
            <div class="skeleton-button"></div>
        </div>
    `;
};

export const skeletonButton = (width = '120px') => {
    return `<div class="skeleton-button" style="width: ${width}"></div>`;
};