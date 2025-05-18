from django.db import models
from django.contrib.auth import get_user_model
import uuid

CustomUser = get_user_model()


class Flight(models.Model):
    one_way = models.BooleanField()
    departure = models.DateTimeField()
    arrival = models.DateTimeField()
    currency = models.CharField(max_length=5)
    price = models.DecimalField(max_digits=10, decimal_places=2)


class Activity(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=500)
    categories = models.CharField(max_length=500)
    travel_plans = models.ManyToManyField(
        'TravelPlan', related_name="activities"
    )


class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    website = models.CharField(max_length=255)
    travel_plans = models.ManyToManyField(
        'TravelPlan', related_name="restaurants"
    )


class TravelPlan(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="travel_plans"
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    flight = models.ForeignKey(
        Flight, on_delete=models.CASCADE, related_name='travel_plans'
    )
    rating = models.FloatField(default=None, null=True)
    origin_city = models.CharField(max_length=255)
    destination_city = models.CharField(max_length=255)
