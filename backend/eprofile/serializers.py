from django.contrib.auth.models import User

from rest_framework import serializers

from .models import UserFollowing, UserProfile, UserProfilePicture


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "is_superuser",
            "username",
            "email",
        )
        read_only_fields = ("username", "is_superuser", "email")


class FollowingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="following.user.username", read_only=True)
    first_name = serializers.CharField(source="following.user.first_name", read_only=True)
    last_name = serializers.CharField(source="following.user.last_name", read_only=True)
    email = serializers.CharField(source="following.user.email", read_only=True)
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = UserFollowing
        fields = (
            "id",
            "following",
            "created_at",
            "username",
            "first_name",
            "last_name",
            "email",
            "profile_picture",
        )
        read_only_fields = (
            "id",
            "following",
            "created_at",
            "username",
            "first_name",
            "last_name",
            "email",
            "profile_picture",
        )

    def get_profile_picture(self, obj):
        user_profile_picture = UserProfilePicture.objects.get(user_profile=obj.following)

        try:
            return user_profile_picture.profile_picture.url
        except:
            return None


class FollowerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="follower.user.username", read_only=True)
    first_name = serializers.CharField(
        source="follower.user.first_name", read_only=True, required=False
    )
    last_name = serializers.CharField(source="follower.user.last_name", read_only=True)
    email = serializers.CharField(source="follower.user.email", read_only=True)
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = UserFollowing
        fields = (
            "id",
            "follower",
            "created_at",
            "username",
            "first_name",
            "last_name",
            "email",
            "profile_picture",
        )
        read_only_fields = ("username", "is_superuser", "email")

    def get_profile_picture(self, obj):
        user_profile_picture = UserProfilePicture.objects.get(user_profile=obj.follower)

        try:
            return user_profile_picture.profile_picture.url
        except:
            return None


class UserProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfilePicture
        fields = ("profile_picture", "user_profile")

    def create(self, validated_data):

        user_profile_picture = UserProfilePicture.objects.get(
            user_profile=validated_data["user_profile"]
        )
        user_profile_picture.profile_picture = validated_data["profile_picture"]
        user_profile_picture.save()

        return user_profile_picture


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=False)
    profile_picture = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = (
            "id",
            "bio",
            "user",
            "follower_count",
            "following_count",
            "is_profile_updated",
            "following",
            "followers",
            "lessons_learned",
            "words_learned",
            "profile_picture",
        )
        read_only_fields = (
            "follower_count",
            "following_count",
            "profile_picture",
            "lessons_learned",
            "words_learned",
            "followers",
            "following",
        )

    def get_profile_picture(self, obj):

        user_profile_picture = UserProfilePicture.objects.get(user_profile=obj)

        try:
            return user_profile_picture.profile_picture.url
        except:
            return None

    def get_following(self, obj):
        return FollowingSerializer(obj.follower.all(), many=True).data

    def get_followers(self, obj):
        return FollowerSerializer(obj.following.all(), many=True).data

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
