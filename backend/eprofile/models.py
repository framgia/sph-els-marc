from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver


def upload_to(instance, filename):
    return "profile_pictures/{username}/{filename}".format(
        username=instance.user_profile.user.username, filename=filename
    )


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=100, blank=True)
    follower_count = models.IntegerField(default=0)
    following_count = models.IntegerField(default=0)
    is_profile_updated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    lessons_learned = models.IntegerField(default=0)
    words_learned = models.IntegerField(default=0)

    class Meta:
        db_table = "eprofile_user_profile"

    def __str__(self):
        return self.user.username


class UserProfilePicture(models.Model):
    user_profile = models.OneToOneField(
        UserProfile, on_delete=models.CASCADE, related_name="user_profile_picture"
    )
    profile_picture = models.ImageField(
        upload_to=upload_to, default="profile_pictures/default.png"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "eprofile_user_profile_picture"

    def __str__(self):
        return f"{self.user_profile.user.username} Profile Picture"


class UserFollowing(models.Model):
    follower = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="follower")
    following = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="following")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.follower.user.username + " follows " + self.following.user.username

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["follower", "following"], name="unique_followers")
        ]

    def save(self, *args, **kwargs):
        self.follower.following_count += 1
        self.follower.save()
        self.following.follower_count += 1
        self.following.save()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.follower.following_count -= 1
        self.follower.save()
        self.following.follower_count -= 1
        self.following.save()
        super().delete(*args, **kwargs)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        user_profile = UserProfile.objects.create(user=instance)
        UserProfilePicture.objects.create(user_profile=user_profile)
