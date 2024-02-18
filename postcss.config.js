// all of this is for production only

const purgeCSS = require('@fullhuman/postcss-purgecss')
const postcssLightningcss = require("postcss-lightningcss")

module.exports = {
	plugins: [
		purgeCSS({
			config: "./purgecss.config.js"
		}),
		postcssLightningcss({
			browsers: "defaults", // per `https://browsersl.ist/`
			lightningcssOptions: {
				minify: true,
				cssModules: false,
				drafts: {
					nesting: true // for whenever Sass starts "emitting" it
				}
			}
		})
	]
}
