// plugins for production only; Hugo will handle `@import`s

const postcssPresetEnv =
	require('postcss-preset-env')({
		stage: 2,
		features: {
			'nesting-rules': true,
			'oklab-function': {
				preserve: true
			}
		}
	})
// const purgeCSS =
// 	require('@fullhuman/postcss-purgecss')({
// 		config: "./purgecss.config.js"
// 	})
// const autoPrefixer =
// 	require('autoprefixer')({})
const cssNano =
	require('cssnano')({
		preset: ['default', {
//			colormin: false,
	}]
})

module.exports = {
	plugins: [
		// autoPrefixer,
		...process.env.HUGO_ENVIRONMENT === 'production'
		? [postcssPresetEnv, cssNano]
		: []
	]
}
