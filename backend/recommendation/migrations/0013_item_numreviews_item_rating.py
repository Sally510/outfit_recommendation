# Generated by Django 4.1.7 on 2023-06-16 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommendation', '0012_review'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='numReviews',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='item',
            name='rating',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True),
        ),
    ]
