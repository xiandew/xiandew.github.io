---
title: "Commonly used firewall cmd commands"
description: "A practical `firewall-cmd` / firewalld cheat sheet: zones, services, ports, and the difference between runtime and permanent rules for common Linux setups."
pubDate: 2019-03-12
author: "Xiande Wen"
tags: ["linux", "firewalld", "security", "devops", "cheat-sheet"]
---

If you've ever deployed a web server only to find it unreachable because port 80 is blocked, you know the frustration of firewall configuration. **firewalld** makes this process less painful on RHEL/CentOS/Fedora systems.

# **Why firewalld?**

Unlike the older `iptables` service, firewalld lets you:
- **Change rules without dropping connections** — Updates apply dynamically
- **Test before committing** — Try changes in runtime mode, make permanent only if they work
- **Think in services, not ports** — Open "http" instead of remembering "port 80"
- **Group rules by trust level** — Different rules for public WiFi vs your home network

# **Installation & Setup**

Most modern RHEL-based systems include firewalld by default. If not:

```bash
# Install
sudo yum install -y firewalld

# Enable at boot
sudo systemctl enable firewalld

# Start now
sudo systemctl start firewalld

# Verify it's running
sudo firewall-cmd --state
```

# **The Runtime vs Permanent Distinction**

This is the most important concept to understand:

**Runtime rules** = Active now, lost on reboot  
**Permanent rules** = Saved to disk, applied on next reload/reboot

The recommended workflow:
1. Add a runtime rule to test
2. Verify it works
3. Make it permanent

```bash
# Test immediately (runtime)
sudo firewall-cmd --add-service=http

# Verify it works (test your web server)
# ...

# Make it permanent
sudo firewall-cmd --permanent --add-service=http

# OR, save all working runtime rules at once
sudo firewall-cmd --runtime-to-permanent
```

# **Common Tasks**

## Check Status

```bash
# What's my default zone?
firewall-cmd --get-default-zone

# What's currently allowed?
firewall-cmd --list-all

# What services are defined?
firewall-cmd --get-services
```

## Open Ports by Service Name

Much cleaner than memorizing port numbers:

```bash
# Allow HTTP traffic (port 80)
sudo firewall-cmd --permanent --add-service=http

# Allow HTTPS traffic (port 443)
sudo firewall-cmd --permanent --add-service=https

# Allow SSH (port 22)
sudo firewall-cmd --permanent --add-service=ssh

# Apply changes
sudo firewall-cmd --reload
```

## Open Specific Ports

When there's no predefined service:

```bash
# Open port 8080 for a custom web app
sudo firewall-cmd --permanent --add-port=8080/tcp

# Open a range of ports
sudo firewall-cmd --permanent --add-port=8000-8100/tcp

# Open UDP port
sudo firewall-cmd --permanent --add-port=53/udp

# Apply
sudo firewall-cmd --reload
```

## Remove Rules

```bash
# Remove a service
sudo firewall-cmd --permanent --remove-service=http

# Remove a port
sudo firewall-cmd --permanent --remove-port=8080/tcp

# Apply
sudo firewall-cmd --reload
```

## Quick Web Server Setup

The most common scenario — opening a web server to the internet:

```bash
# Open HTTP and HTTPS permanently
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https

# Apply immediately
sudo firewall-cmd --reload

# Verify
sudo firewall-cmd --list-services
```

# **References**
- [5 Useful Examples of firewall-cmd command](https://www.thegeekdiary.com/5-useful-examples-of-firewall-cmd-command/)
