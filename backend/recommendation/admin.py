from django.contrib import admin
from .models import CartItem
from .models import HistoryItem
from .models import Item
# Register your models here.

admin.site.register(Item)
admin.site.register(CartItem)
admin.site.register(HistoryItem)