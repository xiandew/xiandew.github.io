---
title: "Resolve failure of updating wordpress"
description: "Troubleshooting common WordPress update failures, from PHP execution time limits to clearing the core updater lock when an update gets stuck."
pubDate: 2019-03-15
author: "Xiande Wen"
tags: ["wordpress", "php", "troubleshooting", "mysql", "tutorial"]
---

Updating WordPress can be easily done by clicking the buttons. Some people will never
update WordPress once they set it up to avoid unnecessary crashes. However, it is recommended
to update WordPress if a new version has been released. Each update may contain fixes
for potential bugs and remove useless actions. Some failures may happen during updates
and here are fixes for some common cases.

# **Maximum execution time of 30 seconds exceeded**

There are three alternatives to increase the maximum execution time.

**Method 1: Edit wp-config.php**

Add the following to wp-config.php:

```
set_time_limit(0);
```

You can pass any non-negative number to `set_time_limit`. If you set it to `0`,
it will remove the time limit and execute the actions till they are completed.
If you set a positive number, let's say 45, the program will execute for 45
seconds and then stop whether it is finished or not. The default value is 30
seconds.

**Method 2: Edit file .htaccess:**

*Make sure you back up .htaccess before you edit it.*

Add the following line to .htaccess:

```
php_value max_execution_time 0
```

**Method 3: Editing php.ini**

Search for `max_execution_time` in your php.ini and uncomment it if needed (remove
the `;` at the start of the line). And set it equal to `0`.

Or you can add the following to the end of php.ini:

```
max_execution_time = 0
```

Each method will work. Take an alternative if it doesn't. For each method, you
can set a non-negative number, which follows that `0` means no time limit and
positive number means executing till that amount of time in seconds.

# **Another update is currently in progress**

This can happen when you refresh the browser while updating WordPress.

> It is an automatic lock to prevent simultaneous core updates. It will be gone after 15 minutes. If you don't want to wait, delete the record from the options table – usually `wp_options`.

Since WordPress 4.5:

```php
option_name = 'core_updater.lock'
```

If you have an older installation (before WordPress 4.5):

```php
option_name = 'core_updater'
```

Just navigate to your WordPress database and run this SQL code:

```sql
DELETE FROM wp_options WHERE option_name = 'core_updater' OR option_name = 'core_updater.lock';
```

# **References**

- [How to increase Maximum Execution Time for WordPress site](https://thimpress.com/knowledge-base/how-to-increase-maximum-execution-time-for-wordpress-site/)
- [set_time_limit](http://php.net/manual/en/function.set-time-limit.php)
- [Get rid of Another update is currently in progress](https://wordpress.stackexchange.com/questions/224989/get-rid-of-another-update-is-currently-in-progress)