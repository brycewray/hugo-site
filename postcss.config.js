const postcssLightningcss = require("postcss-lightningcss");

module.exports = {
	plugins: [
		postcssLightningcss({
			browsers: ">= 2%",
			lightningcssOptions: {
				cssModules: false,
				drafts: {
					nesting: true,
				}
			}
		}),
	]
}
