// based on https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/javascript/navbars

document.getElementById('collapse-button').addEventListener("click", function() {
  document.getElementById('collapse-button').classList.toggle("hamburger")
  document.getElementById('collapse-navbar').classList.toggle("hidden")
  document.getElementById('collapse-button').classList.toggle("close")
  document.getElementById('collapse-navbar').classList.toggle("flex")
})