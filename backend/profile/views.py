from django.shortcuts import render
from django.http import JsonResponse
from django.middleware.csrf import get_token

# Create your views here.


def get_csrf(request):
    response = JsonResponse({"Info": "Success - Set CSRF cookie"})
    response["X-CSRFToken"] = get_token(request)
    return response
