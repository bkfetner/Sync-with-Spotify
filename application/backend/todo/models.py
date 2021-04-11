from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

class Rooms(models.Model):
 #   room_id = models.CharField(max_length=20)
    room_name = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)

    def str(self):
        return self.room_name