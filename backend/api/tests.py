import io

from django.contrib.auth.models import User

from PIL import Image
from rest_framework import status
from rest_framework.test import APITestCase

from elearning.models import Answer, Category, Choice, QuizRecord, Word, WordRecord
from eprofile.models import UserFollowing, UserProfile, UserProfilePicture


class CSRFAPITests(APITestCase):
    def test_csrf_view(self):
        response = self.client.get("/api/v1/csrf/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, "Info")


class CategoryAPITests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.category = Category.objects.create(
            category_name="Category name", category_description="Category description"
        )

    def test_api_list_view(self):
        response = self.client.get("/api/v1/category/")
        self.assertEqual(response.status_code, status.HTTP_200_OK, "Status code is not 200")
        self.assertEqual(response.data["count"], 1, "Category count is not 1")
        self.assertEqual(
            response.data["results"][0]["category_name"],
            self.category.category_name,
            "Category is not in response",
        )

    def test_api_detail_view(self):
        response = self.client.get("/api/v1/category/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK, "Status code is not 200")
        self.assertEqual(
            response.data["category_name"],
            self.category.category_name,
            "Category is not in response",
        )

    def test_api_list_view_with_search(self):
        response = self.client.get("/api/v1/category/?search=Category name")
        self.assertEqual(response.status_code, status.HTTP_200_OK, "Status code is not 200")
        self.assertEqual(response.data["count"], 1, "Category count is not 1")
        self.assertEqual(
            response.data["results"][0]["category_name"],
            self.category.category_name,
            "Category is not in response. Search failed.",
        )

    def test_api_list_view_with_search_not_found(self):
        response = self.client.get("/api/v1/category/?search=adadada")
        self.assertEqual(response.status_code, status.HTTP_200_OK, "Status code is not 200")
        self.assertEqual(response.data["count"], 0, "Category count is not 0")
        with self.assertRaises(IndexError, msg="Category count is not 0. Search failed."):
            response.data["results"][0]

    def test_api_create_view(self):
        data = {"category_name": "Category name 2", "category_description": "Category description"}
        response = self.client.post("/api/v1/category/", data)
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            "Status code is not 201. Failed to create a new category.",
        )
        self.assertEqual(
            Category.objects.count(),
            2,
            "Category count is not 2. Failed to create a new category.",
        )
        for key, value in data.items():
            self.assertEqual(
                value,
                response.data[key],
                f"Key {key} or value {value} not found, See {response.data}. Failed to create a new category.",
            )

    def test_api_update_view(self):
        data = {
            "category_name": "Category name updated",
            "category_description": "Category description",
        }
        response = self.client.put("/api/v1/category/1/", data)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "Status code is not 200. Failed to update a category.",
        )
        for key, value in data.items():
            self.assertEqual(
                value,
                response.data[key],
                f"Key {key} or value {value} not found, See {response.data}. Failed to update a category.",
            )

    def test_api_delete_view(self):
        response = self.client.delete("/api/v1/category/1/")
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            "Status code is not 204. Failed to delete a category.",
        )
        self.assertEqual(
            Category.objects.count(), 0, "Category count is not 0. Failed to delete a category."
        )


class WordAPITests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.category = Category.objects.create(
            category_name="Category name", category_description="Category description"
        )

        cls.word = Word.objects.create(category=cls.category, word_text="Sample Word")
        for i in range(1, 5):
            cls.choice = Choice.objects.create(word=cls.word, choice_text=f"string{i}")
        cls.answer = Answer.objects.create(word=cls.word, answer_text="string1")

    def test_api_list_view(self):
        response = self.client.get("/api/v1/word/")
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "Status code is not 200. Failed to get a list of words.",
        )
        self.assertEqual(
            Word.objects.count(), 1, "Word count is not 1. Failed to get a list of words."
        )

    def test_api_detail_view(self):
        response = self.client.get("/api/v1/word/1/")
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "Status code is not 200. Failed to get a word.",
        )
        self.assertEqual(
            response.data["word_text"],
            self.word.word_text,
            f"Word {self.word.word_text} is not in response. Failed to get a word.",
        )

    def test_api_create_view(self):
        data = {
            "category": {"category_name": "Category name"},
            "word_text": "Sample Word",
            "choices": [
                {"choice_text": "string1"},
                {"choice_text": "string2"},
                {"choice_text": "string3"},
                {"choice_text": "string4"},
            ],
            "answer": {"answer_text": "string1"},
        }
        response = self.client.post("/api/v1/word/", data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            "Status code is not 201. Failed to create a new word.",
        )
        self.assertEqual(Word.objects.count(), 2)
        for key, value in data.items():
            self.assertEqual(
                value,
                response.data[key],
                f"Key {key} or value {value} not found. Failed to create a new word.",
            )

    def test_api_delete_view(self):
        response = self.client.delete("/api/v1/word/1/")
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            "Status code is not 204. Failed to delete a word.",
        )
        self.assertEqual(Word.objects.count(), 0, "Word count is not 0. Failed to delete a word.")


