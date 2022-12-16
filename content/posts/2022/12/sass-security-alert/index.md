---
title: "Sass security alert"
description: "If your website uses Sass, take note of this advisory."
author: Bryce Wray
date: 2022-12-16T10:23:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

On December 10 --- although I personally learned of it only today --- the [blog](https://sass-lang.com/blog) for [Sass](https://sass-lang.com) published an article entitled "[Security Alert: Tar Permissions](https://sass-lang.com/blog/security-alert-tar-permissions)." If your website uses Sass for styling purposes, and particularly if you install it on your dev machine with `.tar.gz` files from [Sass's GitHub repo](https://github.com/sass/) (perhaps using methods such as I've described here in the past), you should read the article and observe its recommended protections against a newly discovered vulnerability.

<!--more-->

The article describes who is affected and explains:

> We strongly recommend that users in these vulnerable groups delete and re-install Sass. All the `.tar.gz` files on GitHub have been scrubbed to remove the vulnerability, so you can reinstall the same version you were previously using without needing to upgrade to the latest version.
>
> This is a privilege-escalation issue, which means it could allow a hypothetical attacker with access to a low-privilege account on your computer to escalate their access to your account's privileges. However, this also means that it's not a risk *unless* an attacker already has access to an account on your machine.
