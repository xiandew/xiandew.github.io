---
  layout: post
  title: Hit the rate limit of 'Let's encrypt'
  tags:
  categories:
    - SSL
    - Linux
---

delete the let's encrypt certs accidentally with "sudo certbot delete" and
hit rate limits (https://letsencrypt.org/docs/rate-limits/) concurrently,
have to wait a week.
Register a free sencond level domain name and set it up on
server. Request LE certs for the two domains, which does a trick that avoid
wasting a week time.
both "hzyzgjb.llli.net" and "hzyzgjb.linkpc.net" are free but they all
available only for a very short time, normally 3min, because the internet
policy in China.
