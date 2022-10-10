import flyingPages from './assets/js/flying-pages_2-1-2.mod.js'

window.FPConfig = {
  ignoreKeywords: [
    'index.xml',
    'index.json',
    '/about/',
		'/posts/page/',
    '/privacy/',
    '/contact/',
		'/search/',
    '/sitemap/',
    '/sitemap.xml'
  ],
}

flyingPages()
