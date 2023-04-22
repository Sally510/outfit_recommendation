from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from recommendation.models import Item, OrderItem
from .serializers import ItemSericalizer

class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSericalizer
    queryset = Item.objects.all()

class AddToWardrobeView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        if slug is None:
            return Response({"message": "无效的请求"}, status=HTTP_400_BAD_REQUEST)

        item = get_object_or_404(Item, slug=slug)

        # order_item_qs = OrderItem.objects.filter(
        #     item=item,
        #     user=request.user,
        #     ordered=False
        # )

        # if order_item_qs.exists():
        #     order_item = order_item_qs.first()
        #     order_item.quantity += 1
        #     order_item.save()
        # else:
        #     order_item = OrderItem.objects.create(
        #         item=item,
        #         user=request.user,
        #         ordered=False
        #     )
        #     order_item.item_variations.add(*variations)
        #     order_item.save()

        # order_qs = Order.objects.filter(user=request.user, ordered=False)
        # if order_qs.exists():
        #     order = order_qs[0]
        #     if not order.items.filter(item__id=order_item.id).exists():
        #         order.items.add(order_item)
        #         return Response(status=HTTP_200_OK)

        # else:
        #     ordered_date = timezone.now()
        #     order = Order.objects.create(
        #         user=request.user, ordered_date=ordered_date)
        #     order.items.add(order_item)
        #     return Response(status=HTTP_200_OK)