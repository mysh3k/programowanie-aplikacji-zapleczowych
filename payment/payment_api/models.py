from django.db import models


# Create your models here.
class Client(models.Model):
    access_token = models.CharField(max_length=128, unique=True)


class Order(models.Model):
    client_id = models.ForeignKey(Client, on_delete=models.DO_NOTHING)
    price = models.FloatField()
    done = models.BooleanField(default=False)
    token = models.CharField(max_length=128)
