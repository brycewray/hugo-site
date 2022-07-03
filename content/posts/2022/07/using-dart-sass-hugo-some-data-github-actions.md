---
title: "Using Dart Sass with Hugo: some data on using GitHub Actions"
description: "I've encountered some surprising results with my recently described GHA-based method, so I decided to do the math."
author: Bryce Wray
date: 2022-07-05T13:00-00:00
draft: true
#initTextEditor: iA Writer
---

This is some additional information on a subject I've covered several times over the last few months, namely how to deploy a [Hugo](https://gohugo.io) site with [Embedded Dart Sass](https://sass-lang.com/blog/embedded-sass-is-live) through the use of a [GitHub Action](https://github.com/features/actions) (GHA).

In the process of using this method to deploy this site, I've noticed some things which I found curious, so I decided to collect some data, run some tests, and collect more data.

\[Additional info]

- Vercel --- or at least the specific Vercel-targeting GHA I'm using --- has some sort of problem with this method. There are two 
