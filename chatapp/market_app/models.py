from django.db import models


class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()


class Chat(models.Model):
    name = models.CharField(default="", max_length=50)
    message = models.TextField(default="")
    created_at = models.DateTimeField(auto_now_add=True)
