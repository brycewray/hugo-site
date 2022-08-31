---
title: "Blankety-blank _blanks"
description: "Once again, concerns over accessibility cause me to reverse one of this website’s oldest defaults."
author: Bryce Wray
date: 2022-07-13T18:29:00-05:00
#initTextEditor: iA Writer
---

Keeping one's website as accessibility-friendly as possible is an ongoing task, and I've now taken another step in that direction.

[Last time](/posts/2022/06/accessibility-argument-tabs-spaces/), it was using tabs instead of spaces for indents in my code, to make it easier for those with visual impairments to read and use it. This time, it's **not** using `target="_blank"` to force each external link to open in a different browser tab/window. As of earlier today, that behavior is no longer wired into this site's external links --- and, to be safe, is also banished from all of my posts' various code examples.

Why does it matter? Because using `target="_blank"` "breaks" a browser's **back** button, and that turns out to be bad for less tech-savvy users (admittedly not so big a concern here) and **very** bad for the disabled. Quoting Andrew Phoenix's 2012 article[^rebuttal], "[Why External Links Should NOT Open in New Tabs](https://aphoenix.ca/blog/why-external-links-should-not-open-in-new-tabs/)":

[^rebuttal]: Of course, there isn't unanimity about this view --- *e.g.*, Anthony Theng's piece (also from 2012), "[Why External Links Should Open in New Tabs](https://uxmovement.com/navigation/why-external-links-should-open-in-new-tabs/)," to which Phoenix's article was a rebuttal.

> . . . [requiring] opening a new window commits one of the cardinal sins of Usability: **DON'T BREAK THE BACK BUTTON**. I've . . . done UX testing with people who have disabilities. The most frequently checked disability is sight loss; new tabs can present almost insurmountable problems to people who have poor sight. They cause confusion [and] frustration, and break the fundamental back button. The same is true for people who have cognition issues, or low sight, or manual dexterity issues. . . . Making the web accessible should be one of your highest priorities as a UX designer. Everyone needs to be able to do everything on the internet.[^Dickinson]

[^Dickinson]: I also gratefully acknowledge Daniel F. Dickinson's 2021 article, "[Accessible Design: No '_blank,'](https://wildtechgarden.ca/blog/accessible-design-no-blank/)" which tipped me off to Phoenix's (and Theng's).

Good enough. Done.
