---
title: "Post 3 with its UNIQUE title" # Quotation marks allow colons, semicolons, etc.
subtitle: "The UNIQUE Post 3 subtitle" # Quotation marks allow colons, semicolons, etc.
description: "The UNIQUE description for Post 3." # Quotation marks allow colons, semicolons, etc.
author: Your name goes here
date: 2019-01-19T09:25:00 # This would be 9:25 AM (0925) UTC on Jan. 19, 2019
lastmod: 2019-10-06T19:00:00 # Comment-out this line with a # if content is unchanged
draft: false # Make it "true" if you don't want Hugo to "publish" yet
featured_image: lego-169603_4320x3240.jpg
featured_image_width: 4320
featured_image_height: 3240
featured_image_alt: Lego blocks arranged stylistically # Always include an ALT tag for accessibility
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/Efraimstochter-12351/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=169603">M W</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=169603">Pixabay</a></span>
  
---

Your opening text goes here.

## In-article heading --- it's an H2 because your title is the H1

And after another paragraph or two or three, you may want to add a subheading, which would be an H3, so it would be like the following.

### Subheading (H3)

Text here.

And here is an example of how to use the `img` shortcode in `/layouts/shortcodes` (note that the images must be in the same folder with the content, because of how Hugo bundles do image processing, so that's why the `src` references don't include a folder upfront):

{{< imgc src="screen-cap-from-Pippin-Williamson-s-page-builders-review_986x482.jpg" alt="Screen capture showing shortcodes from a WordPress page builder" width=986 height=482 >}}

Closing text. That ends Post 3!