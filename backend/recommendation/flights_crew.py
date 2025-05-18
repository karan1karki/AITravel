from crewai import Crew, Process
from .agents import AiFlightsAgents
from .tasks import AiFlightsTasks
import json


# llm = "ollama/mistral"

# agents = AiFlightsAgents(llm=llm)
# tasks = AiFlightsTasks()

# flights_preferences_extractor_agent = agents.flights_criteria_agent()
# flights_preferences_extractor_task = tasks.extract_flights_criteria_task(
#     criteria="I love flights that don't take much time to arrive to destination. I love indian food.",
#     agent=flights_preferences_extractor_agent,
# )

# flights_agent = agents.flights_agent()
# flights_task = tasks.flights_task(
#     agent=flights_agent,
#     city_origin="PARIS",
#     city_destination="LONDON",
#     departure_date="2024-09-26",
#     return_date="2024-09-30",
#     adults=1,
# )


# crew = Crew(
#     agents=[flights_preferences_extractor_agent, flights_agent],
#     tasks=[flights_preferences_extractor_task, flights_task],
#     process=Process.sequential,
# )

# crew_output = crew.kickoff()

# print("*********    start    ********")
# print(crew_output)
# print("*********    end      **********")


# data = json.loads(str(crew_output))

# print(data)

# # Accessing specific values
# print("One Way:", data['flight']['oneWay'])
# print("Departure:", data['flight']['departure'])
# print("Arrival:", data['flight']['arrival'])
# print("Price Currency:", data['flight']['price']['currency'])
# print("Total Price:", data['flight']['price']['total'])


def flights_crew(llm: str, criteria: str, city_origin: str, city_destination: str, departure_date: str, return_date: str, adults: int) -> Crew:

    agents = AiFlightsAgents(llm=llm)
    tasks = AiFlightsTasks()

    flights_preferences_extractor_agent = agents.flights_criteria_agent()
    flights_preferences_extractor_task = tasks.extract_flights_criteria_task(
        criteria=criteria,
        agent=flights_preferences_extractor_agent,
    )

    flights_agent = agents.flights_agent()
    flights_task = tasks.flights_task(
        agent=flights_agent,
        city_origin=city_origin,
        city_destination=city_destination,
        departure_date=departure_date,
        return_date=return_date,
        adults=adults,
    )

    crew = Crew(
        agents=[flights_preferences_extractor_agent, flights_agent],
        tasks=[flights_preferences_extractor_task, flights_task],
        process=Process.sequential,
    )

    return crew
