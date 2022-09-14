from django.db import models

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
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.word_text

    class Meta:
        verbose_name_plural = "Words"
