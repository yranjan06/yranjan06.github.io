"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([["src_app_views_Categories_js"],{

/***/ "./src/app/views/Categories.js":
/*!*************************************!*\
  !*** ./src/app/views/Categories.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var styles_pages_categories_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styles/pages/categories.sass */ \"./src/assets/styles/pages/categories.sass\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((t) => {\n  const tags = [\n    { text: 'Deep Learning', size: 'small' },\n    { text: 'Neural Networks', size: 'xlarge' },\n    { text: 'Computer Vision', size: 'small' },\n    { text: 'NLP', size: 'medium' },\n    { text: 'Reinforcement Learning', size: 'small' },\n    { text: 'GANs', size: 'small' },\n    { text: 'PyTorch', size: 'small' },\n    { text: 'TensorFlow', size: 'small' },\n    { text: 'Scikit-learn', size: 'small' },\n    { text: 'Data Pipelines', size: 'medium' },\n    { text: 'ETL', size: 'small' },\n    { text: 'Apache Spark', size: 'small' },\n    { text: 'Apache Kafka', size: 'xlarge' },\n    { text: 'Data Warehousing', size: 'small' },\n    { text: 'Big Data', size: 'xlarge' },\n    { text: 'SQL', size: 'small' },\n    { text: 'NoSQL', size: 'small' },\n    { text: 'Docker', size: 'small' },\n    { text: 'Kubernetes', size: 'medium' },\n    { text: 'Cloud Computing', size: 'xlarge' },\n    { text: 'Web Scraping', size: 'small' },\n    { text: 'Stream Processing', size: 'medium' },\n    { text: 'Feature Engineering', size: 'small' },\n    { text: 'Model Deployment', size: 'small' },\n    { text: 'MLOps', size: 'small' }\n  ];\n\n  const getSizeClass = (size) => {\n    const sizeMap = {\n      'small': 'tag-small',\n      'medium': 'tag-medium',\n      'large': 'tag-large',\n      'xlarge': 'tag-xlarge',\n      'xxlarge': 'tag-xxlarge'\n    };\n    return sizeMap[size] || 'tag-medium';\n  };\n\n\n\n  return /*html*/`\n    <div class=\"categories-page\">\n        <div class=\"blog-post-nav\">\n            <a href=\"/blog\" class=\"blog-post-nav__back\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path d=\"M19 12H5\"/>\n                    <path d=\"M12 19l-7-7 7-7\"/>\n                </svg>\n                Back to all posts\n            </a>\n        </div>\n      <div class=\"categories-header\">\n        <h1 class=\"categories-title\">Categories</h1>\n        <p class=\"categories-subtitle\">There are currently ${tags.length} categories</p>\n      </div>\n      \n      <div class=\"tag-cloud\">\n        ${tags.map(tag => `\n          <a\n            href=\"/blog?category=${encodeURIComponent(tag.text)}\"\n            class=\"tag-cloud__button tag-underline ${getSizeClass(tag.size)}\"\n            data-tag=\"${tag.text}\"\n          >\n            ${tag.text}\n          </a>\n        `).join('')}\n      </div>\n    </div>\n  `;\n});\n\n\n//# sourceURL=webpack://portfolio/./src/app/views/Categories.js?");

/***/ }),

/***/ "./src/assets/styles/pages/categories.sass":
/*!*************************************************!*\
  !*** ./src/assets/styles/pages/categories.sass ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://portfolio/./src/assets/styles/pages/categories.sass?");

/***/ })

}]);