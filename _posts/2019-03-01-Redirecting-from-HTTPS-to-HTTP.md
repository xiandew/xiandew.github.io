---
  layout: post
  title: Redirecting from HTTPS to HTTP?
  tags:
  categories:
    - SSL
    - Linux
---

> You can't redirect it cause the client won't connect to https on port 443 without a valid certificate.

# **What's useful with this?**

*Note*

Just let you know and save you some time, maybe. If you have not obtained an
https certficate for your site. Then things that I am going to talk about may be
not so relevant or important to you.

It seems make no sense to have such a demand but it may be the first question
you ask when you have messed up your https certficate but know nothing to
deal with it. Actually, it does not matter much if you do not care about the
SEO stuff since your site can still be visited though http.

However, things may not go well with SEO. If the search engine has stored your
site's http domain, such a crash on https will not cause any harm. Because instead of
https, users can visit your site with http without redirection to https. You can
achieve that by simply turn off your https. But what if the serach engine has stored
your https address? As far as I know, like it said at the start, there is not
much you can do with redirection but trying to fix the https certificate. Otherwise,
you can just sadly give up the SEO things for now and wait the search engine to
update your site's information and replace your https domain with the http one.

# **What's more?**

Note that you can achive redirecting https to http if both ports work fine and
the https certificate is valid.

> There are some specific situations when you want to redirect particular website to be opened through HTTP instead of HTTPS. To do so you can add the following directives in your website's .htaccess file:

{% highlight bash %}
{% raw %}
# Redirect HTTPS to HTTP
RewriteCond %{HTTP:X-Forwarded-Proto} = https
RewriteRule ^(.*)$ http://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
{% endraw %}
{% endhighlight%}

> This will redirect your "https://example.com" to "http://example.com".

# **References**

- [Redirect from HTTPS to HTTP](https://www.siteground.com/kb/redirect-from-https-to-http/){:target='_blank'}
