from crewai import Agent
from textwrap import dedent


class AiFlightsAgents:
    def __init__(self, llm) -> None:
        self.llm = llm

    def flights_criteria_agent(self):
        return Agent(
            role="Flight Preferences Extractor",
            goal="Identify and extract flight preferences from a user description.",
            backstory=dedent(
                "You are a specialist in extracting information from user descriptions. "
                "Your task is to read descriptions and accurately identify the user's flight preferences."
            ),
            verbose=True,
            llm=self.llm,
        )

    def flights_agent(self):
        return Agent(
            role="Flights Selector",
            goal="Conduct a comprehensive research on the available flights and return result in JSON format",
            backstory=dedent(
                """You are a researcher specialist that search flights and choose the best one"""
            ),
            verbose=True,
            llm=self.llm,
        )

    # def flight_json(self):
    #     return Agent(
    #         role="Data Processor",
    #         goal="Process flight data and save it as a valid JSON file without backticks.",
    #         backstory="You specialize in efficiently handling and processing JSON data, ensuring all invalid characters are removed, "
    #         "the structure includes a top-level object named 'flight,' and the output is suitable for HTTP requests. That means I shouldn't get your comments on the result return only the json result",
    #         verbose=True,
    #         memory=False,
    #         llm=self.llm,
    #     )


class AiRestaurantsAgents:
    def __init__(self, llm) -> None:
        self.llm = llm

    def restaurants_criteria_agent(self):
        return Agent(
            role="Dining Preferences Extractor",
            goal="Identify and extract user preferences for dining, including cuisine types and dietary restrictions, from descriptions.",
            backstory=dedent(
                "You are a specialist in extracting dining preferences from user descriptions. "
                "Your task is to read these descriptions and accurately identify the user's restaurant choices, preferred cuisines, and any dietary restrictions."
            ),
            verbose=True,
            llm=self.llm,
        )

    def restaurants_agent(self):
        return Agent(
            role="Restaurants Selector",
            goal="Conduct a comprehensive research on the available restaurants and dining options and return results in JSON format",
            backstory=dedent(
                """You are a researcher specialist that search restaurants and choose the best ones"""
            ),
            verbose=True,
            llm=self.llm,
        )

    # def restaurants_json(self):
    #     return Agent(
    #         role="Data Processor",
    #         goal="Process restaurants data and save it as a valid JSON file without backticks.",
    #         backstory="You specialize in efficiently handling and processing JSON data, ensuring all invalid characters are removed, "
    #         "the structure includes a top-level object named 'restaurants,' and the output is suitable for HTTP requests. That means I shouldn't get your comments on the result return only the json result",
    #         verbose=True,
    #         memory=False,
    #         llm=self.llm,
    #     )


class AiActivitiesAgents:
    def __init__(self, llm) -> None:
        self.llm = llm

    def activities_criteria_agent(self):
        return Agent(
            role="Activities Preferences Extractor",
            goal="Extract and summarize specific user preferences for travel activities from their descriptions.",
            backstory=dedent(
                """
                You are an expert at analyzing user-provided travel descriptions to extract preferences for activities. 
                Your role is to read and interpret user descriptions carefully, focusing on identifying their preferred 
                types of activities, such as sightseeing, outdoor adventures, cultural experiences, or relaxation.
                Your output should be concise and directly related to the activities.
                """
            ),
            verbose=True,
            llm=self.llm,
        )

    def activities_agent(self):
        return Agent(
            role="Activities Selector",
            goal="Research and select the top 10 activities based on user preferences and available options and return results in json format",
            backstory=dedent(
                """
                You are a seasoned researcher specializing in finding and selecting the best activities for travelers. 
                Your role is to analyze the available activities in a destination and carefully choose the top 10 
                that align with the user's preferences, or select popular options if no specific preferences are provided.
                Ensure your selections are diverse and cater to different interests.
                """
            ),
            verbose=True,
            llm=self.llm,
        )


    # def activities_json(self):
    #     return Agent(
    #         role="Data Processor",
    #         goal="Process activities data and save it as a valid JSON file without backticks.",
    #         backstory="You specialize in efficiently handling and processing JSON data, ensuring all invalid characters are removed, "
    #         "the structure includes a top-level object named 'activities,' and the output is suitable for HTTP requests. That means I shouldn't get your comments on the result return only the json result",
    #         verbose=True,
    #         memory=False,
    #         llm=self.llm,
    #     )
