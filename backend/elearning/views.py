from typing import List

from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from pydantic import BaseModel
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_typed.serializers import TSerializer
from rest_typed.views import typed_api_view

from eprofile.models import UserProfile

from .models import Answer, Category, Choice, QuizRecord, Word, WordRecord
from .serializers import CategorySerializer, QuizRecordSerializer, WordSerializer


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


class Question(BaseModel):
    word: str
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

    quiz_record = QuizRecord.objects.create(
        user_profile_taker_id=user_profile_taker.id,
        category_taken_id=category_taken.id,
        total=total,
        score=score,
    )

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
        "id": quiz_record.id,
        "user_profile_taker": user_profile_taker.user.username,
        "category_taken": category_taken.category_name,
        "score": score,
        "total": total,
        "words_learned": list_of_words_correct,
    }

    return Response(response_dict)


class LessonResultsViewSet(viewsets.ModelViewSet):
    queryset = QuizRecord.objects.all().order_by("-created_at")
    serializer_class = QuizRecordSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user_profile_taker_id", "category_taken_id"]
    http_method_names = ["get"]
    my_tags = ["Lesson Results"]
    # TODO: remove when confirmed no longer needed
    # lookup_field = "user_profile_taker_id"

    # def retrieve(self, request, *args, **kwargs):
    #    user_profile_taker_id = kwargs["user_profile_taker_id"]
    #    user_profile = UserProfile.objects.get(id=user_profile_taker_id)
    #    self.queryset = QuizRecord.objects.filter(user_profile_taker=user_profile)
    #    return super(LessonResultsViewSet, self).retrieve(request, *args, **kwargs)


@swagger_auto_schema(
    method="get",
    responses={200: openapi.Schema(type=openapi.TYPE_INTEGER)},
    tags=["Lesson Results"],
)
@typed_api_view(["GET"])
def LessonResultExistsView(category_taken_id: int, taker_id: int):
    try:
        category_taken = Category.objects.get(id=int(category_taken_id))
        taker = UserProfile.objects.get(id=int(taker_id))
        QuizRecord.objects.get(user_profile_taker=taker, category_taken=category_taken)
    except:
        results_dict = {"exists": False}
        return Response(results_dict, status.HTTP_200_OK)

    results_dict = {"exists": True}
    return Response(results_dict, status.HTTP_200_OK)
