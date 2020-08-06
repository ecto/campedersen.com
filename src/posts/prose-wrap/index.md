---
layout: post
title: Prettier for Markdown
date: 2020-08-06
---

import proseWrap from "./proseWrap.mp4";

While working on this blog I got annoyed with manually worrying about line
breaks. I use [Prettier](https://prettier.io/) on
[save](https://github.com/prettier/prettier-vscode) for all my code, so why
should I have to think about this problem while writing blog posts?

It turns out Prettier works out of the box with Markdown files since
[version 1.8](https://prettier.io/blog/2017/11/07/1.8.0.html), but its default
configuration is intended to be unobtrusive.

You have to add the following option to your `.prettierrc` to get line wrapping
in Markdown files:

```json
"proseWrap": "always"
```

Life's too short to worry about formatting!

<video src={proseWrap} autoplay loop />
