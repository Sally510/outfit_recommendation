from rest_framework import serializers
from recommendation.models import Item

class ItemSericalizer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = (
            'id',
            'productDisplayName',
            'gender',
            'masterCategory',
            'subCategory',
            'baseColour',
            'season',
            'usage',
            'image'
        )