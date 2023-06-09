from rest_framework import serializers
from recommendation.models import Item

class ItemSericalizer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = (
            'id',
            'product_display_name',
            'gender',
            'master_category',
            'sub_category',
            'base_colour',
            'season',
            'usage',
            'image'
        )
