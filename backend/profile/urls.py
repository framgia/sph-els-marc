from django.urls import path

from . import views

app_name = "profile"


urlpatterns = [
    path("csrf/", views.get_csrf, name="api-csrf"),
]
