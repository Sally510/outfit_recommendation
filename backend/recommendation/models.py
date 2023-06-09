from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from accounts.models import UserAccount

class Item(models.Model):
    id = models.IntegerField(primary_key=True)
    product_display_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=50)
    master_category = models.CharField(max_length=50)
    sub_category = models.CharField(max_length=50)
    base_colour = models.CharField(max_length=50)
    season = models.CharField(max_length=20)
    usage = models.CharField(max_length=20)
    image = models.CharField(max_length=100, null=True)
    def __str__(self):
        return self.product_display_name
    
class CartItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('item', 'user',)
    def __str__(self):
        return self.item.product_display_name
    
