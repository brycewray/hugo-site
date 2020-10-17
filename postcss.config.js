const postcssImport = require('postcss-import')
const postcssNesting = require('postcss-nesting')
const postcssClean = require('postcss-clean')
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    require('postcss-preset-env')({ stage: 1 }),
    postcssImport({
      path: 'assets/css',
    }),
    postcssNesting({}),
    postcssClean({}),
    purgecss({
      content: ['./**/*.html']
    })
  ],
}