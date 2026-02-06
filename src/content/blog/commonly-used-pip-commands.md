---
title: "Commonly used pip commands"
description: "A compact pip cheat sheet for everyday Python package management: list, install, inspect, upgrade, and uninstall packages."
pubDate: 2019-03-13
author: "Xiande Wen"
tags: ["python", "pip", "package-management", "cheat-sheet", "tutorial"]
---

You run `pip install requests`, wait for the download, and suddenly your previously working code breaks because of a dependency conflict. Sound familiar?

**pip** is Python's package installer, pulling from the massive Python Package Index (PyPI) with over 400,000 packages. Here's how to use it effectively without breaking things.

# **The Basics**

## Install a Package

```bash
# Latest version
pip install requests

# Specific version (recommended for production)
pip install requests==2.28.1

# Minimum version
pip install requests>=2.28.0

# Version range
pip install "requests>=2.28.0,<3.0.0"
```

## Upgrade a Package

```bash
# Upgrade to latest
pip install --upgrade requests

# See what would be upgraded (dry run)
pip install --upgrade --dry-run requests
```

## Uninstall a Package

```bash
pip uninstall requests

# Skip confirmation prompt
pip uninstall -y requests
```

# **Investigation & Debugging**

## What's Installed?

```bash
# List all packages
pip list

# List outdated packages
pip list --outdated

# Show only packages you installed (not dependencies)
pip list --not-required
```

## Package Details

When debugging dependency conflicts or checking licenses:

```bash
# Full package info
pip show requests

# Output:
# Name: requests
# Version: 2.28.1
# Summary: Python HTTP for Humans.
# Home-page: https://requests.readthedocs.io
# Author: Kenneth Reitz
# License: Apache 2.0
# Location: /usr/local/lib/python3.9/site-packages
# Requires: charset-normalizer, idna, urllib3, certifi
# Required-by: ...

# See dependency tree
pip show requests --verbose
```

# **Working with Requirements**

## Freeze Current Environment

```bash
# Export all installed packages
pip freeze > requirements.txt

# Export only top-level packages (cleaner)
pip list --not-required --format=freeze > requirements.txt
```

## Install from Requirements File

```bash
# Install everything
pip install -r requirements.txt

# Upgrade everything
pip install --upgrade -r requirements.txt
```

# **Common Workflows**

## Setting Up a New Project

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Verify
pip list
```

## Before Deploying

```bash
# Check for security vulnerabilities (requires pip-audit)
pip install pip-audit
pip-audit

# Check for outdated packages
pip list --outdated

# Generate clean requirements file
pip freeze > requirements.txt
```

## Fixing Broken Dependencies

```bash
# Force reinstall a package and dependencies
pip install --force-reinstall --no-cache-dir requests

# Check for conflicts
pip check
```

# **Pro Tips**

**Always use virtual environments** — Never install packages globally:
```bash
python -m venv venv
source venv/bin/activate
```

**Pin versions in production** — Use exact versions in `requirements.txt`:
```
requests==2.28.1  # ✅ Reproducible
requests>=2.28.0  # ❌ May break unexpectedly
```

**Check before upgrading** — See what will change:
```bash
pip list --outdated
pip install --upgrade --dry-run package-name
```

# **References**

- [029 Python语法之pip与源码安装](https://www.jianshu.com/p/ad35ad9e2a4e)
- [pip (package manager) - wikipedia](https://en.wikipedia.org/wiki/Pip_(package_manager))