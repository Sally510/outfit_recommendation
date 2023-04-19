from django.db import models

class Item(models.Model):
    id = models.IntegerField()
    productDisplayName = models.CharField(max_length=100)
    gender = models.CharField(max_length=50)
    masterCategory = models.CharField(max_length=50)
    subCategory = models.CharField(max_length=50)
    subCategory = models.CharField(max_length=50)
    baseColour = models.CharField(max_length=50)
    season = models.CharField(max_length=20)
    usage = models.CharField(max_length=20)
    image = models.ImageField()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("core:product", kwargs={
            'slug': self.slug
        })

    def get_add_to_cart_url(self):
        return reverse("core:add-to-cart", kwargs={
            'slug': self.slug
        })

    def get_remove_from_cart_url(self):
        return reverse("core:remove-from-cart", kwargs={
            'slug': self.slug
        })
