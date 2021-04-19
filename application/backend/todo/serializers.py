from rest_framework import serializers
from .models import Todo
from .models import Rooms


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description')

class RoomsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rooms
        fields = ('id','room_name', 'genre' ,'roomImageUrl')