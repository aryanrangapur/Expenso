# expenses/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import generics

from .views import home, ExpenseViewSet
from .serializers import UserSerializer

router = DefaultRouter()
router.register('expenses', ExpenseViewSet, basename='expense')

urlpatterns = [
    path('', home, name='home'),

    path('api/', include(router.urls)),
    path('api/auth/token/', obtain_auth_token, name='api_token_auth'),
    path('api/register/', generics.CreateAPIView.as_view(
        serializer_class=UserSerializer
    ), name='register'),
]
