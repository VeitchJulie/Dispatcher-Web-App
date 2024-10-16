from rest_framework import serializers
from backend.models import Team, Case

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ("id", "token", "state", "lat", "long", "endLat", "endLong")


class CaseSerializer(serializers.ModelSerializer):
    # date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    
    class Meta:
        model = Case
        fields = ("id", "state" ,"name", "date", "team", "lat", "lng", "phone", "extraInformation", "isPatient")

class DetailedTeamSerializer(serializers.ModelSerializer):
    cases = CaseSerializer(many=True, read_only=True)
    class Meta:
        model = Team
        fields = ("id", "cases")
    # cases = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # class Meta:
    #     model = Team
    #     fields = ("id", "token", "state", "lat", "long", "endLat", "endLong", "cases")
