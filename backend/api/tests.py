from django.test import TestCase
from django.db import models
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from elearning.models import Category as Cat


class APITests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.category = Cat.objects.create(
            category_name="Category name",
            category_description="Be the gift",
            num_items=0,
        )

    def test_api_listview(self):
        response = self.client.get("/api/v1/category/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Cat.objects.count(), 1)
        self.assertContains(response, self.category)
