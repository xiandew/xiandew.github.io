---
  layout: post
  title: Implement pagination functionality for Jekyll
  tags:
  categories:
    - Jekyll
---

> Creativity loves constraints and simplicity is at our core. Tweets are limited to 140 characters so they can be consumed easily anywhere, even via mobile text messages. There’s no magical length for a Tweet, but a recent report by Buddy Media revealed that Tweets shorter than 100 characters get a 17% higher engagement rate.

The pagination functionality is very common for blog website. Blog pages with long
list can be very annoying sometimes hence users will have uncomfortable browsing
experience. Perfect page length does not only bring confortabiliy to users but also
shows a clear web page structure.

Here is how to implement.

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

{% highlight html %}
{% raw %}

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

{% endraw %}
{% endhighlight %}

For a better structure, you can place the above codes in a file called `pagination.html`
under `_includes` directory. And use it by simply `{% include pagination.html %}`. You can place the line of codes anywhere you want.

These codes take use of the attributes of `paginator`. You can view all available liquid attributes from [here](https://jekyllrb.com/docs/pagination/#liquid-attributes-available){:target='_blank'}.

# **Setup posts for each page**

After you setup the page navigation, you should have page navigation appear on your
page. You probably note that by including `pagination.html`, each page has no
posts but only the navigation.

Put the following codes above `{% include pagination.html %}` (if you want the
navigation shows below the posts), which will do the job showing posts. The `paginator`
only contains posts in the current page.

{% highlight html %}
{% raw %}

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

{% endraw %}
{% endhighlight %}

After that, you should see the full pagination effect and you can customise the style now.

# **References**

- [Pagination - Jekyll](https://jekyllrb.com/docs/pagination/){:target='_blank'}
- [Jekyll::Paginate - Github](https://github.com/jekyll/jekyll-paginate#readme){:target='_blank'}
- [玩转jekyll系列（一）之完善博客的分页功能](https://www.thinktxt.com/jekyll/2017/01/23/jekyll-series-blog-paginate.html){:target='_blank'}
