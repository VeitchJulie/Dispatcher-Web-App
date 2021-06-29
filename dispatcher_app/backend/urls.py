from django.urls import path
from backend import views

urlpatterns = [
    path("teams/", views.TeamView.as_view(), name="teams"),
]