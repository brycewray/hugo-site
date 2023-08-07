---
title: "Making giscus less gabby"
description: "The goal was to offer a comments section without forcing a massive JavaScript load on every visitor. Mission accomplished. Here’s how."
author: Bryce Wray
date: 2023-08-07T08:56:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

[Restoring](/posts/2023/06/return-giscus/) this site's former, [giscus](https://giscus.app)-powered comments section wasn't something over which I was exactly jumping for joy, given the [problems](/posts/2022/10/letting-go-giscus/) I'd attempted to solve by removing giscus in the first place. And I became even less happy about giscus's return last week, when I learned of a major flaw in my [chosen technique](/posts/2022/07/more-tips-using-giscus/#dont-show-it-by-default) for delaying giscus's large load of [Next.js](https://nextjs.org)-spawned JavaScript until a user actually wants to see the comments section.

In fact, I was *so* hacked-off about the whole thing that, a few days ago, I yanked the giscus section yet again.

Yesterday, I brought it back --- and, this time, with code that makes it behave the way I wanted from the start.

<!--more-->

For those who haven't read about the aforementioned technique for delaying the download of giscus's JavaScript, here's the gist of it. I used HTML's `details` and `summary` elements, collectively styled to look like a **View/hide comments** button, to hide the giscus comments section by default. This *apparently* would prevent giscus's JavaScript load unless and until a visitor clicked/tapped on the "button" to see the comments section. It worked in Chrome and Safari, but not in Firefox. However, given Firefox's miniscule numbers within not only my own web traffic but also the web as a whole, I considered this to be acceptable.

At least, I did until a few days ago, when I learned that it shouldn't even be working in *any* browser.

I gained this unexpected knowledge when, on the "got-questions" channel of the [Discord server](https://discord.gg/CUuYVH7Qa9) for [Jared White](https://jaredwhite.com/)'s [*The Spicy Web* site](https://www.spicyweb.dev/), I described the technique and asked whether there might be a way to make it work in Firefox, too.

White, a long-time professional web dev, replied in part:

> I'm honestly surprised it works like that in Chrome and Safari. I would naturally assume any HTML there is "live" even if it's hidden before the `details` *[element]* is open.[^style]

[^style]: Edited for style.

. . . which meant that it was Firefox, *not* Chrome and Safari, which had been handling this correctly from the start! Or, to put it another way, I had been depending on buggy behavior to make something work; and that's never wise.

Another participant on this question session, Chris (“[Go Make Things](https://gomakethings.com/)”) Ferdinandi, generously provided some code for making this work on Firefox, too, through use of JavaScript's [`innerHTML` property](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML). However, despite my subsequent and extended futzing that stretched into this past Friday morning, I was unable to get his suggestion and my site to play nicely together.

The first thing I did as a result was to unhide the giscus section --- *i.e.*, I took away the "button" and just let the section load with the page on all browsers. I also added the following update to a couple of giscus-related posts:

> I later learned that this works only due to a glitch in certain browsers and *isn't* kosher HTML, so I no longer hide the giscus comments section. (JavaScript-based attempts to resolve this have fallen short, primarily because of how browsers deal with remote scripts imported within `innerHTML`. While there apparently are workarounds for this annoyance, I finally decided they weren't worth the trouble.)

Then, only a few hours later, I decided *that* approach wasn't acceptable, either. After all, I now was inflicting the giscus load on *all* my visitors regardless of whether they wanted it. What made that still more egregious was the fact that there are actually very few comments on any of my site's posts, so that load usually would be happening without giving my visitors any benefits whatsoever.

One other nagging complication, albeit not as important, was that I couldn't style the giscus section to comply with the [light/dark toggle I'd recently installed here](/posts/2023/06/great-take-toggle/). The giscus section came in as an iframe from the remotely hosted giscus app, and I couldn't figure out how to make it implement a visitor's chosen light/dark setting.

I decided these aggravations were too much, so I removed the whole giscus section once more.

However, by the following afternoon, my no-longer-overheated brain decided I should at least *research* the whole thing once again.

Why?

Well, first, I don't like failing, and I clearly had failed.

Second, I knew that there ought to be a way it all *should* work --- *including* the light/dark toggle.

Third, even if the answer turned out to be something that I couldn't implement for whatever reason, I just wanted to *know*, period. A nerd's curiosity knows no bounds.

So, digging through search results and trying a seemingly endless string of attempted code fixes, I worked late into one night and then was back at it not many hours later the next morning.

In the end, I found the solution chiefly from reading the comments, and adapting code left in them, by [Sage Abdullah](https://github.com/laymonage) (giscus's creator/maintainer) and [Marcos Ruiz](https://github.com/marcosruiz) in [Issue #336](https://github.com/giscus/giscus/issues/336) within the giscus repo.[^AdvGuide] The issue concerned dynamic theme changing --- *i.e.*, like my concern about the light/dark toggle --- **but** also gave me enough to see how I could give a visitor the power to control the *conditional* injection of the giscus script.

[^AdvGuide]: I also found enormous help in the [related content](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#parent-to-giscus-message-events) in giscus's ["Advanced usage" guide](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md), from which Abdullah had derived the code he suggested in this issue's comments.

In other words, I *could* have everything I'd wanted, after all. Bingo.

Once I finally had it all working properly yesterday afternoon, I restored the comments "button" under each post on this site. Now, on all of the big three browsers, the code performs as I'd originally intended:

- The comments section *and* the JavaScript load don't appear unless the visitor purposely clicks **View/hide comments** to open the `details` element.[^oneWay]
- Once the comments section appears, it instantly uses the same light/dark setting as the rest of the page.
- If the visitor toggles the light/dark setting for the page, the comments section again follows that setting.

[^oneWay]: Of course, this is a one-way thing: *i.e.*, once you have the JS load, clicking the button again doesn't undo that load. The only way to get rid of it is through a page refresh, which restores the page to its default behavior.

So here's the code, the [operational version of which](https://github.com/brycewray/hugo-site/blob/main/layouts/partials/comments-giscus.html) exists as a partial template for this [Hugo](https://gohugo.io)-based site:

{{< labeled-highlight lang="go-html-template" filename="comments-giscus.html" >}}
{{/* === `data-theme` choices === */}}
{{- $dataThemeLight := "light" -}}
{{- $dataThemeDark := "dark" -}}

<details class="comments nScrHidden" id="data-comments" data-pagefind-ignore>
	<summary data-pagefind-ignore aria-label="Toggle for viewing or hiding comments">
		<div class="svg">
			<svg aria-hidden="true" class="inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"></path></svg>
		</div>
		<div class="legend">View/hide comments</div>
	</summary>
	<div class="giscus-comments" id="giscus-comments">
		<script>
			function getGiscusTheme() {
				const html = document.querySelector("html")
				const giscusTheme = html.getAttribute("data-theme") === "dark" ? {{ $dataThemeDark }} : {{ $dataThemeLight }};
				return giscusTheme;
			}

			function setGiscusTheme() {
				function sendMessage(message) {
					const iframe = document.querySelector('iframe.giscus-frame');
					if (!iframe) return;
					iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
				}
				sendMessage({
					setConfig: {
						theme: getGiscusTheme(),
					},
				});
			}

			document.addEventListener('DOMContentLoaded', function () {
				const giscusAttributes = {
					"src": "https://giscus.app/client.js",
					"data-repo": "[ENTER REPO HERE]",
					"data-repo-id": "[ENTER REPO ID HERE]",
					"data-category": "[ENTER CATEGORY NAME HERE]",
					"data-category-id": "[ENTER CATEGORY ID HERE]",
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
				};

				// Dynamically create script tag
				const giscusScript = document.createElement("script");
				Object.entries(giscusAttributes).forEach(([key, value]) => giscusScript.setAttribute(key, value));
				let divToAdd = document.querySelector('.giscus-comments');

				// Inject script when user clicks the `details` element
				let detailsGiscus = document.getElementById('data-comments');
				detailsGiscus.addEventListener("toggle", toggleDetails);
				function toggleDetails() {
					divToAdd.appendChild(giscusScript);
				}
				// Update giscus theme when theme switcher is clicked
				const toggle = document.querySelector('.nav-ModeToggle');
				if (toggle) {
					toggle.addEventListener('click', setGiscusTheme);
				}
			});
		</script>
	</div>
</details>
<noscript><p class="ctr legal">Commenting feature requires activation of JavaScript.</p></noscript>
{{< /labeled-highlight >}}
