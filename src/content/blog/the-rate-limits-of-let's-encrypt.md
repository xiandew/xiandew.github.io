---
title: "The rate limits of Let's Encrypt"
description: "A practical summary of Let's Encrypt rate limits (per-domain, duplicate certs, renewals, failed validations) and how to plan issuance for many subdomains."
pubDate: 2019-03-17
author: "Xiande Wen"
tags: ["letsencrypt", "ssl", "certificates", "security", "devops"]
---

Let's Encrypt provides rate limits to ensure fair usage by as many people as possible.

The main limit is **Certificates per Registered Domain** (50 per week). A registered domain is, generally speaking, the part of the domain you purchased from your domain name registrar. For instance, in the name `www.example.com`, the registered domain is `example.com`. In `new.blog.example.co.uk`, the registered domain is `example.co.uk`. We use the Public Suffix List to calculate the registered domain.

If you have a lot of subdomains, you may want to combine them into a single certificate, up to a limit of 100 **Names per Certificate**. Combined with the above limit, that means you can issue certificates containing up to 5,000 unique subdomains per week. A certificate with multiple names is often called a SAN certificate, or sometimes a UCC certificate.

Let's Encrypt also has a **Duplicate Certificate** limit of 5 certificates per week. A certificate is considered a duplicate of an earlier certificate if they contain the exact same set of hostnames, ignoring capitalization and ordering of hostnames. For instance, if you requested a certificate for the names [`www.example.com`, `example.com`], you could request four more certificates for [`www.example.com`, `example.com`] during the week. If you changed the set of names by adding [`blog.example.com`], you would be able to request additional certificates.

To make sure you can always renew your certificates when you need to, Let's Encrypt has a **Renewal Exemption** to the Certificates per Registered Domain limit. Even if you've hit the limit for the week, you can still issue new certificates that count as renewals. An issuance request counts as a renewal if it contains the exact same set of hostnames as a previously issued certificate. This is the same definition used for the Duplicate Certificate limit described above. Renewals are still subject to the Duplicate Certificate limit. Also note: the order of renewals and new issuances matters. To get the maximum possible number of certificates, you must perform all new issuances before renewals during a given time window.

The Duplicate Certificate limit and the Renewal Exemption ignore the public key and extensions requested. A certificate issuance can be considered a renewal even if you are using a new key.

Note that the Renewal Exemption also means you can gradually increase the number of certificates available to your subdomains. You can issue 50 certificates in week 1, 50 more certificates in week 2, and so on, while not interfering with renewals of existing certificates.

Revoking certificates does not reset rate limits, because the resources used to issue those certificates have already been consumed.

There is a **Failed Validation** limit of 5 failures per account, per hostname, per hour.

The "new-reg", "new-authz" and "new-cert" endpoints have an **Overall Requests** limit of 20 per second. The "/directory" endpoint and the "/acme" directory & subdirectories have an Overall Requests limit of 40 requests per second.

# **Overrides**

If you have hit a rate limit, Let's Encrypt does not have a way to temporarily reset it. You will need to wait until the rate limit expires after a week. We use a sliding window, so if you issued 25 certificates on Monday and 25 more certificates on Friday, you will be able to issue again starting Monday. You can get a list of certificates issued for your registered domain by searching on crt.sh, which uses the public Certificate Transparency logs.

Revoking certificates does not reset rate limits, because the resources involved in issuing the certificates have already been used.

# **References**

- [Rate limits - Let's Encrypt](https://letsencrypt.org/docs/rate-limits/)
