from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from .models import UserFollowing, UserProfile, UserProfilePicture
from .serializers import (
    UserFollowingSerializer,
    UserProfilePictureSerializer,
    UserProfileSerializer,
)


class UserProfilePictureViewSet(viewsets.ModelViewSet):
    parser_classes = [MultiPartParser, FormParser]
    queryset = UserProfilePicture.objects.all().order_by("-created_at")
    serializer_class = UserProfilePictureSerializer
    http_method_names = ["get", "put"]
    my_tags = ["User Profile Pictures"]


class UserProfilePictureViewSet(viewsets.ModelViewSet):
    parser_classes = [MultiPartParser, FormParser]
    queryset = UserProfilePicture.objects.all().order_by("-created_at")
    serializer_class = UserProfilePictureSerializer
    http_method_names = ["get", "put"]
    my_tags = ["User Profile Pictures"]


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

    @swagger_auto_schema(
        method="delete",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "follower": openapi.Schema(type=openapi.TYPE_INTEGER),
                "following": openapi.Schema(type=openapi.TYPE_INTEGER),
            },
        ),
        responses={204: openapi.Schema(type=openapi.TYPE_INTEGER)},
    )
    @action(detail=False, methods=["delete"])
    def delete(self, request):
        serializer = UserFollowingSerializer(data=request.data)
        try:
            if (
                serializer.is_valid()
                or serializer.errors == "The fields follower, following must make a unique set."
            ):
                following_obj = UserFollowing.objects.get(
                    follower=serializer.data["follower"],
                    following=serializer.data["following"],
                )
                following_obj.delete()

                content = {
                    "success": "Unfollow success",
                    "message": "Following deleted",
                }
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            return Response(content, status=status.HTTP_204_NO_CONTENT)
        except UserFollowing.DoesNotExist:
            return Response(
                serializer.errors,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
