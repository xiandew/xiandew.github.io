---
title: "Adding 'Keywords' and 'description' for wordpress site"
description: "A lightweight way to add SEO meta keywords and descriptions in WordPress without heavy plugins—using a small `functions.php` hook that derives values from content, tags, and categories."
pubDate: 2019-03-08
author: "Xiande Wen"
tags: ["wordpress", "seo", "php", "meta-tags", "tutorial"]
---

Most WordPress themes do not provide keywords and description `<meta>` tags.
This can be a problem when optimizing for SEO. Of course, there are many plugins
to solve this issue. However, not all servers can handle those plugins.
Some highly-ranked SEO plugins may work perfectly on servers with high-end
configurations and features, but they can be disastrous for small personal servers.
It can be a serious problem to load a plugin consuming hundreds of megabytes on
a small server with only 1 GB of RAM. In the worst case, the website may
fail to load entirely.

If you only want to add those meta tags to your website without needing to monitor
traffic statistics, here is a more efficient approach.

# **Implementation**

Add the following code to `functions.php` located in your child theme, and you're good to go.

```php
function meta_seo() {
    $description = "some description for homepage, default for other pages";
    $keywords = "some keywords for homepage, default for other pages";

	if ( is_single() ) {
        global $post;
        $meta_description = get_post_meta($post->ID, "description", true);
        if ( $meta_description ) {
            $description = $meta_description;
        } else {
            $description =
                str_replace(PHP_EOL, "",
                    mb_strimwidth(
                        strip_tags($post->post_content) , 0, 100, "…", 'utf-8'
                    )
                );
        }
        $meta_keywords = get_post_meta($post->ID, "keywords", true);
        if ( $meta_keywords ) {
            $keywords .= "," . $meta_keywords;
        } else {
            $tags = wp_get_post_tags($post->ID);
            foreach ($tags as $tag) {
                $keywords .= "," . $tag->name;
            }
        }
    }
	elseif ( is_category() ) {
        $keywords .= "," . single_cat_title('', false);
    }
	elseif ( is_tag() ) {
        $keywords .= "," . single_tag_title('', false);
    }
    $description = rtrim(strip_tags($description), ", ");
    $keywords = rtrim(strip_tags($keywords), ", ");

    echo
        '<meta name="keywords" content="' . $keywords . '" />' .
        '<meta name="description" content="' . $description . '" />';
}
add_action('wp_head', 'meta_seo');
```

# **References**

- [WordPress使用经验（一）独立的Description 和 Keywords](https://www.ludou.org/wordpress-exp-1.html)