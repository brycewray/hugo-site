// runs in the base template after lazyload itself;
// mitigates CSP's refusing to load inline script

import LazyLoad from './assets/js/lazyload_17-5-0.esm.min.js'
import flyingPages from './assets/js/flying-pages_2-1-2.esm.min.js'

var lazyLoadInstance = new LazyLoad({
  threshold: 150,
})

window.FPConfig = {
  delay: 2, // default = 0
  ignoreKeywords: [
    'index.xml',
    'index.json',
    '/about',
    '/privacy',
    '/contact',
    '/sitemap',
    '/sitemap.xml'
  ],
  maxRPS: 3, // default = 3
  hoverDelay: 200, // default = 50
}

flyingPages()
