from django.contrib import admin
from django.urls import path, include
# Remove the home import and catch-all route

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('expenses.urls')),
    # REMOVE the catch-all route that was serving React
    # re_path(r'^(?!api/|admin/).*$' , home, name='home'),
]