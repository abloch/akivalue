---
title: home
layout: main_layout.html
---
list of my recent posts:
{% for post in collections.posts %}
- <a href={{post.url}}>{{post.data.title}}</a>
{% endfor %}