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
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertContains(response, self.category)

    def test_api_detail_view(self):
        response = self.client.get("/api/v1/category/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.category)

    def test_api_list_view_with_search(self):
        response = self.client.get("/api/v1/category/?search=Category name")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertContains(response, self.category)

    def test_api_create_view(self):
        data = {"category_name": "Category name 2", "category_description": "Category description"}
        response = self.client.post("/api/v1/category/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 2)
        for key, value in data.items():
            self.assertEqual(value, response.data[key])

    def test_api_update_view(self):
        data = {
            "category_name": "Category name updated",
            "category_description": "Category description",
        }
        response = self.client.put("/api/v1/category/1/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for key, value in data.items():
            self.assertEqual(value, response.data[key])

    def test_api_delete_view(self):
        response = self.client.delete("/api/v1/category/1/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Category.objects.count(), 0)


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
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Word.objects.count(), 1)

    def test_api_detail_view(self):
        response = self.client.get("/api/v1/word/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.word)

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
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Word.objects.count(), 2)
        for key, value in data.items():
            self.assertEqual(value, response.data[key])

    def test_api_delete_view(self):
        response = self.client.delete("/api/v1/word/1/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Word.objects.count(), 0)


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
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(UserProfile.objects.count(), 2)

    def test_api_detail_view(self):
        response = self.client.get("/api/v1/profile/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.user)

    def test_profile_picture_upload_view(self):
        self.client.login(username="testuser", password="testpassword")
        data = {"profile_picture": self.generate_photo_file()}
        response = self.client.post("/api/v1/profile_picture/upload/1/", data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(UserProfilePicture.objects.count(), 2)

    def test_profile_picture_list_view(self):
        response = self.client.get("/api/v1/profile_picture/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(UserProfilePicture.objects.count(), 2)

    def test_profile_picture_detail_view(self):
        response = self.client.get("/api/v1/profile_picture/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_following(self):
        self.client.login(username="testuser", password="testpassword")
        other_user = User.objects.get(username="otheruser")
        data = {"follower": self.user.id, "following": other_user.id}
        response = self.client.post("/api/v1/following/", data)
        user_profile = UserProfile.objects.get(user=self.user)
        user_following = UserFollowing.objects.get(follower=user_profile)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserFollowing.objects.count(), 1)
        self.assertEqual(user_following.follower.user.username, "testuser")
        self.assertEqual(user_following.following.user.username, "otheruser")
        self.assertEqual(UserProfile.objects.get(user=self.user).following_count, 1)
        self.assertEqual(UserProfile.objects.get(user=other_user).follower_count, 1)

    def test_user_follow_unfollow(self):
        self.client.login(username="testuser", password="testpassword")
        other_user = User.objects.get(username="otheruser")
        data = {"follower": self.user.id, "following": other_user.id}
        response = self.client.post("/api/v1/following/", data)
        user_profile = UserProfile.objects.get(user=self.user)
        user_following = UserFollowing.objects.get(follower=user_profile)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserFollowing.objects.count(), 1)
        self.assertEqual(user_following.follower.user.username, "testuser")
        self.assertEqual(user_following.following.user.username, "otheruser")
        self.assertEqual(UserProfile.objects.get(user=self.user).following_count, 1)
        self.assertEqual(UserProfile.objects.get(user=other_user).follower_count, 1)

        response = self.client.delete("/api/v1/following/delete/", data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(UserFollowing.objects.count(), 0)
        self.assertEqual(UserProfile.objects.get(user=self.user).following_count, 0)


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

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["exists"], False)

    def test_lesson_answering_and_delete(self):
        self.client.login(username="testuser", password="testpassword")
        print(f"TEST: Preparing user {self.user.username}'s answers...")

        data = {"category_id": self.category.id, "questions": []}

        for i in range(1, 6):
            data["questions"].append({"word": f"word{i}", "selected_answer": "choice 4"})
        url = f"/api/v1/lesson_answering/{self.user.id}/"

        print(f"TEST: Submitting user {self.user.username}'s answers...")
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        print(f"TEST: Checking if {self.user.username}'s results exist...")

        quiz_record = QuizRecord.objects.get(
            user_profile_taker=self.user_profile, category_taken=self.category
        )

        print(f"TEST: Checking the contents of {self.user.username}'s results...")

        self.assertEqual(quiz_record.user_profile_taker.user.username, "testuser")
        self.assertEqual(quiz_record.category_taken.category_name, "Basic 5 Words")
        self.assertEqual(quiz_record.score, 5)
        self.assertEqual(quiz_record.user_profile_taker.lessons_learned, 1)
        self.assertEqual(quiz_record.user_profile_taker.words_learned, 5)

        response = self.client.get(
            f"/api/v1/lesson_results/exists/?user_profile_taker_id={quiz_record.user_profile_taker.id}&category_taken_id={quiz_record.category_taken.id}"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["exists"], True)

        response = self.client.get("/api/v1/lesson_results/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)

        taker_id = quiz_record.user_profile_taker.id
        category = quiz_record.category_taken

        print(f"TEST: Attempt to delete {self.category}...")

        Category.delete(category)
        self.assertEqual(QuizRecord.objects.count(), 0)
        self.assertEqual(Answer.objects.count(), 0)
        self.assertEqual(Choice.objects.count(), 0)
        self.assertEqual(Word.objects.count(), 0)
        self.assertEqual(Category.objects.count(), 0)

        self.assertEqual(UserProfile.objects.get(id=taker_id).lessons_learned, 0)
        self.assertEqual(UserProfile.objects.get(id=taker_id).words_learned, 0)
