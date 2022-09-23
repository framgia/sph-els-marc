from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404, render

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserFollowing, UserProfile
from .serializers import (
    UserFollowingSerializer,
    UserProfilePictureSerializer,
    UserProfileSerializer,
)


class UserProfilePictureUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
        operation_description="Upload container excel, if the columns and data are valid. Containers will be created. "
        "If container with such name already exists, it will be update instead",
        operation_id="api_v1_profile_picture_upload",
        tags=["User Profiles"],
        manual_parameters=[
            openapi.Parameter(
                name="profile_picture",
                in_=openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                required=True,
                description="Document",
            )
        ],
        responses={400: "Invalid data in uploaded file", 200: "Success"},
    )
    @action(
        detail=False,
        methods=["post"],
        parser_classes=(
            MultiPartParser,
            FormParser,
        ),
        name="upload-profile-picture",
    )
    def post(self, request, id, format=None):
        print(request.data)
        request.data["userprofile"] = id
        print(request.data)

        serializer = UserProfilePictureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_csrf(request):
    response = JsonResponse({"Info": "Success - Set CSRF cookie"})
    response["X-CSRFToken"] = get_token(request)
    return response


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all().order_by("-created_at")
    serializer_class = UserProfileSerializer
    http_method_names = ["get", "put"]
    my_tags = ["User Profiles"]


class UserFollowingViewSet(viewsets.ModelViewSet):
    queryset = UserFollowing.objects.all().order_by("-created_at")
    serializer_class = UserFollowingSerializer
    http_method_names = ["post", "get", "delete"]
    my_tags = ["User Following"]
