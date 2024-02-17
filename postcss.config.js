const purgeCSS =
	require('@fullhuman/postcss-purgecss')({
		config: "./purgecss.config.js"
	})
const cssNano =
	require('cssnano')({
		preset: "default"
	})
const autoPrefixer = require('autoprefixer')({})

module.exports = {
	plugins: [
		autoPrefixer,
		...process.env.HUGO_ENVIRONMENT === 'production'
			? [purgeCSS, cssNano]
			: []
	]
}
