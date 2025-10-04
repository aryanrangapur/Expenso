from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import generics

from .views import ExpenseViewSet
from .serializers import UserSerializer

router = DefaultRouter()
router.register('expenses', ExpenseViewSet, basename='expense')

urlpatterns = [
    # These URLs will be under /api/ (from main/urls.py)
    path('', include(router.urls)),  # This creates /api/expenses/
    path('auth/token/', obtain_auth_token, name='api_token_auth'),  # /api/auth/token/
    path('register/', generics.CreateAPIView.as_view(
        serializer_class=UserSerializer
    ), name='register'),  # /api/register/
]