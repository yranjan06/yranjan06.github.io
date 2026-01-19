"use strict";
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([[197],{

/***/ 197
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((t) => {
  const tags = [
    { text: 'Deep Learning', size: 'small' },
    { text: 'Neural Networks', size: 'xlarge' },
    { text: 'Computer Vision', size: 'small' },
    { text: 'NLP', size: 'medium' },
    { text: 'Reinforcement Learning', size: 'small' },
    { text: 'GANs', size: 'small' },
    { text: 'PyTorch', size: 'small' },
    { text: 'TensorFlow', size: 'small' },
    { text: 'Scikit-learn', size: 'small' },
    { text: 'Data Pipelines', size: 'medium' },
    { text: 'ETL', size: 'small' },
    { text: 'Apache Spark', size: 'small' },
    { text: 'Apache Kafka', size: 'xlarge' },
    { text: 'Data Warehousing', size: 'small' },
    { text: 'Big Data', size: 'xlarge' },
    { text: 'SQL', size: 'small' },
    { text: 'NoSQL', size: 'small' },
    { text: 'Docker', size: 'small' },
    { text: 'Kubernetes', size: 'medium' },
    { text: 'Cloud Computing', size: 'xlarge' },
    { text: 'Web Scraping', size: 'small' },
    { text: 'Stream Processing', size: 'medium' },
    { text: 'Feature Engineering', size: 'small' },
    { text: 'Model Deployment', size: 'small' },
    { text: 'MLOps', size: 'small' }
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
    <div class="categories-page">
        <div class="blog-post-nav">
            <a href="/blog" class="blog-post-nav__back">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5"/>
                    <path d="M12 19l-7-7 7-7"/>
                </svg>
                Back to all posts
            </a>
        </div>
      <div class="categories-header">
        <h1 class="categories-title">Categories</h1>
        <p class="categories-subtitle">There are currently ${tags.length} categories</p>
      </div>
      
      <div class="tag-cloud">
        ${tags.map(tag => `
          <a
            href="/blog?category=${encodeURIComponent(tag.text)}"
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


/***/ }

}]);