"use strict";
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([[76],{

/***/ 340
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ ProjectList)
});

// EXTERNAL MODULE: ./src/app/consts/projects.js
var projects = __webpack_require__(635);
// EXTERNAL MODULE: ./src/app/consts/websites.js
var websites = __webpack_require__(175);
// EXTERNAL MODULE: ./src/app/consts/techs.js
var techs = __webpack_require__(928);
// EXTERNAL MODULE: ./src/app/consts/media.js + 1 modules
var media = __webpack_require__(934);
;// ./src/app/components/Project.js





function mapLinks(links, projectId) {
    function map(link) {
        // GitHub button links to internal project detail page
        if (link === "github") {
            return /*html*/ `<a href="/projects#${projectId}" class="button">Details =></a>`;
        }

        let href =
            "https://" + (link === "live" ? "" : websites/* default */.A[link]) + links[link];

        if (link === "figma") href = `https://figma.com/community/file/${links[link]}`

        const className = link === "cached" ? "button__secondary" : "";
        const name = `${link[0].toUpperCase()}${link.slice(1)}`;

        return /*html*/ `<a href="${href}" target="_blank" rel="noopener noreferrer" class="button ${className}">${name} =></a>`;
    }

    return Object.keys(links).map(map).join("");
}

/* harmony default export */ const Project = (({ id }, t) => {
    const { hasImage, techs: projectTech, links } = projects/* default */.A.find(
        (project) => project.id === id
    );

    return /*html*/ `
        <div class="project">
            ${hasImage
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
                <div class="project__links">${mapLinks(links, id)}</div>
            </div>
        </div> 
    `;
});

;// ./src/app/components/ProjectList.js




/* harmony default export */ const ProjectList = (({ title, filter = () => true, limit = projects/* default */.A.length }, t) => {
    return /*html*/ `
            ${title ? `<div> <h2 class="h2">${title}</h2>` : ""}
            <div class="project-list">
                ${projects/* default */.A
                    .filter(filter)
                    .slice(0, limit)
                    .sort((a, b) => a.hasImage - b.hasImage)
                    .map(({ id }) => Project({ id }, t))
                    .join("")}
            </div>
        ${title ? "</div>" : ""}
    `;
});


/***/ },

/***/ 427
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ },

/***/ 515
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ },

/***/ 635
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projects);


/***/ },

/***/ 778
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ 852
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ES: () => (/* binding */ getProjectDetails)
/* harmony export */ });
/* unused harmony export getAllProjectIds */
/**
 * Detailed content for each project's detail page
 */
