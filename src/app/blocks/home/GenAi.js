const genAiProjects = [
    {
        title: "Document Intelligence",
        eyebrow: "RAG assistant | Hybrid retrieval | RAGAS evaluated",
        description: "Production-style RAG system that ingests PDFs, stores embeddings in ChromaDB, retrieves context with Vector + BM25 search, and answers through Groq Llama 3.3.",
        href: "https://github.com/yranjan06/rag-assistant",
        metrics: [
            { label: "Faithfulness", value: "0.89" },
            { label: "Answer Relevancy", value: "0.85" },
            { label: "Context Precision", value: "0.88" },
        ],
        techs: ["PyMuPDF", "FastEmbed", "ChromaDB", "BM25", "Groq Llama 3.3", "FastAPI", "Streamlit", "RAGAS"],
    },
    {
        title: "Voice AI Agent",
        eyebrow: "Voice assistant | Tool execution | Human-in-the-loop",
        description: "Voice controlled local AI agent that accepts mic or uploaded audio, transcribes with Groq Whisper, classifies intent in 3 tiers, executes sandboxed tools, and displays results in Gradio.",
        href: "https://github.com/yranjan06/ai-voice-assistant",
        metrics: [
            { label: "STT latency", value: "Sub-2s" },
            { label: "Intent classifier", value: "3-tier" },
            { label: "Session memory", value: "10 turns" },
        ],
        techs: ["Groq Whisper", "Groq Llama 3.3", "Gradio", "DuckDuckGo", "Python", "Regex", "Session Memory", "Sandboxed file ops"],
    },
    {
        title: "WEBGhosting MCP",
        eyebrow: "Browser MCP | Stealth Playwright | Voice-controlled web agent",
        description: "Go-based MCP server that wraps Playwright so AI agents can browse the live web, perceive DOM context, run extraction tasks, manage tabs, and operate through a Sarvam voice wrapper.",
        href: "https://github.com/yranjan06/WEBGhosting-MCP",
        metrics: [
            { label: "MCP tools", value: "34" },
            { label: "Stealth scripts", value: "22" },
            { label: "Execution model", value: "3-tier" },
        ],
        techs: ["Go", "Playwright", "MCP", "Sarvam Voice", "LLM Orchestrator", "Stealth Engine", "Multi-tab Browser", "JSON extraction"],
    },
];

export default () => /*html*/ `
    <section class="notes gen-ai">
        <div class="notes__header">
            <h2 class="h2">dl // gen ai</h2>
            <a class="notes__link" href="https://github.com/yranjan06?tab=repositories" target="_blank" rel="noopener noreferrer">View repos ~~></a>
        </div>
        <div class="notes__external-list gen-ai__list">
            ${genAiProjects
                .map(
                    (project) => /*html*/ `
                        <a class="note-link-card gen-ai-card" href="${project.href}" target="_blank" rel="noopener noreferrer">
                            <div class="gen-ai-card__eyebrow">${project.eyebrow}</div>
                            <div class="note-link-card__title">${project.title}</div>
                            <div class="note-link-card__description">${project.description}</div>
                            <div class="gen-ai-card__metrics">
                                ${project.metrics
                                    .map(
                                        (metric) => /*html*/ `
                                            <span class="gen-ai-card__metric">
                                                <strong>${metric.value}</strong>
                                                ${metric.label}
                                            </span>
                                        `
                                    )
                                    .join("")}
                            </div>
                            <div class="gen-ai-card__techs">${project.techs.join(" | ")}</div>
                            <div class="note-link-card__cta">View project ~~></div>
                        </a>
                    `
                )
                .join("")}
        </div>
    </section>
`;
