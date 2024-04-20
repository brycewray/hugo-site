// plugins for production only; Hugo will handle `@import`s

// const postcssPresetEnv =
// 	require('postcss-preset-env')({
// 		stage: 2,
// 		// features: {
// 		// 	'nesting-rules': true
// 		// }
// 	})
const purgeCSS =
	require('@fullhuman/postcss-purgecss')({
		config: "./purgecss.config.js"
	})
const autoPrefixer =
	require('autoprefixer')({})
// const cssNano =
// 	require('cssnano')({
// 		preset: "default"
// 	})

module.exports = {
	plugins: [
		...process.env.HUGO_ENVIRONMENT === 'production'
		? [purgeCSS, autoPrefixer]
		: []
	]
}