const projectDetails = {
    "realtime-booking-cdc": {
        overview: "A real-time data pipeline that captures booking events from CosmosDB using Change Data Capture (CDC) and processes them for analytics in Azure Synapse.",
        problemStatement: "Booking systems generate continuous streams of data that need to be captured, transformed, and made available for analytics in near real-time. Traditional batch processing creates delays and stale data for decision making.",
        architecture: `
            <h4>Data Flow</h4>
            <ol>
                <li><strong>Source:</strong> CosmosDB stores booking events with CDC enabled</li>
                <li><strong>Ingestion:</strong> Azure Data Factory reads CDC events and customer data from ADLS</li>
                <li><strong>Transformation:</strong> SCD-1 applied on customer dimension for current state</li>
                <li><strong>Loading:</strong> Upsert transformed booking facts into Azure Synapse DWH</li>
            </ol>
        `,
        technologies: [
            { name: "Azure CosmosDB", purpose: "Source database with CDC capability" },
            { name: "Azure Data Factory", purpose: "Orchestration and data movement" },
            { name: "Azure Data Lake Storage", purpose: "Raw and staging data storage" },
            { name: "Azure Synapse Analytics", purpose: "Data warehouse for analytics" },
            { name: "Python", purpose: "Custom transformations and data quality" }
        ],
        keyFeatures: [
            "Real-time CDC capture from CosmosDB",
            "SCD-1 implementation for customer dimension",
            "Upsert logic for booking fact tables",
            "Automated pipeline scheduling and monitoring"
        ],
        implementation: `
            <p>The pipeline uses Azure Data Factory's mapping data flows to handle CDC events. Each booking event is enriched with customer data, validated, and upserted into the Synapse warehouse using MERGE statements.</p>
            <p>The SCD-1 pattern ensures customer records always reflect the latest state, simplifying downstream analytics queries.</p>
        `,
        results: "Reduced data latency from hours to minutes, enabling real-time booking analytics and operational dashboards.",
        githubLink: "https://github.com/ranjanyadav/realtime-booking-cdc-pipeline"
    },

    "fintech-datalake": {
        overview: "A complete data lake migration from SQL Database to Azure Data Lake Storage, implementing the Medallion Architecture (Bronze → Silver → Gold) using Delta Tables.",
        problemStatement: "Legacy SQL databases become bottlenecks as data volume grows. A modern lakehouse architecture provides scalability, cost efficiency, and flexibility for diverse analytics workloads.",
        architecture: `
            <h4>Medallion Architecture</h4>
            <ol>
                <li><strong>Bronze Layer:</strong> Raw data ingested from SQL DB, stored as-is</li>
                <li><strong>Silver Layer:</strong> Cleansed, validated, and deduplicated data</li>
                <li><strong>Gold Layer:</strong> Business-level aggregates and curated datasets</li>
            </ol>
        `,
        technologies: [
            { name: "Azure Synapse Pipelines", purpose: "Dynamic pipeline for data movement" },
            { name: "PySpark", purpose: "Large-scale data transformations" },
            { name: "Delta Lake", purpose: "ACID transactions and time travel" },
            { name: "Azure Data Lake Storage Gen2", purpose: "Scalable data lake storage" }
        ],
        keyFeatures: [
            "Dynamic pipeline with parameterized table ingestion",
            "Delta Tables with ACID compliance",
            "Schema evolution handling",
            "Time travel for data versioning"
        ],
        implementation: `
            <p>Built a metadata-driven Synapse pipeline that dynamically reads table configurations and ingests data in parallel. PySpark notebooks handle transformations between layers with quality checks at each stage.</p>
            <p>Delta Lake provides reliability with ACID transactions and enables both streaming and batch workloads on the same data.</p>
        `,
        results: "Successfully migrated 50+ tables with zero data loss. Reduced query times by 70% and storage costs by 40%.",
        githubLink: "https://github.com/ranjanyadav/fintech-medallion-architecture"
    },

    "lowlatency-upi": {
        overview: "A real-time streaming solution using Spark Structured Streaming to process UPI settlements with low-latency updates for merchant payment reconciliation.",
        problemStatement: "UPI payment settlements require near real-time processing for accurate merchant reconciliation. Batch processing introduces delays that affect cash flow visibility.",
        architecture: `
            <h4>Streaming Pipeline</h4>
            <ol>
                <li><strong>Source:</strong> CDC feeds from Delta table with payment transactions</li>
                <li><strong>Processing:</strong> Spark Structured Streaming with rolling aggregations</li>
                <li><strong>Sink:</strong> MERGE operations to target Delta table</li>
            </ol>
        `,
        technologies: [
            { name: "Spark Structured Streaming", purpose: "Real-time stream processing" },
            { name: "Delta Lake", purpose: "Source and sink with CDC support" },
            { name: "Databricks", purpose: "Unified analytics platform" }
        ],
        keyFeatures: [
            "Sub-minute latency for payment updates",
            "Rolling window aggregations for settlement totals",
            "Exactly-once processing with checkpointing",
            "MERGE operations for upsert semantics"
        ],
        implementation: `
            <p>The streaming job reads from a Delta table's change feed, applies 15-minute rolling windows for aggregations, and merges results into the settlement table. Watermarking handles late-arriving data gracefully.</p>
        `,
        results: "Achieved 30-second end-to-end latency for settlement updates, enabling real-time merchant dashboards.",
        githubLink: "https://github.com/ranjanyadav/upi-spark-streaming"
    },

    "scd2-customer-quality": {
        overview: "An ingestion pipeline with data quality enforcement using PyDeequ and SCD-2 implementation for maintaining complete customer history.",
        problemStatement: "Customer data changes frequently, and maintaining historical records is crucial for analytics. Data quality issues at ingestion can corrupt downstream systems.",
        architecture: `
            <h4>Pipeline Flow</h4>
            <ol>
                <li><strong>Ingestion:</strong> PySpark reads source data from cloud storage</li>
                <li><strong>Quality:</strong> PyDeequ validates data constraints</li>
                <li><strong>SCD-2:</strong> Merge with effective dates for history</li>
            </ol>
        `,
        technologies: [
            { name: "PySpark", purpose: "Data processing and transformations" },
            { name: "PyDeequ", purpose: "Data quality validation framework" },
            { name: "Databricks Workflows", purpose: "Pipeline orchestration" },
            { name: "Delta Lake", purpose: "Versioned storage" }
        ],
        keyFeatures: [
            "Automated data quality checks with configurable rules",
            "SCD-2 with effective_start and effective_end dates",
            "Failed records quarantine for review",
            "Audit logging for compliance"
        ],
        implementation: `
            <p>PyDeequ analyzers check for null values, uniqueness, and referential integrity before any merge. Valid records undergo SCD-2 merge that closes existing records and inserts new versions with updated effective dates.</p>
        `,
        results: "Reduced data quality incidents by 80% and enabled accurate historical customer analytics.",
        githubLink: "https://github.com/ranjanyadav/scd2-data-quality-pipeline"
    },

    "automated-healthcare-dlt": {
        overview: "An automated ETL pipeline using Delta Live Tables (DLT) for healthcare data with declarative transformations and built-in data quality expectations.",
        problemStatement: "Healthcare data requires strict quality controls and audit trails. Manual pipeline management is error-prone and doesn't scale.",
        architecture: `
            <h4>DLT Pipeline</h4>
            <ol>
                <li><strong>Bronze:</strong> Raw ingestion with @dlt.table decorator</li>
                <li><strong>Silver:</strong> Cleansed data with @dlt.expect constraints</li>
                <li><strong>Gold:</strong> Aggregated views for reporting</li>
            </ol>
        `,
        technologies: [
            { name: "Delta Live Tables", purpose: "Declarative ETL framework" },
            { name: "Databricks", purpose: "Platform for DLT execution" },
            { name: "SQL & Python", purpose: "Transformation logic" }
        ],
        keyFeatures: [
            "Declarative pipeline definition",
            "Built-in data quality expectations",
            "Automatic lineage tracking",
            "Incremental processing with auto-optimization"
        ],
        implementation: `
            <p>DLT handles pipeline orchestration, dependency management, and error recovery automatically. Expectations defined inline ensure data quality without separate validation steps. The Unity Catalog integration provides governance and lineage visualization.</p>
        `,
        results: "Reduced pipeline development time by 60% and achieved 99.9% data quality compliance.",
        githubLink: "https://github.com/ranjanyadav/healthcare-dlt-pipeline"
    },

    "azure-stream-analytics": {
        overview: "Real-time analytics for ticket sales and payments using Azure Event Hub and Stream Analytics with window-based joins.",
        problemStatement: "Event-driven ticket sales need real-time correlation with payment confirmations for accurate sales reporting and fraud detection.",
        architecture: `
            <h4>Stream Processing</h4>
            <ol>
                <li><strong>Ingestion:</strong> Azure Event Hub receives booking and payment streams</li>
                <li><strong>Processing:</strong> Stream Analytics joins and aggregates</li>
                <li><strong>Output:</strong> Results written to Synapse table</li>
            </ol>
        `,
        technologies: [
            { name: "Azure Event Hub", purpose: "Event ingestion and buffering" },
            { name: "Azure Stream Analytics", purpose: "Real-time stream processing" },
            { name: "Azure Synapse", purpose: "Analytics data store" },
            { name: "Python", purpose: "Mock data generation" }
        ],
        keyFeatures: [
            "Tumbling and sliding window aggregations",
            "Stream-to-stream joins for correlation",
            "Real-time anomaly detection",
            "Built-in monitoring and alerts"
        ],
        implementation: `
            <p>Stream Analytics SQL joins booking events with payment confirmations using a 5-minute tumbling window. Unmatched bookings are flagged for review. Aggregations power real-time sales dashboards.</p>
        `,
        results: "Enabled real-time sales visibility and reduced payment reconciliation time from hours to seconds.",
        githubLink: "https://github.com/ranjanyadav/azure-stream-ticket-sales"
    },

    "event-driven-order": {
        overview: "An event-driven pipeline triggered by file arrivals in Google Cloud Storage, with SCD-1 merge and automated archival.",
        problemStatement: "Order data arrives as files at unpredictable intervals. Manual processing creates delays and risk of duplicate processing.",
        architecture: `
            <h4>Event-Driven Flow</h4>
            <ol>
                <li><strong>Trigger:</strong> File arrival in GCS triggers Databricks Workflow</li>
                <li><strong>Staging:</strong> Load data into staging Delta table</li>
                <li><strong>Merge:</strong> SCD-1 upsert to target table</li>
                <li><strong>Archive:</strong> Move source file to archive location</li>
            </ol>
        `,
        technologies: [
            { name: "Google Cloud Storage", purpose: "File-based data source" },
            { name: "Databricks Workflows", purpose: "Event-driven orchestration" },
            { name: "PySpark", purpose: "Data processing" },
            { name: "Delta Lake", purpose: "Target storage with ACID" }
        ],
        keyFeatures: [
            "Event-driven trigger on file arrival",
            "Idempotent processing with duplicate detection",
            "Automated file archival on success",
            "Failure handling with dead-letter queue"
        ],
        implementation: `
            <p>GCS notifications trigger Databricks workflows that validate, transform, and merge order data. Successful loads archive the source file; failures move it to an error folder with notification.</p>
        `,
        results: "Eliminated manual file processing and achieved near real-time order visibility.",
        githubLink: "https://github.com/ranjanyadav/event-driven-order-tracking"
    },

    "adf-cicd-deployment": {
        overview: "A complete CI/CD pipeline for Azure Data Factory using Azure DevOps, automating build and release across environments.",
        problemStatement: "Manual ADF deployments are error-prone and lack version control. Consistent, repeatable deployments require automation.",
        architecture: `
            <h4>CI/CD Pipeline</h4>
            <ol>
                <li><strong>Source:</strong> ADF artifacts in Git repository</li>
                <li><strong>Build:</strong> Validate and generate ARM templates</li>
                <li><strong>Release:</strong> Deploy to Dev → QA → Prod</li>
            </ol>
        `,
        technologies: [
            { name: "Azure DevOps", purpose: "CI/CD platform" },
            { name: "Azure Data Factory", purpose: "ETL platform being deployed" },
            { name: "ARM Templates", purpose: "Infrastructure as code" },
            { name: "PowerShell", purpose: "Deployment scripts" }
        ],
        keyFeatures: [
            "Git-based version control for ADF artifacts",
            "Automated ARM template generation",
            "Multi-stage pipeline (Dev → QA → Prod)",
            "Pre and post deployment validation"
        ],
        implementation: `
            <p>The build pipeline validates ADF JSON artifacts and generates ARM templates. Release pipelines use parameter files per environment, with approvals gates between stages. Post-deployment tests verify critical pipelines.</p>
        `,
        results: "Reduced deployment time from hours to minutes and eliminated environment configuration drift.",
        githubLink: "https://github.com/ranjanyadav/adf-cicd-azure-devops"
    }
};

function getProjectDetails(projectId) {
    return projectDetails[projectId] || null;
}

function getAllProjectIds() {
    return Object.keys(projectDetails);
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (projectDetails)));


/***/ },

/***/ 928
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ }

}]);