class UserProfileAPITests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            username="testuser", email="testuser@elearning.dev", password="testpassword"
        )
        cls.user_profile = UserProfile.objects.get(user=cls.user)
        cls.user_profile_picture = UserProfilePicture.objects.get(user_profile=cls.user_profile)
        cls.other_user = User.objects.create_user(
            username="otheruser", email="otheruser@elearning.dev", password="otherpassword"
        )
        cls.other_user_profile = UserProfile.objects.get(user=cls.other_user)
        cls.other_user_profile_picture = UserProfilePicture.objects.get(
            user_profile=cls.other_user_profile
        )

    def generate_photo_file(self):
        file = io.BytesIO()
        image = Image.new("RGBA", size=(100, 100), color=(155, 0, 0))
        image.save(file, "png")
        file.name = "test.png"
        file.seek(0)
        return file

    def test_api_list_view(self):
        response = self.client.get("/api/v1/profile/")
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "Status code is not 200. Failed to get a list of profiles.",
        )
        self.assertEqual(
            UserProfile.objects.count(),
            2,
            "Profile count is not 2. Failed to get a list of profiles.",
        )

    def test_api_detail_view(self):
        response = self.client.get("/api/v1/profile/1/")
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            "Status code is not 200. Failed to get a profile.",
        )
        self.assertEqual(
            response.data["id"], self.user.id, "User is not in response. Failed to get a profile."
        )

    def test_profile_picture_upload_view(self):
        self.client.login(username="testuser", password="testpassword")
        data = {"profile_picture": self.generate_photo_file()}
        response = self.client.post("/api/v1/profile_picture/upload/1/", data, format="multipart")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, "Failed to upload a profile picture."
        )
        self.assertEqual(
            UserProfilePicture.objects.count(), 2, "Failed to upload a profile picture."
        )

    def test_profile_picture_list_view(self):
        response = self.client.get("/api/v1/profile_picture/")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, "Failed to get a list of pictures."
        )
        self.assertEqual(
            UserProfilePicture.objects.count(), 2, "Failed to get a list of pictures."
        )

    def test_profile_picture_detail_view(self):
        response = self.client.get("/api/v1/profile_picture/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK, "Failed to get a picture.")

    def test_user_following(self):
        self.client.login(username="testuser", password="testpassword")
        other_user = User.objects.get(username="otheruser")
        data = {"follower": self.user.id, "following": other_user.id}
        response = self.client.post("/api/v1/following/", data)
        user_profile = UserProfile.objects.get(user=self.user)
        user_following = UserFollowing.objects.get(follower=user_profile)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED, "Failed to follow user.")
        self.assertEqual(UserFollowing.objects.count(), 1, "Failed to follow user.")
        self.assertEqual(
            user_following.follower.user.username, "testuser", "Failed to follow user."
        )
        self.assertEqual(
            user_following.following.user.username, "otheruser", "Failed to follow user."
        )
        self.assertEqual(
            UserProfile.objects.get(user=self.user).following_count, 1, "Failed to follow user."
        )
        self.assertEqual(
            UserProfile.objects.get(user=other_user).follower_count, 1, "Failed to follow user."
        )

    def test_user_follow_unfollow(self):
        self.client.login(username="testuser", password="testpassword")
        other_user = User.objects.get(username="otheruser")
        data = {"follower": self.user.id, "following": other_user.id}
        response = self.client.post("/api/v1/following/", data)
        user_profile = UserProfile.objects.get(user=self.user)
        user_following = UserFollowing.objects.get(follower=user_profile)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED, "Failed to follow user.")
        self.assertEqual(UserFollowing.objects.count(), 1, "Failed to follow user.")
        self.assertEqual(
            user_following.follower.user.username, "testuser", "Failed to follow user."
        )
        self.assertEqual(
            user_following.following.user.username, "otheruser", "Failed to follow user."
        )
        self.assertEqual(
            UserProfile.objects.get(user=self.user).following_count, 1, "Failed to follow user."
        )
        self.assertEqual(
            UserProfile.objects.get(user=other_user).follower_count, 1, "Failed to follow user."
        )

        response = self.client.delete("/api/v1/following/delete/", data)
        self.assertEqual(
            response.status_code, status.HTTP_204_NO_CONTENT, "Failed to unfollow user."
        )
        self.assertEqual(UserFollowing.objects.count(), 0, "Failed to unfollow user.")
        self.assertEqual(
            UserProfile.objects.get(user=self.user).following_count, 0, "Failed to unfollow user."
        )


