from rest_framework import permissions


class IsAdminUser(permissions.IsAdminUser):
    def has_permission(self, request, view):
        if request.method == "OPTIONS":
            return True
        return super(IsAdminUser, self).has_permission(request, view)


class IsAuthenticated(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        if request.method == "OPTIONS":
            return True
        return super(IsAuthenticated, self).has_permission(request, view)
