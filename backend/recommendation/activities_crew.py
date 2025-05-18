from crewai import Crew, Process

from .agents import AiActivitiesAgents
from .tasks import AiActivitiesTasks
import json

# llm = "ollama/mistral"

# agents = AiActivitiesAgents(llm=llm)
# tasks = AiActivitiesTasks()

# activities_criteria_agent = agents.activities_criteria_agent()
# extract_activities_criteria_task = tasks.extract_activities_criteria_task(
#     criteria="I love fast flights. I love going to parks and museums",
#     agent=activities_criteria_agent,
# )


# activities_agent = agents.activities_agent()
# activities_task = tasks.activities_task(
#     city="TOKYO", agent=activities_agent
# )


# crew = Crew(
#     agents=[activities_criteria_agent, activities_agent],
#     tasks=[extract_activities_criteria_task, activities_task],
#     process=Process.sequential
# )


# crew_output = crew.kickoff()

# print("*********    start    ********")
# print(crew_output)
# print("*********    end      **********")

def activities_crew(llm: str, criteria: str, destination_city: str) -> Crew:
    agents = AiActivitiesAgents(llm=llm)
    tasks = AiActivitiesTasks()

    activities_criteria_agent = agents.activities_criteria_agent()
    extract_activities_criteria_task = tasks.extract_activities_criteria_task(
        criteria=criteria,
        agent=activities_criteria_agent,
    )

    activities_agent = agents.activities_agent()
    activities_task = tasks.activities_task(
        city=destination_city, agent=activities_agent
    )

    crew = Crew(
        agents=[activities_criteria_agent, activities_agent],
        tasks=[extract_activities_criteria_task, activities_task],
        process=Process.sequential
    )
    return crew
