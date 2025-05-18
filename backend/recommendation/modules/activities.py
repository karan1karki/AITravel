import requests
from .access_token import get_access_token
from .iata_code import get_geocode_and_iata
import os


def get_activities(city: str):
    geocode_data = get_geocode_and_iata(city=city)
    latitude, longitude = geocode_data['latitude'], geocode_data['longitude']

    token = get_access_token()
    headers = {"Authorization": f"Bearer {token}"}

    url = f"https://api.geoapify.com/v2/places?categories=entertainment.culture,entertainment.zoo,entertainment.aquarium,entertainment.planetarium,entertainment.museum,entertainment.cinema&filter=circle:{
        longitude},{latitude},10000&limit=20&apiKey={os.getenv("hotel_api_key")}"
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        raise Exception(f"Error: Received status code {response.status_code}")

    result = response.json()

    if 'features' not in result:
        raise Exception("Error: 'features' key not found in response")

    activities = []

    for res in result['features']:
        properties = res["properties"]

        if properties:
            data = {
                "name": properties.get("name", "Unknown Activity"),
                "address": properties.get("formatted"),
                "categories": properties.get("categories")
            }
            activities.append(data)

    return activities