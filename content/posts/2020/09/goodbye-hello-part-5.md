---
#layout: singlepost
tags:
- post
title: "Goodbye and hello • Part 5"
description: "Two embarrassments: another site move and the reason behind it."
author: Bryce Wray
date: 2020-09-09T14:30:00-05:00
lastmod: 2021-05-16T10:39:00-05:00
discussionId: "2020-09-goodbye-hello-5"
featured_image: "pencil-two-with-erasers-macro-1277094_3872x2592.jpg"
featured_image_width: 3872
featured_image_height: 2592
featured_image_alt: "Closeup of two pencils and their erasers"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/joslex-2276481/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1277094">Jeff Weese</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1277094">Pixabay</a></span>
---

{{% disclaimer %}}

Just when I thought the site's "lurch"[^danceRef] among hosts was over with [last week's landing](/posts/2020/09/goodbye-hello-part-4/) at [Render](https://render.com), I tripped on a banana peel whose presence in my path was entirely my own fault.

[^danceRef]: Can't call it the "dance" because I [already ran that term into the ground for another purpose](/posts/2019/12/sorta-strange-ssg-trip/).

When I drew up the requirements I mentioned in [Part 1](/posts/2020/07/goodbye-hello/) for the site's host, I thought I'd covered all the use cases to which I'd become accustomed in the nearly two years of this site's existence.

*\<Harsh buzzer noise>* Wrong. Go to jail. Do not pass **Go**. Do not collect two hundred dollars. *(That's what I'm telling **myself**, you understand.)*

Turns out there was one thing I'd forgotten, perhaps because it had been so long since I'd last needed to do it.

Keep in mind that this site, like so many others built on the [Jamstack](https://jamstack.wtf), is auto-generated every time changes are pushed to the online repository where it lives. Well, sometimes, you may want to change *which* repository is "watched" so you can make some really major change to the site without having to shut it down---thus forcing the sometimes sluggish regeneration of the site's SSL certificate---and rebuild it.

I've done it before, and, trust me, I know I'll need to do it again.

And **that** was the scenario I forgot when evaluating the hosts I considered, which, again, were (in alphabetical order): [Firebase](https://firebase.google.com), [Netlify](https://netlify.com), the aforementioned Render, and [Vercel](https://vercel.com). With Firebase, you have to set it up yourself, but it's doable. With Netlify and Vercel, you simply point the site to a new repo and, just like that, you're done.

Render, however, currently lacks the capability for a site owner to do this. One of Render's techs helpfully offered to handle it for me if I wished, but noted that "it's not something we often do and technically we don't support it."

So that was all she wrote for the site on Render, just a few days into my second run with it. Again---entirely my fault, not Render's, for my failure to evaluate that particular capability upfront.

Please learn from my bad example and, when you're evaluating website hosts, make sure you've run through *all* the possible needs you'll have. If you're new to having a site, of course, you may not know what those are. But I'm definitely *not* new to this, so I should've known better. Don't be me.

Oh, and one more thing: if you're wondering whence the site *now* originates, I'd say simply: use your browser's inspector tool and check the headers. Otherwise, this unintentional saga about the "lurch" may stretch to an even more ridiculous number of parts, and I think we all could do without that. I certainly could.
