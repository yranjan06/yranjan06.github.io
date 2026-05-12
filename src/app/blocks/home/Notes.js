import { blogPosts } from "@/consts/blogPosts.js";

const featuredNotes = blogPosts
    .filter((post) => !post.locked && post.slug.startsWith("azure-data-engineers-part-"))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default () => {
    if (!featuredNotes.length) return "";

    return /*html*/ `
        <section class="notes">
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
        </section>
    `;
};
