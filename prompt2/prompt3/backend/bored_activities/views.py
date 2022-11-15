from django.shortcuts import render
from rest_framework import viewsets
from .serializers import Bored_Activities_Serializer
from .models import Bored_Activities

# Create your views here.
#Viewsets provides the implementation CRUD operations

class Bored_Activities_View(viewsets.ModelViewSet):
    #Used for validation and deserializing input
    serializer_class = Bored_Activities_Serializer
    #Describes all objects in the database table
    queryset = Bored_Activities.objects.all()