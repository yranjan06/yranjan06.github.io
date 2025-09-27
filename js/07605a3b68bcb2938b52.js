"use strict";
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([[847],{

/***/ 778:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({ description }) => {
    return /*html*/`
        <div class="path">
            <h1 class="h1 path__name">${window.location.pathname.slice(1)}</h1>
            <p class="path__description">${description}</p>
        </div>
    `
});

/***/ }),

/***/ 847:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(778);
/* harmony import */ var _components_ProjectList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(975);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((t, t2) => {
    return /*html*/ `
        ${(0,_components_Path_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)({ description: t.description })}
        ${(0,_components_ProjectList_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({ title: t.major, filter: (p) => p.isMajor }, t2.projects)}
        ${(0,_components_ProjectList_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({ title: t.decent, filter: (p) => !p.isSmall && !p.isMajor }, t2.projects)}
        ${(0,_components_ProjectList_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({ title: t.small, filter: (p) => p.isSmall && !p.isInProgress }, t2.projects)}
    `;
});


/***/ }),

/***/ 928:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  // ──────────────── Core Programming Languages ────────────────
  ts: "TypeScript",
  js: "JavaScript",
  python: "Python",
  scala: "Scala",
  java: "Java",
  bash: "Bash",
  sql: "SQL",

  // ──────────────── Web & Frontend ────────────────
  html: "HTML",
  css: "CSS",
  sass: "SASS",
  scss: "SCSS",
  less: "Less",
  stylus: "Stylus",
  ejs: "EJS",
  jinja: "Jinja2",
  pug: "Pug",
  react: "React",
  preact: "Preact",
  next: "Next",
  webpack: "WebPack",
  gulp: "Gulp",
  zod: "Zod",
  rtk: "RTK",

  // ──────────────── Backend & Frameworks ────────────────
  node: "Node.js",
  express: "Express",
  flask: "Flask",
  quart: "Quart",
  deno: "Deno",
  discordJs: "Discord.js",
  pixijs: "PixiJS",

  // ──────────────── Databases & Warehouses ────────────────
  sqlite: "SQLite",
  mongo: "MongoDB",
  postgreSql: "PostgreSQL",
  mysql: "MySQL",
  snowflake: "Snowflake",
  redshift: "AWS Redshift",
  bigquery: "Google BigQuery",
  dynamodb: "DynamoDB",
  cassandra: "Cassandra",
  cosmosdb: "CosmosDB",
  adls: "ADLS",
  synapse: "Azure Synapse",
  adf: "Azure Data Factory",
  eventhub: "EventHub",
  deltaLake: "Delta Lake",
  deltaTables: "Delta Tables",

  // ──────────────── Big Data & Streaming ────────────────
  spark: "Apache Spark",
  kafka: "Apache Kafka", 
  hadoop: "Hadoop Ecosystem",
  flink: "Apache Flink",
  databricks: "Databricks",
  pyspark: "PySpark",
  sparkStreaming: "Spark Structured Streaming",
  streamAnalytics: "Azure Stream Analytics",
  googleStorage: "Google Storage",
  liveTable: "Delta Live Table",

  // ──────────────── Cloud Platforms ────────────────
  aws: "AWS",
  azure: "Azure",
  gcp: "Google Cloud Platform",

  // ──────────────── Tools & Orchestration ────────────────
  airflow: "Apache Airflow",
  docker: "Docker",
  kubernetes: "Kubernetes", 
  terraform: "Terraform",
  git: "Git & GitHub",
  githubActions: "GitHub Actions",
  cicd: "CI/CD",
  databricksWorkflows: "Databricks Workflows",
  pyDeequ: "PyDeequ",
  logicApps: "Logic Apps",
  azureDevops: "Azure DevOPS",

  // ──────────────── Data Visualization ────────────────
  tableau: "Tableau",
  powerbi: "Power BI",
  looker: "Looker",
  matplotlib: "Matplotlib",
  seaborn: "Seaborn",

  // ──────────────── Tools & Editors ────────────────
  vscode: "VSCode",
  nvim: "NeoVim",
  figma: "Figma",
  xfce: "XFCE",
});


/***/ }),

/***/ 975:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ ProjectList)
});

;// ./src/app/consts/projects.js
/**
 * @type {import("../../types/Project").Project[]}
 */
