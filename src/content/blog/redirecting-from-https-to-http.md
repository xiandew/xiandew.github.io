---
title: "Redirecting from HTTPS to HTTP"
description: "Why HTTPS → HTTP redirects don’t work without a valid certificate, what that means for SEO, and the narrow cases where an `.htaccess` rewrite can help."
pubDate: 2019-03-14
author: "Xiande Wen"
tags: ["https", "ssl", "apache", "htaccess", "seo"]
---

> You can't redirect it cause the client won't connect to https on port 443 without a valid certificate.

# **What's useful with this?**

*Note*

Just let you know and save you some time, maybe. If you have not obtained an
HTTPS certificate for your site, then things that I am going to talk about may
not be so relevant or important to you.

It seems to make no sense to have such a demand, but it may be the first question
you ask when you have messed up your HTTPS certificate but don't know how to
deal with it. Actually, it does not matter much if you do not care about the
SEO stuff since your site can still be visited through HTTP.

However, things may not go well with SEO. If the search engine has stored your
site's HTTP domain, such a crash on HTTPS will not cause any harm. Because instead of
HTTPS, users can visit your site with HTTP without redirection to HTTPS. You can
achieve that by simply turning off your HTTPS. But what if the search engine has stored
your HTTPS address? As far as I know, like it said at the start, there is not
much you can do with redirection but trying to fix the https certificate. Otherwise,
you can just sadly give up the SEO things for now and wait the search engine to
update your site's information and replace your https domain with the http one.

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