"use strict";
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([[929],{

/***/ 929
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home)
});

;// ./src/app/components/Dots.js
const radius = 4;
const gap = 16;

/* harmony default export */ const Dots = (({ width = 5, height = 5 } = {}) => {
    const svgWidth = (radius * 2 + gap) * width - gap
    const svgHeight = (radius * 2 + gap) * height - gap

    return /*html*/ `
        <svg width="100%" class="dots" viewBox="0 0 ${svgWidth} ${svgHeight}">
            ${new Array(width)
                .fill(new Array(height).fill(""))
                .map((arr, i) =>
                    arr.map((_, j) => {
                        const x = radius + i * (radius * 2 + gap);
                        const y = radius + j * (radius * 2 + gap);

                        return /*html*/ `<circle cx="${x}" cy="${y}" r="${radius}" />`;
                    }).join("")
                )
                .join("")}
        </svg>
    `;
});

;// ./src/app/blocks/home/Hero.js


/* harmony default export */ const Hero = ((t) => {
    return /*html*/ `
        <section class="hero">
            <div class="hero__content">
                <h1 class="hero__title">${t.title}</h1>
                <div class="hero__description">${t.description}</div>
                <a class="button button__primary" href="#contacts">${t.button} =></a>
            </div>
            <div class="hero__illustrations">
                <img src="/images/logo-outline.svg" alt="Logo" class="hero__logo">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="/images/hero.webp" alt="Ranjan" class="lazy-loading hero__image" loading="lazy">
                <div class="hero__status">${t.status}</div>
                ${Dots({})}
            </div>
        </section>
    `;
});

// EXTERNAL MODULE: ./src/app/consts/blogPosts.js + 2 modules
var blogPosts = __webpack_require__(618);
;// ./src/app/blocks/home/Notes.js


const featuredNotes = blogPosts/* blogPosts */.A5
    .filter((post) => !post.locked)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 1);

const externalNotes = [
    {
        title: "Architecting Agentic Tool Use",
        description: "Architecting the future of agentic tool use by overcoming token context bottlenecks.",
        href: "https://www.linkedin.com/pulse/architecting-future-agentic-tool-use-overcoming-token-ranjan-yadav-2idzc/",
    },
    {
        title: "Solving the Context Window Problem",
        description: "How we solved context window limits in large-scale web scraping workflows.",
        href: "https://www.linkedin.com/pulse/how-we-solved-context-window-problem-large-scale-web-scraping-yadav-a3pmc/?trackingId=wa2x9MlWKeoxEbgh8Ha7Rg%3D%3D",
    },
];

function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

/* harmony default export */ const Notes = (() => {
    if (!featuredNotes.length && !externalNotes.length) return "";

    return /*html*/ `
        <section class="notes notes--mobile-only">
            <div class="notes__header">
                <h2 class="h2">blogs</h2>
                <a class="notes__link" href="/blog">View all ~~></a>
            </div>
            <div class="notes__list">
                ${featuredNotes
                    .map(
                        (post) => /*html*/ `
                            <article class="note-card">
                                <div class="note-card__meta">${formatDate(post.date)} | ${post.readTime} min read</div>
                                <h3 class="note-card__title">
                                    <a href="/blog#${post.slug}">${post.title}</a>
                                </h3>
                                <p class="note-card__excerpt">${post.excerpt}</p>
                            </article>
                        `
                    )
                    .join("")}
            </div>
            <div class="notes__external-list">
                ${externalNotes
                    .map(
                        (note) => /*html*/ `
                            <a class="note-link-card" href="${note.href}" target="_blank" rel="noopener noreferrer">
                                <div class="note-link-card__title">${note.title}</div>
                                <div class="note-link-card__description">${note.description}</div>
                                <div class="note-link-card__cta">Open article ~~></div>
                            </a>
                        `
                    )
                    .join("")}
            </div>
        </section>
    `;
});

