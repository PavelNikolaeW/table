from django.urls import path

from . import views

urlpatterns = [
    path('<int:count>?<int:step>', views.getData),
    path('', views.getData),
]
