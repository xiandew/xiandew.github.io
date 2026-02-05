---
title: "Redirecting from HTTPS to HTTP"
description: "Why HTTPS → HTTP redirects don’t work without a valid certificate, what that means for SEO, and the narrow cases where an `.htaccess` rewrite can help."
pubDate: 2019-03-14
author: "Xiande Wen"
tags: ["https", "ssl", "apache", "htaccess", "seo"]
---

# **The Core Problem**

You **cannot** redirect HTTPS to HTTP if your SSL certificate is invalid or missing.

Here's why: When a browser tries to load `https://example.com`, it establishes a secure TLS connection **before** any HTTP communication happens. If the certificate is invalid, the browser shows a security error and stops—it never gets to see your redirect rules.

> You can't redirect it because the client won't connect to https on port 443 without a valid certificate.

# **When Is This Useful?**

**Note:** This may save you some time. If you have not obtained an
HTTPS certificate for your site, then what I'm about to discuss may
not be relevant or important to you.

It may seem pointless to need this, but it may be the first question
you ask when you've broken your HTTPS certificate and don't know how to
fix it. Actually, it doesn't matter much if you don't care about
SEO, since your site can still be accessed through HTTP.

However, things may not go well with SEO. If the search engine has indexed your
site's HTTP domain, a broken HTTPS certificate won't cause any harm—users can simply
visit your site via HTTP without needing redirection from HTTPS. You can
achieve this by simply disabling HTTPS. But what if the search engine has indexed
your HTTPS address? As mentioned earlier, there isn't
much you can do with redirection except fix the HTTPS certificate. Otherwise,
you'll have to give up on SEO for now and wait for the search engine to
update your site's information and replace the HTTPS domain with the HTTP one.

# **What's more?**

Note that you can achieve redirecting HTTPS to HTTP if both ports work fine and
the HTTPS certificate is valid.

> There are some specific situations when you want to redirect particular website to be opened through HTTP instead of HTTPS. To do so you can add the following directives in your website's .htaccess file:

```bash
# Redirect HTTPS to HTTP
RewriteCond %{HTTP:X-Forwarded-Proto} = https
RewriteRule ^(.*)$ http://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

> This will redirect your "https://example.com" to "http://example.com".

# **References**

- [Redirect from HTTPS to HTTP](https://www.siteground.com/kb/redirect-from-https-to-http/)