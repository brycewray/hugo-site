module.exports = {
	content: [
		"./hugo_stats.json",
		"./assets/**/*.js"
	],
	css: ['./assets/**/*.css'],
	output: './assets/lcss',
	safelist: {
		standard: [
			/^\:.*/,
			/shadow/,
			/rounded-bkgd/
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
			/pf/,
			/border/,
			/bquote/,
			/bkgd/,
			/box/,
			/mono/,
			/slate-/,
			/gray-/,
			/neutral-400/,
			/neutral-600/,
			/red-300/,
			/red-400/,
			/red-600/,
			/red-700/,
			/orange-300/,
			/orange-700/,
			/yellow-200/,
			/yellow-300/,
			/yellow-800/,
			/green-100/,
			/green-600/,
			/emerald-050/,
			/emerald-200/,
			/emerald-700/,
			/emerald-900/,
			/cyan-300/,
			/cyan-600/,
			/blue-/,
			/fuchsia-300/,
			/fuchsia-700/,
			/rose-300/,
			/rose-700/,
			/filter/
		]
	},
	variables: true
}
