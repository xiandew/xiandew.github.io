---
  layout: post
  title: Resolve failure of updating wordpress
  tags:
  categories:
    - PHP
    - Wordpress
---

Updating wordpress can be easily done by clicking the buttons. Some people will never
update wordpress once setup it to avoid unnecessary crashes. However, it is recommended
to update wordpress if the new version has been released. Each update may contain fixes
for potential bugs and deletes on useless actions. Some failure may happen during update
and here is fixes for some common cases.

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

Each method will work. Take an alternative if it doesn't. For each mathod, you
can set a non-negative number, which follows that `0` means no time limit and
positive number means executing till that amount of time in seconds.

# **Another update is currently in progress**

This can happen when you refreshed the browser while updating the wordpress.

> It is an automatic lock to prevent simultaneous core updates. It will be gone after 15 minutes. If you don't want to wait, delete the record from options table – usually `wp_options`.

Since Wordpress 4.5:

{% highlight php startinline=true %}
option_name = 'core_updater.lock'
{% endhighlight %}

If you have an older installation (before Wordpress 4.5):

{% highlight php startinline=true %}
option_name = 'core_updater'
{% endhighlight %}

Just navigate to you wordpress database and run this SQL code:

{% highlight sql %}
delete * from wp_options where option_name = 'core_updater' or option_name = 'core_updater.lock';
{% endhighlight %}

# **References**

- [How to increase Maximum Execution Time for WordPress site](https://thimpress.com/knowledge-base/how-to-increase-maximum-execution-time-for-wordpress-site/){:target='_blank'}
- [set_time_limit](http://php.net/manual/en/function.set-time-limit.php){:target='_blank'}
- [Get rid of Another update is currently in progress](https://wordpress.stackexchange.com/questions/224989/get-rid-of-another-update-is-currently-in-progress){:target='_blank'}
