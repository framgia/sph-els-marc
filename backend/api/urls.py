from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from elearning.views import CategoryViewSet, WordViewSet
from rest_framework import permissions
from rest_framework.routers import SimpleRouter

schema_view = get_schema_view(
    openapi.Info(
        title="eLearning API",
        default_version="v1",
        description="A simple API for managing eLearning",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="email@email.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),  # TODO: Harden this permission later
)

router = SimpleRouter()

router.register("category", CategoryViewSet, basename="category")
router.register("word", WordViewSet, basename="word")

urlpatterns = [
    path(
        "docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("profile/", include("profile.urls", namespace="profile")),
]

urlpatterns += router.urls
