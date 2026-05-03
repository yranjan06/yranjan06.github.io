import Hero from "@/blocks/home/Hero.js";
import Notes from "@/blocks/home/Notes.js";
import GenAi from "@/blocks/home/GenAi.js";
import Quote from "@/blocks/home/Quote.js";
import Projects from "@/blocks/home/Projects.js";
import Skills from "@/blocks/home/Skills.js";
import About from "@/blocks/home/About.js";
import Contacts from "@/blocks/home/Contacts.js";

import "styles/pages/home.sass"


export default (t, locale) => {
    return /*html*/`
        ${Hero(t.hero)}
        ${Quote(t.quote)}
        ${Notes()}
        ${GenAi()}
        ${Projects(t.projects, locale.projects)}
        ${Skills(t.skills, locale.skills)}
        ${About(t.about)}
        ${Contacts(t.contacts)}
    `;
};
