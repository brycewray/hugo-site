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

if (radioStatus == undefined || radioStatus == "auto") {
	localStorage.removeItem("theme")
	localStorage.setItem("radios", "auto")
	htmlDoc.removeAttribute("data-theme")
	buttonAuto.checked = true
	buttonLight.checked = false
	buttonDark.checked = false
} else if (radioStatus == "light") {
	localStorage.setItem("theme", "light")
	localStorage.setItem("radios", "light")
	htmlDoc.setAttribute("data-theme", "light")
	buttonAuto.checked = false
	buttonLight.checked = true
	buttonDark.checked = false
} else if (radioStatus == "dark") {
	localStorage.setItem("theme", "dark")
	localStorage.setItem("radios", "dark")
	htmlDoc.setAttribute("data-theme", "dark")
	buttonAuto.checked = false
	buttonLight.checked = false
	buttonDark.checked = true
} else {
	//
}

buttonAuto.addEventListener("click", () => {
	localStorage.removeItem("theme")
	localStorage.setItem("radios", "auto")
	htmlDoc.removeAttribute("data-theme")
	buttonAuto.checked = true
	buttonLight.checked = false
	buttonDark.checked = false
})

buttonLight.addEventListener("click", () => {
	localStorage.setItem("theme", "light")
	localStorage.setItem("radios", "light")
	htmlDoc.setAttribute("data-theme", "light")
	buttonAuto.checked = false
	buttonLight.checked = true
	buttonDark.checked = false
})

buttonDark.addEventListener("click", () => {
	localStorage.setItem("theme", "dark")
	localStorage.setItem("radios", "dark")
	htmlDoc.setAttribute("data-theme", "dark")
	buttonAuto.checked = false
	buttonLight.checked = false
	buttonDark.checked = true
})


