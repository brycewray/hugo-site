// all of this is for production only

const purgeCSS =
	require('@fullhuman/postcss-purgecss')({
		config: "./purgecss.config.js"
	})
const cssNano =
	require('cssnano')({
		preset: "default"
	})
const autoPrefixer =
	require('autoprefixer')({})

module.exports = {
	plugins: [
		autoPrefixer,
		purgeCSS,
		cssNano
	]
}
