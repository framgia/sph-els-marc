from django.urls import path

from . import views

app_name = "eprofile"


urlpatterns = [
    path("csrf/", views.get_csrf, name="api-csrf"),
]
