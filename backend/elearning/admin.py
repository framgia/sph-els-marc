from django.contrib import admin

from .models import Answer, Category, Choice, QuizRecord, Word, WordRecord


class WordAdminInline(admin.TabularInline):
    model = Word


class ChoiceAdminInline(admin.TabularInline):
    model = Choice


class AnswerAdminInline(admin.TabularInline):
    model = Answer


class CategoryAdmin(admin.ModelAdmin):
    readonly_fields = ("num_items",)
    inlines = [
        WordAdminInline,
    ]


class WordAdmin(admin.ModelAdmin):
    inlines = [ChoiceAdminInline, AnswerAdminInline]


class WordRecordAdminInline(admin.TabularInline):
    model = WordRecord


class QuizRecordAdmin(admin.ModelAdmin):
    model = QuizRecord
    inlines = [
        WordRecordAdminInline,
    ]


admin.site.register(Category, CategoryAdmin)
admin.site.register(Word, WordAdmin)
admin.site.register(QuizRecord, QuizRecordAdmin)
# admin.site.register(Answer)
# admin.site.register(Choice)
