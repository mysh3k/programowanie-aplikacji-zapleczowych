from django.db import models


# Create your models here.
class Client(models.Model):
    access_token = models.CharField(max_length=128, unique=True)


class Order(models.Model):
    price = models.FloatField()
    done = models.BooleanField(default=False)
    token = models.CharField(max_length=128)
