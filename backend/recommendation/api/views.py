from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from recommendation.models import Item, OrderItem
from .serializers import ItemSericalizer

class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSericalizer
    queryset = Item.objects.all()[0:9]
    

class ItemView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Item.objects.all()
    serializer_class = ItemSericalizer
    
class WardrobeView(RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSericalizer

class AddWardrobeView(RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSericalizer