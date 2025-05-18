from .iata_code import get_geocode_and_iata
from .access_token import get_access_token
import requests


def get_flights_by_city(
    city_origin: str,
    city_destination: str,
    departure_date: str,
    return_date: str,
    adults: int,
):
    origin = get_geocode_and_iata(city=city_origin)
    destination = get_geocode_and_iata(city=city_destination)

    iata_code_origin = origin["iataCode"]

    iata_code_destination = destination["iataCode"]

    token = get_access_token()
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(
        f"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode={iata_code_origin}&destinationLocationCode={iata_code_destination}&departureDate={departure_date}&returnDate={return_date}&adults={adults}&max=5",
        headers=headers,
    )

    res = response.json()
    data = res["data"]

    flights = []
    i = 0
    while i < len(data):
        flight_data = data[i]
        element = {
            "one Way": "Yes" if flight_data["oneWay"] == "true" else "No",
            "departure": flight_data["itineraries"][0]["segments"][0]["departure"][
                "at"
            ],
            "arrival": flight_data["itineraries"][0]["segments"][-1]["arrival"]["at"],
            "price": {
                "currency": flight_data["price"]["currency"],
                "total": flight_data["price"]["total"],
            },
        }
        flights.append(element)

        i += 1

    return flights