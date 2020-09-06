---
title: "Post 1 with its UNIQUE title" # Quotation marks allow colons, semicolons, etc.
subtitle: "The UNIQUE Post 1 subtitle" # Quotation marks allow colons, semicolons, etc.
description: "The UNIQUE description for Post 1." # Quotation marks allow colons, semicolons, etc.
author: Your name goes here
date: 2018-10-17T14:40:00 # This would be 2:40 PM (1440) UTC on Oct. 17, 2018
lastmod: 2019-04-11T20:33:00 # Comment-out this line with a # if content is unchanged
draft: false # Make it "true" if you don't want Hugo to "publish" yet
featured_image: letters-691842_2504x1676.jpg
featured_image_width: 2504
featured_image_height: 1676
featured_image_alt: Letters for old-style typesetting # Always include an ALT tag for accessibility
featured_image_caption: "Image: Pixabay" # Quotation marks allow colons, semicolons, etc.
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/photos/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=691842">Free-Photos</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=691842">Pixabay</a></span>
---

Your opening text goes here.

## In-article heading --- it's an H2 because your title is the H1

And after another paragraph or two or three, you may want to add a subheading, which would be an H3, so it would be like the following.

### Subheading (H3)

Text here.

And here are some examples of how to use the `img` shortcode in `/layouts/shortcodes` (note that the images must be in the same folder with the content, because of how Hugo bundles do image processing, so that's why the `src` references don't include a folder upfront):

{{< imgc src="Typography-scr-cap-2-2018-10-16_1344x200.jpg" alt="Thin and dim text that is hard to read" width=1344 height=200 >}}

{{< imgc src="Typography-scr-cap-3-2018-10-16_1398x252.jpg" alt="More thin and dim text that is hard to read" width=1398 height=252 >}}

{{< imgc src="Typography-scr-cap-4-2018-10-16_1398x164.jpg" alt="Still more thin and dim text that is hard to read" width=1398 height=164 >}}

Closing text. That ends Post 1!