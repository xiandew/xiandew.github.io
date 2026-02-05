---
title: "Implement pagination functionality for Jekyll"
description: "How to add pagination to a Jekyll blog with `jekyll-paginate`: configuration, paginate paths, and Liquid templates for navigation and per-page post lists."
pubDate: 2019-03-18
author: "Xiande Wen"
tags: ["jekyll", "pagination", "liquid", "static-site", "tutorial"]
---

As your blog grows, a single page listing all posts becomes overwhelming. Users face slow load times, endless scrolling, and cognitive overload.

**Pagination** solves this by breaking content into digestible chunks:
- **Faster page loads** — Fewer posts per page means less HTML and images
- **Better UX** — Clear navigation between pages
- **Professional appearance** — Shows you care about user experience

Jekyll's `jekyll-paginate` plugin makes this straightforward. Let's implement it.

Here is how to implement with Jekyll.

# **Get started**

For Jekyll 3, the first thing you need to do is installing the plugin
`jekyll-paginate`.

You can install it yourself as:

```
gem 'jekyll-paginate'
```

Or you can add this line to your application's Gemfile:

```
gem 'jekyll-paginate'
```

And then execute:

```
bundle
```

For Jekyll 2, this is standard so you do not need to install it.

# **Enable pagination**

To enable pagination for posts on your blog, add a line to the `_config.yml` file that specifies how many items should be displayed per page:

```
paginate: 8
```

The number should be the maximum number of Posts you'd like to be displayed per-page in the generated site.

You may also specify the destination of the pagination pages:

```
paginate_path: "/page:num"
```

This will read in `/index.html`, send it each pagination page in Liquid as `paginator` and write the output to `/page:num`, where `:num` is the pagination page number, starting with `2`.

*Note*

*The `index.html` should be placed in the same directory as the specified `paginate_path`. For example, in my case, I specified the path as `/page:num` so the path if the `index.html` should be `/index.html`. If you specify the `paginate_path` as `/blog/page:num`, the `index.html` should be placed under `/blog/` directory.*


If a site has 12 posts and specifies `paginate: 5`, Jekyll will write `/index.html` with the first 5 posts, `/page2/index.html` with the next 5 posts and `/page3/index.html` with the last 2 posts into the destination directory.

*Don't set a permalink*

*Setting a permalink in the front matter of your blog page will cause pagination to break. Just omit the permalink.*

# **Set up page navigation**

```html
{% if paginator.total_pages > 1 %}
<div class="pagination">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path | relative_url }}">
      &laquo; Prev
    </a>
  {% else %}
    <span>&laquo; Prev</span>
  {% endif %}

  {% for page in (1..paginator.total_pages) %}
    {% if page == paginator.page %}
      <b>{{ page }}</b>
    {% elsif page == 1 %}
      <a class="page-i" href="{{ site.url | relative_url }}">{{ page }}</a>
    {% else %}
      <a class="page-i" href="{{ site.paginate_path | relative_url | replace: ':num', page }}">{{ page }}</a>
    {% endif %}
  {% endfor %}

  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path | relative_url }}">
      Next &raquo;
    </a>
  {% else %}
    <span>Next &raquo;</span>
  {% endif %}
</div>
{% endif %}
```

For a better structure, you can place the above codes in a file called `pagination.html`
under `_includes` directory. And use it by simply `{% include pagination.html %}`. You can place the line of codes anywhere you want.

These codes take use of the attributes of `paginator`. You can view all available liquid attributes from [here](https://jekyllrb.com/docs/pagination/#liquid-attributes-available).

# **Setup posts for each page**

After you setup the page navigation, you should have page navigation appear on your
page. You probably note that by including `pagination.html`, each page has no
posts but only the navigation.

Put the following codes above `{% include pagination.html %}` (if you want the
navigation shows below the posts), which will do the job showing posts. The `paginator`
only contains posts in the current page.

```html
<ul class="post-list">
  {%- for post in paginator.posts -%}
  <li>
    {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
    <h3 class="post-title">
      <a class="post-link" href="{{ post.url | relative_url }}">
        {{ post.title | escape }}
      </a>
    </h3>
    <p class="post-excerpt">
      {{ post.excerpt | strip_html | truncatewords: 40 }}
    </p>
    <div class="post-meta">{{ post.date | date: date_format }}</div>
  </li>
  {%- endfor -%}
</ul>
```

After that, you should see the full pagination effect and you can customise the style now.

# **References**

- [Pagination - Jekyll](https://jekyllrb.com/docs/pagination/)
- [Jekyll::Paginate - Github](https://github.com/jekyll/jekyll-paginate#readme)
- [玩转jekyll系列（一）之完善博客的分页功能](https://www.thinktxt.com/jekyll/2017/01/23/jekyll-series-blog-paginate.html)