from django.http import  JsonResponse
from .models import Table

# Create your views here.
def getData(request, count=0, step=10):
    table_objects = Table.objects.all()[count: count+step]
    json_responce = dict()
    json_responce['counter'] = Table.objects.count()
    json_responce['data'] = dict()
    for obj in table_objects:
        json_responce['data'][obj.id] = dict({
            'title': obj.title,
            'date': obj.date,
            'number': obj.number,
            'distance': obj.distance
        })
    return JsonResponse(json_responce)
