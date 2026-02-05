---
title: "Notes on working with unimelb gitlab"
description: "A quick fix for a common GitLab push redirect issue: use the correct remote URL (including `.git`) and remove/re-add `origin` when you’ve set it wrong."
pubDate: 2019-04-05
author: "Xiande Wen"
tags: ["git", "gitlab", "troubleshooting", "version-control", "tutorial"]
---

Working with institutional GitLab instances can be tricky if you're not familiar with their specific URL requirements. Here's a common issue I encountered with University of Melbourne's GitLab and how to fix it.

# **The Problem: Push Redirect Error**

When trying to push to a GitLab repository, you might encounter:

```bash
fatal: unable to update url base from redirection:
  asked for: https://gitlab.eng.unimelb.edu.au/xiandew/comp30023-lab-2/info/refs?service=git-receive-pack
   redirect: https://gitlab.eng.unimelb.edu.au/users/sign_in
```

# **The Cause**

I had added the remote without the `.git` extension:

```bash
# ❌ Wrong - missing .git
git remote add origin "https://gitlab.eng.unimelb.edu.au/xiandew/comp30023-lab-3"
```

The correct URL should include `.git` at the end:

```bash
# ✅ Correct
git remote add origin "https://gitlab.eng.unimelb.edu.au/xiandew/comp30023-lab-3.git"
```

# **The Solution**

If you've already added the wrong remote URL, you'll get this error when trying to add it again:

```bash
fatal: remote origin already exists.
```

**Fix it in two steps:**

**1. Remove the incorrect remote:**

```bash
git remote remove origin
```

**2. Add the correct remote:**

```bash
git remote add origin "https://gitlab.eng.unimelb.edu.au/xiandew/comp30023-lab-3.git"
```

**3. Push your changes:**

```bash
git push -u origin master
```

If this is your first time connecting, GitLab will prompt for your username and password.

# **Key Takeaway**

When working with GitLab (or any Git hosting service), always verify the exact remote URL format required. Many services require the `.git` extension, while others don't. Check the repository's clone instructions if you're unsure.