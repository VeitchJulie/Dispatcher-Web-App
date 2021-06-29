from backend.serializers import TeamSerializer
from backend.models import Team
from rest_framework import generics


class TeamView(generics.ListAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer