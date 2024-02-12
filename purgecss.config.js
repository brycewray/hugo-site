module.exports = {
	content: [
		"./hugo_stats.json",
		"./assets/**/*.js"
	],
	css: ['./assets/css/**/*.css'],
	output: './assets/css',
	safelist: {
		standard: [
			/^\:.*/
		],
		greedy: [
			/input$/,
			/highlight/,
			/chroma/,
			/code-inline/,
			/contactButton/,
			/pagefind/,
			/:is\(.chroma,.code-inline\).*/gm
		]
	},
	rejected: true,
	rejectedCss: true
}
