from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

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
    http_method_names = ["get"]
    my_tags = ["User Profile Pictures"]


class UserProfilePictureUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
        operation_description="Profile Picture",
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
        # request.data["eprofile_user_profile_picture.user_profile_id"] = id
        request.data["user_profile"] = id
        serializer = UserProfilePictureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
