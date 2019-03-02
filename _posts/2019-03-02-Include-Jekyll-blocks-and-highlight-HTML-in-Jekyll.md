---
  layout: post
  title: Include Jekyll blocks and highlight HTML in Jekyll
  tags:
  categories:
    - Jekyll
---

When writing a post about a language, including a block of codes can often make the
illustration more clear. But what should we do when we want to include Jekyll codes
in a website made with Jekyll? Sounds like a tricky question. Because every time you
write Jekyll codes in the back-end markdown file, the codes will be implemented first
instead of showing off.

My method to do the trick is as following:

```
{% raw %}{%{% endraw %} highlight html %}
{% raw %}{%{% endraw %} raw %}
  Write your Jekyll code blocks here
{% raw %}{%{% endraw %} endraw %}
{% raw %}{%{% endraw %} endhighlight %}
```

Wrapping the codes with `raw` tags first will stop it from being implemented and
then wrapping it with `highlight html` will give it a more clear appearance.

And you may wonder how to include `{% raw %}{%{% endraw %} raw %}` and
`{% raw %}{%{% endraw %} endraw %}`. Maybe you have seen many people tends to put
`\` before `%` but that does not display very well with `\` itself also showing off.

Here is an elegant way to achieve this.

> Put the first `{% raw %}{%{% endraw %}` inside a raw tag, so escaping it avoids the rest being processed:
>
> ```
>   {% raw %}{%{% endraw %} raw %} {% raw %}{%{% endraw %} {% raw %}{%{% endraw %} endraw %} raw %}
>   {% raw %}{%{% endraw %} raw %} {% raw %}{%{% endraw %} {% raw %}{%{% endraw %} endraw %} endraw %}
> ```
>
> Or if you prefer you can escape both:
>
>  ```
>   {% raw %}{%{% endraw %} raw %} {% raw %}{%{% endraw %} {% raw %}{%{% endraw %} endraw %} raw {% raw %}{%{% endraw %} raw %} {% raw %}%}{% endraw %} {% raw %}{%{% endraw %} endraw %}
>   {% raw %}{%{% endraw %} raw %} {% raw %}{%{% endraw %} {% raw %}{%{% endraw %} endraw %} endraw {% raw %}{%{% endraw %} raw %} {% raw %}%}{% endraw %} {% raw %}{%{% endraw %} endraw %}
> ```
>
> Both alternatives produces `{% raw %}{%{% endraw %} raw %}` and `{% raw %}{%{% endraw %} endraw %}`.

# **References**

- [How to display {% raw %} and {% endraw %} using markdown?](https://stackoverflow.com/questions/47106191/how-to-display-raw-and-endraw-using-markdown#answer-47106519){:target="_blank"}
