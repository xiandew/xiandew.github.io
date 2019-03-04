---
  layout: post
  title: Cerbot renewal
  tags:
  categories:
    - SSL
    - Linux
---

# **Automating renewal**

If you're setting up a cron or systemd job, we recommend running it twice per
day (it won't do anything until your certificates are due for renewal or revoked,
but running it regularly would give your site a chance of staying online in case
a Let's Encrypt-initiated revocation happened for some reason). Please select a
random minute within the hour for your renewal tasks.

# **References**
- [Automatically enable HTTPS on your website with EFF's Certbot, deploying Let's Encrypt certificates.](https://certbot.eff.org/lets-encrypt/centosrhel7-apache){:target="_blank"}
