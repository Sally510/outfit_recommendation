from rest_framework import serializers
from recommendation.models import Item
from recommendation.models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ItemSericalizer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only= True)
    class Meta:
        model = Item
        # fields = (
        #     'id',
        #     'product_display_name',
        #     'gender',
        #     'master_category',
        #     'sub_category',
        #     'base_colour',
        #     'season',
        #     'usage',
        #     'image'
        # )
        fields = '__all__'
    
    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews,many=True)
        return serializer.data


