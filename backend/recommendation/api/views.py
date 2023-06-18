from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from django.http import JsonResponse
from recommendation.models import HistoryItem, Item, CartItem, Review
from accounts.models import UserAccount
from .serializers import ItemSericalizer, ReviewSerializer
from rest_framework.decorators import api_view, permission_classes
import recommendation.ml.ml as mm
import re
import os

@api_view(['GET'])
def ItemEndpoint(request, pk):
    product = Item.objects.get(id=pk)
    serializer = ItemSericalizer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def ItemListEndpoint(request):
    page_size = int(request.query_params['page_size'])
    page = int(request.query_params['page'])
    offset = page * page_size
    
    excluded_ids = map(lambda x: x.item_id, CartItem.objects.filter(user_id=request.user.id ))
    res = Item.objects.exclude(id__in=excluded_ids)
    
    if 'search' in request.query_params:
        res = res.filter(product_display_name__icontains=str(request.query_params['search']))

    if 'season' in request.query_params:
        res = res.filter(season=str(request.query_params['season']))

    if 'gender' in request.query_params:
        res = res.filter(gender=str(request.query_params['gender']))

    if 'category' in request.query_params:
        res = res.filter(master_category=str(request.query_params['category']))

    if 'usage' in request.query_params:
        res = res.filter(usage=str(request.query_params['usage']))

        
    return JsonResponse(ItemSericalizer(res[offset:offset+page_size], many=True).data, safe=False)

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
        HistoryItem.objects.create(user_id=request.user.id, upload_image=name)
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
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def HistoryEndpoint(request):
    historyItems = HistoryItem.objects.filter(user_id=request.user.id)   
    image_list = []
    for historyItem in historyItems:
        print(historyItem)
        image_path = 'http://localhost:8000/uploads/' + historyItem.upload_image
        image_list.append(image_path)
    print (image_list)    
    return Response({'images':image_list})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = UserAccount.objects.filter(id=request.user.id).first() 
    product = Item.objects.get(id=pk)
    data = request.data
    
    # 1 Review already exists
    alreadyExists = product.review_set.filter(user_id = request.user.id).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please Select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0

        for i in reviews:
            total += i.rating
        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getReviews(request):
    reviews = Review.objects.filter(user_id=request.user.id)
    return JsonResponse(ReviewSerializer(reviews, many=True).data, safe=False)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def deleteReview(request):
#     reviews = Review.objects.filter(user_id=request.user.id)
#     return JsonResponse(ReviewSerializer(reviews, many=True).data, safe=False)
