from rest_framework.routers import SimpleRouter
from elearning.views import CategoryViewSet

router = SimpleRouter()

router.register("category", CategoryViewSet, basename="category")

urlpatterns = router.urls
