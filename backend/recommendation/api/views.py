from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from recommendation.models import Item
from .serializers import ItemSericalizer

class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSericalizer
    queryset = Item.objects.all()