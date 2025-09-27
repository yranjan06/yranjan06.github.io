"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([["src_app_views_About_js"],{

/***/ "./src/app/blocks/about/About.js":
/*!***************************************!*\
  !*** ./src/app/blocks/about/About.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((t) => {\n    return /*html*/`\n        <section class=\"about\">\n            <div class=\"about__illustrations\">\n                <img src=\"/images/about-me.png\" alt=\"\" class=\"about__image\">\n            </div>\n            <div class=\"about__text\">\n                ${t.description.map(text => /*html*/`\n                    <p class=\"about__description\">${text}</p>\n                `).join(\"\")}\n            </div>\n        </section>\n    `\n});\n\n//# sourceURL=webpack://portfolio/./src/app/blocks/about/About.js?");

/***/ }),

/***/ "./src/app/blocks/about/Facts.js":
/*!***************************************!*\
  !*** ./src/app/blocks/about/Facts.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((t) => {\n    return /*html*/`\n        <section class=\"facts\">\n            <h2 class=\"h2\">${t.title}</h2>\n            <div class=\"facts__content\">\n                <ul class=\"facts__list\">\n                    ${t.list.map(fact => /*html*/`\n                        <li class=\"fact\">${fact}</li>\n                    `).join(\"\")}\n                </ul>\n                <div class=\"facts__illustrations\">\n                    \n                </div>\n            </div>\n\n        </section>\n    `\n});\n\n//# sourceURL=webpack://portfolio/./src/app/blocks/about/Facts.js?");

/***/ }),

/***/ "./src/app/blocks/about/Skills.js":
/*!****************************************!*\
  !*** ./src/app/blocks/about/Skills.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _components_SkillBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/SkillBlock */ \"./src/app/components/SkillBlock.js\");\n/* harmony import */ var _consts_skills__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/consts/skills */ \"./src/app/consts/skills.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((t, t2) => {\n    return /*html*/`\n        <section class=\"skills\">\n            <h2 class=\"h2\">${t.title}</h2>\n            <div class=\"skills__content\">\n                ${Object.keys(_consts_skills__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n                            .map((id) => (0,_components_SkillBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({ id }, t2))\n                            .join(\"\")}\n            </div>\n        </section>\n    `\n});\n\n\n//# sourceURL=webpack://portfolio/./src/app/blocks/about/Skills.js?");

/***/ }),

/***/ "./src/app/components/Path.js":
/*!************************************!*\
  !*** ./src/app/components/Path.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({ description }) => {\n    return /*html*/`\n        <div class=\"path\">\n            <h1 class=\"h1 path__name\">${window.location.pathname.slice(1)}</h1>\n            <p class=\"path__description\">${description}</p>\n        </div>\n    `\n});\n\n//# sourceURL=webpack://portfolio/./src/app/components/Path.js?");

/***/ }),

/***/ "./src/app/components/SkillBlock.js":
/*!******************************************!*\
  !*** ./src/app/components/SkillBlock.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _consts_skills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/consts/skills */ \"./src/app/consts/skills.js\");\n/* harmony import */ var _consts_techs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/consts/techs */ \"./src/app/consts/techs.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({ id }, t) => {\n    return /*html*/ `\n        <div class=\"skill-block\">\n            <div class=\"skill-block__name\">${t[id]}</div>\n            <ul class=\"skill-block__list\">\n                ${(_consts_skills__WEBPACK_IMPORTED_MODULE_0__[\"default\"][id].map((techIndex) => _consts_techs__WEBPACK_IMPORTED_MODULE_1__[\"default\"][techIndex]))\n                    .map(\n                        (tech) =>\n                            /*html*/ `<li class=\"skill-block__skill\">${tech}</li>`\n                    )\n                    .join(\"\")}\n            </ul>\n        </div>\n    `;\n});\n\n\n//# sourceURL=webpack://portfolio/./src/app/components/SkillBlock.js?");

/***/ }),

/***/ "./src/app/consts/skills.js":
/*!**********************************!*\
  !*** ./src/app/consts/skills.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  // ──────────────── Core Languages ────────────────\n  language: [\"python\", \"sql\", \"scala\", \"java\", \"bash\"],\n\n  // ──────────────── Big Data & Streaming ────────────────\n  bigdata: [\"spark\", \"kafka\", \"hadoop\", \"flink\", \"databricks\"],\n\n  // ──────────────── Databases & Warehouses ────────────────\n  database: [\n    \"postgreSql\",\n    \"mysql\",\n    \"snowflake\",\n    \"redshift\",\n    \"bigquery\",\n    \"dynamodb\",\n    \"cassandra\"\n  ],\n\n  // ──────────────── Cloud Platforms ────────────────\n  cloud: [\"aws\", \"azure\", \"gcp\"],\n\n  // ──────────────── Tools & Orchestration ────────────────\n  tool: [\"airflow\", \"docker\", \"kubernetes\", \"terraform\", \"git\", \"githubActions\", \"cicd\"],\n\n  // ──────────────── Data Visualization ────────────────\n  visualization: [\"tableau\", \"powerbi\", \"looker\", \"matplotlib\", \"seaborn\"]\n});\n\n\n//# sourceURL=webpack://portfolio/./src/app/consts/skills.js?");

/***/ }),

