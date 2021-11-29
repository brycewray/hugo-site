// runs in the base template after lazyload itself;
// mitigates CSP's refusing to load inline script

import LazyLoad from './assets/js/lazyload_17-5-0.esm.js'
import flyingPages from './assets/js/flying-pages_2-1-2.mod.js'

var lazyLoadInstance = new LazyLoad({
  threshold: 150,
})

window.FPConfig = {
  ignoreKeywords: [
    'index.xml',
    'index.json',
    '/about',
    '/privacy',
    '/contact',
    '/sitemap',
    '/sitemap.xml'
  ],
}

flyingPages()
