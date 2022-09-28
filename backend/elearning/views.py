from typing import List

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from pydantic import BaseModel
from rest_framework import viewsets
from rest_framework.response import Response
from rest_typed.serializers import TSerializer
from rest_typed.views import typed_api_view

from eprofile.models import UserProfile

from .models import Answer, Category, Choice, QuizRecord, Word, WordRecord
from .serializers import CategorySerializer, WordSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("-created_at")
    serializer_class = CategorySerializer
    http_method_names = ["get", "post", "put", "delete"]
    my_tags = ["Categories"]


class WordViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all().order_by("-created_at")
    serializer_class = WordSerializer
    http_method_names = ["get", "post", "put", "delete"]
    my_tags = ["Words"]

    """
    def list(self, request, *args, **kwargs):
        print(request)

        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    """


"""
class LessonAnsweringViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("-created_at")
    serializer_class = LessonAnsweringSerializer
    http_method_names = ["post"]
    my_tags = ["LessonAnswering"]

    def list(self, request, *args, **kwargs):
        print(request)

        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
"""


class Question(BaseModel):
    word: str
    choices: List[str]
    selected_answer: str


class LessonAnsweringSchema(BaseModel):
    category_id: int
    questions: List[Question]


@swagger_auto_schema(
    method="post",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "category_id": openapi.Schema(type=openapi.TYPE_INTEGER),
            "questions": openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "word": openapi.Schema(type=openapi.TYPE_STRING),
                        "choices": openapi.Schema(
                            type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_STRING)
                        ),
                        "selected_answer": openapi.Schema(type=openapi.TYPE_STRING),
                    },
                ),
            ),
        },
    ),
    responses={200: openapi.Schema(type=openapi.TYPE_INTEGER)},
    tags=["Lesson Answering"],
)
@typed_api_view(["POST"])
def LessonAnsweringPostView(taker_id: int, lesson: LessonAnsweringSchema):
    lesson_dict = lesson.dict()
    # Lesson Answering Functionality
    user_profile_taker = UserProfile.objects.get(id=taker_id)
    category_taken = Category.objects.get(id=lesson_dict["category_id"])
    total = category_taken.num_items
    score = 0
    list_of_words_correct = []
    for question in lesson_dict["questions"]:
        word = Word.objects.get(word_text=question["word"])
        answer = Answer.objects.get(word=word)
        if answer.answer_text == question["selected_answer"]:
            score += 1
            word_entry = {
                "word_taken": word.word_text,
                "is_correct": True,
                "correct_answer": answer.answer_text,
                "selected_answer": question["selected_answer"],
            }
        else:
            word_entry = {
                "word_taken": word.word_text,
                "is_correct": False,
                "correct_answer": answer.answer_text,
                "selected_answer": question["selected_answer"],
            }
        list_of_words_correct.append(word_entry)

    # Create QuizRecord
    quiz_record = QuizRecord.objects.create(
        user_profile_taker_id=user_profile_taker.id,
        category_taken_id=category_taken.id,
        total=total,
        score=score,
    )

    # Create WordRecord
    for word in list_of_words_correct:
        word_ob = Word.objects.get(word_text=word["word_taken"])
        answer_ob = Answer.objects.get(answer_text=word["correct_answer"])
        WordRecord.objects.create(
            quiz_record_id=quiz_record.id,
            user_profile_taker_id=user_profile_taker.id,
            word_taken_id=word_ob.id,
            is_correct=word["is_correct"],
            correct_answer_id=answer_ob.word_id,
        )
    # For React, we need to return a JSON object

    response_dict = {
        "Lesson Name": category_taken.category_name,
        "Taker": user_profile_taker.user.username,
        "Score": score,
        "Total": total,
        "Percent": score / total,
        "Items": list_of_words_correct,
    }

    return Response(response_dict)
