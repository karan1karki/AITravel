from crewai import Crew, Process
from .agents import AiRestaurantsAgents
from .tasks import AiRestaurantsTasks
import json

# llm = "ollama/mistral"


# agents = AiRestaurantsAgents(llm=llm)
# tasks = AiRestaurnatsTasks()

# restaurants_criteria_agent = agents.restaurants_criteria_agent()
# extract_restaurants_criteria_task = tasks.extract_restaurants_criteria_task(
#     criteria="I love fast flights, and I love fast food",
#     agent=restaurants_criteria_agent,
# )


# restaurants_agent = agents.restaurants_agent()
# restaurants_task = tasks.restaurants_task(
#     city="TOKYO", agent=restaurants_agent)


# crew = Crew(
#     agents=[restaurants_criteria_agent, restaurants_agent],
#     tasks=[extract_restaurants_criteria_task, restaurants_task],
#     process=Process.sequential,
# )

# crew_output = crew.kickoff()

# print("*********    start    ********")
# print(crew_output)
# print("*********    end      **********")


def restaurants_crew(llm: str, criteria: str, destination_city: str) -> Crew:
    agents = AiRestaurantsAgents(llm=llm)
    tasks = AiRestaurantsTasks()

    restaurants_criteria_agent = agents.restaurants_criteria_agent()
    extract_restaurants_criteria_task = tasks.extract_restaurants_criteria_task(
        criteria=criteria,
        agent=restaurants_criteria_agent,
    )

    restaurants_agent = agents.restaurants_agent()
    restaurants_task = tasks.restaurants_task(
        city=destination_city, agent=restaurants_agent)

    crew = Crew(
        agents=[restaurants_criteria_agent, restaurants_agent],
        tasks=[extract_restaurants_criteria_task, restaurants_task],
        process=Process.sequential,
    )

    return crew
