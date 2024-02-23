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

**<span class="red">Update, 2024-01-31</span>**: After a few days with the code in this post's [original form](https://github.com/brycewray/hugo-site/blob/d7e69ca7696738f226ce0c072a70fc63ecf1ea70/content/posts/2024/01/its-tri-state-switch-time/index.md), I saw the additional need to show a visitor *which* state was in use (*e.g.*, it might not be readily apparent whether one was viewing auto mode), so I revised the post and code accordingly.
{.box}

## (Some of) the code

The code involves multiple files, and each contains plenty of items that have nothing to do with our subject. Instead, what follows are the parts which *are* necessary for the tri-state switch's functionality and appearance.

First, the HTML[^noJS] for the site's header template (**not** the `head`, of course):

[^noJS]: The `div`'s use of the `nScrHidden`  styling class is a [graceful degradation](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation) measure. It hides the switch if JavaScript is disabled, blocked, or otherwise non-functional when a user views the page. I'd followed the same practice with the previous toggle.

```html{bigdiv=true}
<!--
This replaces a `button` from the Alam-Naylor method.
-->
<div class="nScrHidden switchTheme">
	<label for="lightMode" class="lightLabel" aria-label="Select light mode" title="Light mode">
		<input type="radio" name="switchTheme" id="lightMode">
		<span>
			&#128526;
		</span>
	</label>
	<label for="autoMode" class="autoLabel" aria-label="Select auto mode for OS theme choice" title="Auto mode">
		<input type="radio" name="switchTheme" id="autoMode">
		<span>
			&#127763;
		</span>
	</label>
	<label for="darkMode" class="darkLabel" aria-label="Select dark mode" title="Dark mode">
		<input type="radio" name="switchTheme" id="darkMode">
		<span>
			&#127769;
		</span>
	</label>
</div>
```

Then, the relevant styling, much of which I borrowed from the ["CSS: Theme Variables" section](https://www.aleksandrhovhannisyan.com/blog/the-perfect-theme-switch/#css-theme-variables) of Hovhannisyan's article:

```css
.switchTheme {
	position: absolute;
	top: 0.45em;
	right: 1.5em;
	display: flex;
	flex-direction: row;
	gap: 0;
	background-color: transparent;
	border: 0;
	input[type="radio"] {
		opacity: 0;
		padding: 0;
		margin: 0;
		span {
			display: inline-block;
			width: 1rem;
			height: 1rem;
			padding: 0;
			margin: 0;
			line-height: 1rem;
		}
		&:checked+span {
			border-radius: 15%;
			outline: 1px solid hsl(210, 100%, 86%);
			outline-offset: 2px;
		}
	}
	.lightLabel, .autoLabel, .darkLabel {
		cursor: pointer;
		padding: 0;
		margin: 0;
		font-size: 1.125rem;
		/* keep sep. classes in case we want
		to customize each, later */
	}
}
```

And, finally, the JavaScript:

```js{filename="mode-switch-auto.js"}
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
```

## How it works

Like the toggle it replaced, this switch adds either `data-theme="light"` or `data-theme="dark"` to the page's `html` tag, whereupon the site's styling adjusts things accordingly. But, *unlike* the toggle,  the switch **also** lets you select auto mode, which *removes* any such `data-theme` attribute so *your* light/dark setting will take over as usual. In fact, I now have auto mode as the default. By contrast, the earlier toggle defaulted to dark mode for new visitors. While that may have been a safer choice than light mode for many, the new default of "You get your chosen setting" makes even more sense.

Similarly, a `theme` [localStorage cookie](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) remembers your setting for when you're nice enough to visit here again; *or*, if you select auto mode, the code **removes** the cookie. At the same time, a `radios` localStorage cookie triggers a visible indicator of the current theme --- or, if the user's OS-wide setting is in charge, the lack thereof.

Why is the latter cookie called `radios`? Because the UI items that trigger all this are [radio buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio). Each has an `opacity: 0` setting, positioned absolutely and topped by a Unicode character to symbolize what it does: &#128526; (HTML entity of `&#128526;`) for light mode, &#127763; (`&#127763;`) for auto mode, and &#127769; (`&#127769;`) for dark mode.[^seeThem] These characters were easier to style than the SVGs I used before, and my testing on multiple platforms indicated sufficient support for the characters. Of course, if I were to change my mind and go back to SVGs, all I'd have to do is replace the Unicode characters with corresponding SVGs and style each appropriately.

[^seeThem]: If you're viewing this in light mode, you might want to switch to dark mode at least briefly so you can see those characters more readily. Fortunately, my header currently has a dark background in all modes.

## Update, 2024-02-23**

I did, in fact, later opt for SVGs rather than the Unicode characters. I gave each SVG an appropriate CSS class (`sun`, `auto`, or `moon`) and came up with the resulting relevant CSS:

```css
.switchTheme {
	position: absolute;
	top: 0.45em;
	right: 1.5em;
	display: flex;
	flex-direction: row;
	gap: 0;
	background-color: transparent;
	border: 0;
	label {
		cursor: pointer;
		padding: 0;
		margin: 0;
		svg {
			width: 1.125em;
			height: auto;
			&.sun circle,
			&.sun path,
			&.auto path,
			&.moon path,
			&.moon stroke {
				fill: var(--link-nav);
				&:focus, &:active, &:hover {
					fill: var(--link-nav-afh);
				}
			}
		}
	}
	input[type="radio"] {
		opacity: 0;
		padding: 0;
		margin: 0;
		span {
			display: inline-block;
			width: 1rem;
			height: 1rem;
			padding: 0;
			margin: 0;
			line-height: 1rem;
		}
		&:checked+span {
			svg {
				&.sun circle,
				&.sun path,
				&.auto path,
				&.moon path,
				&.moon stroke {
					fill: var(--fill-lightdarktoggle)
				}
			}
		}
	}
}
```

## References

- Salma Alam-Naylor, "[The best light/dark mode theme toggle in JavaScript](https://whitep4nth3r.com/blog/best-light-dark-mode-theme-toggle-javascript/)" <span class="nobrk">(2023-06-19)</span>.
- Josh W. Comeau, "[The Quest for the Perfect Dark Mode](https://www.joshwcomeau.com/react/dark-mode/)" <span class="nobrk">(2020-04-22)</span>.
- Colin Fahrion, "[Theme Multi Switch Web Component](https://colinaut.github.io/theme-multi-switch/)" <span class="nobrk">(2022-11-19)</span>.
- Aleksandr Hovhannisyan, "[The Perfect Theme Switch Component](https://www.aleksandrhovhannisyan.com/blog/the-perfect-theme-switch/)" <span class="nobrk">(2023-11-21)</span>.
- Tamas Piros, "[Three-State Light/Dark Theme Switch](https://tpiros.dev/blog/three-state-light-dark-theme-switch/)" <span class="nobrk">(2021-04-20)</span>.
- Bramus Van Damme, "[The Quest for the Perfect Dark Mode Toggle, using Vanilla JavaScript](https://www.bram.us/2020/04/26/the-quest-for-the-perfect-dark-mode-using-vanilla-javascript/)" <span class="nobrk">(2020-04-26)</span>.
- Jima Victor, "[How to create a three state toggle switch using HTML, CSS and JavaScript](https://webcodespace.com/how-to-create-a-three-state-toggle-switch-using-html-css-and-javascript/)" <span class="nobrk">(2022-03-09)</span>.
