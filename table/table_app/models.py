from django.db import models


class Table(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField(auto_now=False)
    number = models.FloatField()
    distance = models.FloatField()

    def __str__(self):
        return f"{self.pk}  {self.title}"
