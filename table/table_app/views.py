from django.http import JsonResponse
from .models import Table


def add_table_objects_in_dict(json_responce, table_objects):
    for obj in table_objects:
        json_responce[obj.id] = dict({
            'title': obj.title,
            'date': obj.date,
            'number': obj.number,
            'distance': obj.distance
        })


def get_step(counter):
    step = (counter // 10)
    if step < 10:
        return 10
    return step


def make_dict(filter_param):
    list_param = filter_param.split('=')
    return dict({list_param[0]: list_param[1]})


def get_data(request, filter_param="", count=0, order_by=""):
    if filter_param != "":
        table_objects = Table.objects.filter(**(make_dict(filter_param)))
    else:
        table_objects = Table.objects.all()
    counter = table_objects.count()
    json_responce = dict()

    json_responce['counter'] = counter
    if order_by != "":
        table_objects = table_objects.order_by(order_by)
    table_objects = table_objects[count: count + get_step(counter)]
    add_table_objects_in_dict(json_responce, table_objects)
    return JsonResponse(json_responce)
