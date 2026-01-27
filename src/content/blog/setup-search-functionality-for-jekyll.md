---
title: "Setup search functionality for Jekyll"
description: "Add client-side search to a Jekyll blog using Simple-Jekyll-Search: generate `search.json`, add input/results markup, and wire up the JS configuration."
pubDate: 2019-03-23
author: "Xiande Wen"
tags: ["jekyll", "search", "javascript", "static-site", "tutorial"]
---

A search functionality is basically a fundamental part of a website. It can be pretty
handy when trying to find something specific.
<!--more-->

With Simple-Jekyll-Search plugin, a workable search functionality can be setup
in a few steps. Here is how I implement it in this current site.

# **Installation**
Installing Simple-Jekyll-Search plugin requires npm, so you should have it installed
first if have not yet. You can reference this link to [get npm](https://www.npmjs.com/get-npm).

After installing npm, installing the Simple-Jekyll-Search package locally in your
computer which could be done with simply one line of code:

```
npm install simple-jekyll-search
```

# **Setup**

**Create 'search.json'**


Create a file `search.json` in your root of your Jekyll blog. Paste the following
code in it.

```javascript

---
layout: null
---

[
  {% for post in site.posts %}
    {
      "title"    : "{{ post.title | escape }}",
      "category" : "{{ post.category }}",
      "tags"     : "{{ post.tags | join: ', ' }}",
      "url"      : "{{ site.baseurl }}{{ post.url }}",
      "date"     : "{{ post.date }}"
    }
    {% unless forloop.last %},{% endunless %}
  {% endfor %}
]

```

This json file will be evaluated and store those information about all posts in
the blog, which will be the database for the plugin to look up.

**Add Dom Elements**

Two dom elements will be needed for the plugin to work.
And you can place anywhere you want.
  - Input field for the user to type key words
  - Results container contains the search results

For obtaining a better code structure, I created a `search.html` under `_include`
folder. And created dom elements as following.
```html
<div class="search">
  <input type="text" id="search-input" placeholder="Search blog posts..">
  <ul id="results-container"></ul>
</div>
```

**Add JS**

For the plugin to work, you also need some JS. You need include a JS file which
will do the main search work. I downloaded it from [this link](https://cdn.rawgit.com/christian-fei/Simple-Jekyll-Search/master/dest/simple-jekyll-search.min.js) and saved it under `/assets/js`. You can save it wherever you want and just make sure you get its path right.
```html
<script src="{{ '/assets/js/simple-jekyll-search.min.js' | prepend: site.url | relative_url }}"></script>
```

After included it, the last thing you should do is configuration. For more configuration
options, you can find it [here](https://github.com/christian-fei/Simple-Jekyll-Search/wiki#options).

```html
<script>
  SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json',
    searchResultTemplate: '<li><a href="{{ site.url }}{url}">{title}</a></li>'
  })
</script>
```
Again, I also included the above JS codes in `search.html` under `_include`. So I
can put the search tab anywhere by `{% include search.html %}`.

Done!

# **References**
- [Simple-Jekyll-Search - github](https://github.com/christian-fei/Simple-Jekyll-Search#readme)