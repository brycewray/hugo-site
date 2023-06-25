---
title: "A great take on a toggle"
description: "I happily borrow from one of my favorite coders to give this site a new capability."
author: Bryce Wray
date: 2023-06-25T13:35:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

It's not uncommon for a day of website work to result from something I find in a session with [my favorite feed reader](https://netnewswire.com). Such was the case this weekend and, as a result, this site now lets you click (or tap) a little icon to switch between light and dark modes.

<!--more-->

Yesterday morning, I was reading a [Hacker News thread](https://news.ycombinator.com/item?id=36456513) about Simon Dalvai's "[CSS only dark mode without JS](https://simondalvai.com/blog/css-only-darkmode/)." Within the thread, there was a contentious debate between two points of view: (a.) light/dark mode should be left entirely to the default settings in the user's OS; and (b.) a website should always have a toggle for light/dark mode.

Until then, I had been firmly with side (a.). However, the argument in favor of (b.) sounded plausible, so I began searching for solutions that could add such a toggle to this site. Some of the early ones didn't exactly thrill me.

Fortunately, only a few days earlier, the amazing [Salma Alam-Naylor](https://whitep4nth3r.com/), a/k/a "whitep4nth3r," had described "[The best light/dark mode theme toggle in JavaScript](https://whitep4nth3r.com/blog/best-light-dark-mode-theme-toggle-javascript/)" --- and I quickly agreed with her chosen title. She'd even explained a similar change of mind on the whole subject of "toggle *vs.* no toggle":

> I used to disagree with light and dark mode toggles. "The toggle is the user system preferences!" I would exclaim naïvely, opting to let the [prefers-color-scheme CSS media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) control the theming on my personal website. No toggle. No choice. 🫠
> 
> I've been a dark mode user ever since it became a thing. But recently, I've preferred to use ***some*** websites and tools in light mode --- including my personal website --- whilst keeping my system settings firmly in the dark. I needed a toggle. I needed a choice! And so does everyone else.

Suitably convinced, I created a new branch for my site repository and, a few hours of tinkering later, I had her solution working therein --- albeit fitfully at first.

I struggled for a while with a "flickering" between the two modes when moving between pages. Then, I looked at Alam-Naylor's own website repository and saw that she had the appropriate JS inside a `script` within the `body`, right after the `header`. Up to that point, I'd followed my normal JS-related procedure, loading the JavaScript as a separate file and *after* the `body`; but a quick view of the browser Inspector showed me that doing it that way would make the JavaScript load too late to avoid a brief [Flash of Unstyled Content (FOUC)](https://blog.esteetey.dev/what-the-fouc-is-happening-flash-of-unstyled-content).

Actually, in this case, it was a Flash of *Somewhat* Unstyled Content --- FOSUC, I guess --- since the *normal* styling was coming through fine but the *JavaScript-enabled* mode-toggle was being delayed for a few milliseconds, just long enough to be noticeable *and* annoying. But, once I followed Alam-Naylor's example and applied the JavaScript exactly as she'd done in her own repo, that fixed the FOSUC.

I was already a big fan of Alam-Naylor's work and writings, but had never tried any of her code until now. Other than dealing with self-inflicted wounds such as the one I just described, I found her mode-toggle solution easy to implement and a great addition to the site. If you, too, either already agree with side (b.) or can be persuaded to switch to that view, I offer a strong recommendation in favor of her article and the approach it explains.

Toggle away, my friends.
