const postcssImport = require("postcss-import");

module.exports = {
	plugins: [
		postcssImport({
			path: "./assets/css/",
		}),
		require("postcss-nesting"),
	]
}
