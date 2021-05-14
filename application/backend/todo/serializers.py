

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
        fields = ('room_id','room_name', 'genre' ,'roomImageUrl','roomType', 'population')

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('user_id', 'display_name', 'profile_pic', 'admin_status', 'ban_status', 'ban_comments')

class QueuesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Queue
        fields = ('queue_item_id', 'room_id', 'song_id')

class VotesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = ('vote_id', 'room_id', 'user_id', 'song_id')

