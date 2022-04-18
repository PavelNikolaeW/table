from django.urls import path

from . import views

urlpatterns = [
    path('', views.get_data),
    path('<int:count>', views.get_data),
		path('order_by=<str:order_by>', views.get_data),
		path('order_by=<str:order_by>/<int:count>', views.get_data),
]
