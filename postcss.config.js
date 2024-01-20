const postcssLightningcss = require("postcss-lightningcss");
let minOpt

if (process.env.HUGO_ENVIRONMENT === 'production') {
	minOpt = true
} else {
	minOpt = false
}

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
