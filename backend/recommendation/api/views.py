from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from recommendation.models import Item, CartItem
from .serializers import ItemSericalizer
from rest_framework.decorators import api_view, permission_classes
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.core.serializers import serialize

class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSericalizer
    queryset = Item.objects.all()[0:9]
    

class ItemView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Item.objects.all()
    serializer_class = ItemSericalizer

class RecommendationView:
    pass

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def WardrobeView(request):
    cartItems = CartItem.objects.filter(user_id=request.user.id)

    res = []
    for cartItem in cartItems:
        res.append(cartItem.item)

    return JsonResponse(ItemSericalizer(res, many=True).data, safe=False)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddToWardrobeView(request):
    ok = True
    try:
        CartItem.objects.create(item_id=request.data['item_id'], user_id=request.user.id)
    except:
        ok = False
    return Response(ok)


