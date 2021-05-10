

from rest_framework import serializers
from .models import Todo
from .models import Rooms
from .models import Users
from .models import Queue
from .models import Vote





class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description')

class RoomsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rooms
        fields = ('id','room_id','room_name', 'genre' ,'roomImageUrl','roomType')

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('display_name', 'profile_pic', 'user_id')

class QueuesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Queue
        fields = ('queue_id', 'song_list_id', 'queue_history')

class VotesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = ('id', 'vote_id')

