from django.contrib.auth.models import User
from django.db.models import JSONField
from django.db import models


# Create your models here.
class Category(models.Model):
    category_name = models.CharField(max_length=32)


class Product(models.Model):
    category_fk = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    product_name = models.CharField(max_length=64)
    product_img_url = models.CharField(max_length=256)
    price = models.DecimalField(max_digits=16, decimal_places=2)
    description = models.TextField()


class ShoppingCart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = JSONField(default=list)

    def add_item(self, product, quantity):
        # Add a new item to the cart
        item = {'product_id': product.id, 'name': product.name, 'price': product.price, 'quantity': quantity, 'img_url': product.product_img_url}
        self.items.append(item)
        self.save()

    def remove_item(self, item_index):
        # Remove an item from the cart
        del self.items[item_index]
        self.save()

    def update_item_quantity(self, item_index, new_quantity):
        # Update the quantity of an item in the cart
        self.items[item_index]['quantity'] = new_quantity
        self.save()

    def clear_cart(self):
        # Remove all items from the cart
        self.items = []
        self.save()

    def get_total_price(self):
        # Calculate the total price of all items in the cart
        total_price = 0
        for item in self.items:
            total_price += item['price'] * item['quantity']
        return total_price


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    done = models.BooleanField(default=False)
    token = models.CharField(max_length=128)
    items = JSONField(default=list)

    def get_total_price(self):
        # Calculate the total price of all items in the cart
        total_price = 0
        for item in self.items:
            total_price += item['price'] * item['quantity']
        return total_price