/***/ "./src/app/consts/techs.js":
/*!*********************************!*\
  !*** ./src/app/consts/techs.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  // ──────────────── Core Programming Languages ────────────────\n  ts: \"TypeScript\",\n  js: \"JavaScript\",\n  python: \"Python\",\n  scala: \"Scala\",\n  java: \"Java\",\n  bash: \"Bash\",\n  sql: \"SQL\",\n\n  // ──────────────── Web & Frontend ────────────────\n  html: \"HTML\",\n  css: \"CSS\",\n  sass: \"SASS\",\n  scss: \"SCSS\",\n  less: \"Less\",\n  stylus: \"Stylus\",\n  ejs: \"EJS\",\n  jinja: \"Jinja2\",\n  pug: \"Pug\",\n  react: \"React\",\n  preact: \"Preact\",\n  next: \"Next\",\n  webpack: \"WebPack\",\n  gulp: \"Gulp\",\n  zod: \"Zod\",\n  rtk: \"RTK\",\n\n  // ──────────────── Backend & Frameworks ────────────────\n  node: \"Node.js\",\n  express: \"Express\",\n  flask: \"Flask\",\n  quart: \"Quart\",\n  deno: \"Deno\",\n  discordJs: \"Discord.js\",\n  pixijs: \"PixiJS\",\n\n  // ──────────────── Databases & Warehouses ────────────────\n  sqlite: \"SQLite\",\n  mongo: \"MongoDB\",\n  postgreSql: \"PostgreSQL\",\n  mysql: \"MySQL\",\n  snowflake: \"Snowflake\",\n  redshift: \"AWS Redshift\",\n  bigquery: \"Google BigQuery\",\n  dynamodb: \"DynamoDB\",\n  cassandra: \"Cassandra\",\n\n  // ──────────────── Big Data & Streaming ────────────────\n  spark: \"Apache Spark\",\n  kafka: \"Apache Kafka\",\n  hadoop: \"Hadoop Ecosystem\",\n  flink: \"Apache Flink\",\n  databricks: \"Databricks\",\n\n  // ──────────────── Cloud Platforms ────────────────\n  aws: \"AWS\",\n  azure: \"Azure\",\n  gcp: \"Google Cloud Platform\",\n\n  // ──────────────── Tools & Orchestration ────────────────\n  airflow: \"Apache Airflow\",\n  docker: \"Docker\",\n  kubernetes: \"Kubernetes\",\n  terraform: \"Terraform\",\n  git: \"Git & GitHub\",\n  githubActions: \"GitHub Actions\",\n  cicd: \"CI/CD\",\n\n  // ──────────────── Data Visualization ────────────────\n  tableau: \"Tableau\",\n  powerbi: \"Power BI\",\n  looker: \"Looker\",\n  matplotlib: \"Matplotlib\",\n  seaborn: \"Seaborn\",\n\n  // ──────────────── Tools & Editors ────────────────\n  vscode: \"VSCode\",\n  nvim: \"NeoVim\",\n  figma: \"Figma\",\n  xfce: \"XFCE\",\n});\n\n\n//# sourceURL=webpack://portfolio/./src/app/consts/techs.js?");

/***/ }),

/***/ "./src/app/views/About.js":
/*!********************************!*\
  !*** ./src/app/views/About.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _components_Path_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/Path.js */ \"./src/app/components/Path.js\");\n/* harmony import */ var _blocks_about_About_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/blocks/about/About.js */ \"./src/app/blocks/about/About.js\");\n/* harmony import */ var _blocks_about_Skills_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/blocks/about/Skills.js */ \"./src/app/blocks/about/Skills.js\");\n/* harmony import */ var _blocks_about_Facts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/blocks/about/Facts.js */ \"./src/app/blocks/about/Facts.js\");\n/* harmony import */ var styles_pages_about_sass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styles/pages/about.sass */ \"./src/assets/styles/pages/about.sass\");\n\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((t, locale) => {\n    return /*html*/ `\n        ${(0,_components_Path_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({ description: t.description })}\n        ${(0,_blocks_about_About_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(t.about)}\n        ${(0,_blocks_about_Skills_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(t.skills, locale.skills)}\n        ${(0,_blocks_about_Facts_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(t.facts)}\n    `;\n});\n\n\n//# sourceURL=webpack://portfolio/./src/app/views/About.js?");

/***/ }),

/***/ "./src/assets/styles/pages/about.sass":
/*!********************************************!*\
  !*** ./src/assets/styles/pages/about.sass ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://portfolio/./src/assets/styles/pages/about.sass?");

/***/ })

}]);