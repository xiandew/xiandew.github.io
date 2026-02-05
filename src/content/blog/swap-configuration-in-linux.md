---
title: "Swap configuration in Linux"
description: "A practical walkthrough of creating and enabling a swap file on a low-RAM Linux server (dd, mkswap, swapon), plus how to verify memory changes and disable swap later."
pubDate: 2019-07-15
author: "Xiande Wen"
tags: ["linux", "swap", "memory-management", "server", "devops"]
---

Recently, I was trying to deploy a WordPress website on a Linux server with no PHP and
MySQL pre-installed. Installing packages is easy in Linux, but things did not
go well on my server, which only has 1 GB of RAM.

It kept running out of RAM when installing PHP. The server does have 40 GB of disk
space, but no swap space had been defined.

Since it was the first time I did this, I figured it would be useful to note down
something for future reference.

# **What is swap?**

![](https://i.loli.net/2019/06/28/5d15c31de340b86332.jpg)

- Swapping was the main method of memory management in the 1960s, and was one of several methods commonly used until the 1990s.
- In a multiprogramming system, the total size of all processes may exceed the size of main memory. The memory images of some processes may have to be kept on disk. The parts of the disk(s) used for this are called swap space.
- The kernel could swap out a process, i.e. copy all its memory to swap space, to free up some memory. It would do this to allow another process to be swapped in, i.e. have its image brought into memory from swap space.

# **Swap in Linux**

Following steps are what I did for configuring swap in Linux.

**1. Create swap space of 2 GB**

```console
[~]# dd if=/dev/zero of=/var/swap bs=1024 count=2048000
2048000+0 records in
2048000+0 records out
2097152000 bytes (2.1 GB) copied, 18.7808 s, 112 MB/s
```

**2. Create swap file**

```console
[~]# mkswap /var/swap
Setting up swapspace version 1, size = 2047996 KiB
no label, UUID=5039b019-2db5-41b2-a289-3caf4fdd98bf
[~]#
```

**3. Loading the swap file**

```console
[~]# swapon /var/swap
swapon: /var/swap: insecure permissions 0644, 0600 suggested.
swapon: /var/swap: swapon failed: Device or resource busy
[~]#
```

Well, it asked me to change the file permissions so let's do that as well.

```console
[~]# chmod 0600 /var/swap
[~]#
```

then,

```console
[~]# swapon /var/swap
[~]#
```

After `swapon`, you should have the swap space configured.
Let's check if it has been successful.

**4. Check free memory**

```console
[~]# free -m
       total        used        free      shared  buff/cache   available
Mem:     991         757          73           0         159          75
Swap:   1999           0        1999
[~]#
```

`Mem` denotes the total usable memory for the system.

`Swap` is the defined swap space in the system. In my case, I configured the
total swap space to approximately 2 GB.

**5. Clear the swap space**

If you no longer need it, you can clear it as following:

```console
[~]# swapoff /var/swap
[~]#
```


# **References**

- [COMP30023 lecture slides from unimelb, fall 2019](https://www.dropbox.com/s/8xwfwv1mraar5jk/2019-S1-WK11-LEC1-MemoryManagement.pdf?dl=0)
- [Linux环境下Swap配置方法](https://www.cnblogs.com/joshua317/p/8058392.html)