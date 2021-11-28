// runs in the base template after lazyload itself;
// mitigates CSP's refusing to load inline script

import LazyLoad from './assets/js/lazyload_17-5-0.esm.min.js'

var lazyLoadInstance = new LazyLoad({
  threshold: 150,
})
