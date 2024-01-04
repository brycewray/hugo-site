/*
https://whitep4nth3r.com/blog/best-light-dark-mode-theme-toggle-javascript/
https://codepen.io/whitep4nth3r/pen/VwEqrQL
*/

/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/

function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme
  }

  if (systemSettingDark.matches) {
    return "dark"
  }

  return "light"
}

/**
* Utility function to update the button text and aria-label.
*/
function updateButton({ buttonEl, isDark }) {
	/* Allows room for moon/sun icon when JS is on */
  const newSVG = isDark
		? `<svg class="inline moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"></path></svg>` // Dark mode
		: `<svg class="inline sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"></path></svg>` // Light mode
	const newCta = "Select light/dark mode"
	const newTitle = "Toggle light/dark mode"
  // use an aria-label if you are omitting text on the button
  // and using a sun/moon icon, for example
  buttonEl.setAttribute("aria-label", newCta)
	buttonEl.setAttribute("title", newTitle)
  // buttonEl.innerText = newCta
	buttonEl.innerHTML = newSVG
}

/**
* Utility function to update the theme setting on the html tag
*/
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme)
	// following part is for Tailwind CSS
	if (theme === "dark") {
		document.querySelector("html").classList.add('dark');
	} else {
		document.querySelector("html").classList.remove('dark');
	}
	// end, part for Tailwind CSS
}

/**
* On page load: (below)
*/

/**
* 1. Grab what we need from the DOM and system settings on page load
*/
const button = document.querySelector("[data-theme-toggle]")
const localStorageTheme = localStorage.getItem("theme")
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)")

/**
* 2. Work out the current site settings
*/
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark })

/**
* 3. Update the theme setting and button text accoridng to current settings
*/
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" })
updateThemeOnHtmlEl({ theme: currentThemeSetting })

/**
* 4. Add an event listener to toggle the theme
*/
button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark"

  localStorage.setItem("theme", newTheme)
  updateButton({ buttonEl: button, isDark: newTheme === "dark" })
  updateThemeOnHtmlEl({ theme: newTheme })

  currentThemeSetting = newTheme
})
