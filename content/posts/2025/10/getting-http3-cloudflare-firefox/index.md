---
title: "Getting HTTP/3 on Cloudflare with Firefox"
description: "There are two paths to the goal, although I can use only one."
author: Bryce Wray
date: 2025-10-30T12:28:00-05:00
draft: false
# initTextEditor: iA Writer # default --- change if needed
---

After wondering for a good while about a Firefox-specific weirdness I was seeing on Cloudflare-hosted sites, I finally found that there are two solutions. Only thing is, I am able to use only one of those two. That said, I'll describe the problem and how I found the answers --- or, in my particular case, *answer*, singular.

<!--more-->

**Note**: I originally planned to have more content in this post, but a death occurred in my family during the editing process so I decided to keep this briefer. I hope what does follow will be sufficient for your understanding.
{.box}

The difficulty I encountered was that, on Firefox[^Safari], Cloudflare-hosted sites wouldn't show up in [HTTP/3](https://www.cloudflare.com/learning/performance/what-is-http3/), but instead fell back to HTTP/2. (You can test for yourself with the [Cloudflare test page](https://cloudflare-quic.com/) for this type of connectivity.) I saw this on both macOS and Fedora Linux. While the performance penalty was likely tiny or nonexistent, it still bugged me and I wanted to find out what was causing this.

[^Safari]: Incidentally, Safari often exhibits the same behavior if you have [iCloud Private Relay](https://support.apple.com/en-us/102602) activated. This appears to be [intentional](https://jedda.me/beneath-the-masque-network-relay-on-apple-platforms/).

I filed a bug in Bugzilla but, if you do so without a Bugzilla account, that automatically generates an issue on the [webcompat repo](https://github.com/webcompat). Mine ended up [here](https://github.com/webcompat/web-bugs/issues/168913) and, subsequently, resulted in [this Bugzilla issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1979683).

In time, I learned this is related to something called the ["Happy Eyeballs" algorithm](https://everything.curl.dev/usingcurl/connections/happy.html), Firefox's handling of which has [its own Bugzilla issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1953459). It turned out that there are two remedies for the specific problem I'd seen. One is to use [IPv6](https://www.cisco.com/site/us/en/learn/topics/networking/what-is-ipv6.html), and that's a non-starter for me because my ISP doesn't support IPv6. The other is to de-activate [DNS over HTTPS (DoH) in Firefox](https://support.mozilla.org/en-US/kb/firefox-dns-over-https); once I did so, that freed up Firefox to "see" HTTP/3 on Cloudflare-hosted sites.
