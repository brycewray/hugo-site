const postcssLightningcss = require("postcss-lightningcss");
const postcssImport = require('postcss-import');

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
