from rest_framework.routers import SimpleRouter
from elearning.views import CategoryViewSet, WordViewSet

router = SimpleRouter()

router.register("category", CategoryViewSet, basename="category")
router.register("word", WordViewSet, basename="word")

urlpatterns = router.urls
