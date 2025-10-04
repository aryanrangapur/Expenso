from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import generics

from .views import ExpenseViewSet
from .serializers import UserSerializer

router = DefaultRouter()
router.register('expenses', ExpenseViewSet, basename='expense')

urlpatterns = [
    # These are directly under /api/ (no prefix)
    path('auth/token/', obtain_auth_token, name='api_token_auth'),
    path('register/', generics.CreateAPIView.as_view(
        serializer_class=UserSerializer
    ), name='register'),
]

# Add router URLs
urlpatterns += router.urls