const postcssImport = require('postcss-import');
const postcssLightningcss = require("postcss-lightningcss");

module.exports = {
	plugins: [
    postcssImport({
			path: "./themes/lcss/assets/css/",
		}),
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
