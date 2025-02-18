---
title: akivalue
layout: main_layout.html
---
ברוכים הבאים לבלוג של עקיבא

#### פוסטים אחרונים:
{% for post in collections.posts | head -%}
- <a href="{{post.url}}">{{post.data.title | capitalize}}</a>
{% endfor %}