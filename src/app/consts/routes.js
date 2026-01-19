/**
 * @type {import("../../types/Routes").Routes}
 */
export default {
    "/": {
        name: "home",
        element: "Home",
    },
    "/projects": {
        name: "projects",
        element: "Projects",
    },
    "/about-me": {
        name: "about",
        element: "About",
    },
    "/blog": {
        name: "blog",
        element: "Blog",
    },
    "/categories": {
        name: "categories",
        element: "Categories",
    },
    "/tags": {
        name: "tags",
        element: "Tags",
    },
    "/discussions": {
        name: "discussions",
        element: "Discussions",
    },
    "/404": {
        name: "404",
        element: "PageNotFound",
    },

    // "/contacts": {
    //     name: "contacts",
    //     element: "Contacts",
    // },
};