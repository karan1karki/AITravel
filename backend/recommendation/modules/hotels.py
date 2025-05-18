from .access_token import get_access_token
import requests


def get_hotels(city_iata: str):
    token = get_access_token()
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(
        f"https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode={city_iata}&radius=5&radiusUnit=KM&hotelSource=ALL",
        headers=headers,
    )

    data = response.json().get("data")
    hotels = []
    for i in data:
        hotel = {
            "name": i.get("name"),
            "hotelId": i.get("hotelId"),
            "latitude": i.get("geoCode").get("latitude"),
            "longitude": i.get("geoCode").get("longitude"),
        }

        hotels.append(hotel)
        
        if len(hotels) == 10:
            break

    return hotels