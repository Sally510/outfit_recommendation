from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from recommendation.models import Item, CartItem
from .serializers import ItemSericalizer
from rest_framework.decorators import api_view, permission_classes
import recommendation.ml.ml as mm
import re


class ItemView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Item.objects.all()
    serializer_class = ItemSericalizer

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def ItemListEndpoint(request):
    page_size = int(request.query_params['page_size'])
    page = int(request.query_params['page'])
    search = str(request.query_params['search'])
    offset = page * page_size
    if search is not None:
        search_items = Item.objects.filter(productDisplayName__istartswith=search)
        excluded_ids = map(lambda x: x.item_id, CartItem.objects.filter(user_id=request.user.id ))
        res = search_items.exclude(id__in=excluded_ids)[offset:offset+page_size]
        return JsonResponse(ItemSericalizer(res, many=True).data, safe=False)
    else:    
        excluded_ids = map(lambda x: x.item_id, CartItem.objects.filter(user_id=request.user.id))
        res = Item.objects.exclude(id__in=excluded_ids)[offset:offset+page_size]
        return JsonResponse(ItemSericalizer(res, many=True).data, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def WardrobeEndpoint(request):
    cartItems = CartItem.objects.filter(user_id=request.user.id)

    res = []
    for cartItem in cartItems:
        res.append(cartItem.item)

    return JsonResponse(ItemSericalizer(res, many=True).data, safe=False)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddToWardrobeEndpoint(request):
    added = True
    try:
        CartItem.objects.create(item_id=request.data['item_id'], user_id=request.user.id)
    except:
        added = False
    return Response({"ok": added})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def DeleteToWardrobeEndpoint(request):
    try:
        cart_item = CartItem.objects.get(item_id=request.data['item_id'], user_id=request.user.id)
        cart_item.delete()
    except CartItem.DoesNotExist:
        ok = False
    except Exception as e:
        print(e)  # Log exception
        ok = False
    return Response(ok)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ProcessRecommendationEndpoint(request):
    if 'file' in request.data:
        f = request.data['file']
        name = f.name
        data = f.read()
        predicted_item_paths = mm.process_image(name, data)
        predicted_item_ids = []
        for i in predicted_item_paths:
            id = re.search(r'\d{4,5}', i)
            print(id)
            if id:
                predicted_item_ids.append(int(id.group()))
        res = []
        
        if predicted_item_ids is not None:
            ids = list(predicted_item_ids)
            res = list(Item.objects.filter(id__in=ids))
        return JsonResponse(ItemSericalizer(res, many=True).data, safe=False)
    else:
        return Response('No file submitted', status=400)


