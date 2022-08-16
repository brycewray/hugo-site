---
title: "Wildness with wildcards, or why DuckDuckGo wouldn’t go"
description: "A quick tip about Content Security Policy prissiness where URLs’ wildcards are concerned."
author: Bryce Wray
date: 2022-07-15T12:24:00-05:00
lastmod: 2022-07-22T22:16:00-05:00
#draft: true
#initTextEditor: iA Writer
---

Just passing this along FYI . . .

Using information from [David Papendrew](https://twitter.com/mentalpivot)'s article, "[Using DuckDuckGo for Site Search on Your Blog](https://mentalpivot.com/using-duckduckgo-for-site-search-on-your-blog/)," I recently added a [DuckDuckGo](https://duckduckgo.com) search form to the bottom of each page of the site. It worked perfectly well in local development, but not when I actually published the site to the web.

It didn't take long to figure that this had something to do with the [`form-action` directive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/form-action) of my site's [Content Security Policy](https://content-security-policy.com) (CSP), so I added DDG's domain to the directive:

```bash
form-action: 'self' https://*.duckduckgo.com;
```

. . . and figured that would do the job.

However, no such luck. The browser still reported via its console that it wouldn't send form data to `https://duckduckduck.go` because that was a violation of the CSP's `form-action` directive.

I then wondered whether this was happening because of the `*` wildcard character that I'd used in specifying that URL in `form-action`. As an experiment, I changed the `form-action` directive to:

```bash
form-action: 'self' https://*.duckduckduck.go https://duckduckgo.com;
```

. . . and **then** it worked. `</ForeheadSlap>`

So if you're having similar difficulties getting such a form to work on a site with a strict CSP, here's hoping this info gives you some relief.

By the way, it turns out I'd have gotten my answer earlier if I'd only checked around a little more (`</ForeheadSlap>` again):

- StackOverflow, "[Does a *.example.com for a content security policy header also match example.com?](https://stackoverflow.com/questions/44850590/does-a-example-com-for-a-content-security-policy-header-also-match-example-com)"; originally asked 2019-10-31.
- World Wide Web Consortium (W3C), *Content Security Policy Level 3, W3C Working Draft, 4 July 2022*, "[Source lists](https://w3c.github.io/webappsec-csp/#framework-directive-source-list)."

**Update, 2022-07-16**: I realized after publishing this that someone could very easily wonder why I didn't simply set the CSP to [`Report-Only`](https://content-security-policy.com/report-only/), so everything would work **but** I'd get some data indicating why the form wasn't going through. Well, I **did** try that first --- but, for reasons unknown to me, the reporting didn't even flag the error. This left me with only the alternative of taking the CSP live. Of course, that's definitely ***not*** an advisable practice for debugging the CSP on a site with a lot of traffic.
{.yellowBox}
