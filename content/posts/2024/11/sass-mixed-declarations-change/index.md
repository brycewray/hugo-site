---
title: "Sass mixed declarations change"
description: "If you upgrade to Dart Sass 1.77.7+, you may need to move around some nested items in your styling."
author: Bryce Wray
date: 2024-11-18T16:15:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

In recent months, I've settled on keeping this [Hugo](https://gohugo.io)-based website's styling on a combination of vanilla CSS and, in production only, [PostCSS](https://postcss.org). However, I still have code that allows me to use [Sass](https://sass-lang.com) if desired; so, out of curiosity I thought I'd see how it's doing with newer versions of Dart Sass, to which I keep my repo updated. Turned out I had to make a number of changes, specifically due to a fairly recent change in Dart Sass.

<!--more-->

I had missed the fact that, as of Dart Sass v.1.77.7 (the release of which apparently dates from sometime between [2024-06-11](https://github.com/sass/dart-sass/releases/tag/1.77.5) and [2024-07-11](https://github.com/sass/dart-sass/releases/tag/1.77.8)), one has to be more careful about the placement of nested items. The following worked fine prior to that version:

```scss
.example {
  color: red;

  a {
    font-weight: bold;
  }

  font-weight: normal;
}
```

However, since then, such SCSS would trigger a deprecation warning and, in the case of using Embedded Dart Sass with Hugo, cause Hugo to crash. The emitted warnings pointed me to the Sass page "[Breaking Change: Mixed Declarations](https://sass-lang.com/documentation/breaking-changes/mixed-decls/)," which explained why the newer Sass versions no longer accept this styling and, borrowing from the example above, require it to be like this:

```scss
.example {
  color: red;

  a {
    font-weight: bold;
  }

  & {
    font-weight: normal;
  }
}
```

In my own case, I had various media queries scattered about, and fixing them proved to be slightly more challenging. Here is a simplified version of such SCSS, which was fine in the older versions but not post-v.1.77.7:

```scss
.example {
	font-family: sans-serif;
	@media (min-width: 720px) {
		font-family: serif;
	}
	color: #000;
}
```

. . . and its newly required replacement:

```scss
.example {
	font-family: sans-serif;
	color: #000;
	@media (min-width: 720px) {
		font-family: serif;
	}
}
```

While I could also have gone the `& {}` route with the `color` statement, as suggested by that Sass deprecation documentation, my actual affected SCSS in most cases was sufficiently snarled up that I found it easier just to move media queries to the end of each declaration. I was fortunate that this sort of fix, although I had to make it in quite a few files (since I split up my styling for organization's sake), apparently solved all my violations of the newer Sass version.

Thus, if you're a Hugo/Sass user who hasn't upgraded Embedded Dart Sass recently, you might want to make time for testing your existing SCSS with a post-v.1.77.7 version.
