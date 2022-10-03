from typing import List

from rest_framework import serializers

from .models import Answer, Category, Choice, QuizRecord, Word, WordRecord


class QuizRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizRecord
        fields = "__all__"


class WordRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = WordRecord
        fields = "__all__"


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ("word_id", "choice_text")
        read_only_fields = ("word_id",)


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ("choice_text",)


class CategoryNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("category_name",)


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ("answer_text",)


class WordCatSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Word
        fields = (
            "word_text",
            "choices",
        )

    def to_representation(self, instance):
        choices = Choice.objects.filter(word=instance)
        setattr(instance, "choices", choices)
        answer = Answer.objects.get(word=instance)
        setattr(instance, "answer", answer)
        return super().to_representation(instance)


class WordSerializer(serializers.ModelSerializer):
    category = CategoryNameSerializer(read_only=False)
    choices = ChoiceSerializer(many=True, read_only=False)
    answer = AnswerSerializer(read_only=False)

    class Meta:
        model = Word
        fields = (
            "id",
            "category",
            "word_text",
            "choices",
            "answer",
        )
        read_only_fields = ("id",)
        write_only_fields = ("category",)

    def get_category(self, obj):
        return obj.category.category_name

    def get_choices(self, obj):
        choices = Choice.objects.filter(word=obj)
        return [choice.choice_text for choice in choices]

    def to_representation(self, instance):
        choices = Choice.objects.filter(word=instance)
        setattr(instance, "choices", choices)
        answer = Answer.objects.get(word=instance)
        setattr(instance, "answer", answer)
        return super().to_representation(instance)

    def create(self, validated_data):
        category_data = validated_data.pop("category")
        choices_data = validated_data.pop("choices")
        answer_data = validated_data.pop("answer")
        validated_data["category"] = Category.objects.get(
            category_name=category_data["category_name"]
        )
        word = Word.objects.create(**validated_data)

        setattr(word, "choices", [])

        for choice_data in choices_data:
            choice_obj = Choice.objects.create(word=word, **choice_data)
            word.choices.append(choice_obj)

        ans_obj = Answer.objects.create(word=word, **answer_data)
        setattr(word, "answer", ans_obj)

        return word


class CategorySerializer(serializers.ModelSerializer):
    words = WordCatSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = (
            "id",
            "category_name",
            "category_description",
            "num_items",
            "created_at",
            "updated_at",
            "words",
        )
        read_only_fields = ("id", "num_items", "created_at", "updated_at", "words")


class WordRecordSerializer(serializers.ModelSerializer):
    word_taken = serializers.CharField(source="word_taken.word_text")
    correct_answer = serializers.CharField(source="correct_answer.answer_text")

    class Meta:
        model = WordRecord
        fields = ("word_taken", "correct_answer", "is_correct")


class QuizRecordSerializer(serializers.ModelSerializer):

    words_learned = serializers.SerializerMethodField()
    category_taken = serializers.CharField(source="category_taken.category_name")
    user_profile_taker = serializers.CharField(source="user_profile_taker.user.username")

    class Meta:
        model = QuizRecord
        fields = ("id", "user_profile_taker", "category_taken", "score", "total", "words_learned")

    def get_words_learned(self, obj: QuizRecord) -> List[WordRecord]:
        query_set = WordRecord.objects.filter(quiz_record=obj)
        serializer = WordRecordSerializer(query_set, many=True)
        return serializer.data
