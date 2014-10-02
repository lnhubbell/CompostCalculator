from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.conf import settings
# try:
#     from django.contrib.auth import get_user_model
#     User = get_user_model()
# except ImportError:
#     from django.contrib.auth.models import User  

class CompostItem(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    carbon = models.SmallIntegerField()
    nitrogen = models.SmallIntegerField()
    # density = models.SmallIntegerField()
    picture = models.ImageField(blank=True)


class Recipe(models.Model):
    title = models.CharField(max_length=256)
    chosen = models.CharField(max_length=1024)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL)
