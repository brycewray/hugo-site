const postcssLightningcss = require("postcss-lightningcss");
let minOpt

process.env.HUGO_ENVIRONMENT === 'production'
	? minOpt = true // <-- default for `minify`
	: minOpt = false

module.exports = {
	plugins: [
		postcssLightningcss({
			browsers: ">= 2%",
			lightningcssOptions: {
				minify: minOpt,
				cssModules: false,
				drafts: {
					nesting: true,
				}
			}
		}),
	]
}
