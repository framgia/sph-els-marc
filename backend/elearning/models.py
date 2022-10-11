from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver

from eprofile.models import UserProfile


class Category(models.Model):
    category_name = models.CharField(max_length=255)
    category_description = models.TextField()
    num_items = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_absolute_url(self):
        return f"/category/{self.id}"

    def __str__(self):
        return self.category_name

    class Meta:
        verbose_name_plural = "Categories"


class Word(models.Model):
    word_text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="words")

    def get_absolute_url(self):
        return f"/word/{self.id}"

    def __str__(self):
        return self.word_text

    class Meta:
        verbose_name_plural = "Words"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.category.num_items += 1
        self.category.save()

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        self.category.num_items -= 1
        self.category.save()


class Answer(models.Model):
    word = models.OneToOneField(Word, on_delete=models.CASCADE, primary_key=True)
    answer_text = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Answers"
        constraints = [
            models.UniqueConstraint(fields=["word", "answer_text"], name="unique_answer")
        ]

    def __str__(self):
        return f"{self.word.word_text} - {self.answer_text}"

    def is_correct(self, answer):
        return self.answer_text.lower() == answer.lower()


class Choice(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Choices"

    def __str__(self):
        return f"{self.word.word_text} - {self.choice_text}"

    def is_correct(self, answer):
        return self.word.answer.answer_text.lower() == answer.lower()


class QuizRecord(models.Model):
    class Meta:
        verbose_name_plural = "Lessons Learned"

    user_profile_taker = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    category_taken = models.ForeignKey(Category, on_delete=models.CASCADE)
    score = models.IntegerField()
    total = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user_profile_taker.user.username} has taken {self.category_taken.category_name} with a score of {self.score} out of {self.total}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.user_profile_taker.lessons_learned += 1
        self.user_profile_taker.save()


class WordRecord(models.Model):
    class Meta:
        verbose_name_plural = "Words Learned"

    quiz_record = models.ForeignKey(QuizRecord, on_delete=models.CASCADE)
    user_profile_taker = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    word_taken = models.ForeignKey(Word, on_delete=models.CASCADE)
    correct_answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    is_correct = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user_profile_taker.user.username} has answered {self.word_taken.word_text} : {self.is_correct}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.is_correct:
            self.user_profile_taker.words_learned += 1
            self.user_profile_taker.save()


@receiver(pre_delete, sender=Category)
def pre_delete_category(sender, instance, **kwargs):
    quiz_records = QuizRecord.objects.filter(category_taken=instance)
    word_records = WordRecord.objects.filter(quiz_record__in=quiz_records)
    for word_record in word_records:
        if word_record.is_correct:
            word_record.user_profile_taker.words_learned -= 1
            word_record.user_profile_taker.save()
    for quiz_record in quiz_records:
        quiz_record.user_profile_taker.lessons_learned -= 1
        quiz_record.user_profile_taker.save()
    word_records.delete()
    quiz_records.delete()
