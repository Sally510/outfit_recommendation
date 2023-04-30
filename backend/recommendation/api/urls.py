from django.urls import path
from .views import(
    ItemListEndpoint,
    ItemView,
    WardrobeEndpoint,
    AddToWardrobeEndpoint,
    DeleteToWardrobeEndpoint,
    ProcessRecommendationEndpoint,
    HistoryEndpoint
    )

urlpatterns = [
    path('item-list', ItemListEndpoint, name='item-list'),
    path('item-list/<int:pk>/', ItemView.as_view(), name='item-list'),
    path('add-to-wardrobe', AddToWardrobeEndpoint, name='add-to-wardrobe'),
    path('delete-to-wardrobe', DeleteToWardrobeEndpoint, name='delete-to-wardrobe'),
    path('wardrobe', WardrobeEndpoint, name='wardrobe'),  
    path('process-recommendation', ProcessRecommendationEndpoint, name='process-recommendation'),  
    path('history', HistoryEndpoint, name='history'),  
]
