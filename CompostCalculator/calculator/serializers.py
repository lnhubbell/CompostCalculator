from rest_framework import serializers
from models import CompostItem, Recipe
from django.contrib.auth.models import User
# from django.contrib.auth.models import User

class CompostItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompostItem
        fields = ('title', 'description', 'nitrogen',
                  'carbon', 'picture', 'creator', 'suggested')

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('title', 'chosen', 'creator', 'suggested')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')