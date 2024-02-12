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
		deep: [
			/chroma/,
			/pagefind/,
			/contactButton/
		],
		greedy: [
			/input$/,
			/highlight/,
			/code-inline/
		],
		variables: [
			/blue-800/
		]
	},
	variables: true
}
