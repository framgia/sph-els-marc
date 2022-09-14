from django.test import TestCase
from .models import Category, Word

# Test the model named Category
class CategoryModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Category.objects.create(
            category_name="test_category_name",
            category_description="test_category_description",
        )

    def test_category_name_label(self):
        category = Category.objects.get(id=1)
        field_label = category._meta.get_field("category_name").verbose_name
        self.assertEquals(field_label, "category name")

    def test_category_description_label(self):
        category = Category.objects.get(id=1)
        field_label = category._meta.get_field("category_description").verbose_name
        self.assertEquals(field_label, "category description")

    def test_num_items_label(self):
        category = Category.objects.get(id=1)
        field_label = category._meta.get_field("num_items").verbose_name
        self.assertEquals(field_label, "num items")

    def test_category_name_max_length(self):
        category = Category.objects.get(id=1)
        max_length = category._meta.get_field("category_name").max_length
        self.assertEquals(max_length, 255)

    def test_object_name_is_category_name(self):
        category = Category.objects.get(id=1)
        expected_object_name = category.category_name
        self.assertEquals(expected_object_name, str(category))

    def test_get_absolute_url(self):
        category = Category.objects.get(id=1)
        self.assertEquals(category.get_absolute_url(), "/category/1")


# test the model named Word
class WordModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Category.objects.create(
            category_name="test_category_name",
            category_description="test_category_description",
        )
        Word.objects.create(
            word_text="test_word_text",
            category=Category.objects.get(id=1),
        )

    def test_word_text_label(self):
        word = Word.objects.get(id=1)
        field_label = word._meta.get_field("word_text").verbose_name
        self.assertEquals(field_label, "word text")

    def test_word_text_max_length(self):
        word = Word.objects.get(id=1)
        max_length = word._meta.get_field("word_text").max_length
        self.assertEquals(max_length, 255)

    def test_object_name_is_word_text(self):
        word = Word.objects.get(id=1)
        expected_object_name = word.word_text
        self.assertEquals(expected_object_name, str(word))

    def test_get_absolute_url(self):
        word = Word.objects.get(id=1)
        self.assertEquals(word.get_absolute_url(), "/word/1")
