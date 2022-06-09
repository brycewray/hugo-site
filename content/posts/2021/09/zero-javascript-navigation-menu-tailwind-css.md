---
#layout: singlepost
tags:
- post
title: "A zero-JavaScript navigation menu for Tailwind CSS"
description: "Seeking a non-JS nav menu for use with Tailwind? So was I. Here’s the resulting code."
author: Bryce Wray
date: 2021-09-15T10:30:00-05:00
lastmod: 2021-09-30T13:41:00-05:00
discussionId: "2021-09-zero-javascript-navigation-menu-tailwind-css"
featured_image: "sebastian-herrmann-JB4aR34u248-unsplash_5184x3456.jpg"
featured_image_width: 5184
featured_image_height: 3456
featured_image_alt: "Two pairs of hands pointing at a paper map"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@herrherrmann?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sebastian Herrmann</a>; <a href="https://unsplash.com/s/photos/map?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

{{% disclaimer %}}

If your static website uses [Tailwind CSS](https://tailwindcss.com) and you've been looking for a Tailwind-based, responsive, **zero**-JavaScript navigation menu, you've come to the right place. I'll provide its code in a bit. First, let me provide some background.

When I originally put this site on the web three years ago this month, I didn't yet know of the importance of having a navigation menu which was:

- CSS-only (or [Sass](https://sass-lang.com)-only) with absolutely no JavaScript, so it works with virtually any modern browser, device, or environment.
- Responsive, serving as a "hamburger" menu for small screen widths but a regular nav bar otherwise.
- Accessible, including keyboard-only navigability.

However, by the end of that year, this site's menu was all of those. I built it by borrowing shamelessly from a [Codepen](https://codepen.io/kevinpowell/pen/jxppmr) by [Kevin Powell](https://www.kevinpowell.co/). Over time, I learned to make it work under various styling configurations---first with Sass, then with Tailwind, then with more-or-less vanilla CSS (albeit enhanced by [PostCSS](https://postcss.org)). As regular readers of this site know, I've gone back and forth among those three ever since; and, currently, the site is back on Tailwind.

On occasion during my "Tailwind phases," I strayed from the zero-JavaScript approach (adding just a tiny bit of functionality with JavaScript) but, for reasons I won't cover herein, found it not to my liking. I kept wondering why I couldn't simply adapt the pure-CSS logic from Kevin Powell's original menu so it would work in Tailwind.

And, finally, I did. The results are the subject of this post.

## Code, please

Yeah, I know: that's enough talk. Let's get to the code, **after** I provide just a little more info that will help you read and understand it:

- This works with Tailwind CSS 2.2.x. With other versions, past or future, YMMV, although I'd **guess** future versions will be OK with it.
- The HTML part is in the [Nunjucks](https://mozilla.github.io/nunjucks/) templating language which this [Eleventy](https://11ty.dev)-based site uses. Although much of it is indistinguishable from vanilla HTML, there are places---notably the part which derives the "newest post" item in the nav menu---where you see Nunjucks.
- I will also include the `tailwind.config.js` file for your reference.
- Because I was trying to make the CSS 100% Tailwind (but finally couldn't, as I'll note below), the site uses the [`tailwindcss-logical`](https://github.com/stevecochrane/tailwindcss-logical) plugin to add another three utilities to Tailwind:
	- `mbs-0` = `margin-block-start: 0px`.
	- `mbe-0` = `margin-block-end: 0px`.
	- `pis-0` = `padding-inline-start: 0px`.
- As for that failed attempt to stick with Tailwind-only CSS in the menu, here's what happened. While [Tailwind 2.2.x added sibling selector variants](https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.2.0#sibling-selector-variants), those didn't provide quite enough functionality to allow me to avoid using just a **little** extra CSS (239 bytes) to finish the job.
- The menu contains the code for three SVGs, appearing in this order:
	- The "hamburger" of the mobile-device hamburger menu.
	- The "&times;" for closing the hamburger menu.
	- The site's "BW" logo (obviously not applicable to **your** use).
- The file location in each case is from the top level of the Eleventy project.

### HTML/Nunjucks (with the Tailwind CSS)

`./src/_includes/layouts/header.njk`

```jinja
<header class="fixed w-full mt-0 bg-black dark:bg-blue-800 z-[9999]">
  <nav class="text-white bg-black dark:bg-blue-800">
    <input type="checkbox" id="nav-Checkbox" class="hidden">
    <label for="nav-Checkbox" id="nav-Toggle" class="absolute lg:hidden cursor-pointer my-1 mx-4 right-0">
      <svg id="svg-menu" class="w-6 fill-white mt-[0.3rem]" viewBox="0 0 448 512" width="100" title="bars"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" /></svg>
      <svg id="svg-close" class="w-6 fill-white hidden" viewBox="0 0 384 512" width="100" title="times"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" /></svg>
    </label>
    <ul class="nav-Menu bg-black dark:bg-blue-800 flex flex-col lg:flex-row gap-4 lg:gap-2 text-right my-2 lg:mt-1 lg:mb-0 mr-2 lg:mr-6 ml-0 mbs-0 mbe-0 pis-0">
      <li class="block py-2 my-0 mr-auto ml-6 lg:mt-0 lg:mb-1 lg:tracking-normal lg:leading-none">
        <a href="/" class="no-underline" aria-label="Home page">
          <svg class="w-[30px] h-auto" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/">
            <g><g transform="matrix(0.37749,0,0,0.377441,10.2477,-17.2198)"><circle cx="20.536" cy="93.312" r="47.683" fill="rgb(0,136,255)"/></g><g transform="matrix(0.367503,0,0,0.453546,70.1767,-45.0477)"><g transform="matrix(79.6463,0,0,79.6463,-179.186,166.619)"><path d="M0.139,-0.628L0.135,-0.453C0.163,-0.486 0.197,-0.502 0.236,-0.502C0.286,-0.502 0.326,-0.479 0.356,-0.432C0.385,-0.385 0.4,-0.323 0.4,-0.244C0.4,-0.168 0.384,-0.106 0.353,-0.059C0.322,-0.011 0.281,0.013 0.232,0.013C0.193,0.013 0.162,-0.005 0.137,-0.04L0.137,-0.025C0.137,0 0.126,0.013 0.104,0.013C0.081,0.013 0.07,0 0.07,-0.026L0.07,-0.051L0.071,-0.079L0.068,-0.561C0.067,-0.58 0.065,-0.591 0.063,-0.596C0.06,-0.601 0.055,-0.603 0.046,-0.603L0.039,-0.603C0.023,-0.603 0.015,-0.613 0.015,-0.633C0.015,-0.657 0.025,-0.669 0.045,-0.669C0.051,-0.669 0.057,-0.668 0.063,-0.666C0.078,-0.663 0.085,-0.662 0.086,-0.662C0.088,-0.662 0.095,-0.663 0.107,-0.666C0.113,-0.668 0.118,-0.669 0.123,-0.669C0.134,-0.669 0.14,-0.661 0.14,-0.646L0.14,-0.638C0.139,-0.634 0.139,-0.631 0.139,-0.628ZM0.231,-0.434C0.168,-0.434 0.136,-0.372 0.136,-0.249C0.136,-0.12 0.167,-0.056 0.228,-0.056C0.259,-0.056 0.283,-0.073 0.302,-0.108C0.321,-0.143 0.33,-0.188 0.33,-0.244C0.33,-0.302 0.321,-0.348 0.304,-0.383C0.286,-0.417 0.262,-0.434 0.231,-0.434Z" fill="#fff"/></g><g transform="matrix(79.6463,0,0,79.6463,-149.159,166.619)"><path d="M0.15,-0.37L0.207,-0.087L0.268,-0.442C0.274,-0.477 0.29,-0.495 0.317,-0.495C0.332,-0.495 0.343,-0.491 0.35,-0.484C0.357,-0.477 0.362,-0.463 0.366,-0.442L0.436,-0.087L0.484,-0.363C0.487,-0.382 0.489,-0.397 0.489,-0.407C0.489,-0.422 0.482,-0.429 0.468,-0.429L0.466,-0.429C0.463,-0.429 0.459,-0.429 0.452,-0.428C0.435,-0.428 0.426,-0.439 0.426,-0.461C0.426,-0.484 0.435,-0.495 0.454,-0.495C0.463,-0.495 0.475,-0.493 0.492,-0.49C0.509,-0.487 0.522,-0.485 0.531,-0.485C0.54,-0.485 0.553,-0.487 0.569,-0.49C0.585,-0.493 0.597,-0.495 0.605,-0.495C0.624,-0.495 0.633,-0.484 0.633,-0.462C0.633,-0.441 0.621,-0.43 0.596,-0.43C0.583,-0.43 0.574,-0.423 0.567,-0.409C0.56,-0.395 0.552,-0.368 0.544,-0.327L0.489,-0.042C0.482,-0.005 0.464,0.013 0.436,0.013C0.409,0.013 0.392,-0.008 0.383,-0.051L0.317,-0.37L0.254,-0.042C0.247,-0.005 0.23,0.013 0.204,0.013C0.179,0.013 0.163,-0.005 0.154,-0.042L0.074,-0.38C0.069,-0.399 0.066,-0.41 0.064,-0.413C0.059,-0.424 0.05,-0.43 0.039,-0.43L0.036,-0.43L0.022,-0.429C0.015,-0.428 0.009,-0.432 0.004,-0.44C-0.001,-0.447 -0.004,-0.455 -0.004,-0.462C-0.004,-0.484 0.007,-0.495 0.028,-0.495C0.032,-0.495 0.043,-0.493 0.062,-0.49C0.072,-0.487 0.084,-0.486 0.098,-0.486C0.107,-0.486 0.121,-0.488 0.139,-0.491C0.156,-0.494 0.17,-0.495 0.179,-0.495C0.198,-0.495 0.208,-0.484 0.208,-0.463C0.208,-0.44 0.198,-0.429 0.178,-0.429L0.165,-0.429C0.152,-0.429 0.145,-0.422 0.145,-0.407C0.145,-0.399 0.147,-0.387 0.15,-0.37Z" fill="#fff"/></g></g></g>
          </svg>
        </a>
      </li>
      <li class="list-none hidden font-bold lg:text-sm lg:block lg:uppercase pr-3 my-0 lg:mt-[0.85rem] lg:mx-0"><a href="/about/" class="no-underline border-0 text-white hover:text-gray-300 focus:text-gray-300 active:text-gray-300" aria-label="About me">About</a></li>
      {%- for post in collections.post | reverse -%}
        {%- if loop.index0 < 1 -%}
          <li class="list-none hidden font-bold lg:text-sm lg:block lg:uppercase pr-3 my-0 lg:mt-[0.85rem] lg:mx-0"><a href="{{ post.url }}" class="no-underline border-0 text-white hover:text-gray-300 focus:text-gray-300 active:text-gray-300">Newest post</a></li>
        {%- endif -%}
      {%- endfor -%}
      <li class="list-none hidden font-bold lg:text-sm lg:block lg:uppercase pr-3 my-0 lg:mt-[0.85rem] lg:mx-0"><a href="/posts/" class="no-underline border-0 text-white hover:text-gray-300 focus:text-gray-300 active:text-gray-300" aria-label="Posts">All posts</a></li>
      <li class="list-none hidden font-bold lg:text-sm lg:block lg:uppercase pr-3 my-0 lg:mt-[0.85rem] lg:mx-0"><a href="/privacy/" class="no-underline border-0 text-white hover:text-gray-300 focus:text-gray-300 active:text-gray-300" aria-label="Privacy policy">Privacy</a></li>
      <li class="list-none hidden font-bold lg:text-sm lg:block lg:uppercase pr-3 my-0 lg:mt-[0.85rem] lg:mx-0"><a href="/contact/" class="no-underline border-0 text-white hover:text-gray-300 focus:text-gray-300 active:text-gray-300" aria-label="Contact me">Contact</a></li>
    </ul>
  </nav>
</header>
```

### The other CSS

`./src/assets/css/nav.css`

```css
#nav-Checkbox:checked ~ ul.nav-Menu li,
#nav-Checkbox:checked ~ label#nav-Toggle #svg-close {
  @apply block;
}
#nav-Checkbox:checked ~ label#nav-Toggle #svg-menu {
  @apply hidden;
}
#nav-Checkbox:checked ~ ul.nav-Menu {
  @apply pb-4;
}
```

### The Tailwind config file

`./tailwind.config.js`

```js
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/**/*.js',
      './src/**/*.11ty.js',
      './src/**/*.njk',
      './src/**/*.html'
    ],
  },
  darkMode: 'media',
  theme: {
    fontWeight: {
      normal: 400,
      bold: 625, // not default of 700
      black: 900,
    },
    fill: theme => ({
      current: 'currentColor',
      white: theme('colors.white'),
    }),
    fontSize: {
      'fn': '.65rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      blueGray: colors.blueGray,
      gray: colors.gray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      green: colors.green,
      teal: colors.teal,
      sky: colors.sky,
      blue: {
        '50': '#e6f9ff',
        '100': '#bbeeff',
        '200': '#00aaff',
        '300': '#0088ff',
        '400': '#0033ff',
        '500': '#0000ff',
        '600': '#0000bb',
        '700': '#0000aa',
        '800': '#000088',
        '900': '#000066',
      },
    },
    fontFamily: {
      'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', 'Noto Sans', 'Segoe UI', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      'serif': ['ui-serif', 'Georgia', 'Cambria', 'Times', 'Times New Roman', 'serif'],
      'mono': ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
    },
  },
  variants: {
    logical: [
      'responsive',
      'hover'
    ],
  },
  plugins: [
    require('tailwindcss-logical'),
  ], // if we add forms, do it here
}
```

## There are better ones

As I've often noted about my offerings on this site, you can find better menus, better use of Tailwind, and better code in general. I put this out here simply because **I've** often searched for a menu just like this and, in the end, never found one that met all my requirements. (For the record, this one doesn't, either, but it will **if** I can find a way to incorporate the `nav.css` stuff into Tailwind.) Perhaps this will serve a purpose for you.
