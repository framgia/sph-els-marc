from django.http import JsonResponse
from django.middleware.csrf import get_token

from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView


class CSRFView(APIView):
    permission_classes = (AllowAny,)

    @swagger_auto_schema(tags=["CSRF"])
    def get(self, request):
        response = JsonResponse({"Info": "Success - Set CSRF cookie"})
        response["X-CSRFToken"] = get_token(request)
        return response
