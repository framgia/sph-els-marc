from profile.views import (
    UserFollowingViewSet,
    UserProfilePictureUploadView,
    UserProfileViewSet,
)

from django.urls import include, path

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.routers import SimpleRouter

from elearning.views import CategoryViewSet, WordViewSet

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
router.register("profile", UserProfileViewSet, basename="profile")
router.register("following", UserFollowingViewSet, basename="following")

urlpatterns = [
    path(
        "docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("profile/", include("profile.urls", namespace="profile")),
    path("profile/<int:id>/picture/", UserProfilePictureUploadView.as_view()),
]

urlpatterns += router.urls
