from django.shortcuts import render
from rest_framework import routers, serializers, viewsets
from .models import *
from rest_framework import generics
from .serializers import *


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer
    def get_queryset(self):
        queryset = Product.objects.all()
        category_name = self.request.query_params.get('category_name')
        query_set = queryset.filter(category_fk__category_name=category_name)
        return query_set
