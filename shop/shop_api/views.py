import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from rest_framework import routers, serializers, viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
import requests
from .models import *
from rest_framework import generics
from .serializers import *


# Create your views here.
@permission_classes([IsAdminUser])
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer


@permission_classes([IsAdminUser])
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@permission_classes([IsAdminUser])
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class SetupPasswords(View):
    def get(self, request):
        users = User.objects.all()
        for user in users:
            user.set_password(user.password)
            user.save()
        return JsonResponse({'job': 'done'}, safe=False)


class CategoriesList(View):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return JsonResponse(serializer.data, safe=False)


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


class ShoppingCartAPI(View):
    def get(self, request):
        token = request.headers['Authorization']
        token = token.split(' ')
        user = Token.objects.get(key=token[1]).user
        shopping_cart = ShoppingCart.objects.get(user=user)
        serializer = ShoppingCartSerializer(shopping_cart)
        return JsonResponse([serializer.data], safe=False)


class AddProduct(View):
    def get(self, request, product_id):
        token = request.headers['Authorization']
        token = token.split(' ')
        user = Token.objects.get(key=token[1]).user
        shopping_cart = ShoppingCart.objects.filter(user=user)
        product = Product.objects.get(id=product_id)
        if shopping_cart.count() > 0:
            shopping_cart = shopping_cart.first()
            shopping_cart.add_item(product, 1)
        else:
            shopping_cart = ShoppingCart(user=user)
            shopping_cart.add_item(product, 1)
            shopping_cart.save()
        serializer = ShoppingCartSerializer(shopping_cart)
        return JsonResponse(serializer.data, safe=False)


class UpdateProductQuantity(View):
    def get(self, request, p_index, p_quantity):
        token = request.headers['Authorization']
        token = token.split(' ')
        user = Token.objects.get(key=token[1]).user
        shopping_cart = ShoppingCart.objects.get(user=user)
        shopping_cart.update_item_quantity(p_index, p_quantity)
        shopping_cart.save()
        serializer = ShoppingCartSerializer(shopping_cart)
        return JsonResponse([serializer.data], safe=False)


class DeleteProduct(View):
    def get(self, request, p_index):
        token = request.headers['Authorization']
        token = token.split(' ')
        user = Token.objects.get(key=token[1]).user
        shopping_cart = ShoppingCart.objects.get(user=user)
        shopping_cart.remove_item(p_index)
        shopping_cart.save()
        serializer = ShoppingCartSerializer(shopping_cart)
        return JsonResponse([serializer.data], safe=False)


class ClearCart(View):
    def get(self, request):
        token = request.headers['Authorization']
        token = token.split(' ')
        user = Token.objects.get(key=token[1]).user
        shopping_cart = ShoppingCart.objects.get(user=user)
        shopping_cart.clear_cart()
        shopping_cart.save()
        serializer = ShoppingCartSerializer(shopping_cart)
        return JsonResponse([serializer.data], safe=False)


class MakeOrder(View):
    def get(self, request):
        token = request.headers['Authorization']
        token = token.split(' ')
        user = Token.objects.get(key=token[1]).user
        shopping_cart = ShoppingCart.objects.get(user=user)
        order = Order(user=user, done=False, items=shopping_cart.items, total_price=shopping_cart.get_total_price())
        order.save()
        shopping_cart.clear_cart()
        shopping_cart.save()
        serializer = OrderSerializer(order)
        return JsonResponse(serializer.data, safe=False)


class PayOrder(View):
    def get(self, request, order_id):
        token = request.headers['Authorization']
        token = token.split(' ')
        user = Token.objects.get(key=token[1]).user
        order = Order.objects.get(user=user, id=order_id)
        serializer = OrderSerializer(order)
        headers = {'authorization': 't0k3n12345'}
        print(serializer.data, headers)
        payment_api_response = requests.post('http://192.168.15.115:8888/create-order/', headers=headers, data=json.dumps(serializer.data))
        return JsonResponse(payment_api_response.json(), safe=False)


class OverviewOrders(View):
    def get(self, request):
        token = request.headers['Authorization']
        token = token.split(' ')
        user = Token.objects.get(key=token[1]).user
        order = Order.objects.filter(user=user)
        serializer = OrderSerializer(order, many=True)
        return JsonResponse(serializer.data, safe=False)


class OverviewOrder(View):
    def get(self, request, order_id):
        token = request.headers['Authorization']
        token = token.split(' ')
        user = Token.objects.get(key=token[1]).user
        order = Order.objects.get(user=user, id=order_id)
        serializer = OrderSerializer(order)
        return JsonResponse([serializer.data], safe=False)


class OrderStatus(View):
    def post(self, request):
        data = json.loads(request.body)
        print(data)
        order = Order.objects.get(id=int(data['token'], 0) / 12345)
        order.done = data['done']
        order.save()
        serializer = OrderSerializer(order)
        return JsonResponse(serializer.data, safe=False)
