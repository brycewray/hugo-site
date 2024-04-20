// for production only

const purgeCSS =
	require('@fullhuman/postcss-purgecss')({
		config: "./purgecss.config.js"
	})
const autoPrefixer =
	require('autoprefixer')({})

module.exports = {
	plugins: [
		...process.env.HUGO_ENVIRONMENT === 'production'
		? [purgeCSS, autoPrefixer]
		: []
	]
}