const projects = [
    // ──────────────── MAJOR PROJECTS ────────────────
    {
        id: "realtime-booking-cdc",
        techs: ["python", "adls", "cosmosdb", "adf", "synapse", "sql"],
        links: {
            github: "ranjanyadav/realtime-booking-cdc-pipeline",
            youtube: "dQw4w9WgXcQ"
        },
        hasImage: true,
        isMajor: true,
    },
    {
        id: "fintech-datalake",
        techs: ["python", "sql", "synapse", "adls", "pyspark", "deltaTables"],
        links: {
            github: "ranjanyadav/fintech-medallion-architecture",
            youtube: "dQw4w9WgXcQ"
        },
        hasImage: true,
        isMajor: true,
    },
    {
        id: "lowlatency-upi",
        techs: ["databricks", "sparkStreaming", "deltaLake"],
        links: {
            github: "ranjanyadav/upi-spark-streaming",
            youtube: "dQw4w9WgXcQ"
        },
        hasImage: true,
        isMajor: true,
    },

    // ──────────────── DECENT PROJECTS ────────────────
    {
        id: "scd2-customer-quality",
        techs: ["databricks", "pyspark", "googleStorage", "deltaLake", "databricksWorkflows", "pyDeequ"],
        links: {
            github: "ranjanyadav/scd2-data-quality-pipeline",
            youtube: "dQw4w9WgXcQ"
        },
        hasImage: true,
    },
    {
        id: "automated-healthcare-dlt", 
        techs: ["databricks", "pyspark", "deltaLake", "liveTable"],
        links: {
            github: "ranjanyadav/healthcare-dlt-pipeline",
            youtube: "dQw4w9WgXcQ"
        },
        hasImage: true,
    },
    {
        id: "azure-stream-analytics",
        techs: ["python", "eventhub", "streamAnalytics", "sql", "synapse"],
        links: {
            github: "ranjanyadav/azure-stream-ticket-sales",
            youtube: "dQw4w9WgXcQ"
        },
        hasImage: true,
    },
    {
        id: "event-driven-order",
        techs: ["googleStorage", "pyspark", "databricks", "deltaLake", "databricksWorkflows"],
        links: {
            github: "ranjanyadav/event-driven-order-tracking",
            youtube: "dQw4w9WgXcQ"
        },
        hasImage: true,
    },

    // ──────────────── SMALL PROJECTS ────────────────
    {
        id: "adf-cicd-deployment",
        techs: ["adls", "adf", "synapse", "logicApps", "azureDevops"],
        links: {
            github: "ranjanyadav/adf-cicd-azure-devops",
            youtube: "dQw4w9WgXcQ"
        },
        isSmall: true,
    },
];

/* harmony default export */ const consts_projects = (projects);

// EXTERNAL MODULE: ./src/app/consts/websites.js
var websites = __webpack_require__(175);
// EXTERNAL MODULE: ./src/app/consts/techs.js
var techs = __webpack_require__(928);
// EXTERNAL MODULE: ./src/app/consts/media.js + 1 modules
var media = __webpack_require__(934);
;// ./src/app/components/Project.js





function mapLinks(links) {
    function map(link) {
        let href =
        "https://" + (link === "live" ? "" : websites/* default */.A[link]) + links[link];

        if (link === "figma") href = `https://figma.com/community/file/${links[link]}`
        if (link === "github" && links[link].startsWith("/")) href = media/* default */.A.github + links[link]


        const className = link === "cached" ? "button__secondary" : "";
        const name = `${link[0].toUpperCase()}${link.slice(1)}`;

        return /*html*/ `<a href="${href}" class="button ${className}">${name} =></a>`;
    }

    return Object.keys(links).map(map).join("");
}

/* harmony default export */ const Project = (({ id }, t) => {
    const { hasImage, techs: projectTech, links } = consts_projects.find(
        (project) => project.id === id
    );

    return /*html*/ `
        <div class="project">
            ${
                hasImage
                    ? `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="/images/projects/${id}.webp" alt="${t[id].name}" class="lazy-loading project__image" loading="lazy">`
                    : ""
            }
            
            <ul class="project__techs">
                ${projectTech
                    .map(
                        (tech) =>
                            /*html*/ `<li class="project__tech">${techs/* default */.A[tech]}</li>`
                    )
                    .join("")}
            </ul> 

            <div class="project__content">
                <div class="project__name">${t[id].name}</div>
                <div class="project__description">${t[id].description}</div>
                <div class="project__links">${mapLinks(links)}</div>
            </div>
        </div> 
    `;
});

;// ./src/app/components/ProjectList.js




/* harmony default export */ const ProjectList = (({ title, filter = () => true, limit = consts_projects.length }, t) => {
    return /*html*/ `
            ${title ? `<div> <h2 class="h2">${title}</h2>` : ""}
            <div class="project-list">
                ${consts_projects
                    .filter(filter)
                    .slice(0, limit)
                    .sort((a, b) => a.hasImage - b.hasImage)
                    .map(({ id }) => Project({ id }, t))
                    .join("")}
            </div>
        ${title ? "</div>" : ""}
    `;
});


/***/ })

}]);