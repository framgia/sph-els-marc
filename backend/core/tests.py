from django.contrib.auth.models import User
from django.test import Client, TestCase, override_settings


class TestAdminPanel(TestCase):
    def create_user(self):
        self.username = "test_admin"
        self.password = User.objects.make_random_password()
        user, created = User.objects.get_or_create(username=self.username)
        user.set_password(self.password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()
        self.user = user

    def test_spider_admin(self):
        self.create_user()
        client = Client()
        client.login(username=self.username, password=self.password)
        admin_pages = [
            "/admin/",
            # put all the admin pages for your models in here.
            "/admin/auth/",
            "/admin/auth/group/",
            "/admin/auth/group/add/",
            "/admin/auth/user/",
            "/admin/auth/user/add/",
            "/admin/password_change/",
        ]
        for page in admin_pages:
            resp = client.get(page)
            assert resp.status_code == 200
            assert b"<!DOCTYPE html" in resp.content

    @override_settings(DEBUG=False, USE_S3=False)
    def test_settings(self):
        self.create_user()
        client = Client()
        client.login(username=self.username, password=self.password)
        resp = client.get("/admin/")
        assert resp.status_code == 200
        assert b"<!DOCTYPE html" in resp.content
