from rest_framework import serializers
from backend.models import Team

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ("id", "top_id", "state", "lat", "long", "endLat", "endLong")