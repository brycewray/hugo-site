module.exports = {
	plugins: [
		require("postcss-import")({
			path: [
				'assets/css'
			],
		}),
		require("postcss-nesting"),
		// require('@fullhuman/postcss-purgecss')({
		// 	content: [
		// 		'./hugo_stats.json',
		// 		'./layouts/**/*.html',
		// 		'./assets/**/*.js'
		// 	],
		// 	safelist: {
		// 		// borrowing from:
		// 		// https://discourse.gohugo.io/t/purgecss-and-highlighting/41021
		// 		// https://github.com/gohugoio/hugo/issues/10338
		// 		// https://github.com/davidsneighbour/kollitsch.dev/commit/9895e2c24422977c6065a8d40edc69e07331c981
		// 		greedy: [
		// 			/highlight/,
		// 			/chroma/
		// 		],
		// 	},
		// })
	]
}
