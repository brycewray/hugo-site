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
const htmlDoc = document.querySelector("html");

buttonAuto.addEventListener("click", () => {
	localStorage.removeItem("theme")
	htmlDoc.removeAttribute("data-theme")
})

buttonLight.addEventListener("click", () => {
	localStorage.setItem("theme", "light")
	htmlDoc.setAttribute("data-theme", "light")
})

buttonDark.addEventListener("click", () => {
	localStorage.setItem("theme", "dark")
	htmlDoc.setAttribute("data-theme", "dark")
})


