# Create Serializers for User, UserProfile, and UserFollowing models.
from django.contrib.auth.models import User

from rest_framework import serializers

from .models import UserFollowing, UserProfile, UserProfilePicture


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
        )


class UserProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfilePicture
        fields = ("profile_picture", "user_profile")


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=False)

    class Meta:
        model = UserProfile
        fields = (
            "id",
            "bio",
            "user",
            "follower_count",
            "following_count",
            "is_profile_updated",
        )
        read_only_fields = (
            "follower_count",
            "following_count",
            "is_profile_updated",
        )

    def update(self, instance, validated_data):
        user_obj = User.objects.get(id=instance.user.id)
        first_name_info = validated_data["user"].pop("first_name")
        last_name_info = validated_data["user"].pop("last_name")

        user_obj.first_name = first_name_info
        user_obj.last_name = last_name_info
        user_obj.save()

        # Update UserProfile info:
        instance.bio = validated_data.get("bio", instance.bio)
        instance.is_profile_updated = True
        instance.save()

        # Refresh to see the changes
        user_profile_obj = UserProfile.objects.get(id=instance.id)

        return user_profile_obj


class UserFollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ("follower", "following")
