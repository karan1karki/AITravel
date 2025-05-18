from rest_framework import serializers
from .models import Flight, Activity, Restaurant, TravelPlan


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ['id', 'one_way', 'departure', 'arrival', 'currency', 'price']


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'name', 'address', 'categories', 'travel_plans']


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'address', 'phone', 'website', 'travel_plans']


class TravelPlanSerializer(serializers.ModelSerializer):
    flight = FlightSerializer()
    activities = ActivitySerializer(many=True, read_only=True)
    restaurants = RestaurantSerializer(many=True, read_only=True)

    class Meta:
        model = TravelPlan
        fields = ['id', 'user', 'flight', 'rating', 'activities',
                  'restaurants', 'origin_city', 'destination_city']


class TravelPlanSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelPlan
        fields = ['id', 'rating', 'destination_city']
