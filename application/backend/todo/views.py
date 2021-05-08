from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .serializers import RoomsSerializer
from .serializers import UsersSerializer
from .serializers import QueuesSerializer
from .serializers import VotesSerializer

from .models import Todo
from .models import Rooms
from .models import Users
from .models import Queue
from .models import Vote


# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomsSerializer
    queryset = Rooms.objects.all()

class UserView(viewsets.ModelViewSet):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()

class QueueView(viewsets.ModelViewSet):
    serializer_class = QueuesSerializer
    queryset = Queue.objects.all()

class VoteView(viewsets.ModelViewSet):
    serializer_class = VotesSerializer
    queryset = Vote.objects.all()


def submitpage(request):
    data = request.POST.get('data')
   

    if 'roomName' in request.POST:
        name = request.POST['roomName']
    else:
        name = False

    if 'roomGenre' in request.POST:
        genre = request.POST['roomGenre']
    else:
        genre = False
    ins = Rooms(room_name=name, genre=genre)
    ins.save()
    print("Saved to db")

    context = {'data': data}
    return (request, context)

def index(request):
    return render(request, 'chat/index1.html')


def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })
