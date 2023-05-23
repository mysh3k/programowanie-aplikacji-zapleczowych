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
        order = Order(price=data['price'], token=hex(data['id'] * 12345))
        order.save()
        serializer = OrderSerializer(order)
        return JsonResponse([serializer], safe=False)


class PayOrder(View):
    def get(self, request):

        return JsonResponse([], safe=False)
