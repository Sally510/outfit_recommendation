from django.urls import path
from .views import(
    ItemListEndpoint,
    ItemView,
    WardrobeEndpoint,
    AddToWardrobeEndpoint,
    DeleteToWardrobeEndpoint,
    ProcessRecommendationEndpoint,
    HistoryEndpoint,
    createProductReview
    )

urlpatterns = [
    path('item-list', ItemListEndpoint, name='item-list'),
    path('item-list/<str:pk>/', ItemView.as_view(), name='item'),

    path('item-list/<str:pk>/reviews', createProductReview, name='ProductReview'),

    path('add-to-wardrobe', AddToWardrobeEndpoint, name='add-to-wardrobe'),
    path('delete-to-wardrobe', DeleteToWardrobeEndpoint, name='delete-to-wardrobe'),
    path('wardrobe', WardrobeEndpoint, name='wardrobe'),  
    path('process-recommendation', ProcessRecommendationEndpoint, name='process-recommendation'),  
    path('history', HistoryEndpoint, name='history'),  
]
