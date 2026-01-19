import Path from "../components/Path.js";
import ProjectList from "../components/ProjectList.js";
import projects from "../consts/projects.js";
import { getProjectDetails } from "../consts/projectDetails.js";
import techs from "../consts/techs.js";

import "styles/pages/projects.sass"

import "styles/pages/projects.sass"

const renderProjectDetail = (projectId, t2) => {
    const project = projects.find(p => p.id === projectId);
    const details = getProjectDetails(projectId);
    const projectName = t2.projects[projectId]?.name || projectId;

    if (!project || !details) {
        return /*html*/ `
            <div class="project-detail">
                <div class="project-detail__nav">
                    <button onclick="window.location.hash = ''; window.location.reload();" class="project-detail__back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 12H5"/>
                            <path d="M12 19l-7-7 7-7"/>
                        </svg>
                        Back to all projects
                    </button>
                </div>
                <div class="project-detail__content">
                    <h1>Project not found</h1>
                </div>
            </div>
        `;
    }

    return /*html*/ `
        <div class="project-detail-layout">
            <main class="project-detail">
                <div class="project-detail__nav">
                    <button onclick="window.location.hash = ''; window.location.reload();" class="project-detail__back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 12H5"/>
                            <path d="M12 19l-7-7 7-7"/>
                        </svg>
                        Back to all projects
                    </button>
                </div>
                
                <article class="project-detail__content">
                    <h1 class="project-detail__title">${projectName}</h1>
                    
                    <div class="project-detail__meta">
                        <div class="project-detail__techs">
                            ${project.techs.map(tech => `<span class="project-detail__tech">${techs[tech]}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="project-detail__links">
                        <a href="${details.githubLink}" target="_blank" rel="noopener noreferrer" class="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.411 2.866 8.158 6.84 9.489.5.09.682-.218.682-.484 0-.237-.009-.868-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.465-1.11-1.465-.908-.62.069-.607.069-.607 1.004.07 1.532 1.03 1.532 1.03.89 1.528 2.336 1.085 2.903.83.091-.645.347-1.085.632-1.336-2.22-.252-4.555-1.11-4.555-4.944 0-1.091.39-1.984 1.029-2.684-.103-.252-.447-1.27.098-2.65 0 0 .84-.269 2.75 1.028a9.584 9.584 0 015 0c1.91-1.297 2.75-1.028 2.75-1.028.546 1.38.202 2.398.098 2.65.64.7 1.029 1.593 1.029 2.684 0 3.843-2.336 4.691-4.566 4.935.359.309.678.919.678 1.854 0 1.336-.012 2.416-.012 2.744 0 .267.18.578.688.484C19.136 20.158 22 16.411 22 12c0-5.523-4.477-10-10-10z"/>
                            </svg>
                            View on GitHub =>
                        </a>
                        ${project.links.youtube ? `
                            <a href="https://youtube.com/watch?v=${project.links.youtube}" target="_blank" rel="noopener noreferrer" class="button button__secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a2.993 2.993 0 00-2.108-2.117C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.39.524A2.993 2.993 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.993 2.993 0 002.108 2.117c1.885.524 9.39.524 9.39.524s7.505 0 9.39-.524a2.993 2.993 0 002.108-2.117C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                Watch Demo =>
                            </a>
                        ` : ''}
                        <a href="/discussions#${projectId}" class="button button__secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 14.25 14H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 15.543V14H1.75A1.75 1.75 0 0 1 0 12.25v-9.5C0 1.784.784 1 1.75 1ZM1.5 2.75v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z"/>
                                <path d="M22.5 8.75a.25.25 0 0 0-.25-.25h-3.5a.75.75 0 0 1 0-1.5h3.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 22.25 20H21v1.543a1.457 1.457 0 0 1-2.487 1.03L15.939 20H10.75A1.75 1.75 0 0 1 9 18.25v-1.465a.75.75 0 0 1 1.5 0v1.465c0 .138.112.25.25.25h5.5a.75.75 0 0 1 .53.22l2.72 2.72v-2.19a.75.75 0 0 1 .75-.75h2a.25.25 0 0 0 .25-.25v-9.5Z"/>
                            </svg>
                            Discussion =>
                        </a>
                    </div>
                    
                    <section class="project-detail__section">
                        <h3>Overview</h3>
                        <p>${details.overview}</p>
                    </section>
                    
                    <section class="project-detail__section">
                        <h3>Problem Statement</h3>
                        <p>${details.problemStatement}</p>
                    </section>
                    
                    <section class="project-detail__section">
                        <h3>Architecture</h3>
                        ${details.architecture}
                    </section>
                    
                    <section class="project-detail__section">
                        <h3>Technologies Used</h3>
                        <div class="project-detail__tech-list">
                            ${details.technologies.map(tech => `
                                <div class="project-detail__tech-item">
                                    <strong>${tech.name}</strong>
                                    <span>${tech.purpose}</span>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                    
                    <section class="project-detail__section">
                        <h3>Key Features</h3>
                        <ul>
                            ${details.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </section>
                    
                    <section class="project-detail__section">
                        <h3>Implementation</h3>
                        ${details.implementation}
                    </section>
                    
                    <section class="project-detail__section">
                        <h3>Results</h3>
                        <p class="project-detail__results">${details.results}</p>
                    </section>
                </article>
            </main>
        </div>
    `;
};

export default (t, t2) => {
    // Check if we're viewing a specific project
    const currentHash = window.location.hash.slice(1); // Remove the # character
    const currentProject = currentHash ? projects.find(p => p.id === currentHash) : null;

    if (currentProject) {
        return renderProjectDetail(currentHash, t2);
    }

    return /*html*/ `
        ${Path({ description: t.description })}
        ${ProjectList({ title: t.major, filter: (p) => p.isMajor }, t2.projects)}
        ${ProjectList({ title: t.decent, filter: (p) => !p.isSmall && !p.isMajor }, t2.projects)}
        ${ProjectList({ title: t.small, filter: (p) => p.isSmall && !p.isInProgress }, t2.projects)}
    `;
};
