from rest_framework import viewsets  # new
from .models import Category
from .serializers import CategorySerializer

# make a viewset for model Category
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("-date_created")
    serializer_class = CategorySerializer
