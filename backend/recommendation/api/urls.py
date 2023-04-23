from django.urls import path
from .views import(
    ItemListView,
    ItemView,
    WardrobeView,
    AddToWardrobeView,
    RecommendationView
    )

urlpatterns = [
    path('item-list/', ItemListView.as_view(), name='item-list'),
    path('item-list/<int:pk>/', ItemView.as_view(), name='item-list'),
    path('add-to-wardrobe/<int:pk>', AddToWardrobeView.as_view(), name='create'),
    path('wardrobe/', WardrobeView.as_view(), name='add-to-wardrob1e'),  
    # path('recommendation/', RecommendationView.as_view(), name='item-list'),
]
