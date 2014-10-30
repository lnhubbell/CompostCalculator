from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class CompostItem(models.Model):
    title = models.CharField(unique=True, max_length=256)
    description = models.TextField()
    carbon = models.SmallIntegerField()
    nitrogen = models.SmallIntegerField()
    # density = models.SmallIntegerField()
    picture = models.ImageField(blank=True)
    creator = models.ForeignKey(User)
    suggested = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Recipe(models.Model):
    title = models.CharField(unique=True, max_length=256)
    chosen = models.CharField(max_length=1024)
    creator = models.ForeignKey(User)
    suggested = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title