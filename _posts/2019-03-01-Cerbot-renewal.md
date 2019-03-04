---
  layout: post
  title: Cerbot renewal
  tags:
  categories:
    - SSL
    - Linux
---

# **Automating renewal**

Certbot can be configured to renew your certificates automatically before they expire. Since Let's Encrypt certificates last for 90 days, it's highly advisable to take advantage of this feature. You can test automatic renewal for your certificates by running this command:

```
$ sudo certbot renew --dry-run
```

If that appears to be working correctly, you can arrange for automatic renewal by adding a `cron job` or `systemd` timer which runs the following:

```
certbot renew
```

*Note*

If you're setting up a cron or systemd job, we recommend running it twice per
day (**it won't do anything until your certificates are due for renewal or revoked**,
but running it regularly would give your site a chance of staying online in case
a Let's Encrypt-initiated revocation happened for some reason). Please select a
random minute within the hour for your renewal tasks.

An example cron job might look like this, which will run at noon and midnight every day:

```
0 0,12 * * * python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew
```

# **References**
- [Automatically enable HTTPS on your website with EFF's Certbot, deploying Let's Encrypt certificates.](https://certbot.eff.org/lets-encrypt/centosrhel7-apache){:target="_blank"}
