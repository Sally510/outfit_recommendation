from django.urls import path
from .views import(
    ItemListView,
    ItemView,
    WardrobeView,
    AddToWardrobeView,
    DeleteToWardrobeView,
    RecommendationView
    )

urlpatterns = [
    path('item-list/', ItemListView.as_view(), name='item-list'),
    path('item-list/<int:pk>/', ItemView.as_view(), name='item-list'),
    path('add-to-wardrobe', AddToWardrobeView, name='add-to-wardrobe'),
    path('delete-to-wardrobe', DeleteToWardrobeView, name='delete-to-wardrobe'),
    path('wardrobe', WardrobeView, name='wardrobe'),  
    # path('recommendation/', RecommendationView.as_view(), name='item-list'),
]
