from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from accounts.models import UserAccount

class Item(models.Model):
    id = models.IntegerField(primary_key=True)
    productDisplayName = models.CharField(max_length=100)
    gender = models.CharField(max_length=50)
    masterCategory = models.CharField(max_length=50)
    subCategory = models.CharField(max_length=50)
    baseColour = models.CharField(max_length=50)
    season = models.CharField(max_length=20)
    usage = models.CharField(max_length=20)
    # image = models.ImageField(upload_to='images')
    image = models.CharField(max_length=100, null=True)
    def __str__(self):
        return self.productDisplayName


    
class OrderItem(models.Model):
    user = models.ForeignKey(UserAccount,
                             on_delete=models.CASCADE)
    items = models.ManyToManyField(Item)
    ordered = models.BooleanField(default=False)

    def __str__(self):
        return self.user.name
    
