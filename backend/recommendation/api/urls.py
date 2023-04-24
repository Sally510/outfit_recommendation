from django.urls import path
from .views import(
    ItemListView,
    ItemView,
    WardrobeEndpoint,
    AddToWardrobeEndpoint,
    DeleteToWardrobeEndpoint,
    ProcessRecommendationEndpoint
    )

urlpatterns = [
    path('item-list/', ItemListView.as_view(), name='item-list'),
    path('item-list/<int:pk>/', ItemView.as_view(), name='item-list'),
    path('add-to-wardrobe', AddToWardrobeEndpoint, name='add-to-wardrobe'),
    path('delete-to-wardrobe', DeleteToWardrobeEndpoint, name='delete-to-wardrobe'),
    path('wardrobe', WardrobeEndpoint, name='wardrobe'),  
    path('process-recommendation', ProcessRecommendationEndpoint, name='process-recommendation'),  
]
