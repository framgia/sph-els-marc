from rest_framework import viewsets
from .models import Category, Word
from .serializers import CategorySerializer, WordSerializer

# using drf-yasg method_decorator, provide description for viewsets


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("-date_created")
    serializer_class = CategorySerializer
    http_method_names = ["get", "post", "put", "delete"]
    my_tags = ["Categories"]


class WordViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all().order_by("-date_created")
    serializer_class = WordSerializer
    http_method_names = ["get", "put", "delete"]
    my_tags = ["Words"]
