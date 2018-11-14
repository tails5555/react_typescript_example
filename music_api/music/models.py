from django.db import models

class Genre(models.Model) :
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, default="장르")

class Publisher(models.Model) :
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, default="배급")

class Music(models.Model) :
    id = models.AutoField(primary_key=True)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, default=None)
    title = models.CharField(max_length=100, default="노래 제목")
    singer = models.CharField(max_length=20, default="가수")
    year = models.IntegerField(default=1900)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, default=None)
