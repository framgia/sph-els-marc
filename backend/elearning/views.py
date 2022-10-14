import traceback
from typing import List

from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from pydantic import BaseModel
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_typed.views import typed_api_view

from eprofile.models import UserFollowing, UserProfile, UserProfilePicture

from .models import Answer, Category, QuizRecord, Word, WordRecord
from .serializers import (
    CategorySerializer,
    LessonExistsSerializer,
    QuizRecordSerializer,
    WordRecordSerializer,
    WordSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("-created_at")
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["category_name"]
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
def lesson_answering_post_view(taker_id: int, lesson: LessonAnsweringSchema):
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
        answer_ob = Answer.objects.get(word=word_ob)
        WordRecord.objects.create(
            quiz_record_id=quiz_record.id,
            user_profile_taker_id=user_profile_taker.id,
            word_taken_id=word_ob.id,
            is_correct=word["is_correct"],
            correct_answer_id=answer_ob.word_id,
        )

    response_dict = {
        "id": quiz_record.id,
        "user_profile_taker": user_profile_taker.user.username,
        "category_taken": category_taken.category_name,
        "score": score,
        "total": total,
        "words_learned": list_of_words_correct,
    }

    return Response(response_dict, status=status.HTTP_201_CREATED)


class LessonResultsViewSet(viewsets.ModelViewSet):
    queryset = QuizRecord.objects.all().order_by("-created_at")
    serializer_class = QuizRecordSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user_profile_taker_id", "category_taken_id"]
    http_method_names = ["get"]
    my_tags = ["Lesson Results"]

    @action(detail=False, methods=["get"])
    def exists(self, request):
        user_profile_taker_id = request.query_params.get("user_profile_taker_id")
        category_taken_id = request.query_params.get("category_taken_id")
        try:
            category_taken = Category.objects.get(id=category_taken_id)
            user_profile_taker = UserProfile.objects.get(id=user_profile_taker_id)
            quiz_record = QuizRecord.objects.get(
                user_profile_taker=user_profile_taker, category_taken=category_taken
            )
            serializer = LessonExistsSerializer(quiz_record)
            return Response(serializer.data, status.HTTP_200_OK)
        except:
            return Response({"exists": False}, status.HTTP_200_OK)


class WordRecordViewSet(viewsets.ModelViewSet):
    queryset = WordRecord.objects.all().order_by("-created_at")
    serializer_class = WordRecordSerializer
    http_method_names = ["get", "post", "put", "delete"]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user_profile_taker_id", "quiz_record_id", "is_correct"]
    my_tags = ["Words Learned"]


@swagger_auto_schema(
    method="get",
    responses={200: openapi.Schema(type=openapi.TYPE_INTEGER)},
    tags=["All Activities"],
)
@typed_api_view(["GET"])
def all_activities_view(pk: int, own: int):
    try:
        user_profile = UserProfile.objects.get(id=pk)
        user_following = UserFollowing.objects.filter(follower=user_profile)
        users_id = [pk]

        if not own:
            for entry in user_following:
                users_id.append(entry.following.id)

        quiz_records = QuizRecord.objects.filter(user_profile_taker_id__in=users_id).order_by(
            "-created_at"
        )

        following = UserFollowing.objects.filter(follower__in=users_id)

        dashboard_activities = {
            "user_id": pk,
            "activities": [],
        }

        for record in following:
            profile_picture = UserProfilePicture.objects.get(user_profile=record.follower)
            activity = {
                "user_id": record.follower.id,
                "user_name": record.follower.user.username,
                "user_profile_picture": profile_picture.profile_picture.url,
                "activity_type": "follow",
                "follower": record.follower.user.username,
                "following": record.following.user.username,
                "follower_id": record.follower.id,
                "following_id": record.following.id,
                "created_at": record.created_at,
            }
            dashboard_activities["activities"].append(activity)

        for record in quiz_records:
            profile_picture = UserProfilePicture.objects.get(
                user_profile=record.user_profile_taker
            )
            activity = {
                "user_id": record.user_profile_taker.id,
                "user_name": record.user_profile_taker.user.username,
                "activity_type": "quiz",
                "user_profile_picture": profile_picture.profile_picture.url,
                "category_taken": record.category_taken.category_name,
                "category_id": record.category_taken.id,
                "score": record.score,
                "total": record.total,
                "created_at": record.created_at,
            }
            dashboard_activities["activities"].append(activity)

        return Response(dashboard_activities, status.HTTP_200_OK)
    except:
        traceback.print_exc()
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
