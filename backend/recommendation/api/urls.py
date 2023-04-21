from django.urls import path
from .views import ItemListView

urlpatterns = [
    path('recommendation/', ItemListView.as_view(), name='recommendation')
]
