# Generated by Django 4.2 on 2023-04-23 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommendation', '0006_cartitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
