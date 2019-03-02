---
  layout: post
  title: Adding 'Keywords' and 'description' for wordpress site
  tags:
  categories:
    - SEO
    - Wordpress
    - PHP
---

Most of Wordpress themes do not provide keywords and description <meta> tags.
That can be a problem when optimising SEO. Of course, there are many plugins
for solving this issue. However, not all servers are confortable with those plugins.
Some high-ranked SEO plugins may work perfectly on servers with high standard
configurations and features but they are disasters for small personal servers.
It can be a serious problem to load a plugin consuming hundreds of megabytes on
a small server with 1 gigabyte for instance. At the worst case, the website may
not be loaded eventually.

So if you only want to add those meta tags in your website with no need of monitoring
the traffic statistics, here is a more efficient way for your references.

# **Implementation**

Adding the following codes to `funciton.php` located in your child theme will do the job
and you are off to go.

{% highlight php startinline=true %}
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
{% endhighlight %}

# **References**

- [WordPress使用经验（一）独立的Description 和 Keywords](https://www.ludou.org/wordpress-exp-1.html){:target="_blank"}
