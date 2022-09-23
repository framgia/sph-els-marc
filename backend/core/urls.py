from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.views import PasswordResetConfirmView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("api.urls")),
    path(
        "dj-rest-auth/",
        include(("dj_rest_auth.urls", "dj_rest_auth"), namespace="authentication"),
    ),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path(
        "dj-rest-auth/password/reset/confirm/<str:uidb64>/<str:token>",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
]
