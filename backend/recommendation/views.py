from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
import json
from .all_crews import execute_crews
from .models import Flight, TravelPlan, Restaurant, Activity
from datetime import datetime
from django.utils import timezone
from .serializers import TravelPlanSerializer, TravelPlanSummarySerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def generate_plan(request):
    user = request.user
    data = json.loads(request.body)
    origin = data.get("origin").upper()
    destination = data.get("destination").upper()
    budget = data.get("budget")
    adults = data.get("adults")
    departure = data.get("departure")
    return_date = data.get("arrival")
    criteria = data.get("criteria")

    crew_executions = execute_crews(
        criteria=criteria, city_origin=origin, city_destination=destination, departure_date=departure, return_date=return_date, adults=adults)

    flight_data, activities_data, restaurants_data = crew_executions[
        0], crew_executions[1], crew_executions[2]

    one_way_key = "one Way" if "one Way" in flight_data["flight"] else "oneWay"

    departure_datetime = timezone.make_aware(datetime.strptime(
        flight_data["flight"]["departure"], '%Y-%m-%dT%H:%M:%S'))
    arrival_datetime = timezone.make_aware(datetime.strptime(
        flight_data["flight"]["arrival"], "%Y-%m-%dT%H:%M:%S"))

    flight, created = Flight.objects.get_or_create(
        one_way=False if flight_data["flight"][one_way_key].strip(
        ).lower() == "no" else True,
        departure=departure_datetime,
        arrival=arrival_datetime,
        currency=flight_data['flight']['price']['currency'],
        price=float(flight_data['flight']['price']['total'])
    )

    # Create TravelPlan
    new_travel_plan = TravelPlan.objects.create(
        user=user,
        flight=flight,
        origin_city=origin,
        destination_city=destination
    )

    # Prepare Activities
    for activity in activities_data["activities"]:
        full_categories = ",".join(activity["categories"])

        # Check if the Activity already exists
        activity_obj, created = Activity.objects.get_or_create(
            name=activity["name"],
            address=activity["address"],
            categories=full_categories
        )

        # Associate the Activity with the TravelPlan
        new_travel_plan.activities.add(activity_obj)

    # Prepare Restaurants
    for restaurant in restaurants_data["restaurants"]:
        # Check if the Restaurant already exists
        restaurant_obj, created = Restaurant.objects.get_or_create(
            name=restaurant["name"],
            address=restaurant["address"],
            phone=restaurant["phone"],
            website=restaurant["website"],
        )

        # Associate the Restaurant with the TravelPlan
        new_travel_plan.restaurants.add(restaurant_obj)

    return Response({"message": "Travel plan created successfully"}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_travel_plans(request):
    user = request.user

    travel_plans = TravelPlan.objects.filter(user=user)

    serializer = TravelPlanSummarySerializer(travel_plans, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_travel_plan(request, id):
    user = request.user
    try:
        travel_plan = TravelPlan.objects.get(user=user, id=id)
    except TravelPlan.DoesNotExist:
        return Response({"error": "Travel plan not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = TravelPlanSerializer(travel_plan)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["PATCH"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_rating(request, id):
    user = request.user
    data = json.loads(request.body)
    rating = data.get("rating")
    print(rating)

    if rating is None:
        return Response({"error": "Rating is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        travel_plan = TravelPlan.objects.get(user=user, id=id)  
        travel_plan.rating = rating
        travel_plan.save()  
        return Response({"message": "Rating saved successfully"}, status=status.HTTP_200_OK)
    except TravelPlan.DoesNotExist:
        return Response({"error": "Travel plan not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





















    # one_way_key = "one Way" if "one Way" in flight_data["flight"] else "oneWay"

    # new_flight = Flight.objects.create(
    #     one_way=False if flight_data["flight"][one_way_key].strip(
    #     ).lower() == "no" else True,
    #     departure=timezone.make_aware(datetime.strptime(
    #         flight_data["flight"]["departure"], '%Y-%m-%dT%H:%M:%S')),
    #     arrival=timezone.make_aware(datetime.strptime(
    #         flight_data["flight"]["arrival"], "%Y-%m-%dT%H:%M:%S")),
    #     currency=flight_data['flight']['price']['currency'],
    #     price=float(flight_data['flight']['price']['total'])
    # )

    # new_travel_plan = TravelPlan.objects.create(
    #     user=user,
    #     flight=new_flight,
    # )

    # for activity in activities_data["activities"]:
    #     full_categories = ""
    #     for category in activity["categories"]:
    #         full_categories += category + ","

    #     new_activity = Activity.objects.create(
    #         name=activity["name"],
    #         address=activity["address"],
    #         categories=full_categories

    #     )

    #     new_travel_plan.activities.add(new_activity)

    # for restaurant in restaurants_data["restaurants"]:
    #     new_restaurant = Restaurant.objects.create(
    #         name=restaurant["name"],
    #         address=restaurant["address"],
    #         phone=restaurant["phone"],
    #         website=restaurant["website"],
    #     )

    #     new_travel_plan.restaurants.add(new_restaurant)
