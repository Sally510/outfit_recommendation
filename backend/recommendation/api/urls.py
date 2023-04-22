from django.urls import path
from .views import(
    ItemListView,
    AddToWardrobeView
    )

urlpatterns = [
    path('recommendation/', ItemListView.as_view(), name='recommendation'),
    path('add-to-wardrobe/', AddToWardrobeView.as_view(), name='add-to-wardrobe')
]
