const postcssBundler = require('@csstools/postcss-bundler')
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
		postcssBundler,
		...process.env.HUGO_ENVIRONMENT === 'production'
		? [postcssPresetEnv, purgeCSS, cssNano]
		: []
	]
}
