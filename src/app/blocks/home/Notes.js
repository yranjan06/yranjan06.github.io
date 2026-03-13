import { blogPosts } from "@/consts/blogPosts.js";

const featuredNotes = blogPosts
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

export default () => {
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
};
