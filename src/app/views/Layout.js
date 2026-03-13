import Footer from "@/components/Footer.js";
import Header from "@/components/Header.js";
import { getLocale } from "@/helpers/localeHandler.js";

export default async (content, path) => {
    const locale = await getLocale()
    const pageClasses = ["page", `page--${path.name}`];

    if (path.name === "home") pageClasses.push("page--desktop-mobile");

    return /*html*/ `
        ${Header(locale.header)}
        <div class="${pageClasses.join(" ")}">
            <div class="page__canvas">
                <div class="container content">
                    ${content(locale.pages[path.name], locale)}
                </div>
                ${Footer(locale.footer)}
            </div>
        </div>
    `;
};
