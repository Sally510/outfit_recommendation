from django.urls import path
from .views import(
    ItemListView,
    ItemView,
    WardrobeView,
    AddWardrobeView
    )

urlpatterns = [
    path('recommendation/', ItemListView.as_view(), name='recommendation'),
    path('recommendation/<int:pk>/', ItemView.as_view(), name='recommendation'),
    path('add-to-wardrobe/', AddWardrobeView.as_view(), name='add-to-wardrobe')
]
