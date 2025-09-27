"use strict";
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([[548],{

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

/***/ 548:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ views_About)
});

// EXTERNAL MODULE: ./src/app/components/Path.js
var Path = __webpack_require__(778);
;// ./src/app/blocks/about/About.js
/* harmony default export */ const About = ((t) => {
    return /*html*/`
        <section class="about">
            <div class="about__illustrations">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="/images/about-me-original.webp" alt="About Ranjan" class="lazy-loading about__image" loading="lazy">
            </div>
            <div class="about__text">
                ${t.description.map(text => /*html*/`
                    <p class="about__description">${text}</p>
                `).join("")}
            </div>
        </section>
    `
});
// EXTERNAL MODULE: ./src/app/components/SkillBlock.js
var SkillBlock = __webpack_require__(427);
// EXTERNAL MODULE: ./src/app/consts/skills.js
var skills = __webpack_require__(515);
;// ./src/app/blocks/about/Skills.js



/* harmony default export */ const Skills = ((t, t2) => {
    return /*html*/`
        <section class="skills">
            <h2 class="h2">${t.title}</h2>
            <div class="skills__content">
                ${Object.keys(skills/* default */.A)
                            .map((id) => (0,SkillBlock/* default */.A)({ id }, t2))
                            .join("")}
            </div>
        </section>
    `
});

;// ./src/app/blocks/about/Facts.js
/* harmony default export */ const Facts = ((t) => {
    return /*html*/`
        <section class="facts">
            <h2 class="h2">${t.title}</h2>
            <div class="facts__content">
                <ul class="facts__list">
                    ${t.list.map(fact => /*html*/`
                        <li class="fact">${fact}</li>
                    `).join("")}
                </ul>
                <div class="facts__illustrations">
                    
                </div>
            </div>

        </section>
    `
});
;// ./src/app/views/About.js







/* harmony default export */ const views_About = ((t, locale) => {
    return /*html*/ `
        ${(0,Path/* default */.A)({ description: t.description })}
        ${About(t.about)}
        ${Skills(t.skills, locale.skills)}
        ${Facts(t.facts)}
    `;
});


/***/ }),

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


/***/ })

}]);