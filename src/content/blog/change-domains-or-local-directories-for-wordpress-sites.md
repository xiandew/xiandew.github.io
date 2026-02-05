---
title: "Change domains or local directories for wordpress sites"
description: "A practical checklist for moving a WordPress site to a new domain or directory—covering backups, key database replacements, permalink fixes, and common migration pitfalls."
pubDate: 2019-03-10
author: "Xiande Wen"
tags: ["wordpress", "migration", "database", "mysql", "tutorial"]
---

# **Change domain of your site**

> For blogger who self-hosts the WordPress blog publishing system on a web hosting server with own registered domain name, sometimes, you may decide to reorganize the blog link URL to make it tidier or to reflect new focus or theme of the blog. If you decide to change the URL or link location of your WordPress blog due to changing of domain name (such as from http://www.old-domain.com/ to http://www.new-domain.com/) or the blog to another directory location (such as from http://www.domain.com/ to http://www.domain.com/blog/), there are some steps that should be done to ensure the proper migration and no breaking links.
>
> The tricky part when moving WordPress blog to another location is that WordPress is using absolute path in URL link instead of relative path in URL link location when stores some parameters in database. Within blog posts’ contents itself, users may also use the old URLs when creating reference backlinks. All these values in the database will need to be changed when WordPress is moved.
>
> The following guide will show you which database fields that has references or values related to blog’s URLs that you want to modify. Note that this guide is not about how to move WordPress blog from one server or host to another new hosting service.
>
>Basically, you move or migrate WordPress website via the following steps:
>
>    1. Make a complete backup of the site, all files and database.
>    2. Log in to the site to be moved, and go to Settings -> General.
>    3. In the text box for WordPress Address (URL):, change the address to the new location of main WordPress core files (e.g. http://example.com to http://new-example.com or http://example.com/blog to http://example.com).
>    4. In the text box for Site Address (URL):, change the address to the new location which matches the new WordPress public site address, which is most cases, will be similar to WordPress Address.
>    5. Click Save Changes. At the point, you may encounter 404 Not Found page.
>    6. Download all files of the existing site.
>    7. Export the database – through plugin, MySQL, phpMyAdmin or any other tools.
>    8. If you’re moving to a new server, edit the wp-config.php with the new server’s MySQL database name, user name and password.
>    9. Upload the files to new server, or move them to new location / directory.
>    10. Import the database on the new server (not applicable if just moving to new location / root folder).
>
> > When moving WordPress website, wp-config.php should be no changes, and .htaccess file should be also no changes, especially if you’re not making manual or advanced changes to them. If for some reason mod_rewrite rules for friendly URLs no longer works, you can always regenerate the .htaccess file via WP Administration’s Update Permalinks page.
>
> If you didn’t change the Site Address and WordPress Address prior to exporting the database, the first thing to do once the blog has been moved (all files copy over in case of moving location or server, or new domain name properly propagated across Internet for new domain name), the first thing to change is to tell WordPress the new blog or site location. This value can be changed via WordPress Options page, but if you no longer able to access to old blog URL, you have to modify the value via MySQL database.
>
> *Note: The guide uses SQL statements based on MySQL replace() function to modify the database. To run SQL queries, login to MySQL database that houses WordPress tables via phpMyAdmin or login to the DB server and run MySQL client as root.*
>
> To update WordPress options with the new blog location, use the following SQL command:
>
>```sql
>UPDATE wp_options SET option_value = replace(option_value, 'http://www.old-domain.com', 'http://www.new-domain.com') WHERE option_name = 'home' OR option_name = 'siteurl';
>```
> Replace http://www.old-domain.com with the old site address and http://www.new-domain.com with new site address.
>
> Once you’re done, you should be able to login to the WordPress Dashboard and admin backend through http://new-domain.com/wp-admin/ or http://new-domain.com/wp-login.php.
>
> Some steps that you should do now:
>
> 1. If you are WordPress moving involved changing of directory (for example, from / to /blog or vice versa), and you’re using Permalinks, go to the Settings -> Permalinks panel and update the Permalink structure to .htaccess file (no change required, just hit Save Changes will do).
> 2. After that you will need to fix URLs of the WordPress posts and pages, which translated from post slug, and stored in database wp_posts table as guid field. The URL values in this field are stored as absolute URLs instead of relative URLs, so it needs to be changed with the following SQL query:
>```sql
>UPDATE wp_posts SET guid = replace(guid, 'http://www.old-domain.com','http://www.new-domain.com');
>```
> Replace http://www.old-domain.com with the old site address and http://www.new-domain.com with new site address.
> > Changing URLs in GUID will cause all posts to appear as new in RSS feeds. Changing it is NOT compulsory.
>
> 3. If you have linked internally within blog posts or pages with absolute URLs, these links will point to wrong locations after you move the blog location. Use the following SQL commands to fix all internal links to own blog in all WordPress posts and pages:
>```sql
>UPDATE wp_posts SET post_content = replace(post_content, 'http://www.old-domain.com', 'http://www.new-domain.com');
>```
> Replace http://www.old-domain.com with the old site address and http://www.new-domain.com with new site address.
> 4. Menu may still have old domain or old subdirectory embedded in them. Go to Appearance -> Menus to update them.
> 5. The file’s permissions may have changed. If any files have permissions with “0000”, change them back to “0644”.
> 6. For seamless transition without downtime, you may want to keep the old site alive and set 301 redirect from old domain / old directory to new domain / new location.
>
> > There may still URLs in excerpts, links, attachments, custom fields, meta boxes, comments and others that required to be updated. You can use several plugins to make the changing of URLs easier. For example:
> >
> > - [Velvet Blues Update URLs](https://wordpress.org/plugins/velvet-blues-update-urls/)
> > - [Better Search Replace](https://wordpress.org/plugins/better-search-replace/)
> > - [Search & Replace](https://wordpress.org/plugins/search-and-replace/)
>
> Browse through WordPress blog to check if everything is okay. You also need to re-login to WP Administration as authentication cookie has now became invalid due to different domain.

# **Change the local directory**

1. Go to Settings > General, and change 'WordPress Address (URL)' and 'Site Address (URL)'.
2. Save the changes, then rename the folder.
3. Restart the browser to clear the cache. The site should now be running from the new location.

# **References**
- [Moving WordPress - codex](https://codex.wordpress.org/Moving_WordPress)
- [Change the folder name for the directory WordPress is installed in - Stack overflow](https://stackoverflow.com/questions/8425042/change-the-folder-name-for-the-directory-wordpress-is-installed-in#answer-43471683)
- [How to Move WordPress Blog to New Domain or Location / Directory](https://techjourney.net/how-to-move-wordpress-blog-to-new-domain-or-location-directory/)