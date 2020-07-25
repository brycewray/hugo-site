---
title: "Post 2 with its UNIQUE title" # Quotation marks allow colons, semicolons, etc.
subtitle: "The UNIQUE Post 2 subtitle" # Quotation marks allow colons, semicolons, etc.
description: "The UNIQUE description for Post 2." # Quotation marks allow colons, semicolons, etc.
author: Your name goes here
date: 2018-10-25T07:40:00 # This would be 7:40 (0740) AM UTC on Oct. 25, 2018
lastmod: 2020-06-13T13:10:00 # Comment-out this line with a # if content is unchanged
draft: false # Make it "true" if you don't want Hugo to "publish" yet
featured_image: computer-1869236_1920x1440.jpg # Or whatever image you want to use
featured_image_alt: Backlit computer keyboard # Always include an ALT tag for accessibility
featured_image_caption: "Image: Pixabay" # Quotation marks allow colons, semicolons, etc.
---

<div class="yellowBox">
	<p><strong>Note</strong>: Maybe you have a note here about why you updated the post, for example. In that case, this <code>yellowBox</code> CSS/SCSS class is useful.</p>
</div>
&nbsp;<br />


Your opening text goes here.

## In-article heading --- it's an H2 because your title is the H1

And after another paragraph or two or three, you may want to add a subheading, which would be an H3, so it would be like the following.

### Subheading (H3)

Text here.

And here's an example of how to use the `img` shortcode in `/layouts/shortcodes` (note that the images must be in the same folder with the content, because of how Hugo bundles do image processing, so that's why the `src` references don't include a folder upfront):

{{< img src="Early-Web-font-grfx-1-2018-10-16_1218x1296.jpg" alt="Image from Apple Web site in 1999 showing graphic elements as text" >}}

Closing text. That ends Post 2!