---
#layout: singlepost
tags:
- post
title: "“Previous” and “next” in Eleventy"
description: "A brief description of code that easily enables this oft-requested feature."
author: Bryce Wray
date: 2019-12-23T15:16:00-06:00
lastmod: 2019-12-25T08:05:00-06:00
discussionId: "2019-12-previous-next-eleventy"
featured_image: "sand-1522182_3216x2136.jpg"
featured_image_width: 3216
featured_image_height: 2136
featured_image_alt: "View from above of directional arrow in sand"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/MIH83-464187/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1522182">Maret H.</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1522182">Pixabay</a></span>
---

This one will be uncharacteristically short, you'll be happy to know. But I learned something yesterday that I just have to share with my fellow and sister [Eleventy](https://11ty.dev) aficionados out there.

In reading not only the Eleventy [docs](https://11ty.dev/docs) but also numerous "how-to" articles by various Eleventy users, I'd been unable to learn a way to automate the inclusion of "Previous post" and "Next post" links, such as those you see at the bottom of each of my posts.

(Note that all the code herein assumes you assign each post a `post` tag in its front matter, as shown in [this example](https://www.11ty.dev/docs/collections/).)

You see, the most workable method I'd found so far from among the [starter projects](https://11ty.dev/docs/starter) and [others](https://11ty.dev/docs/sites) listed on the Eleventy site was quite manual: give each post an index number in its front matter (`idx: 41`, for example), and then find it that way. For example **(WARNING: if you're looking through this in a hurry, THIS *ISN'T* THE FINAL ANSWER!)**:

```html
{% if collections.post[idx] %}
	<p class="ctr">
		<strong>Next</strong>:
		<a class="next" href="{{ collections.post[idx].url }}">{{ collections.post[idx].data.title }}</a>
	</p>
{% endif %}
{% if collections.post[idx-2] %}
	<p class="ctr">
		<strong>Previous</strong>:
		<a class="previous" href="{{ collections.post[idx-2].url }}">{{ collections.post[idx-2].data.title }}</a>
	</p>
{% endif %}
```

Yes, it worked, but I wanted a "set-and-forget" method---something that would survive post deletions or any other possibility that might come up, not to mention a simple human failure to give the correct and unique `idx` assignment to a new post. And [so](https://github.com/11ty/eleventy/issues/211) [did](https://github.com/11ty/eleventy/issues/529) [others](https://github.com/11ty/eleventy/issues/819).

I suspected there was a solution in the Eleventy API that was so ridiculously simple that, if I found it, I'd have two immediate reactions: joy from finding it and pain from the slap I'd give myself on top of the head for having missed it.

Early yesterday morning, after having asked about an [earlier](https://github.com/11ty/eleventy/issues/529#issuecomment-532393625) proposed answer to the question, I saw a [reply](https://github.com/11ty/eleventy/issues/529#issuecomment-568257426) that quickly proved to be *The* Answer **(THIS one is what you're seeking, folks)** from [Pascal Widdershoven](https://pascalw.me) in the form of a wonderfully simple and elegant addition to one's `.eleventy.js` file:

```js
eleventyConfig.addCollection("posts", function(collection) {
  const coll = collection.getFilteredByTag("posts");

  for(let i = 0; i < coll.length ; i++) {
    const prevPost = coll[i-1];
    const nextPost = coll[i + 1];

    coll[i].data["prevPost"] = prevPost;
    coll[i].data["nextPost"] = nextPost;
  }

  return coll;
});
```

Ah. A thing of beauty.

Once you've added that to your site's `.eleventy.js` file, all you have to do is put something like the following in the appropriate place in your Eleventy template for single posts (this is in [Nunjucks](https://www.11ty.dev/docs/languages/nunjucks/), so please adjust according to the [template language](https://www.11ty.dev/docs/languages/) of your choice):

```html
  {% if nextPost.url %}
    <p class="ctr">
      <strong>Next</strong>:
      <a class="next" href="{{ nextPost.url }}">{{ nextPost.data.title }}</a>
    </p>
  {% endif %}
  {% if prevPost.url %}
    <p class="ctr">
      <strong>Previous</strong>:
      <a class="previous" href="{{ prevPost.url }}">{{ prevPost.data.title }}</a>
    </p>
  {% endif %}
```

And, no, I didn't swat myself, but I did get the joy.

**Thank you, Mr. Widdershoven**, for the eye-opener! This has been an FAQ in the truest sense of that term, and you got us over the goal line. As I gratefully [told you yesterday](https://github.com/11ty/eleventy/issues/529#issuecomment-568258911): "You da man!"
