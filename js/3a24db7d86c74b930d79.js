"use strict";
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([[847],{

/***/ 847
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Path_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(778);
/* harmony import */ var _components_ProjectList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(975);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((t, t2) => {
    return /*html*/ `
        ${(0,_components_Path_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({ description: t.description })}
        ${(0,_components_ProjectList_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)({ title: t.major, filter: (p) => p.isMajor }, t2.projects)}
        ${(0,_components_ProjectList_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)({ title: t.decent, filter: (p) => !p.isSmall && !p.isMajor }, t2.projects)}
        ${(0,_components_ProjectList_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)({ title: t.small, filter: (p) => p.isSmall && !p.isInProgress }, t2.projects)}
    `;
});


/***/ }

}]);