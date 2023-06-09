import csv
from recommendation.models import Item
from django.core.files import File

with open('C:/Users/64506/Downloads/styles.csv') as f:
    reader = csv.reader(f)
    next(reader)  # Skip first line 
    for row in reader:
        id = row[0]
        print(id)
        gender = row[1]
        master_category = row[2]
        sub_category = row[3] 
        base_colour = row[4]
        season = row[5]
        usage =  row[6]
        product_display_name = row[7]
        image = f'http://localhost:8000/images/{id}.jpg'
       
        item = Item.objects.create(
            id=id,
            gender=gender, 
            master_category=master_category,
            sub_category=sub_category,
            base_colour=base_colour,
            season=season,
            usage=usage,
            product_display_name=product_display_name,
            image=image
        )
        
        