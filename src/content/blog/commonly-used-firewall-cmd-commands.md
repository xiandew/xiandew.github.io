---
title: "Commonly used firewall cmd commands"
description: "A practical `firewall-cmd` / firewalld cheat sheet: zones, services, ports, and the difference between runtime and permanent rules for common Linux setups."
pubDate: 2019-03-12
author: "Xiande Wen"
tags: ["linux", "firewalld", "security", "devops", "cheat-sheet"]
---

**firewalld** is the modern firewall management tool in RHEL/CentOS/Fedora systems, replacing the older `iptables` service. It offers a more intuitive interface through the `firewall-cmd` command-line tool.

**Key advantages:**
- **Dynamic updates** — Change rules without restarting the firewall
- **Zone-based** — Group rules by trust level (public, work, home, etc.)
- **Service definitions** — Open ports by service name instead of memorizing port numbers
- **Runtime vs Permanent** — Test changes before making them permanent

This guide covers the most commonly used commands for managing firewalld.

> The command-line tool **firewall-cmd** is part of the **firewalld** application, which is installed by default. It can be used to make permanent and non-permanent runtime changes. Enter the following command to view the help output.
>
> # **Installing firewalld**
>
> By default, firewalld is included in the “core” rpm group, but if in case it is not installed, you can always install it using yum.
>
>```bash
>yum install -y firewalld
>```
>
> Enable the firewalld to start at boot:
>
>```bash
>systemctl enable firewalld
>```
>
> Restart the firewalld service now.
>
>```bash
>systemctl restart firewalld
>```
>
> # **Available options with firewall-cmd command**
>
>```bash
>firewall-cmd --help
>
>Usage: firewall-cmd [OPTIONS...]
>
>General Options
>  -h, --help           Prints a short help text and exists
>  -V, --version        Print the version string of firewalld
>  -q, --quiet          Do not print status messages
>
>Status Options
>  --state                  Return and print firewalld state
>  --reload                 Reload firewall and keep state information
>  --complete-reload        Reload firewall and lose state information
>  --runtime-to-permanent   Create permanent from runtime configuration
>```
>
> The firewall-cmd command offers categories of options such as General, Status, Permanent, Zone, IcmpType, Service, Adapt and Query Zones, Direct, Lockdown, Lockdown Whitelist, and Panic. Refer to the firewall-cmd man page for more information.
>
> # **Useful firewall-cmd Examples**
>
> **1. List all zones**
>
> Use the following command to list information for all zones. Only partial output is displayed.
>
>```bash
>firewall-cmd --list-all-zones
>work
>  target: default
>  icmp-block-inversion: no
>  interfaces:
>  sources:
>  services: dhcpv6-client ssh
>  ports:
>  protocols:
>  masquerade: no
>  forward-ports:
>  sourceports:
>  icmp-blocks:
>  rich rules:
>
>drop
>  target: DROP
>  icmp-block-inversion: no
>  interfaces:
>  sources:
>  services:
>  ports:
>  protocols:
>  masquerade: no
>  forward-ports:
>  sourceports:
>  icmp-blocks:
>  rich rules:
>.....
>```
>
>Public is the default zone set, if you do not change it. To check the currently set default zone use the below command:
>
>```bash
>firewall-cmd --get-default-zone
>public
>```
>
> **2. List allowed service and ports on the system**
>
> To show currently allowed service on your system use the below command.
>
>```bash
>firewall-cmd --list-services
>dhcpv6-client ssh
>```
>
>To list the ports that are open on your system:
>
>```bash
>firewall-cmd --list-ports
>```
>
> You would normally see no ports listed here when you have just enabled the firewalld.
>
> **3. To Enable all the incoming ports for a service**
>
> You can also open the required ports for a service by using the –add-seervice option. To permit access by HTTP clients for the public zone:
>
>```bash
>firewall-cmd --zone=public --add-service=http
>success
>```
>
> To list services that are allowed for the public zone:
>
> ```bash
>firewall-cmd --zone=work --list-services
>dhcpv6-client http ssh
>```
>
> Using this command only changes the Runtime configuration and does not update the configuration files. The following sequence of commands shows that configuration changes made in Runtime configuration mode are lost when the firewalld service is restarted:
>
>```bash
>systemctl restart firewalld
>```
>
>```bash
>firewall-cmd --zone=work --list-services
>dhcpv6-client ssh
>```
>
> To make changes permanent, use the –permanent option. Example:
>
>```bash
>firewall-cmd --permanent --zone=public --add-service=http
>success
>```
>
> Changes made in Permanent configuration mode are not implemented immediately. Example:
>
>```bash
>firewall-cmd --zone=work --list-services
>dhcpv6-client ssh
>```
>
>However, changes made in a Permanent configuration are written to configuration files. Restarting the firewalld service reads the configuration files and implements the changes.
>
>Example:
>
>```bash
>systemctl restart firewalld
>```
>
>```bash
>firewall-cmd --zone=work --list-services
>dhcpv6-client http ssh
>```
>
> **4. Allow traffic on an incoming port**
>
> The command below will open the port 2222 effective immediately, but will not persist across reboots:
>
>```bash
>firewall-cmd --add-port=[YOUR PORT]/tcp
>```
>
> For example, to open TCP port 2222 :
>
>```bash
>firewall-cmd --add-port=2222/tcp
>```
>
>The following command will create a persistent rule, but will not be put into effect immediately:
>
>```bash
>firewall-cmd --permanent --add-port=[YOUR PORT]/tcp
>```
>
> For Example, to open TCP port 2222 :
>
>```bash
>firewall-cmd --permanent --add-port=2222/tcp
>````
>
> To list the open ports, use the command :
>
>```bash
>firewall-cmd –-list-ports
>2222/tcp
>```
>
> **5. Start and stop firewalld service**
>
> To start/stop/status firewalld service use the below commands:
>
>```bash
>systemctl start firewalld.service
>systemctl stop firewalld.service
>```
>
>To check the status of the firewalld service:
>
>```bash
>systemctl status firewalld.service
>```
>

My examples:

To open TCP port 443 (https):
```bash
firewall-cmd --permanent --zone=public --add-port=443/tcp
```

To open TCP port 80 (http):
```bash
firewall-cmd --permanent --zone=public --add-port=80/tcp
```

# **References**
- [5 Useful Examples of firewall-cmd command](https://www.thegeekdiary.com/5-useful-examples-of-firewall-cmd-command/)