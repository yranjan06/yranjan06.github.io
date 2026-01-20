"use strict";
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([[441],{

/***/ 441
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Discussions)
});

// EXTERNAL MODULE: ./src/app/components/Path.js
var Path = __webpack_require__(778);
// EXTERNAL MODULE: ./src/app/consts/projects.js
var projects = __webpack_require__(635);
// EXTERNAL MODULE: ./src/app/consts/projectDetails.js
var projectDetails = __webpack_require__(852);
;// ./src/app/consts/giscusConfig.js
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

function getGiscusConfig(projectId) {
    const projectConfig = giscusConfig.projects[projectId];
    const config = projectConfig || giscusConfig.default;

    return {
        ...config,
        theme: giscusConfig.theme,
        lang: giscusConfig.lang
    };
}

function isGiscusEnabled(projectId) {
    const config = getGiscusConfig(projectId);
    return config.enabled && config.repoId && config.categoryId;
}

/* harmony default export */ const consts_giscusConfig = ((/* unused pure expression or super */ null && (giscusConfig)));

// EXTERNAL MODULE: ./src/app/consts/techs.js
var techs = __webpack_require__(928);
;// ./src/app/views/Discussions.js








/* harmony default export */ const Discussions = ((t, t2) => {
    // Get project ID from hash
    const projectId = window.location.hash.slice(1);
    const project = projectId ? projects/* default */.A.find(p => p.id === projectId) : null;
    const details = project ? (0,projectDetails/* getProjectDetails */.ES)(projectId) : null;
    const projectName = project ? (t2.projects[projectId]?.name || projectId) : null;

    // If no project specified, show discussion hub
    if (!project) {
        return /*html*/ `
            ${(0,Path/* default */.A)({ description: "Project Discussions" })}
            <div class="discussions-hub">
                <div class="discussions-hub__header">
                    <div class="discussions-hub__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 14.25 14H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 15.543V14H1.75A1.75 1.75 0 0 1 0 12.25v-9.5C0 1.784.784 1 1.75 1ZM1.5 2.75v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z"/>
                            <path d="M22.5 8.75a.25.25 0 0 0-.25-.25h-3.5a.75.75 0 0 1 0-1.5h3.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 22.25 20H21v1.543a1.457 1.457 0 0 1-2.487 1.03L15.939 20H10.75A1.75 1.75 0 0 1 9 18.25v-1.465a.75.75 0 0 1 1.5 0v1.465c0 .138.112.25.25.25h5.5a.75.75 0 0 1 .53.22l2.72 2.72v-2.19a.75.75 0 0 1 .75-.75h2a.25.25 0 0 0 .25-.25v-9.5Z"/>
                        </svg>
                    </div>
                    <h1>Project Discussions</h1>
                    <p>Select a project to view or start discussions</p>
                </div>
                
                <div class="discussions-hub__projects">
                    ${projects/* default */.A.map(p => {
            const name = t2.projects[p.id]?.name || p.id;
            return /*html*/ `
                            <a href="/discussions#${p.id}" class="discussions-hub__project" onclick="setTimeout(() => window.location.reload(), 100)">
                                <div class="discussions-hub__project-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 14.25 14H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 15.543V14H1.75A1.75 1.75 0 0 1 0 12.25v-9.5C0 1.784.784 1 1.75 1Z"/>
                                    </svg>
                                </div>
                                <div class="discussions-hub__project-info">
                                    <h3>${name}</h3>
                                    <span>View discussions</span>
                                </div>
                                <div class="discussions-hub__project-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 18l6-6-6-6"/>
                                    </svg>
                                </div>
                            </a>
                        `;
        }).join('')}
                </div>
            </div>
        `;
    }

    // Show discussion page for specific project
    const giscusConfig = getGiscusConfig(projectId);
    const enabled = isGiscusEnabled(projectId);

    return /*html*/ `
        <div class="discussion-page">
            <div class="discussion-page__nav">
                <a href="/projects#${projectId}" class="discussion-page__back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 12H5"/>
                        <path d="M12 19l-7-7 7-7"/>
                    </svg>
                    Back to project
                </a>
            </div>
            
            <div class="discussion-page__header">
                <div class="discussion-page__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 14.25 14H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 15.543V14H1.75A1.75 1.75 0 0 1 0 12.25v-9.5C0 1.784.784 1 1.75 1ZM1.5 2.75v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z"/>
                        <path d="M22.5 8.75a.25.25 0 0 0-.25-.25h-3.5a.75.75 0 0 1 0-1.5h3.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 22.25 20H21v1.543a1.457 1.457 0 0 1-2.487 1.03L15.939 20H10.75A1.75 1.75 0 0 1 9 18.25v-1.465a.75.75 0 0 1 1.5 0v1.465c0 .138.112.25.25.25h5.5a.75.75 0 0 1 .53.22l2.72 2.72v-2.19a.75.75 0 0 1 .75-.75h2a.25.25 0 0 0 .25-.25v-9.5Z"/>
                    </svg>
                </div>
                <div class="discussion-page__title">
                    <h1>${projectName}</h1>
                    <span>Discussion</span>
                </div>
            </div>
            
            <div class="discussion-page__techs">
                ${project.techs.map(tech => `<span class="discussion-page__tech">${techs/* default */.A[tech]}</span>`).join('')}
            </div>
            
            <div class="discussion-page__content">
                ${enabled ? `
                    <div class="giscus-container" data-giscus-config='${JSON.stringify({
        repo: giscusConfig.repo,
        repoId: giscusConfig.repoId,
        category: giscusConfig.category,
        categoryId: giscusConfig.categoryId,
        term: projectId,
        theme: giscusConfig.theme,
        lang: giscusConfig.lang
    })}'>
                        <div class="giscus"></div>
                    </div>
                ` : `
                    <div class="discussion-placeholder">
                        <div class="discussion-placeholder__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 14.25 14H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 15.543V14H1.75A1.75 1.75 0 0 1 0 12.25v-9.5C0 1.784.784 1 1.75 1ZM1.5 2.75v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z"/>
                                <path d="M22.5 8.75a.25.25 0 0 0-.25-.25h-3.5a.75.75 0 0 1 0-1.5h3.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 22.25 20H21v1.543a1.457 1.457 0 0 1-2.487 1.03L15.939 20H10.75A1.75 1.75 0 0 1 9 18.25v-1.465a.75.75 0 0 1 1.5 0v1.465c0 .138.112.25.25.25h5.5a.75.75 0 0 1 .53.22l2.72 2.72v-2.19a.75.75 0 0 1 .75-.75h2a.25.25 0 0 0 .25-.25v-9.5Z"/>
                            </svg>
                        </div>
                        <h2>Discussion Coming Soon!</h2>
                        <p>The discussion feature for this project is being set up. Once the project repository is ready, you'll be able to:</p>
                        <ul>
                            <li>Ask questions about the implementation</li>
                            <li>Share ideas and suggestions</li>
                            <li>Discuss technical details</li>
                            <li>Connect with other developers</li>
                        </ul>
                        <a href="${details.githubLink}" target="_blank" rel="noopener noreferrer" class="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.411 2.866 8.158 6.84 9.489.5.09.682-.218.682-.484 0-.237-.009-.868-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.465-1.11-1.465-.908-.62.069-.607.069-.607 1.004.07 1.532 1.03 1.532 1.03.89 1.528 2.336 1.085 2.903.83.091-.645.347-1.085.632-1.336-2.22-.252-4.555-1.11-4.555-4.944 0-1.091.39-1.984 1.029-2.684-.103-.252-.447-1.27.098-2.65 0 0 .84-.269 2.75 1.028a9.584 9.584 0 015 0c1.91-1.297 2.75-1.028 2.75-1.028.546 1.38.202 2.398.098 2.65.64.7 1.029 1.593 1.029 2.684 0 3.843-2.336 4.691-4.566 4.935.359.309.678.919.678 1.854 0 1.336-.012 2.416-.012 2.744 0 .267.18.578.688.484C19.136 20.158 22 16.411 22 12c0-5.523-4.477-10-10-10z"/>
                            </svg>
                            Visit GitHub Repository =>
                        </a>
                    </div>
                `}
            </div>
        </div>
    `;
});


/***/ }

}]);