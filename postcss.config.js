const postcssImport = require('postcss-import')({
	path: "./assets/css/"
})
const postcssPresetEnv =
	require('postcss-preset-env')({
		stage: 2,
		features: {
			'nesting-rules': true
		}
	})
const purgeCSS =
	require('@fullhuman/postcss-purgecss')({
		config: "./purgecss.config.js"
	})
// const autoPrefixer =
// 	require('autoprefixer')({})
const cssNano =
	require('cssnano')({
		preset: "default"
	})

module.exports = {
	plugins: [
		// autoPrefixer,
		postcssImport,
		...process.env.HUGO_ENVIRONMENT === 'production'
		? [postcssPresetEnv, purgeCSS, cssNano]
		: []
	]
}
