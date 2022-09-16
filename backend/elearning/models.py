from django.db import models

# using signals, increment num_items in Category when a Word is created
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

# create a model named Category with plural_name Categories, have fields category_name category_description num_items date_created date_updated
class Category(models.Model):
    category_name = models.CharField(max_length=255)
    category_description = models.TextField()
    num_items = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def get_absolute_url(self):
        return f"/category/{self.id}"

    def __str__(self):
        return self.category_name

    class Meta:
        verbose_name_plural = "Categories"


# create a model named Word with plural_name Words, have fields word_text date_created date_updated, have one-to-many relationship with Category
class Word(models.Model):
    word_text = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="words"
    )

    def get_absolute_url(self):
        return f"/word/{self.id}"

    def __str__(self):
        return self.word_text

    class Meta:
        verbose_name_plural = "Words"


@receiver(post_save, sender=Word)
def increment_num_items(sender, instance, created, **kwargs):
    if created:
        instance.category.num_items += 1
        instance.category.save()


@receiver(post_delete, sender=Word)
def decrement_num_items(sender, instance, **kwargs):
    instance.category.num_items -= 1
    instance.category.save()
