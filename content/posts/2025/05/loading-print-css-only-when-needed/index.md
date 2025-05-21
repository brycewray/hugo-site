---
title: "Loading print CSS only when needed"
description: "How to help a small percentage of visitors without inconveniencing the vast majority."
author: Bryce Wray
date: 2025-05-21T15:15:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Since my site is a blog (rather than, *e.g.*, a place for obtaining things like tickets to shows), you might think no visitor would need or want to print any of its pages. However, I occasionally hear from those who do, one of whom also requested that I provide [print-specific CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Printing) to make the results look better. I did, but knew it also meant I was making my other, **non**-printing visitors download CSS that they neither needed nor wanted.

As of yesterday, that is no longer a problem.

I've noted here before that [I won't let AI write my posts](/posts/2023/03/no-ai-here-thanks-very-much/) but I **will** make use of AI [when I need help with code](/posts/2023/10/big-rebundle/). This post is about the latter case.

<!--more-->

From time to time, I think about how I might better handle the site's delivery of CSS. For example, I practice what I call "[sorta scoped styling](/posts/2023/01/sorta-scoped-styling-hugo-take-two/)," wherein I split the CSS into files that get loaded only on certain types of pages. However, this wouldn't help with the print CSS. While I did mark its link as `media="print"` --- which, among other things, makes browsers treat it as a lower-priority download --- I wanted to find a way to load it conditionally, only when that small number of users actually tried to print one of the site pages. So, yesterday, I asked [ChatGPT](https://openai.com/chatgpt/overview/):

> Is there a way, through JavaScript or other coding, to have a browser download a website's print-specific CSS file only if the user is actually printing a page? The obvious intent is to reduce how much CSS the website must deliver, especially since a relatively small percentage of users actually print web pages anymore.

That began a "discussion" which, although the AI's response contained some of the hallucinatory behavior for which [LLMs](https://www.nvidia.com/en-us/glossary/large-language-models/) have become infamous, successfully gave me code which met my needs.

The code uses the [`matchMedia()` method](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) (and, for maximum compatibility, it also acts on [`beforeprint` events](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeprint_event)) to detect an active print request from the browser. Only when such a request occurs will the code load the print CSS; so, now, only those users who are actually printing content from the site will download the additional styling to make their printouts look more "print-y" and less "web-y," so to speak.

Armed with this AI-created JavaScript code submission, I added it to the appropriate [partial templates](https://gohugo.io/templates/partial/) for my [Hugo](https://gohugo.io) site's purposes.[^CSP] (For those who choose to disable JavaScript, the `noscript` section at the end delivers the print CSS anyway, just the way everyone else formerly got it.)

[^CSP]: My original also contains code that, in production, enables a serverless function to provide a [nonce for Content Security Policy purposes](https://content-security-policy.com/nonce/).

```go-html-template
{{- /* for those who've requested CSS for printing */ -}}
{{- $printCSS := resources.Get "css/print.css" -}}
{{- if hugo.IsProduction -}}
	{{- $printCSS = $printCSS | resources.Copy "css/print.min.css" | postCSS | fingerprint -}}
{{- end -}}
{{- with $printCSS -}}
	{{ $safePrintLink := $printCSS.RelPermalink | safeURL }}
	<script>
		function loadPrintStylesheet() {
			if (document.getElementById('print-css')) return; // Prevent multiple loads

			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = '{{ $safePrintLink }}';
			link.type = 'text/css';
			link.media = 'print';
			link.id = 'print-css';
			{{- if hugo.IsProduction }}
				link.integrity='{{ $printCSS.Data.Integrity }}';
			{{- end -}}
			document.head.appendChild(link);
		}

		// Use media query listener
		const mediaQueryList = window.matchMedia('print');

		mediaQueryList.addEventListener('change', (mql) => {
			if (mql.matches) {
				loadPrintStylesheet();
			}
		});

		// Fallback for browsers that fire beforeprint/afterprint
		window.addEventListener('beforeprint', loadPrintStylesheet);
	</script>
	<noscript>
		<link rel="stylesheet" href="{{ $printCSS.RelPermalink }}" type="text/css" media="print"{{- if hugo.IsProduction }} integrity="{{ $printCSS.Data.Integrity }}"{{- end -}}>
	</noscript>
{{- end }}
```

This works fine on Chrome and Safari, as well as browsers based on their engines (Blink and WebKit, respectively), but I did find one oddity in Gecko-based browsers such as Firefox. While other browsers will load the print CSS when their respective Print Preview windows pop up, a Gecko-based browser will **not** load it if "Disable cache" is enabled --- as often is the case when one is using the browser's development tools. In that specific circumstance, you end up having to cancel out from the Print Preview window and then load it again to see the desired effect. By contrast, the other browsers will properly load the print CSS even with "Disable cache" enabled.

That said, now we're talking about a glitch that affects an even tinier number of users than those who have any need for my site's print CSS. Namely, they're users who (a.) are using a Gecko-based browser **and** (b.) want to print from my site **and** (c.) are viewing my site with "Disable cache" enabled. And, even for them, closing and reloading Print Preview will fix the problem.
