from django.urls import include, path

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.routers import SimpleRouter

from elearning.views import (
    CategoryViewSet,
    LessonResultsViewSet,
    WordRecordViewSet,
    WordViewSet,
)
from eprofile.views import (
    UserFollowingViewSet,
    UserProfilePictureViewSet,
    UserProfileViewSet,
)

from .views import CSRFView

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
router.register("profile_picture", UserProfilePictureViewSet, basename="profile_picture")
router.register("following", UserFollowingViewSet, basename="following")
router.register("lesson_results", LessonResultsViewSet, basename="lesson_results")
router.register("words_learned", WordRecordViewSet, basename="words_learned")

urlpatterns = [
    path(
        "docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("profile/", include("eprofile.urls", namespace="profile")),
    path("csrf/", CSRFView.as_view()),
]

urlpatterns += router.urls
