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

export default projects;
