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

if (radioStatus === undefined || radioStatus === "auto") {
	goAuto()
} else if (radioStatus === "light") {
	goLight()
} else if (radioStatus === "dark") {
	goDark()
}

buttonAuto.addEventListener("click", () => {
	goAuto()
})

buttonLight.addEventListener("click", () => {
	goLight()
})

buttonDark.addEventListener("click", () => {
	goDark()
})


