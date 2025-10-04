from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import generics

from .views import ExpenseViewSet
from .serializers import UserSerializer

router = DefaultRouter()
router.register('expenses', ExpenseViewSet, basename='expense')

urlpatterns = [
    # Remove the 'api/' prefix - it's already in main/urls.py
    path('auth/token/', obtain_auth_token, name='api_token_auth'),  # Now: /api/auth/token/
    path('register/', generics.CreateAPIView.as_view(               # Now: /api/register/
        serializer_class=UserSerializer
    ), name='register'),
]

urlpatterns += router.urls  # This creates /api/expenses/