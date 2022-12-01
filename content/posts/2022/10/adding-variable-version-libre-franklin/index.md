---
title: "Adding the Libre Franklin variable web font"
description: "For once, Google Fonts is the place to get the needed files — if you do it the right way, that is."
author: Bryce Wray
date: 2022-10-04T09:53:00-05:00
#draft: true
initTextEditor: iA Writer
---

For just about all of this site's four-plus-year history, its typographical presentation has taken one of three forms:

- The "[system fonts stack](/posts/2018/10/web-typography-part-2/)."
- The [variable](https://web.dev/variable-fonts/) form of the [Inter](https://rsms.me/inter) web font.
- The variable form of the [Public Sans](https://public-sans.digital.gov) web font.

I've long admired Public Sans, largely because of its similarity to the historic [Franklin Gothic](https://en.wikipedia.org/wiki/Franklin_Gothic) typeface, of which I've been a fan since at least the 1970s. Also, I like how Public Sans handles italicized/oblique text, which --- given my writing style and tendency toward *emphasizing things willy-nilly* --- makes for easier reading.

However, there's a long-standing (and not-soon-to-be-fixed[^PSdash]) [issue](https://github.com/uswds/public-sans/issues/204) with Public Sans regarding excessive padding around its em dash character. For a few weeks, I compensated for it with some coding, such as the following in [Hugo](https://gohugo.io):

[^PSdash]: The issue is [parked](https://github.com/orgs/uswds/projects/6#card-63095574) on the [U.S. Web Design System](https://designsystem.digital.gov/)'s "Roadmap Backlog" [kanban board](https://en.wikipedia.org/wiki/Kanban_board) under the category of "Future Roadmap Work" along with (at this writing) 110 other items, so I have no realistic expectation it'll get fixed any time soon.

```go-html-template
{{- $Content := .Content -}}
{{- if .Site.Params.PublicSans -}}
	{{- $Content = replace .Content " &mdash; " "&mdash;" -}}
	{{- if in $Content "—" -}}
		{{- $Content = replace .Content " — " "—" -}}
	{{- end -}}{{- /* Ulysses files */ -}}
	{{- /* Due to Public Sans bug */ -}}
{{- end -}}
{{ $Content | safeHTML }}
```

. . . but finally decided I simply needed to try a different font rather than continuing to jump through such hoops.

The most logical choice for a Public Sans replacement was the font from which it was forked in the first place: **Libre Franklin**. Here's a graphic  which shows some of the subtle differences between the two:

{{< imgh src="public-overlay-libre-franklin_1890x1090.png" alt="USWDS graphic comparing Public Sans and Libre Franklin web fonts" >}}

Image: the [Public Sans repo](https://github.com/uswds/public-sans).
{.imgcCaption}

The problem came whenever I'd try to use the variable fonts from the [Libre Franklin repo](https://github.com/impallari/Libre-Franklin). For reasons of which I'm presently unaware, they'd always come in looking extra-bold, regardless of what CSS I applied.

Consequently, I ended up going to that source about which I've [previously warned you](/posts/2020/08/google-fonts-privacy/): Google Fonts. Its own copies of Libre Franklin's variable versions turned out to be fine. **Of course**, I followed [my own advice](/posts/2020/08/good-stuff-without-google/) and just downloaded the font files for serving from here, thus avoiding the [privacy-violating aspects](https://github.com/google/fonts/issues/1495) of using Google Fonts *when served from* Google.

If you, too, have been buffaloed in trying to use the repo-based versions of Libre Franklin's variable font files, I hope this will point you to a better solution.
