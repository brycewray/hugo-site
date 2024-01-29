/*
https://whitep4nth3r.com/blog/best-light-dark-mode-theme-toggle-javascript/
-	https://codepen.io/whitep4nth3r/pen/VwEqrQL
https://tpiros.dev/blog/three-state-light-dark-theme-switch/
https://www.aleksandrhovhannisyan.com/blog/the-perfect-theme-switch/
https://webcodespace.com/how-to-create-a-three-state-toggle-switch-using-html-css-and-javascript/
*/

const buttonLight = document.getElementById("lightMode")
const buttonAuto = document.getElementById("autoMode")
const buttonDark = document.getElementById("darkMode")
const htmlDoc = document.querySelector("html")
const themeStatus = localStorage.getItem("theme")
const radioStatus = localStorage.getItem("radios")

goAuto = () => {
	localStorage.removeItem("theme")
	localStorage.setItem("radios", "auto")
	htmlDoc.removeAttribute("data-theme")
	buttonAuto.checked = true
	buttonLight.checked = false
	buttonDark.checked = false
}

goLight = () => {
	localStorage.setItem("theme", "light")
	localStorage.setItem("radios", "light")
	htmlDoc.setAttribute("data-theme", "light")
	buttonAuto.checked = false
	buttonLight.checked = true
	buttonDark.checked = false
}

goDark = () => {
	localStorage.setItem("theme", "dark")
	localStorage.setItem("radios", "dark")
	htmlDoc.setAttribute("data-theme", "dark")
	buttonAuto.checked = false
	buttonLight.checked = false
	buttonDark.checked = true
}

if (
	themeStatus === null ||
	themeStatus === "auto" ||
	radioStatus === null ||
	radioStatus === "auto"
) {
	goAuto()
} else if (themeStatus === "light") {
	goLight()
} else if (themeStatus === "dark") {
	goDark()
}

buttonLight.addEventListener("click", () => {
	goLight()
})

buttonAuto.addEventListener("click", () => {
	goAuto()
})

buttonDark.addEventListener("click", () => {
	goDark()
})
