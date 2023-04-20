# Generated by Django 4.1.7 on 2023-04-20 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('productDisplayName', models.CharField(max_length=100)),
                ('gender', models.CharField(max_length=50)),
                ('masterCategory', models.CharField(max_length=50)),
                ('subCategory', models.CharField(max_length=50)),
                ('baseColour', models.CharField(max_length=50)),
                ('season', models.CharField(max_length=20)),
                ('usage', models.CharField(max_length=20)),
                ('image', models.ImageField(upload_to='')),
            ],
        ),
    ]
