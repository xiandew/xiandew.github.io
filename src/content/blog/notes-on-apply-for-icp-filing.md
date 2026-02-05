---
title: "Notes on apply for ICP filing"
description: "Practical notes on navigating China’s ICP filing process, including common approval messages and gotchas that can block access even after the filing is granted."
pubDate: 2019-02-27
author: "Xiande Wen"
tags: ["china", "icp", "compliance", "web-hosting", "documentation"]
---

A few months ago, I was asked to help an educational institution in China get
an ICP filing. The China government has a fully clear procedure for any institution
or person to apply for the filing. It went slowly but smoothly and the institution
finally got it. Although there is not much about technical things, I think some
things are better to be noted down for future reference. The policy may be different
through time and regions so there is no gold rule here but only something to
notice.

# **What is a ICP filing (license)**
> ICP licence (abbreviation for Internet Content Provider; Chinese: ICP备案; pinyin: ICP bèi'àn; literally: 'ICP registration/filing') is a permit issued by the Chinese Ministry of Industry and Information Technology to permit China-based websites to operate in China. The ICP license numbers for Chinese websites can often be found on the bottom of the front webpage.

The difference between ICP filing and license is that the license is for commercial site while the filing is for non-commercial.

# **1. 关于ICP备案申请审核通过的通知**

> 尊敬的用户XX，您的备案信息已被变更，详情请咨询您的接入服务提供商。

This is a standard SMS sent by China MIIT (Ministry of Industry and Information Technology).
There are four possible situations that you received such an SMS.

- 您在最近阶段“新增域名”备案成功，工信部会发此短信或邮件通知。
- 您在最近阶段“修改域名”备案成功，工信部会发此短信或邮件通知。
- 您在最近阶段“接入域名”备案成功，工信部会发此短信或邮件通知。
- 如果您的接入服务已经由A转到服务商B，则A服务商取消您的接入，取消接入后系统也会有此短信或邮件通知。

If you are in the fourth situation, it requires your immediate attention because your
existed ICP filing could be revoked and you probably need to apply for another one.

# **2. 关于收到备案成功通知，网站依旧无法访问**

> 备案成功后，您将收到来自工信部的短信、邮件通知；但由于信息同步有延迟，建议在收到通知7小时后访问网站。

收到备案审核通过的通知后，网站依旧无法访问：这是因为备案审核通过的信息需要一定时间才能同步到接入商系统（阿里云），
待系统数据同步完成后，您的网站便可正常访问。这段时间可能需要几个小时，所以用户需要等一等。

# **3. 关于固定IP访问网站是否需要备案**

无论您的网站是通过域名方式访问或是通过IP地址的方式访问，只要在中华人民共和国境内提供非经营性互联网信息服务都要办理备案手续。
使用国内节点的服务器IP可能可以暂时访问，后续系统核查到您未备案会出现阻断。

**固定IP备案流程**

For individual or non-commercial users (非经营性), there is typically no separate process for "Fixed IP Filing" (IP地址备案) that you need to initiate manually. The term often refers to the **IP Address Reporting** (IP地址报备) which is the responsibility of your Internet Service Provider (ISP) or Cloud Provider (like Aliyun, Tencent Cloud).

When you complete the standard **Domain ICP Filing** (域名备案), you will select your server instance. Your provider then automatically handles the necessary IP reporting to the MIIT on the backend. You do not need to file for the IP address separately unless you are a network operator.

Simply ensure your domain filing is successful and your domain resolves to the correct server IP.

For individual or non-commercial users (非经营性), there is typically no separate process for "Fixed IP Filing" (IP地址备案) that you need to initiate manually. The term often refers to the **IP Address Reporting** (IP地址报备) which is the responsibility of your Internet Service Provider (ISP) or Cloud Provider (like Aliyun, Tencent Cloud).

When you complete the standard **Domain ICP Filing** (域名备案), you will select your server instance. Your provider then automatically handles the necessary IP reporting to the MIIT on the backend. You do not need to file for the IP address separately unless you are a network operator.

Simply ensure your domain filing is successful and your domain resolves to the correct server IP.

[工信部备案管理系统](http://www.miitbeian.gov.cn/) > 备案流程 > IP地址报备流程,如下图所示:

![](https://i.loli.net/2019/03/04/5c7cbba04abf6.jpg)

# **4. 关于域名备案期间网站是否可以访问**

> 1. 首次备案和新增网站备案期间：网站不能打开，不能访问。
> 2. 变更备案期间：已备案的域名访问不受影响，可以访问。

工信部规定没有备案的域名不允许上线访问。

# **References**

- [ICP license - wikipedia](https://en.wikipedia.org/wiki/ICP_license)
- [阿里云备案](https://www.aliyunbaike.com/beian/)