from django.http import JsonResponse
from .models import Table

def getData(request, count=0):
    counter = Table.objects.count()
    step = (counter // 10)
    if step < 10:
        step = 10
    table_objects = Table.objects.all()[count: count + step]
    json_responce = dict()
    json_responce['counter'] = counter
    for obj in table_objects:
        json_responce[obj.id] = dict({
            'title': obj.title,
            'date': obj.date,
            'number': obj.number,
            'distance': obj.distance
        })
    return JsonResponse(json_responce)
