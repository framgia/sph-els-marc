from rest_framework import serializers
from .models import Category

# make a serializer for model Category
class CategorySerializer(serializers.ModelSerializer):
    # specify the model to be serialized
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
        )
