from django.urls import path
from .views import generate_plan, get_travel_plans, get_travel_plan, update_rating

urlpatterns = [
    path("generate-plan/", generate_plan, name="recommendation"),
    path("travel-plans/", get_travel_plans, name="get_travel_plans"),
    path("travel-plans/<uuid:id>/", get_travel_plan, name="get_travel_plan_by_id"),
    path("travel-plans/<uuid:id>/update-rating/", update_rating, name="update_rating"),

]
