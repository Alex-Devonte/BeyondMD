from rest_framework import serializers
from .models import Bored_Activities

#Serializers allow data to be converted into native Python datatypes
#which can then be converted to JSON
class Bored_Activities_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Bored_Activities
        fields = ('id', 'activity', 'type', 'participants')