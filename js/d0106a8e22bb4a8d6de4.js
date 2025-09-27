"use strict";
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([[36],{

/***/ 36:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home)
});

;// ./src/app/components/Dots.js
const radius = 4;
const gap = 16;

/* harmony default export */ const Dots = (({ width = 5, height = 5 } = {}) => {
    const svgWidth = (radius * 2 + gap) * width - gap
    const svgHeight = (radius * 2 + gap) * height - gap

    return /*html*/ `
        <svg width="100%" class="dots" viewBox="0 0 ${svgWidth} ${svgHeight}">
            ${new Array(width)
                .fill(new Array(height).fill(""))
                .map((arr, i) =>
                    arr.map((_, j) => {
                        const x = radius + i * (radius * 2 + gap);
                        const y = radius + j * (radius * 2 + gap);

                        return /*html*/ `<circle cx="${x}" cy="${y}" r="${radius}" />`;
                    }).join("")
                )
                .join("")}
        </svg>
    `;
});

;// ./src/app/blocks/home/Hero.js


/* harmony default export */ const Hero = ((t) => {
    return /*html*/ `
        <section class="hero">
            <div class="hero__content">
                <h1 class="hero__title">${t.title}</h1>
                <div class="hero__description">${t.description}</div>
                <a class="button button__primary" href="#contacts">${t.button} =></a>
            </div>
            <div class="hero__illustrations">
                <img src="/images/logo-outline.svg" alt="" class="hero__logo">
                <img src="/images/hero.webp" alt="Ranjan" class="hero__image">
                <div class="hero__status">${t.status}</div>
                ${Dots({})}
            </div>
        </section>
    `;
});

;// ./src/app/blocks/home/Quote.js
/* harmony default export */ const Quote = ((t) => {
    return /*html*/`
        <figure class="quote">
            <blockquote class="quote__text">${t.text}</blockquote>
            <figcaption class="quote__author">${t.author}</figcaption>
        </figure>
    `
});
// EXTERNAL MODULE: ./src/app/components/ProjectList.js + 2 modules
var ProjectList = __webpack_require__(975);
;// ./src/app/blocks/home/Projects.js


/* harmony default export */ const Projects = ((t, t2) => {
    return /*html*/ `
        <section class="projects">
            <div class="projects__header">
                <h2 class="h2">${t.title}</h2>
                <a class="projects__link" href="/projects">${t.button} ~~></a>
            </div>
            ${(0,ProjectList/* default */.A)({ limit: 3 }, t2)}
        </section>
    `;
});

// EXTERNAL MODULE: ./src/app/components/SkillBlock.js
var SkillBlock = __webpack_require__(427);
// EXTERNAL MODULE: ./src/app/consts/skills.js
var skills = __webpack_require__(515);
;// ./src/app/blocks/home/Skills.js




/* harmony default export */ const Skills = ((t, t2) => {
    return /*html*/ `
        <sections class="skills">
            <h2 class="h2">${t.title}</h2>
            <div class="skills__content">
                <div class="skills__illustrations illustrations">
                    <img src="/images/logo-outline.svg" alt="" class="illustrations__logo">
                    ${Dots({ width: 4, height: 4 })}
                    ${Dots({ width: 6, height: 6 })}
                </div>
                <div class="skills__list">
                    ${Object.keys(skills/* default */.A)
                        .filter(id => id !== "tool")
                        .map((id) => (0,SkillBlock/* default */.A)({ id }, t2))
                        .join("")}
                </div>

            </div>

        </sections>
    `;
});

;// ./src/app/blocks/home/About.js
/* harmony default export */ const About = ((t) => {
    return /*html*/ `
        <section class="about">
            <div class="about__content">
                <h2 class="h2">${t.title}</h2>
                <div class="about__text">
                    ${t.description.map(
                        (text) =>
                            /*html*/ `<p class="about__description">${text}</p>`
                    ).join("")}
                </div>

                <a href="/about-me" class="button">${t.button} -></a>
            </div>
            <img src="/images/about-me-original.webp" alt="" class="about__image">
        </section>
    `;
});

// EXTERNAL MODULE: ./src/app/consts/media.js + 1 modules
var media = __webpack_require__(934);
;// ./src/app/blocks/home/Contacts.js


const contacts = [
    {
        name: "discord",
        text: media/* default */.A.discordTag,
    },
    {
        name: "email",
        text: media/* default */.A.emailRaw,
    }
];

/* harmony default export */ const Contacts = ((t) => {
    return /*html*/ `
        <sections class="contacts" id="contacts">
            <h2 class="h2">${t.title}</h2>
            <div class="contacts__content">
                <p class="contacts__description">${t.text}</p>
                <div class="contacts__media">
                    <h3 class="contacts__title">${t.media}</h3>
                    <div class="contacts__list">
                        ${contacts
                            .map(
                                (contact) => /*html*/ `
                            <a class="contact" href="${media/* default */.A[contact.name]}">
                                <img src="/images/icons/${
                                    contact.name
                                }.svg" alt="">
                                <div class="contact__name">${contact.text}</div>
                            </a>
                        `
                            )
                            .join("")}
                    </div>
                </div>
            </div>

        </sections>
    `;
});

;// ./src/app/views/Home.js










/* harmony default export */ const Home = ((t, locale) => {
    return /*html*/`
        ${Hero(t.hero)}
        ${Quote(t.quote)}
        ${Projects(t.projects, locale.projects)}
        ${Skills(t.skills, locale.skills)}
        ${About(t.about)}
        ${Contacts(t.contacts)}
    `;
});


/***/ }),

/***/ 427:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _consts_skills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(515);
/* harmony import */ var _consts_techs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(928);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({ id }, t) => {
    return /*html*/ `
        <div class="skill-block">
            <div class="skill-block__name">${t[id]}</div>
            <ul class="skill-block__list">
                ${(_consts_skills__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A[id].map((techIndex) => _consts_techs__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A[techIndex]))
                    .map(
                        (tech) =>
                            /*html*/ `<li class="skill-block__skill">${tech}</li>`
                    )
                    .join("")}
            </ul>
        </div>
    `;
});


/***/ }),

/***/ 515:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  // ──────────────── Core Languages ────────────────
  language: ["python", "sql", "scala", "java", "bash"],

  // ──────────────── Big Data & Streaming ────────────────
  bigdata: ["spark", "kafka", "hadoop", "flink", "databricks"],

  // ──────────────── Databases & Warehouses ────────────────
  database: [
    "postgreSql",
    "mysql",
    "snowflake",
    "redshift",
    "bigquery",
    "dynamodb",
    "cassandra"
  ],

  // ──────────────── Cloud Platforms ────────────────
  cloud: ["aws", "azure", "gcp"],

  // ──────────────── Tools & Orchestration ────────────────
  tool: ["airflow", "docker", "kubernetes", "terraform", "git", "githubActions", "cicd"],

  // ──────────────── Data Visualization ────────────────
  visualization: ["tableau", "powerbi", "looker", "matplotlib", "seaborn"]
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
                    ? `<img src="/images/projects/${id}.webp" alt="${t[id].name}" class="project__image">`
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