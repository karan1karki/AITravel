from django.contrib import admin
from .models import TravelPlan, Flight, Restaurant, Activity
# Register your models here.

admin.site.register(TravelPlan)
admin.site.register(Flight)
admin.site.register(Restaurant)
admin.site.register(Activity)
