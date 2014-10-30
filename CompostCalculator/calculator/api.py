from rest_framework import generics, permissions
from django.contrib.auth.models import User

from .serializers import CompostItemSerializer, RecipeSerializer, UserSerializer
from .models import CompostItem, Recipe


class CompostItemList(generics.ListCreateAPIView):
    model = CompostItem
    serializer_class = CompostItemSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class CompostItemDetail(generics.RetrieveAPIView):
    model = CompostItem
    serializer_class = CompostItemSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class RecipeList(generics.ListCreateAPIView):
    model = Recipe
    serializer_class = RecipeSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class RecipeDetail(generics.RetrieveAPIView):
    model = Recipe
    serializer_class = RecipeSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class UserList(generics.ListCreateAPIView):
    model = User
    serializer_class = UserSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class UserDetail(generics.RetrieveAPIView):
    model = User
    serializer_class = UserSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class UserDestroy(generics.DestroyAPIView):
    model = User
    lookup_field = 'username'
    serializer_class = UserSerializer
    permission_classes = [
        permissions.AllowAny
    ]