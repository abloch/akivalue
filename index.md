---
title: akivalue
layout: main_layout.html
---

Welcome to my personal blog
#### recent posts
{% for post in collections.posts | head -%}
- <a href={{post.url}}>{{post.data.title | capitalize}}</a>
{% endfor %}
