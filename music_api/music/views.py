from .serializers import MusicSerializer, GenreSerializer, PublisherSerializer
from .models import Music, Genre, Publisher

from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class MusicViewSet(viewsets.ModelViewSet) :
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    filter_backends = (DjangoFilterBackend, )
    filter_fields = ('genre', 'publisher', )

class GenreViewSet(viewsets.ModelViewSet) :
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class PublisherViewSet(viewsets.ModelViewSet) :
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer