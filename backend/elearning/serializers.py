from rest_framework import serializers
from .models import Category, Word
from rest_framework.response import Response
from rest_framework import status

# make a serializer for model Word
class WordSerializer(serializers.ModelSerializer):
    # specify the model to be serialized
    class Meta:
        model = Word
        # specify the fields to be serialized
        fields = (
            "id",
            "word_text",
            "date_created",
            "date_updated",
        )


# make a serializer for model Category
class CategorySerializer(serializers.ModelSerializer):
    # specify the model to be serialized
    words = WordSerializer(many=True, read_only=False)

    class Meta:
        model = Category
        # specify the fields to be serialized
        fields = (
            "id",
            "category_name",
            "category_description",
            "num_items",
            "date_created",
            "date_updated",
            "words",
        )
