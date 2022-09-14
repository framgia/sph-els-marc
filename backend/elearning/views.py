from rest_framework import viewsets
from .models import Category, Word
from .serializers import CategorySerializer, WordSerializer

# make a viewset for model Category
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("-date_created")
    serializer_class = CategorySerializer


# make a viewset for model Word
class WordViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all().order_by("-date_created")
    serializer_class = WordSerializer
