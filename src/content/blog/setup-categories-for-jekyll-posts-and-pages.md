---
title: "Setup categories for Jekyll posts and pages"
description: "Add categories to a Jekyll site with simple Liquid snippets, plus a categories index page that groups posts and links to per-category archives."
pubDate: 2019-03-22
author: "Xiande Wen"
tags: ["jekyll", "categories", "liquid", "static-site", "tutorial"]
---

As your blog grows, a flat list of posts becomes unwieldy. **Categories** provide structure and help readers discover related content.

Jekyll has built-in support for categories through front matter, but displaying them requires custom Liquid templates. This guide shows you how to:

1. Display category tags on individual posts
2. Create a categories index page with grouped post archives
3. Link everything together for intuitive navigation

Let's build a clean category system from scratch.

# **Display categories for each Post**

The following piece of code shows categories for each post and also have links points to
all posts within that category. You can place this code anywhere you like.

```html
<div class="post-categories">
  {% assign categories = post.categories %}
  {% for category in categories %}
    <a class="category_name" href="{{'/categories/#' | prepeand: site.url | append: category | relative_url }}">
      {{category}}
    </a>
  {% unless forloop.last %}&nbsp;{% endunless %}
  {% endfor %}
</div>
```

# **A category page**

Create a file called `categories.html` under your root of the blog website and
paste the following code in.

> The page will look like this. It will have all the categories listed out. One article can be listed in many categories. This happens when you use more than one category for a post.

```html
---
layout: page
permalink: /categories/
title: Categories
---

<div class="categories">
  {% for category in site.categories %}
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <a class="category_name" href="{{'/categories/#' | prepeand: site.url | append: category_name | relative_url }}">
      {{ category_name }}
    </a><!--Links points to all posts within each category-->
  {% unless forloop.last %}&nbsp;{% endunless %}
  {% endfor %}
</div><!--All categories in the site-->

<div id="archives">
  {% for category in site.categories %}
    <div class="archive-group">
      {% capture category_name %}{{ category | first }}{% endcapture %}

      <div id="{{ category_name | slugize }}">
        <h3 class="category-head">{{ category_name }}</h3>
      </div>

      {% for post in site.categories[category_name] %}
      <article class="archive-item">
        <h4>
          <a href="{{ site.url | append: post.url | relative_url }}">
            {{post.title}}
          </a>
        </h4>
      </article>
      {% endfor %}
    </div>
  {% endfor %}
</div><!--Categories following posts within them-->
```

# **References**

- [3 Simple steps to setup Jekyll Categories and Tags](https://blog.webjeda.com/jekyll-categories/)