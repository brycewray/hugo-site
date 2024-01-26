---
title: "It’s tri-state switch time"
description: "With thanks as always to other, smarter folks, I implement a mode switch that gives you yet another option."
author: Bryce Wray
date: 2024-01-22T15:09:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

**Update, 2024-01-25**: After making the change described herein, I realized I'd also need to revisit the code in [last August's post](/posts/2023/08/making-giscus-less-gabby/) about how the site works with [giscus](https://giscus.app).
{.box}

[Last June](/posts/2023/06/great-take-toggle), I explained how, based on [code by Salma Alam-Naylor](https://whitep4nth3r.com/blog/best-light-dark-mode-theme-toggle-javascript/), I'd added a light/dark mode toggle to this site. Today, I once again acknowledge other, smarter folks as I turn that toggle into a tri-state switch that allows you to view this site in light mode, dark mode, **or** your default mode.

<!--more-->

## Letting things be

In that aforementioned post from last year, I noted my acceptance of the argument that simply leaving light/dark switcheroos to one's OS settings didn't allow for the possibility that one might occasionally want a *specific site* to appear in a mode other than the default. However, in the ensuing months, I realized I'd failed to consider those who *didn't* want the site to futz with their defaults. In short, the choice should include just *leaving things alone*, which would require a **tri-state switch** rather than a bi-state toggle (which, I guess, is the only kind of *toggle* there is in the first place).

I did find a number of excellent articles about such a switch, especially [this one which Aleksandr Hovhannisyan issued last November](https://www.aleksandrhovhannisyan.com/blog/the-perfect-theme-switch/). Still, in the end, I found many of their code samples a bit much for me to follow, so I ended up making a simpler (albeit not all that [DRY](https://www.baeldung.com/cs/dry-software-design-principle)) version.

## (Some of) the code

First, the HTML[^noJS] for the site's header template (**not** the `head`, of course):

[^noJS]: The `div`'s use of the `nScrHidden`  styling class is a [graceful degradation](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation) measure. It hides the switch if JavaScript is disabled, blocked, or otherwise non-functional when a user views the page. I'd followed the same practice with the previous toggle.

```html{bigdiv=true}
<!--
This replaces a `button` from the Alam-Naylor method.
-->
<div class="nScrHidden switchTheme">
	<label for="lightMode" class="lightLabel" aria-label="Select light mode" title="Light mode">
		<input type="radio" name="switchTheme" id="lightMode" />
		&#128526;
	</label>
	<label for="autoMode" class="autoLabel" aria-label="Select auto mode for OS theme choice" title="Auto mode">
		<input type="radio" name="switchTheme" id="autoMode" />
		&#127763;
	</label>
	<label for="darkMode" class="darkLabel" aria-label="Select dark mode" title="Dark mode">
		<input type="radio" name="switchTheme" id="darkMode" />
		&#127769;
	</label>
</div>
```

Then, the JavaScript:

```js{filename="mode-switch-auto.js"}
const buttonLight = document.getElementById("lightMode")
const buttonAuto = document.getElementById("autoMode")
const buttonDark = document.getElementById("darkMode")
const htmlDoc = document.querySelector("html")
const themeStatus = localStorage.getItem("theme")

goAuto = () => {
	localStorage.removeItem("theme")
	htmlDoc.removeAttribute("data-theme")
}

goLight = () => {
	localStorage.setItem("theme", "light")
	htmlDoc.setAttribute("data-theme", "light")
}

goDark = () => {
	localStorage.setItem("theme", "dark")
	htmlDoc.setAttribute("data-theme", "dark")
}

if (themeStatus === undefined || themeStatus === "auto") {
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
```

As for the styling that makes it work, I borrowed chiefly from the ["CSS: Theme Variables" section](https://www.aleksandrhovhannisyan.com/blog/the-perfect-theme-switch/#css-theme-variables) of Hovhannisyan's article. Since I do a *lot* of light-/dark-mode stuff in my styling, I won't dump all that here.

## How it works

Like the toggle it replaced, this switch adds either `data-theme="light"` or `data-theme="dark"` to the page's `html` tag, whereupon the site's styling adjusts things accordingly. But, *unlike* the toggle,  the switch **also** lets you select auto mode, which *removes* any such `data-theme` attribute so *your* light/dark setting will take over as usual. In fact, I now have auto mode as the default.

Similarly, a [localStorage cookie](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) remembers your setting for when you're nice enough to visit here again; *or*, if you select auto mode, the code **removes** the cookie. A new visitor obviously won't yet have the cookie set, guaranteeing that such a new visitor will see his/her chosen mode; by contrast, the earlier toggle defaulted to dark mode for new visitors. While that may have been a safer choice than light mode for many, the new default of "You get your chosen setting" makes even more sense.

The UI items that trigger all this are [radio buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio), each with an `opacity: 0` setting, positioned absolutely and topped by a Unicode character to symbolize what it does: &#128526; (HTML entity of `&#128526;`) for light mode, &#127763; (`&#127763;`) for auto mode, and &#127769; (`&#127769;`) for dark mode. (If you're viewing this in light mode, you might want to switch to dark mode at least briefly so you can see those characters more readily; fortunately, my header currently has a dark background in all modes.) I considered this to be simpler than using SVGs, as before, especially after my testing on multiple platforms indicated sufficient support for these Unicode characters to let them do the job.

Incidentally: while working on this, I initially adopted Hovhannisyan's use of *visible* radio buttons. In the end, I decided I'd rather not do that; but, if you choose to adapt my code for your own site *yet* with visible radio buttons, be aware that you'll need to manage those buttons' states, too --- *i.e.*, so the appropriate button will be checked when its mode is in play --- and, thus, will probably have to use another localStorage cookie for that purpose. For example:

```js
// previous `const` declarations above
const radioStatus = localStorage.getItem("radios")

goAuto = () => {
	localStorage.removeItem("theme")
	localStorage.setItem("radios", "auto") // additional
	htmlDoc.removeAttribute("data-theme")
	buttonAuto.checked = true // additional
	buttonLight.checked = false // additional
	buttonDark.checked = false // additional
}

// And so forth in the rest of it...
```

## References

- Salma Alam-Naylor, "[The best light/dark mode theme toggle in JavaScript](https://whitep4nth3r.com/blog/best-light-dark-mode-theme-toggle-javascript/)" <span class="nobrk">(2023-06-19)</span>.
- Josh W. Comeau, "[The Quest for the Perfect Dark Mode](https://www.joshwcomeau.com/react/dark-mode/)" <span class="nobrk">(2020-04-22)</span>.
- Colin Fahrion, "[Theme Multi Switch Web Component](https://colinaut.github.io/theme-multi-switch/)" <span class="nobrk">(2022-11-19)</span>.
- Aleksandr Hovhannisyan, "[The Perfect Theme Switch Component](https://www.aleksandrhovhannisyan.com/blog/the-perfect-theme-switch/)" <span class="nobrk">(2023-11-21)</span>.
- Tamas Piros, "[Three-State Light/Dark Theme Switch](https://tpiros.dev/blog/three-state-light-dark-theme-switch/)" <span class="nobrk">(2021-04-20)</span>.
- Bramus Van Damme, "[The Quest for the Perfect Dark Mode Toggle, using Vanilla JavaScript](https://www.bram.us/2020/04/26/the-quest-for-the-perfect-dark-mode-using-vanilla-javascript/)" <span class="nobrk">(2020-04-26)</span>.
- Jima Victor, "[How to create a three state toggle switch using HTML, CSS and JavaScript](https://webcodespace.com/how-to-create-a-three-state-toggle-switch-using-html-css-and-javascript/)" <span class="nobrk">(2022-03-09)</span>.
