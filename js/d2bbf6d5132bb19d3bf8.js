"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([["src_app_views_Tags_js"],{

/***/ "./src/app/views/Tags.js":
/*!*******************************!*\
  !*** ./src/app/views/Tags.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var styles_pages_tags_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styles/pages/tags.sass */ \"./src/assets/styles/pages/tags.sass\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((t) => {\n  const tags = [\n    { text: 'kafka', size: 'medium' },\n    { text: 'microservices', size: 'small' },\n    { text: 'distributed-systems', size: 'small' },\n    { text: 'faiss', size: 'small' },\n    { text: 'vector-search', size: 'small' },\n    { text: 'similarity-search', size: 'small' },\n    { text: 'ai', size: 'small' },\n    { text: 'airflow', size: 'medium' },\n    { text: 'data-pipelines', size: 'small' },\n    { text: 'workflow', size: 'small' },\n    { text: 'orchestration', size: 'xlarge' },\n    { text: 'etl', size: 'small' },\n    { text: 'machine-learning', size: 'small' },\n    { text: 'python', size: 'small' },\n    { text: 'docker', size: 'medium' },\n    { text: 'kubernetes', size: 'small' },\n    { text: 'cloud-native', size: 'small' },\n    { text: 'streaming', size: 'small' },\n    { text: 'real-time', size: 'small' },\n    { text: 'analytics', size: 'medium' },\n    { text: 'bigdata', size: 'small' },\n    { text: 'nosql', size: 'small' },\n    { text: 'sql', size: 'small' },\n    { text: 'database', size: 'xlarge' },\n    { text: 'performance', size: 'small' },\n    { text: 'optimization', size: 'medium' },\n    { text: 'monitoring', size: 'small' },\n    { text: 'devops', size: 'xlarge' },\n    { text: 'automation', size: 'small' },\n    { text: 'scalability', size: 'xlarge' }\n  ];\n\n  const getSizeClass = (size) => {\n    const sizeMap = {\n      'small': 'tag-small',\n      'medium': 'tag-medium',\n      'large': 'tag-large',\n      'xlarge': 'tag-xlarge',\n      'xxlarge': 'tag-xxlarge'\n    };\n    return sizeMap[size] || 'tag-medium';\n  };\n\n  return /*html*/`\n    <div class=\"tags-page\">\n        <div class=\"blog-post-nav\">\n            <a href=\"/blog\" class=\"blog-post-nav__back\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path d=\"M19 12H5\"/>\n                    <path d=\"M12 19l-7-7 7-7\"/>\n                </svg>\n                Back to all posts\n            </a>\n        </div>\n      <div class=\"tags-header\">\n        <h1 class=\"tags-title\">Tags</h1>\n        <p class=\"tags-subtitle\">There are currently ${tags.length} tags</p>\n      </div>\n      \n      <div class=\"tag-cloud\">\n        ${tags.map(tag => `\n          <a\n            href=\"/blog?tag=${encodeURIComponent(tag.text)}\"\n            class=\"tag-cloud__button tag-underline ${getSizeClass(tag.size)}\"\n            data-tag=\"${tag.text}\"\n          >\n            ${tag.text}\n          </a>\n        `).join('')}\n      </div>\n    </div>\n  `;\n});\n\n//# sourceURL=webpack://portfolio/./src/app/views/Tags.js?");

/***/ }),

/***/ "./src/assets/styles/pages/tags.sass":
/*!*******************************************!*\
  !*** ./src/assets/styles/pages/tags.sass ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://portfolio/./src/assets/styles/pages/tags.sass?");

/***/ })

}]);