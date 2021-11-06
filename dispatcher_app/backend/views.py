from backend.models import Team, Case
from backend.serializers import TeamSerializer, CaseSerializer, DetailedTeamSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from backend.FCMManager import sendPush
import requests


class TeamList(APIView):
    
    def get(self, request, format=None):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True, context={'request':request})
        return Response(serializer.data)
    
    def post(self, request, format = None):
        serializer = TeamSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            # print(request.data['token']) 
            # fcm.sendPush('Test', 'Hello there ;)', registration_token=[''])
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class CaseList(APIView):
    
    def get(self, request, format=None):
        cases = Case.objects.all()
        serializer = CaseSerializer(cases, many=True, context={'request':request})
        return Response(serializer.data)
    
    def post(self, req, format = None):
        serializer = CaseSerializer(data = req.data)
        teamId = req.data['team']
        team = requests.get(f"http://localhost:8000/teams/{teamId}/")
        token = team.json()['token']
        if serializer.is_valid():
            serializer.save()
            sendPush('New Case for ' + req.data['team'], 'Check app and respond ASAP', registration_token=token)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
class TeamDetail(APIView):

    def get_object(self, pk):
        try:
            return Team.objects.get(pk = pk)
        except Team.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format = None):
        team = self.get_object(pk)
        serializer = TeamSerializer(team, context={'request':request})
        return Response(serializer.data)

    def put(self, request, pk, format = None):
        team = self.get_object(pk)
        serializer = TeamSerializer(team, data = request.data)
        if serializer.is_valid():
            serializer.save()
            # sendPush('New Case for ' + request.data['id'], 'Check app and respond ASAP', registration_token=request.data['token'])
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk, format = None):
        team = self.get_object(pk)
        serializer = TeamSerializer(team, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        team = self.get_object(pk)
        team.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

class TeamWithCases(APIView):
    def get_object(self, pk):
        try:
            return Team.objects.get(pk = pk)
        except Team.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format = None):
        team = self.get_object(pk)
        serializer = DetailedTeamSerializer(team, context={'request':request})
        return Response(serializer.data)

    def put(self, request, pk, format = None):
        team = self.get_object(pk)
        serializer = DetailedTeamSerializer(team, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class OneCase(APIView):
    def get_object(self, pk):
        try:
            return Case.objects.get(pk = pk)
        except Case.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format = None):
        case = self.get_object(pk)
        serializer = CaseSerializer(case)
        return Response(serializer.data)


# class CaseDetail(APIView):
#     def get_object(self, pk):
#         try:
#             return Case.objects.all().filter('team' = pk)
#         except Team.DoesNotExist:
#             raise Http404
    
#     def get(self, request, pk, format = None):
#         case = self.get_object(pk)
#         serializer = CaseSerializer(case)
#         return Response(serializer.data)