;// ./src/app/blocks/home/Quote.js
/* harmony default export */ const Quote = ((t) => {
    return /*html*/`
        <figure class="quote">
            <blockquote class="quote__text">${t.text}</blockquote>
            <figcaption class="quote__author">${t.author}</figcaption>
        </figure>
    `
});
// EXTERNAL MODULE: ./src/app/components/ProjectList.js + 1 modules
var ProjectList = __webpack_require__(340);
;// ./src/app/blocks/home/Projects.js


/* harmony default export */ const Projects = ((t, t2) => {
    return /*html*/ `
        <section class="projects">
            <div class="projects__header">
                <h2 class="h2">${t.title}</h2>
                <a class="projects__link" href="/projects">${t.button} ~~></a>
            </div>
            ${(0,ProjectList/* default */.A)({ limit: 3 }, t2)}
        </section>
    `;
});

// EXTERNAL MODULE: ./src/app/components/SkillBlock.js
var SkillBlock = __webpack_require__(427);
// EXTERNAL MODULE: ./src/app/consts/skills.js
var skills = __webpack_require__(515);
;// ./src/app/blocks/home/Skills.js




/* harmony default export */ const Skills = ((t, t2) => {
    return /*html*/ `
        <sections class="skills">
            <h2 class="h2">${t.title}</h2>
            <div class="skills__content">
                <div class="skills__illustrations illustrations">
                    <img src="/images/logo-outline.svg" alt="" class="illustrations__logo">
                    ${Dots({ width: 4, height: 4 })}
                    ${Dots({ width: 6, height: 6 })}
                </div>
                <div class="skills__list">
                    ${Object.keys(skills/* default */.A)
                        .filter(id => id !== "tool")
                        .map((id) => (0,SkillBlock/* default */.A)({ id }, t2))
                        .join("")}
                </div>

            </div>

        </sections>
    `;
});

;// ./src/app/blocks/home/About.js
/* harmony default export */ const About = ((t) => {
    return /*html*/ `
        <section class="about">
            <div class="about__content">
                <h2 class="h2">${t.title}</h2>
                <div class="about__text">
                    ${t.description.map(
                        (text) =>
                            /*html*/ `<p class="about__description">${text}</p>`
                    ).join("")}
                </div>

                <a href="/about-me" class="button">${t.button} -></a>
            </div>
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="/images/about-me-original.webp" alt="About Ranjan" class="lazy-loading about__image" loading="lazy">
        </section>
    `;
});

// EXTERNAL MODULE: ./src/app/consts/media.js + 1 modules
var media = __webpack_require__(934);
;// ./src/app/blocks/home/Contacts.js


const contacts = [
    {
        name: "discord",
        text: media/* default */.A.discordTag,
    },
    {
        name: "email",
        text: media/* default */.A.emailRaw,
    }
];

/* harmony default export */ const Contacts = ((t) => {
    return /*html*/ `
        <sections class="contacts" id="contacts">
            <h2 class="h2">${t.title}</h2>
            <div class="contacts__content">
                <p class="contacts__description">${t.text}</p>
                <div class="contacts__media">
                    <h3 class="contacts__title">${t.media}</h3>
                    <div class="contacts__list">
                        ${contacts
                            .map(
                                (contact) => /*html*/ `
                            <a class="contact" href="${media/* default */.A[contact.name]}">
                                <img src="/images/icons/${
                                    contact.name
                                }.svg" alt="">
                                <div class="contact__name">${contact.text}</div>
                            </a>
                        `
                            )
                            .join("")}
                    </div>
                </div>
            </div>

        </sections>
    `;
});

;// ./src/app/views/Home.js











/* harmony default export */ const Home = ((t, locale) => {
    return /*html*/`
        ${Hero(t.hero)}
        ${Quote(t.quote)}
        ${Notes()}
        ${Projects(t.projects, locale.projects)}
        ${Skills(t.skills, locale.skills)}
        ${About(t.about)}
        ${Contacts(t.contacts)}
    `;
});


/***/ }

}]);