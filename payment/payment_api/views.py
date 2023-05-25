from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from .models import *
from .serializers import *
import json
import requests


# Create your views here.
class CreateOrder(View):
    def post(self, request):
        data = json.loads(request.body)
        headers = request.headers['authorization']
        client = Client.objects.get(access_token=headers)
        s_order = Order.objects.filter(token=hex(data['id'] * 12345))
        if s_order.count() > 0:
            order = s_order.first()
        else:
            order = Order(client_id=client, price=data['total_price'], token=hex(data['id'] * 12345))
            order.save()
        serializer = OrderSerializer(order)
        return JsonResponse([serializer.data], safe=False)


class PayOrder(View):
    def get(self, request, order_token):
        order = Order.objects.get(token=order_token)
        serializer = OrderSerializer(order)
        return JsonResponse([serializer.data], safe=False)
    def post(self, request, order_token):
        order = Order.objects.get(token=order_token)
        order.done = True
        order.save()
        serializer = OrderSerializer(order)
        response = requests.post(f'http://127.0.0.1:7777/update-status/', data=json.dumps(serializer.data))
        data = response.json()
        return JsonResponse([data], safe=False)
