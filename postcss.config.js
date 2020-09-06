const postcssImport = require('postcss-import')
const postcssNesting = require('postcss-nesting')
const postcssClean = require('postcss-clean')

module.exports = {
  plugins: [
    require('postcss-preset-env')({ stage: 1 }),
    postcssImport({
      path: 'assets/css',
    }),
    require('tailwindcss'),
    postcssNesting({}),
    postcssClean({})
  ],
}