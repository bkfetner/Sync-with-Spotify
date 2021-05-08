# from djoser.serializers import UserCreateSerializer
# from django.contrib.auth import get_user_model

from rest_framework import serializers
from .models import Todo
from .models import Rooms
from .models import Users
from .models import Queue
from .models import Vote


# User = get_user_model()


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description')

class RoomsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rooms
        fields = ('room_id','room_name', 'genre' ,'roomImageUrl','roomType')

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('display_name', 'profile_pic', 'user_id')

class QueuesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Queue
        fields = ('room_id','queue_id', 'song_list_id', 'queue_history')

class VotesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = ('user_id', 'vote_id', 'room_id')

# class UserCreateSerializer(UserCreateSerializer):
#     class Meta(UserCreateSerializer.Meta):
#         model = User
#         fields = ('id', 'email', 'first_name', 'last_name', 'password')