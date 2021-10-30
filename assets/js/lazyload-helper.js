// runs in the base template after lazyload itself;
// mitigates CSP's refusing to load inline script

var lazyLoadInstance = new LazyLoad({
  threshold: 150,
})