---
title: "Code for copying code: the Eleventy edition"
description: "Here’s a workaround for including “copy” buttons in code blocks built by Prism-based syntax highlighting in Eleventy."
author: Bryce Wray
date: 2023-02-04T17:36:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

It's convenient to borrow code from posts on a website which has enabled "copy-code" buttons or links, but it can be a hassle to make that work with complete convenience in the [Prism.js](https://prismjs.com)-based syntax highlighting you typically find in an [Eleventy](https://11ty.dev)-powered site. Fortunately, there's a workaround for that.

<!--more-->

[Last year](/posts/2022/05/gems-in-rough-18/#code-for-copying-code), I added that sort of code to the two repos I use to run this site, depending on whether I'm running Eleventy or [Hugo](https://gohugo.io) at any given time. However, I soon learned there's an annoying difference between how it works in each one, due to how each of these platforms usually performs syntax highlighting.

For each, a code block is wrapped inside a `pre`/`code` construct, **but** the [Chroma](https://github.com/alecthomas/chroma) tool used by Hugo **also** surrounds that construct with a `div`. As a result, you can assign *relative* [positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/position) to that `div` and, then, the "copy-code" button's *absolute* positioning keeps it in place within the `div`, even when you perform horizontal scrolling on a code block with extra-wide lines; *e.g.*:

```html
<p class="fake-class-name another-class-name">This is a purposefully long line of HTML, allowing you to see what happens with a code block that requires horizontal scrolling.</p>
<p class="YA-class-name">This is a shorter line.</p>
```

On the other hand, since Prism.js **doesn't** wrap the `pre`/`code` construct within a `div`, the button moves with any horizontal scrolling of a Prism.js-highlighted code block.

I have [requested](https://github.com/11ty/eleventy-plugin-syntaxhighlight/issues/77) that the [standard Eleventy plugin for syntax highlighting](https://github.com/11ty/eleventy-plugin-syntaxhighlight), which uses Prism.js, be changed to allow adding a wrapping `div`. However, unless/until that happens, here is a workaround for Eleventy users.

In every template you use to create pages with code blocks, add something like this, which is in [Nunjucks](https://mozilla.github.io/nunjucks/) (one of [numerous templating languages](https://www.11ty.dev/docs/languages/) Eleventy allows):

```twig
{# START, divs around Prism `pre``code` stuff #}
{% set Content = content %}
{% set withoutDivStart = '<pre class="language-' %}
{% set withDivStart = '<div class="highlight"><pre class="language-' %}
{% set withoutDivEnd = '</code></pre>' %}
{% set withDivEnd = '</code></pre></div>' %}
{% if withoutDivStart in content %}
	{% set Content = content | replace (withoutDivStart, withDivStart) %}
	{% set Content = Content | replace (withoutDivEnd, withDivEnd) %}
{% endif %}
{#   END, divs around Prism `pre``code` stuff #}
{{ Content | safe }}
```

This will wrap a `div` with the class of `highlight` around the `pre`/`code` construct.

Then, assign the `div` this styling:

```css
div.highlight {
	position: relative;
}
```

Finally, make sure the code **for** your chosen "copy-code" button's HTML is set to appear between the opening `div` and the `pre`/`code` construct, rather than between the `pre` and `code` parts; how you do this will vary according to that code, for which --- as I [noted originally](/posts/2022/05/gems-in-rough-18/#code-for-copying-code) --- there are numerous proposed solutions out there.

This method ensures that, regardless of whether I'm running the site on Eleventy or Hugo, each of the site's code blocks has a "copy-code" button that **won't** scroll horizontally when the code itself does. If you're an Eleventy user who likes to include code blocks in your site content, perhaps this approach can also improve *your* site's "copy-code" functionality.
