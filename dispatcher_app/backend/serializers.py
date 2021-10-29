from rest_framework import serializers
from backend.models import Team, Case

class TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = ("id", "token", "state", "lat", "long", "endLat", "endLong")

class DetailedTeamSerializer(serializers.ModelSerializer):
    cases = TeamSerializer(many=True, read_only=True)
    class Meta:
        model = Team
        fields = ("id", "token", "state", "lat", "long", "endLat", "endLong", "cases")
    # cases = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # class Meta:
    #     model = Team
    #     fields = ("id", "token", "state", "lat", "long", "endLat", "endLong", "cases")

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ("id", "name", "date", "team", "lat", "long", "phone")