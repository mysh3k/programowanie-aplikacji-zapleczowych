from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import *


class CategoryTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(category_name='Test Category')

    def test_category_model(self):
        self.assertEqual(self.category.category_name, 'Test Category')
        self.assertEqual(str(self.category), 'Test Category')

    def test_get_product_list_by_category(self):
        url = reverse('product-list-by-category', kwargs={'category': 'test-category'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProductTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(category_name='Test Category')
        self.product = Product.objects.create(
            category_fk=self.category,
            product_name='Test Product',
            product_img_url='http://example.com/image.jpg',
            price=9.99,
            description='Test description'
        )

    def test_product_model(self):
        self.assertEqual(self.product.category_fk, self.category)
        self.assertEqual(self.product.product_name, 'Test Product')
        self.assertEqual(self.product.product_img_url, 'http://example.com/image.jpg')
        self.assertEqual(self.product.price, 9.99)
        self.assertEqual(self.product.description, 'Test description')

    def test_get_product_details(self):
        url = reverse('product-details', kwargs={'product_id': self.product.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_nonexistent_product_details(self):
        url = reverse('product-details', kwargs={'product_id': 9999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

