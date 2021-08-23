# from django.urls import path
# from backend import views

# urlpatterns = [
#     path("teams/", views.TeamView.as_view(), name="teams"),
#     path("teams/<str:top_id>/", views.SpecificTeam.as_view(), name="specificTeam")
# ]

from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from backend import views

urlpatterns = [
    path('teams/', views.TeamList.as_view()),
    path('teams/<int:pk>/', views.TeamDetail.as_view()),
]