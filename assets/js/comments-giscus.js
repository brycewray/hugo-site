/*

Previous `dataTheme` choices...
	- dataTheme = "preferred_color_scheme"
	- dataThemeLight = "https://www.brycewray.com/assets/css/giscus-preferred_light_LibreFranklin.css"
	- dataThemeDark = "https://www.brycewray.com/assets/css/giscus-preferred_dark_LibreFranklin.css"

h/t:
	- https://github.com/giscus/giscus/issues/336 (Sage Abdullah, Marcos Ruiz)
	- https://discord.com/channels/811491992285741077/1081301799551647895/threads/1136313039067553812 (Chris Ferdinandi)
*/

getGiscusTheme = () => {
	// const htmlDoc = document.querySelector("html")
	const themeStatus = localStorage.getItem("theme")
	let
		dataThemeAuto = "preferred_color_scheme",
		dataThemeLight = "light",
		dataThemeDark = "dark",
		giscusTheme = dataThemeAuto
	if (themeStatus === undefined || themeStatus === "auto") {
		giscusTheme = dataThemeAuto
	} else if (themeStatus === "light") {
		giscusTheme = dataThemeLight
	} else if (themeStatus === "dark") {
		giscusTheme = dataThemeDark
	}
	return giscusTheme
}

setGiscusTheme = () => {
	function sendMessage(message) {
		const iframe = document.querySelector('iframe.giscus-frame')
		if (!iframe) return
		iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app')
	}
	sendMessage({
		setConfig: {
			theme: getGiscusTheme(),
		},
	})
}

document.addEventListener('DOMContentLoaded', function () {
	const giscusAttributes = {
		"src": "https://giscus.app/client.js",
		"data-repo": "brycewray/comments",
		"data-repo-id": "R_kgDOHQK0bQ",
		"data-category": "Announcements",
		"data-category-id": "DIC_kwDOHQK0bc4CO1ew",
		"data-mapping": "pathname",
		"data-strict": "1",
		"data-reactions-enabled": "1",
		"data-emit-metadata": "0",
		"data-input-position": "bottom",
		"data-theme": getGiscusTheme(),
		"data-lang": "en",
		"crossorigin": "anonymous",
		"data-loading": "lazy",
		"async": "",
	}

	// Dynamically create script tag
	const giscusScript = document.createElement("script")
	Object.entries(giscusAttributes).forEach(([key, value]) => giscusScript.setAttribute(key, value))
	let divToAdd = document.querySelector('.giscus-comments')

	// Inject script when user clicks the `details` element
	let
		detailsGiscus = document.getElementById('data-comments'),
		commentsLegend = document.getElementById('legend-comments')
	detailsGiscus.addEventListener("toggle", toggleDetails)
	function toggleDetails() {
		divToAdd.appendChild(giscusScript)
		if (commentsLegend.innerHTML === 'View comments') {
			commentsLegend.innerHTML = 'Hide comments'
		} else {
			commentsLegend.innerHTML = 'View comments'
		}
	}
	// Update giscus theme when theme switcher is clicked
	const buttonLight = document.getElementById("lightMode")
	const buttonAuto = document.getElementById("autoMode")
	const buttonDark = document.getElementById("darkMode")
	buttonLight.addEventListener('click', setGiscusTheme)
	buttonAuto.addEventListener('click', setGiscusTheme)
	buttonDark.addEventListener('click', setGiscusTheme)
})
