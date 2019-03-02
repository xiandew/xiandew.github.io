---
  layout: post
  title: Check if a port is open in firewalld service
  tags:
  categories:
    - SSL
    - Linux
---

centos7 firewall-cmd查看端口是否开放及开放端口
https://blog.csdn.net/y534560449/article/details/65629697

firewall-cmd --permanent --zone=public --add-port=443/tcp
