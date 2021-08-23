# from django.db.models.query import QuerySet
# from backend.serializers import TeamSerializer
# from backend.models import Team
# from rest_framework import generics


# class TeamView(generics.ListAPIView):
#     queryset = Team.objects.all()
#     serializer_class = TeamSerializer

# class SpecificTeam(generics.ListAPIView):
#     serializer_class = TeamSerializer

#     def get_queryset(self):
#         top_idX = self.kwargs['top_id']
#         return Team.objects.filter(top_id = top_idX)

from backend.models import Team
from backend.serializers import TeamSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TeamList(APIView):
    
    def get(self, request, format=None):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)
    
    def post(self, request, format = None):
        serializer = TeamSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
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
        serializer = TeamSerializer(team)
        return Response(serializer.data)

    def put(self, request, pk, format = None):
        team = self.get_object(pk)
        serializer = TeamSerializer(team, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        team = self.get_object(pk)
        team.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)


