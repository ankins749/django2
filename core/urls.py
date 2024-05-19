from django.urls import path
from .views import index, nosotros


urlpatterns = [
    path('', index, name="index"),
    path('nosotros', nosotros, name="nosotros"),
]
