from rest_framework import serializers
from .models import Music, Publisher, Genre

class MusicSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Music
        fields = ('id', 'genre', 'title', 'singer', 'year', 'publisher')

class GenreSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Genre
        fields = ('id', 'name')

class PublisherSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Publisher
        fields = ('id', 'name')