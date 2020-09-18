---
title: "Freeing your folders"
subtitle: "A safe way to change your cloud sync setup"
description: "How Mac users can remove items from iCloud Drive without seemingly interminable downloads."
author: Bryce Wray
date: 2020-08-16T19:35:00
#lastmod
discussionId: "2020-08-freeing-your-folders"
featured_image: collector-old-folders-3930337_7360x4912.jpg
featured_image_width: 7360
featured_image_height: 4912
featured_image_alt: "Worn and stained paper folders in an office desk drawer"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/Angelo_Giordano-753934/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3930337">Angelo Giordano</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3930337">Pixabay</a></span>
---

Are you a Mac user? Ever looked at that [joined-at-the-hip relationship between your **Documents** folder and iCloud Drive](https://support.apple.com/en-us/HT206985) and wondered if you might be better off sync'ing that folder with another provider---or, if you have no reason to view the folder's contents on other devices, not sync'ing it at all and thus avoiding the expense?

You're not alone.

But, **before** you go that route, please take a few minutes and read the advice in this post. It'll save you some grief, not to mention many, many hours of downloading---even if you have a pretty spiffy Internet connection.

## Why you have to be careful

The default for a while now has been for the Mac desktop and the user's **Documents** folder to be tied into iCloud Drive with the **Optimize Mac Storage** option turned on. This means that, to minimize the amount of local storage used, macOS "decides" whether files on the desktop and in that **Documents** folder will actually be on the Mac or exist only in iCloud Drive's online storage.

Such a strategy might be a brilliant idea if a Mac-sized quantity of iCloud Drive storage were free, everyone's Internet connection were blazing fast, and the "decisions" were always perfect. In reality, this has proven to be more trouble than it's worth for many Mac users.

By now, perhaps you're thinking, "Well, I can just go into my Mac's **System Preferences** and turn off iCloud Drive's hold on the desktop content and **Documents** folder." And you're right; you can.

**But** it's not that simple.

If you don't **first** follow a special procedure I'll describe shortly, some of all or that content will suddenly  disappear from your Mac when you "free" it from iCloud Drive. Still, don't have a coronary. Your stuff isn't really gone. It's just not on the Mac any more. It's safe on iCloud's online storage. So, all you have to do is download it to your local drive, right?

Once again: it's not that simple.

The problem at this point is the **time** that downloading process will take, unless you have very little content either on your desktop or in your **Documents** folder, which probably is rather unlikely for the latter in particular. Even if you have a great Internet connection, you easily could be in store for many hours---perhaps multiple **days**---of downloading that content in its entirety from iCloud to your Mac.

Fortunately, there's a better way.

## Borrowing some great advice

Before I give you the particulars, please be aware that I didn't come up with the most important part of these instructions. I simply found it by chance one day and, given its relative obscurity, realized I should share it with my fellow Mac users. If you want to see the original, go to "[How to Disable iCloud Desktop &amp; Documents on Mac](https://osxdaily.com/2017/07/06/disable-icloud-desktop-documents-mac/)"---dated July 6, 2017---and search that page for the name "James Howie," because it's *his* comment, provided over two years after the article's initial publication, whence this advice sprang. To Mr. Howie, wherever he is: a huge "thank you," sir.

### Important notes

-  As with all things computer-file-system-ish, you should **[have an ongoing backup](/posts/2019/02/back-up-jack) before you do any of this**.
- This is prior to the release of [macOS Big Sur](https://en.wikipedia.org/wiki/MacOS_Big_Sur) and thus is based on where you find things in its predecessor, [macOS Catalina](https://en.wikipedia.org/wiki/MacOS_Catalina); so please adjust accordingly.
- This presumes you **do** have your Mac desktop and **Documents** folders set to be stored in iCloud Drive, which has been the macOS default for the last few years; but, if you **don't**, there's no need to follow this procedure. You're already good to go. (If you want to check, just use the Mac Finder to navigate to **iCloud Drive** and see whether it contains **Desktop** and **Documents** folders that **aren't** empty. If so, this procedure is valid for you.)
- This also presumes you've **already** [deactivated the **Optimize Mac Storage** feature](https://tidbits.com/2016/11/10/how-to-turn-off-sierras-optimized-storage/). If not, **don't** try this procedure. Instead, perform **that** change first and let the necessary resulting downloads occur. (It might take quite a while, which is what we're trying to avoid with this procedure.)

So, with all that understood, here we go.

### The procedure

1. On the Mac desktop, double-click your Mac's default drive icon to open a Finder window at the top level of the Mac's file structure.
2. Navigate to your user account's home folder in **Users**. For example, if you entered **John Doe** as your account name when you set up the Mac initially, there should be a **John Doe** folder within **Users**.
3. Navigate to that folder's **Downloads** folder. (If there's not already a **Downloads** folder there, create one.)
4. In this **Downloads** folder, create two new empty folders:  
	— One called **1-Desktop**.  
	— One called **2-Documents**.
5. Drag (don't copy) to the **1-Desktop** folder all content you may have on the Mac desktop. This, of course, does **not** include any drive icons that are on the desktop—just files and aliases.  
	You'll get a warning message about this content's no longer being available on your other iCloud-linked devices. Click the button that indicates you **do** want to move the content out of iCloud Drive.
6. Open a separate Finder window and navigate to the **Documents** folder in your **iCloud Drive** folder.
7. Select **everything** in that **Documents** folder.

<div class="yellowBox"><p><strong>Note</strong>: Well, <em>almost</em> everything. I suggest being careful about any folder that is identified in the <strong>List</strong> view as an &ldquo;App Library&rdquo; (often possessing an app&rsquo;s logo on the folder icon in the default <strong>Icons</strong> view)&mdash;one notable example of which, in my case, is <a href="https://ia.net/writer" target="_blank" rel="noopener">iA Writer</a>. Leave folders of that type in the <strong>iCloud Drive</strong> folder&rsquo;s <strong>Documents</strong> folder. While you <em>can</em> move those items if you wish, just be forewarned that either the current app or its future versions might have a problem with the different location.</p></div>

8. Drag it all to the **2-Documents** folder.  
	Again, you'll get the warning about moving the content out of iCloud Drive; so, as before, confirm that you **do** want to proceed.
9. Access the iCloud Drive settings: **System Preferences** \> **Internet Accounts** \> **iCloud** \> **iCloud Drive**.
10. Click **Options**.
11. Uncheck the checkbox next to **Desktop &amp; Documents Folders**, so that the window looks like this (your list of apps will vary, of course, but the top one is all that concerns us here):

{{< imgc src="iCloud-Drive-Desktop-Documents_1336x990.png" alt="The iCloud Drive settings for macOS Catalina as of August, 2020" width="1336" height="990" >}}

All done!

Now you can safely drag the content from **1-Desktop** back out to the Mac desktop, and then drag everything out of the **2-Documents** folder into a fresh **Documents** folder in whatever place suits you. (If you do still want to sync the **Documents** folder but just with a *different* provider's cloud sync setup, use the location required by that alternative provider.)

## Simplify, simplify, simplify

I found Mr. Howie's sage advice while re-thinking my own [sync'ing strategies](/posts/2019/02/back-up-jack), which for over a year and a half had me using iCloud Drive to store hundreds of gigabytes of my stuff, far more than just the **Documents** folder's contents. However, after some experimentation with other cloud sync vendors that left me wanting for one reason or another, I realized that I really don't *need* to sync all that much.[^1]

So, bottom line, I downsized my monthly sync expenses to just iCloud Drive's 200 GB tier ($2.99/month as of this writing), which is far more than enough for not only all the Mac files I would ever want to see on the iPhone and iPad but also the photos storage for **both** my phone and my wife's.

In short, I was able to simplify. And that's always good (especially when it cuts your costs). If you find yourself able to simplify as well, perhaps this post will help you do it more safely—which also is always good.

[^1]:	I don't share files with anybody else, and my day job's computing environment is so utterly locked down that I couldn't use my sync'd content there even if I so wanted (and I don't). Moreover, our house has only one truly usable computer (I'm excluding the Chromebook, which now is too old to receive updates from Google and thus is of little practical use to me), so there won't be any need to share files between my Mac and any other computer.