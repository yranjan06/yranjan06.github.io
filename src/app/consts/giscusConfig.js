/**
 * Giscus configuration for project discussions
 * 
 * HOW TO CONNECT LATER:
 * 1. Create repos for your projects on GitHub
 * 2. Enable Discussions in each repo (Settings → Features → Discussions)
 * 3. Go to https://giscus.app and generate config for each repo
 * 4. Update the values below with the generated data-repo-id and data-category-id
 * 
 * The 'enabled' flag controls whether Giscus is active.
 * Set to true once you have the repo configured.
 */

const giscusConfig = {
    // Global settings
    theme: "dark_dimmed", // Matches portfolio dark theme
    lang: "en",

    // Default config (will be used if project-specific config not found)
    default: {
        enabled: false, // Set to true when ready
        repo: "yranjan06/yranjan06.github.io",
        repoId: "", // Get from giscus.app
        category: "Projects",
        categoryId: "", // Get from giscus.app
    },

    // Project-specific configs (optional - override default if needed)
    projects: {
        "realtime-booking-cdc": {
            enabled: true,
            repo: "yranjan06/realtime-booking-cdc-pipeline",
            repoId: "R_kgDOQ9P45A",
            category: "General",
            categoryId: "DIC_kwDOQ9P45M4C1LPn",
        },
        "fintech-datalake": {
            enabled: false,
            repo: "ranjanyadav/fintech-medallion-architecture",
            repoId: "",
            category: "General",
            categoryId: "",
        },
        "lowlatency-upi": {
            enabled: false,
            repo: "ranjanyadav/upi-spark-streaming",
            repoId: "",
            category: "General",
            categoryId: "",
        },
        "scd2-customer-quality": {
            enabled: false,
            repo: "ranjanyadav/scd2-data-quality-pipeline",
            repoId: "",
            category: "General",
            categoryId: "",
        },
        "automated-healthcare-dlt": {
            enabled: false,
            repo: "ranjanyadav/healthcare-dlt-pipeline",
            repoId: "",
            category: "General",
            categoryId: "",
        },
        "azure-stream-analytics": {
            enabled: false,
            repo: "ranjanyadav/azure-stream-ticket-sales",
            repoId: "",
            category: "General",
            categoryId: "",
        },
        "event-driven-order": {
            enabled: false,
            repo: "ranjanyadav/event-driven-order-tracking",
            repoId: "",
            category: "General",
            categoryId: "",
        },
        "adf-cicd-deployment": {
            enabled: false,
            repo: "ranjanyadav/adf-cicd-azure-devops",
            repoId: "",
            category: "General",
            categoryId: "",
        }
    }
};

export function getGiscusConfig(projectId) {
    const projectConfig = giscusConfig.projects[projectId];
    const config = projectConfig || giscusConfig.default;

    return {
        ...config,
        theme: giscusConfig.theme,
        lang: giscusConfig.lang
    };
}

export function isGiscusEnabled(projectId) {
    const config = getGiscusConfig(projectId);
    return config.enabled && config.repoId && config.categoryId;
}

export default giscusConfig;
