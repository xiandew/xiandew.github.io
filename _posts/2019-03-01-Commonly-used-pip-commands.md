---
  layout: post
  title: Commonly used pip commands
  tags:
  categories:
    - Python
---

> pip is a package management system used to install and manage software packages written in Python. Many packages can be found in the default source for packages and their dependencies — Python Package Index (PyPI).

<!--more-->

# **List all installed modules**

{% highlight python %}
pip list
{% endhighlight %}

# **Install module of a particular version**

{% highlight python %}
pip install [module]==[version]

# For example:
pip install urllib3==1.21.1
{% endhighlight %}

# **Install module**

{% highlight python %}
pip install [module]
{% endhighlight %}

# **Show details of a module**

{% highlight python %}
pip show [module]
{% endhighlight %}

# **Uninstall a module**

{% highlight python %}
pip uninstall [module]
{% endhighlight %}

# **Update a module**

{% highlight python %}
pip install --upgrade [module]
{% endhighlight %}

# **References**

- [029 Python语法之pip与源码安装](https://www.jianshu.com/p/ad35ad9e2a4e){:target='_blank'}
- [pip (package manager) - wikipedia](https://en.wikipedia.org/wiki/Pip_(package_manager)){:target='_blank'}
