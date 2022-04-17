from django.urls import path

from . import views

urlpatterns = [
    path('<int:count>', views.getData),
    path('', views.getData),
]
