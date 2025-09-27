export default (t) => {
    return /*html*/`
        <section class="about">
            <div class="about__illustrations">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="/images/about-me-original.webp" alt="About Ranjan" class="lazy-loading about__image" loading="lazy">
            </div>
            <div class="about__text">
                ${t.description.map(text => /*html*/`
                    <p class="about__description">${text}</p>
                `).join("")}
            </div>
        </section>
    `
}