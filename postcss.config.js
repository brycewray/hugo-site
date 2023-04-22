module.exports = {
	plugins: [
		require("postcss-import")({
			path: [
				'assets/css'
			],
		}),
		require("postcss-nesting"),
	]
}
