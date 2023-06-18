from django.urls import path
from .views import(
    ItemListEndpoint,
    ItemEndpoint,
    WardrobeEndpoint,
    AddToWardrobeEndpoint,
    DeleteToWardrobeEndpoint,
    ProcessRecommendationEndpoint,
    HistoryEndpoint,
    createProductReview,
    getReviews
    )

urlpatterns = [
    path('item-list', ItemListEndpoint, name='item-list'),
    path('item-list/<str:pk>/', ItemEndpoint, name='item'),
    path('item-list/<str:pk>/reviews/', createProductReview, name='productReview'),
    path('add-to-wardrobe', AddToWardrobeEndpoint, name='add-to-wardrobe'),
    path('delete-to-wardrobe', DeleteToWardrobeEndpoint, name='delete-to-wardrobe'),
    path('wardrobe', WardrobeEndpoint, name='wardrobe'),  
    path('process-recommendation', ProcessRecommendationEndpoint, name='process-recommendation'),  
    path('history', HistoryEndpoint, name='history'),  
    path('reviews', getReviews, name='getReviews'),

]
