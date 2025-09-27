"use strict";
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([[840],{

/***/ 840:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((t) => {
  const tags = [
    { text: 'kafka', size: 'medium' },
    { text: 'microservices', size: 'small' },
    { text: 'distributed-systems', size: 'small' },
    { text: 'faiss', size: 'small' },
    { text: 'vector-search', size: 'small' },
    { text: 'similarity-search', size: 'small' },
    { text: 'ai', size: 'small' },
    { text: 'airflow', size: 'medium' },
    { text: 'data-pipelines', size: 'small' },
    { text: 'workflow', size: 'small' },
    { text: 'orchestration', size: 'xlarge' },
    { text: 'etl', size: 'small' },
    { text: 'machine-learning', size: 'small' },
    { text: 'python', size: 'small' },
    { text: 'docker', size: 'medium' },
    { text: 'kubernetes', size: 'small' },
    { text: 'cloud-native', size: 'small' },
    { text: 'streaming', size: 'small' },
    { text: 'real-time', size: 'small' },
    { text: 'analytics', size: 'medium' },
    { text: 'bigdata', size: 'small' },
    { text: 'nosql', size: 'small' },
    { text: 'sql', size: 'small' },
    { text: 'database', size: 'xlarge' },
    { text: 'performance', size: 'small' },
    { text: 'optimization', size: 'medium' },
    { text: 'monitoring', size: 'small' },
    { text: 'devops', size: 'xlarge' },
    { text: 'automation', size: 'small' },
    { text: 'scalability', size: 'xlarge' }
  ];

  const getSizeClass = (size) => {
    const sizeMap = {
      'small': 'tag-small',
      'medium': 'tag-medium',
      'large': 'tag-large',
      'xlarge': 'tag-xlarge',
      'xxlarge': 'tag-xxlarge'
    };
    return sizeMap[size] || 'tag-medium';
  };

  return /*html*/`
    <div class="tags-page">
        <div class="blog-post-nav">
            <a href="/blog" class="blog-post-nav__back">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5"/>
                    <path d="M12 19l-7-7 7-7"/>
                </svg>
                Back to all posts
            </a>
        </div>
      <div class="tags-header">
        <h1 class="tags-title">Tags</h1>
        <p class="tags-subtitle">There are currently ${tags.length} tags</p>
      </div>
      
      <div class="tag-cloud">
        ${tags.map(tag => `
          <a
            href="/blog?tag=${encodeURIComponent(tag.text)}"
            class="tag-cloud__button tag-underline ${getSizeClass(tag.size)}"
            data-tag="${tag.text}"
          >
            ${tag.text}
          </a>
        `).join('')}
      </div>
    </div>
  `;
});

/***/ })

}]);