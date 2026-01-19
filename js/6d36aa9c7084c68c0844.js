"use strict";
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([[548],{

/***/ 548
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ views_About)
});

// EXTERNAL MODULE: ./src/app/components/Path.js
var Path = __webpack_require__(778);
;// ./src/app/blocks/about/About.js
/* harmony default export */ const About = ((t) => {
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
});
// EXTERNAL MODULE: ./src/app/components/SkillBlock.js
var SkillBlock = __webpack_require__(427);
// EXTERNAL MODULE: ./src/app/consts/skills.js
var skills = __webpack_require__(515);
;// ./src/app/blocks/about/Skills.js



/* harmony default export */ const Skills = ((t, t2) => {
    return /*html*/`
        <section class="skills">
            <h2 class="h2">${t.title}</h2>
            <div class="skills__content">
                ${Object.keys(skills/* default */.A)
                            .map((id) => (0,SkillBlock/* default */.A)({ id }, t2))
                            .join("")}
            </div>
        </section>
    `
});

;// ./src/app/blocks/about/Facts.js
/* harmony default export */ const Facts = ((t) => {
    return /*html*/`
        <section class="facts">
            <h2 class="h2">${t.title}</h2>
            <div class="facts__content">
                <ul class="facts__list">
                    ${t.list.map(fact => /*html*/`
                        <li class="fact">${fact}</li>
                    `).join("")}
                </ul>
                <div class="facts__illustrations">
                    
                </div>
            </div>

        </section>
    `
});
;// ./src/app/views/About.js







/* harmony default export */ const views_About = ((t, locale) => {
    return /*html*/ `
        ${(0,Path/* default */.A)({ description: t.description })}
        ${About(t.about)}
        ${Skills(t.skills, locale.skills)}
        ${Facts(t.facts)}
    `;
});


/***/ }

}]);