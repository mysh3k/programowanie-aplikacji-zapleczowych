import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from rest_framework import routers, serializers, viewsets, permissions
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

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


class ProductList(View):
    serializer_class = ProductSerializer
    def get(self, request, category):
        queryset = Product.objects.filter(category_fk__category_name=category)
        serializer = ProductSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)


class ProductView(View):
    def get(self, request, product_id):
        product = Product.objects.get(id=product_id)
        serializer = ProductSerializer(product)
        return JsonResponse([serializer.data], safe=False)


class RegisterUser(CreateAPIView):
    permission_classes = [
        permissions.AllowAny  # Or anon users can't register
    ]
    serializer_class = UserProfileSerializer


class ShoppingCart(View):
    def get(self, request):

        return


class AddProduct(View):
    def get(self, request, product_id):
        token = request.headers['Authorization']
        user = Token.objects.get(key=token).user
        shopping_cart = ShoppingCart.objects.filter(user=user)
        if shopping_cart.count() > 0:
            shopping_cart = shopping_cart.first()
            shopping_cart.add_item(product_id, 1)
            return Response({'test': 1})
        else:
            shopping_cart = ShoppingCart(user=user)
            shopping_cart.add_item(product_id, 1)
            shopping_cart.save()
            return Response({'test': 2})
