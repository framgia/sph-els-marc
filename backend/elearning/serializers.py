from typing import List

from rest_framework import serializers, status
from rest_framework.response import Response
from rest_typed.serializers import TSerializer

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


class CategoryNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("category_name",)
        # read_only_fields = ("name",)


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ("word_id", "answer_text")
        read_only_fields = ("word_id",)
        # depth = 1


class WordSerializer(serializers.ModelSerializer):
    category = CategoryNameSerializer(read_only=False)
    choices = ChoiceSerializer(many=True, read_only=False)
    answer = AnswerSerializer(read_only=False)
    # answer = serializers.CharField(source="answer.answer_text")
    # choices = serializers.SerializerMethodField()

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

    def get_category(self, obj):
        return obj.category.category_name

    def get_choices(self, obj):
        choices = Choice.objects.filter(word=obj)
        return [choice.choice_text for choice in choices]

    def to_representation(self, instance):
        """
        This method is called when the serializer is used to serialize an object.

        """
        # build choices
        choices = Choice.objects.filter(word=instance)
        setattr(instance, "choices", choices)
        # build answer
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

    def update(self, instance, validated_data):
        choices = self.context["request"].data.get("choices", [])
        answer = self.context["request"].data.get("answer", "")
        instance.word_text = validated_data["word_text"]
        # instance.save()
        Choice.objects.filter(word=instance).delete()
        for choice in choices:
            Choice.objects.get_or_create(choice_text=choice["choice_text"], word=instance)
        Answer.objects.filter(word=instance).update(answer_text=answer["answer_text"])
        return instance

    """
    def create(self, validated_data):
        choices = self.context["request"].data.get("choices", [])
        answer = self.context["request"].data.get("answer", "")
        category = self.context["category"]
        word = Word.objects.create(word_text=validated_data["word_text"], category=category)
        for choice in choices:
            Choice.objects.create(choice_text=choice, word=word)
        Answer.objects.create(answer_text=answer, word=word)
        return word


    def update(self, instance, validated_data):
        choices = self.context["request"].data.get("choices", [])
        answer = self.context["request"].data.get("answer", "")
        instance.word_text = validated_data["word_text"]
        instance.save()
        for choice in choices:
            Choice.objects.create(choice_text=choice, word=instance)
        Answer.objects.create(answer_text=answer, word=instance)
        return instance
    """


class CategorySerializer(serializers.ModelSerializer):
    # words = WordSerializer(many=True, read_only=False)

    class Meta:
        model = Category
        fields = (
            "id",
            "category_name",
            "category_description",
            "num_items",
            "created_at",
            "updated_at",
            # "words",
        )
        read_only_fields = ("id", "num_items", "created_at", "updated_at")

    """
    def create(self, validated_data):
        words_data = validated_data.pop("words")
        category = Category.objects.create(**validated_data)
        for word_data in words_data:
            Word.objects.create(category=category, **word_data)
        return category

    def update(self, instance, validated_data):
        words_data = validated_data.pop("words")
        words = (instance.words).all()
        words = list(words)
        instance.category_name = validated_data.get("category_name", instance.category_name)
        instance.category_description = validated_data.get(
            "category_description", instance.category_description
        )
        instance.num_items = validated_data.get("num_items", instance.num_items)
        instance.save()
        for word_data in words_data:
            Word.objects.get_or_create(category=instance, **word_data)
        return instance
    """
