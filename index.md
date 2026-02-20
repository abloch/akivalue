---
title: הבלוג שלי
layout: main_layout.html
---
ברוכים הבאים לבלוג של עקיבא

הבלוג עדיין בהקמה, סליחה
#### פוסטים אחרונים:
{% for post in collections.posts reversed -%}
- <a href="{{post.url}}">{{post.data.title}}</a>
{% endfor %}
