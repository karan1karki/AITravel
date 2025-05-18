from .activities_crew import activities_crew
from .flights_crew import flights_crew
from .restaurants_crew import restaurants_crew
import json


llm: str = "ollama/llama3"


def execute_crews(criteria: str, city_origin: str, city_destination: str, departure_date: str, return_date: str, adults: int):
    flights_crew_result = flights_crew(
        llm=llm, criteria=criteria, city_origin=city_origin,
        city_destination=city_destination, departure_date=departure_date,
        return_date=return_date, adults=adults).kickoff()

    activities_crew_result = activities_crew(
        llm=llm, criteria=criteria, destination_city=city_destination).kickoff()

    restaurants_crew_result = restaurants_crew(
        llm=llm, criteria=criteria, destination_city=city_destination).kickoff()

    # Extract actual string outputs from CrewOutput
    flights_output = flights_crew_result.output if hasattr(flights_crew_result, "output") else str(flights_crew_result)
    activities_output = activities_crew_result.output if hasattr(activities_crew_result, "output") else str(activities_crew_result)
    restaurants_output = restaurants_crew_result.output if hasattr(restaurants_crew_result, "output") else str(restaurants_crew_result)

    try:
        flight_data = json.loads(flights_output)
        activities_data = json.loads(activities_output)
        restaurants_data = json.loads(restaurants_output)
    except json.JSONDecodeError as e:
        print("JSON decode failed. Debug info:")
        print("Flights:", flights_output)
        print("Activities:", activities_output)
        print("Restaurants:", restaurants_output)
        raise e

    return flight_data, activities_data, restaurants_data
