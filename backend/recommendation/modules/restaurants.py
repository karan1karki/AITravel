import requests
from .iata_code import get_geocode_and_iata
import os


def get_restaurants_by_city(city: str):
    try:
        geocode_data = get_geocode_and_iata(city=city)
        if not geocode_data:
            raise ValueError("Geocode data not found.")

        iataCode, latitude, longitude = geocode_data.values()
        api_key = os.getenv("hotel_api_key")
        if not api_key:
            raise EnvironmentError("API key not found in environment variables.")

        response = requests.get(
            f"https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:{longitude},{latitude},10000&limit=20&apiKey={api_key}"
        )


        response.raise_for_status()

        res = response.json()
        features = res.get("features", [])

        restaurants = []
        for restaurant in features:
            properties = restaurant.get("properties", {})
            data = {
                "name": properties.get("name", "Not Available"),
                "address": properties.get("formatted", "Not Available"),
                "website": properties.get("website", "Not Available"),
                "phone": properties.get("contact").get("phone", "Not Available"),
                "email": properties.get("contact").get("email", "Not Available"),
            }
            restaurants.append(data)

        return restaurants

    except requests.RequestException as e:
        print(f"Request error: {e}")
    except ValueError as ve:
        print(f"Value error: {ve}")
    except EnvironmentError as ee:
        print(f"Environment error: {ee}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

    return []