---
title: "Include Jekyll blocks and highlight HTML in Jekyll"
description: "A clean way to show Liquid/Jekyll tags as code: wrap snippets with `{% raw %}` to prevent execution, then apply syntax highlighting (even for nested raw tags)."
pubDate: 2019-03-20
author: "Xiande Wen"
tags: ["jekyll", "liquid", "markdown", "syntax-highlighting", "tutorial"]
---

Writing documentation for Jekyll itself presents a unique challenge: **how do you show Jekyll/Liquid code without Jekyll executing it?** 

If you write `{{ page.title }}` in your markdown, Jekyll will replace it with the actual page title before the reader sees it. This makes it impossible to write tutorials about Jekyll syntax.

# **The Solution: Raw Tags**

Jekyll provides the `{% raw %}` tag specifically for this purpose. Anything between `{% raw %}` and `{% endraw %}` will be passed through untouched.

**Basic example:**

```liquid
{% raw %}
  {{ page.title }}
  {% if user.logged_in %}
    Welcome back!
  {% endif %}
{% endraw %}
```

This displays the Liquid syntax exactly as written, without processing it.

# **Adding Syntax Highlighting**

For better readability, combine `{% raw %}` with Jekyll's syntax highlighter:

```liquid
{% highlight liquid %}
{% raw %}
  {{ site.title }}
  {% for post in site.posts %}
    {{ post.title }}
  {% endfor %}
{% endraw %}
{% endhighlight %}
```

This gives you both:
1. Code that isn't executed (via `{% raw %}`)
2. Proper syntax highlighting (via `{% highlight %}`)

# **The Meta-Problem: Showing Raw Tags Themselves**

Now comes the tricky part: **how do you show the `{% raw %}` and `{% endraw %}` tags themselves?**

If you write them normally, Jekyll processes them and they disappear from the output.

**The trick:** Only escape the opening delimiter `{%`. The rest can stay literal.

```liquid
{% raw %}{%{% endraw %} raw %}
  Your content here
{% raw %}{%{% endraw %} endraw %}
```

**How this works:**
- `{% raw %}{%{% endraw %}` — This puts only `{%` inside a raw block, so it outputs `{%` literally
- ` raw %}` — Since Jekyll already saw the `{%` as literal text, it doesn't recognize this as a tag
- Result: The reader sees `{% raw %}`

The same technique works for `{% endraw %}` and any other Liquid tag you want to display.

# **Practical Example**

Here's how to write a complete tutorial snippet showing raw tags:

```liquid
To escape Liquid in Jekyll, use:

{% raw %}{%{% endraw %} raw %}
  {{ page.title }}
{% raw %}{%{% endraw %} endraw %}
```

This renders as:

```
To escape Liquid in Jekyll, use:

{% raw %}
  {{ page.title }}
{% endraw %}
```

# **Why Not Use Backslashes?**

You might see people using `\{% raw %}`, but this has drawbacks:
- The backslash often shows up in the rendered output
- It's inconsistent across different markdown processors
- It's less elegant and harder to read

The partial-escaping technique above is cleaner and more reliable.

# **References**

- [How to display {% raw %} and {% endraw %} using markdown?](https://stackoverflow.com/questions/47106191/how-to-display-raw-and-endraw-using-markdown#answer-47106519)