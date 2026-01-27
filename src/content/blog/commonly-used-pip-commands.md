---
title: "Commonly used pip commands"
description: "A compact pip cheat sheet for everyday Python package management: list, install, inspect, upgrade, and uninstall packages."
pubDate: 2019-03-13
author: "Xiande Wen"
tags: ["python", "pip", "package-management", "cheat-sheet", "tutorial"]
---

> pip is a package management system used to install and manage software packages written in Python. Many packages can be found in the default source for packages and their dependencies — Python Package Index (PyPI).

<!--more-->

# **List all installed modules**

```python
pip list
```

# **Install module of a particular version**

```python
pip install [module]==[version]

# For example:
pip install urllib3==1.21.1
```

# **Install module**

```python
pip install [module]
```

# **Show details of a module**

```python
pip show [module]
```

# **Uninstall a module**

```python
pip uninstall [module]
```

# **Update a module**

```python
pip install --upgrade [module]
```

# **References**

- [029 Python语法之pip与源码安装](https://www.jianshu.com/p/ad35ad9e2a4e)
- [pip (package manager) - wikipedia](https://en.wikipedia.org/wiki/Pip_(package_manager))