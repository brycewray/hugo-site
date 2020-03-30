const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')
const cssvariables = require('postcss-css-variables')
const postcssPartialImport = require ('postcss-partial-import')
const postcssNesting = require('postcss-nesting')

module.exports = {
  plugins: [
    require('postcss-preset-env'),
    postcssPresetEnv({
      stage: 0,
      browsers: [
        'last 2 versions',
        'IE 11',
      ],
      features: {
        'nesting-rules': true,
        'custom-properties': true,
      },
    }),
    postcssPartialImport({
      root: './assets/css/',
    }),
    cssvariables({}),
    postcssNesting({}),
    process.env.NODE_ENV === 'production' 
    ? cssnano({ preset: 'default' })
    : null,
  ],
}