class LessonAnsweringAPITests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            username="testuser", email="testuser@elearning.dev", password="testpassword"
        )
        cls.user_profile = UserProfile.objects.get(user=cls.user)
        cls.user_profile_picture = UserProfilePicture.objects.get(user_profile=cls.user_profile)

        cls.category = Category.objects.create(
            category_name="Basic 5 Words",
            category_description="Basic 5 Words",
        )

        for i in range(1, 6):
            Word.objects.create(
                word_text=f"word{i}",
                category=cls.category,
            )

            cls.answer = Answer.objects.create(
                word=Word.objects.get(word_text=f"word{i}"), answer_text="choice 4"
            )

            for j in range(1, 5):
                cls.choice = Choice.objects.create(
                    choice_text=f"choice {j}",
                    word=Word.objects.get(word_text=f"word{i}"),
                )

    def test_lesson_results_exist(self):
        self.client.login(username="testuser", password="testpassword")
        response = self.client.get(
            f"/api/v1/lesson_results/exists/?user_profile_taker_id={self.user.id}&category_taken_id={self.category.id}"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK, "Failed to get lesson results.")
        self.assertEqual(response.data["exists"], False, "Failed to get lesson results.")

    def test_lesson_answering_and_delete(self):
        self.client.login(username="testuser", password="testpassword")

        data = {"category_id": self.category.id, "questions": []}

        for i in range(1, 6):
            data["questions"].append({"word": f"word{i}", "selected_answer": "choice 4"})
        url = f"/api/v1/lesson_answering/{self.user.id}/"

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED, "Failed to answer lesson.")

        quiz_record = QuizRecord.objects.get(
            user_profile_taker=self.user_profile, category_taken=self.category
        )

        self.assertEqual(
            quiz_record.user_profile_taker.user.username, "testuser", "Failed to answer lesson."
        )
        self.assertEqual(
            quiz_record.category_taken.category_name, "Basic 5 Words", "Failed to answer lesson."
        )
        self.assertEqual(quiz_record.score, 5, "Failed to answer lesson.")
        self.assertEqual(
            quiz_record.user_profile_taker.lessons_learned, 1, "Failed to answer lesson."
        )
        self.assertEqual(
            quiz_record.user_profile_taker.words_learned, 5, "Failed to answer lesson."
        )

        response = self.client.get(
            f"/api/v1/lesson_results/exists/?user_profile_taker_id={quiz_record.user_profile_taker.id}&category_taken_id={quiz_record.category_taken.id}"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK, "Failed to get lesson results.")
        self.assertEqual(response.data["exists"], True, "Failed to get lesson results.")

        response = self.client.get("/api/v1/lesson_results/")

        self.assertEqual(response.status_code, status.HTTP_200_OK, "Failed to get lesson results.")
        self.assertEqual(response.data["count"], 1, "Failed to get lesson results.")

        taker_id = quiz_record.user_profile_taker.id
        category = quiz_record.category_taken

        Category.delete(category)
        self.assertEqual(QuizRecord.objects.count(), 0, "Failed to delete lesson results.")
        self.assertEqual(Answer.objects.count(), 0, "Failed to delete lesson results.")
        self.assertEqual(Choice.objects.count(), 0, "Failed to delete lesson results.")
        self.assertEqual(Word.objects.count(), 0, "Failed to delete lesson results.")
        self.assertEqual(Category.objects.count(), 0, "Failed to delete lesson results.")

        self.assertEqual(
            UserProfile.objects.get(id=taker_id).lessons_learned,
            0,
            "Failed to delete lesson results.",
        )
        self.assertEqual(
            UserProfile.objects.get(id=taker_id).words_learned,
            0,
            "Failed to delete lesson results.",
        )
