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
    
class HistoryItem(models.Model):    
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    upload_image = models.CharField(max_length=100, null=True)
    def __str__(self):
        return self.user.name
    
class Review(models.Model):
    product = models.ForeignKey(Item,on_delete=models.SET_NULL,null=True)
    user = models.ForeignKey(UserAccount,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=200,null=True,blank=True)
    rating =  models.IntegerField(null=True,blank=True,default=0)
    comment = models.TextField(null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id =  models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.rating)    
