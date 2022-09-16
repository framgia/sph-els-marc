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

    def create(self, validated_data):
        words_data = validated_data.pop("words")
        category = Category.objects.create(**validated_data)
        for word_data in words_data:
            Word.objects.create(category=category, **word_data)
        return category

    def update(self, instance, validated_data):
        words_data = validated_data.pop("words")
        words = (instance.words).all()
        words = list(words)
        instance.category_name = validated_data.get(
            "category_name", instance.category_name
        )
        instance.category_description = validated_data.get(
            "category_description", instance.category_description
        )
        instance.num_items = validated_data.get("num_items", instance.num_items)
        instance.save()
        for word_data in words_data:
            Word.objects.get_or_create(category=instance, **word_data)
        return instance
