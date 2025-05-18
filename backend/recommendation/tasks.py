# # from crewai import Task, Agent
# # from textwrap import dedent
# # from final_test_ai_travel_app.modules.flights import get_flights_by_city
# # from final_test_ai_travel_app.modules.restaurants import get_restaurants_by_city
# # from final_test_ai_travel_app.modules.activities import get_activities


# # class AiFlightsTasks:
# #     def __init__(self) -> None:
# #         pass

# #     def extract_flights_criteria_task(self, criteria: str, agent: Agent):
# #         return Task(
# #             description=dedent(
# #                 f"""
# #                 You will receive a text representing the user's preferences for a travel plan, which will be used to generate their plan.
# #                 Your task is to extract the section of the preferences related to flight options.

# #                 Criteria: {criteria}.

# #                 If no specific flight preferences are mentioned, return: "the best possible".
# #                 And make the response as short as possible.
# #                 """
# #             ),
# #             expected_output=dedent(
# #                 "A summary of the user's flight preferences in text format."
# #             ),
# #             agent=agent,
# #         )

# #     def flights_task(
# #         self,
# #         city_origin: str,
# #         city_destination: str,
# #         departure_date: str,
# #         return_date: str,
# #         adults: int,
# #         agent: Agent,
# #     ):

# #         flights = get_flights_by_city(
# #             city_origin=city_origin,
# #             city_destination=city_destination,
# #             departure_date=departure_date,
# #             return_date=return_date,
# #             adults=adults,
# #         )

# #         return Task(
# #             description=dedent(
# #                 f"""
# #         You will be given a list of available flights in JSON format from a location to a destination. Select one based on the criteria described here. The list of flights in JSON format: {flights}. Return only a dictionary with the super-key 'flight' containing the selected flight JSON object.
# #         """
# #             ),
# #             expected_output=dedent(
# #                 """Only a dictionary object representing the selected flight, no need for your comments on the result or explanations on the selected result.
# #                 And make sure it is in valid format.
# #                 Example of the expected response:{
# #     "flight": {
# #         "oneWay": "No",
# #         "departure": "2024-09-24T17:10:00",
# #         "arrival": "2024-09-25T09:00:00",
# #         "price": { "currency": "EUR", "total": "230.32" }
# #     }
# # }
# # """
# #             ),
# #             output_file="flight.json",
# #             agent=agent,
# #         )


# # class AiRestaurnatsTasks:
# #     def __init__(self) -> None:
# #         pass

# #     def extract_restaurants_criteria_task(self, criteria: str, agent: Agent):
# #         return Task(
# #             description=dedent(
# #                 f"""
# #                 You will receive a text representing the user's preferences for a travel plan, which will be used to generate their plan.
# #                 Your task is to extract the section of the preferences related to restaurants and dining options.

# #                 Criteria: {criteria}.

# #                 If no specific flight preferences are mentioned, return: "the best possible".
# #                 And make the response as short as possible.
# #                 """
# #             ),
# #             expected_output=dedent(
# #                 "A summary of the user's restaurants and dining preferences in text format."
# #             ),
# #             agent=agent,
# #         )

# #     def restaurants_task(self, city: str, agent: Agent):

# #         restaurants = get_restaurants_by_city(city=city)

# #         return Task(
# #             description=dedent(
# #                 f"""
# #                 You will be give a list of available restaurnats in json format, I want you to select one based on the criteria described here.
# #                 the list of restaurants in json format : {restaurants}.
# #                 Return only a dictionary with the super-key 'restaurants' containing the selected restaurants JSON object. And make sure it is in valid format.
# #             """
# #             ),
# #             expected_output=dedent(
# #                 """Only a dictionary object representing the three selected restaurants, no need for your comments on the result or explanations on the selected result.
# #                     Example of the expected response:{
# #                     "restaurants": [
# #                                 {
# #                             "name": "Le Cochon à l'Oreille",
# #                             "address": "Le Cochon à l'Oreille, 15 Rue Montmartre, 75001 Paris, France",
# #                             "website": "https://www.lecochonaloreille.fr",
# #                             "phone": "+33 1 40 15 98 24"
# #                         },
# #                         {
# #                             "name": "McDonald's",
# #                             "address": "Multiple locations in Paris, France",
# #                             "website": "https://www.mcdonalds.com/fr-FR.html",
# #                             "phone": "Not Available"
# #                         },
# #                         {
# #                             "name": "Burger King",
# #                             "address": "Multiple locations in Paris, France",
# #                             "website": "https://www.burgerking.fr/",
# #                             "phone": "Not Available"
# #                         }
# #                     ]
# #                 }

# #                 """
# #             ),
# #             output_file="restaurants.json",
# #             agent=agent,
# #         )


# # class AiActivitiesTasks:
# #     def __init__(self) -> None:
# #         pass

# #     def extract_activities_criteria_task(self, criteria: str, agent: Agent) -> Task:
# #         """
# #         Create a task for extracting specific activity preferences from user criteria.

# #         Args:
# #             criteria (str): User's travel activity preferences.
# #             agent (Agent): The agent responsible for handling the task.

# #         Returns:
# #             Task: A task object that describes the activity extraction criteria.
# #         """
# #         return Task(
# #             description=dedent(
# #                 f"""
# #                 You will receive a user's preferences for a travel plan.
# #                 Your task is to identify the part of these preferences that specifically relates to travel activities,
# #                 such as sightseeing, outdoor adventures, or cultural experiences.

# #                 Criteria: {criteria}.

# #                 If no specific activity preferences are provided, return:
# #                 "No specific preferences, suggest popular or recommended activities."

# #                 Ensure your response is concise and solely focused on activity preferences.
# #                 """
# #             ),
# #             expected_output="A concise summary of the user's activity preferences.",
# #             agent=agent,
# #         )

# #     def activities_task(self, city: str, agent: Agent) -> Task:
# #         """
# #         Create a task for selecting travel activities based on user preferences.

# #         Args:
# #             city (str): The city for which to fetch activities.
# #             agent (Agent): The agent responsible for handling the task.

# #         Returns:
# #             Task: A task object containing the top activities for the specified city.
# #         """
# #         activities = get_activities(city=city)

# #         # Handle the case where no activities are available
# #         if not activities:
# #             activities = [{"name": "No activities available",
# #                            "description": "", "pictures": ""}]

# #         return Task(
# #             description=dedent(f"""
# #             You will receive a list of available travel activities in JSON format.
# #             Your task is to select and return the top 10 activities that best match the user's preferences.

# #             First, focus on selecting activities that closely align with the user's preferences (if provided).
# #             If there are fewer than 10 activities matching the preferences, complete the list by selecting the highest-rated
# #             or most diverse remaining activities to ensure the list contains exactly 10 activities.

# #             Ensure that your final selection provides a diverse range of activities if no specific preferences are provided.

# #             Here is the list of activities in JSON format: {activities}.

# #             Please return a JSON object containing exactly 10 "activities", with no additional comments or explanations.
# #             """),
# #             expected_output=dedent("""\
# #             A Dictionary Object of the selected activities, named "activities" without any comments.
# #             Example Output:
# #             {
# #                 "activities": [
# #                     {
# #                         "name": "Activity 1",
# #                         "description": "Description 1",
# #                         "pictures": "Link 1"
# #                     },
# #                     {
# #                         "name": "Activity 2",
# #                         "description": "Description 2",
# #                         "pictures": "Link 2"
# #                     },
# #                     ...
# #                     {
# #                         "name": "Activity 10",
# #                         "description": "Description 10",
# #                         "pictures": "Link 10"
# #                     }
# #                 ]
# #             }
# #             """),
# #             output_file="activities.json",
# #             agent=agent,
# #         )

# from crewai import Task, Agent
# from textwrap import dedent
# from final_test_ai_travel_app.modules.flights import get_flights_by_city
# from final_test_ai_travel_app.modules.restaurants import get_restaurants_by_city
# from final_test_ai_travel_app.modules.activities import get_activities


# class AiFlightsTasks:
#     def __init__(self) -> None:
#         pass

#     def extract_flights_criteria_task(self, criteria: str, agent: Agent):
#         return Task(
#             description=dedent(
#                 f"""
#                 You will receive a user's travel plan preferences.
#                 Your task is to extract the flight-related criteria.

#                 Criteria: {criteria}.

#                 If no specific flight preferences are provided, return: "the best possible".
#                 Please keep your response concise.
#                 """
#             ),
#             expected_output="A summary of the user's flight preferences in text format.",
#             agent=agent,
#         )

#     def flights_task(
#         self,
#         city_origin: str,
#         city_destination: str,
#         departure_date: str,
#         return_date: str,
#         adults: int,
#         agent: Agent,
#     ):
#         flights = get_flights_by_city(
#             city_origin=city_origin,
#             city_destination=city_destination,
#             departure_date=departure_date,
#             return_date=return_date,
#             adults=adults,
#         )

#         return Task(
#             description=dedent(
#                 f"""
#                 You will receive a list of available flights in JSON format from {city_origin} to {city_destination}.
#                 Select one based on the provided criteria: {flights}.
#                 Return a dictionary with the key 'flight' containing the selected flight JSON object.
#                 """
#             ),
#             expected_output=dedent(
#                 """Only A dictionary representing the selected flight in valid JSON format. No need for your comments on the result or explanations on the selected result.
#                 Example output:
#                 {
#                     "flight": {
#                         "oneWay": "No",
#                         "departure": "2024-09-24T17:10:00",
#                         "arrival": "2024-09-25T09:00:00",
#                         "price": { "currency": "EUR", "total": "230.32" }
#                     }
#                 }
#                 """
#             ),
#             output_file="flight.json",
#             agent=agent,
#         )


# class AiRestaurantsTasks:
#     def __init__(self) -> None:
#         pass

#     def extract_restaurants_criteria_task(self, criteria: str, agent: Agent):
#         return Task(
#             description=dedent(
#                 f"""
#                 You will receive a user's travel plan preferences.
#                 Your task is to extract the restaurant-related criteria.

#                 Criteria: {criteria}.

#                 If no specific restaurant preferences are provided, return: "the best possible".
#                 Please keep your response concise.
#                 """
#             ),
#             expected_output="A summary of the user's restaurant and dining preferences in text format.",
#             agent=agent,
#         )

#     def restaurants_task(self, city: str, agent: Agent):
#         restaurants = get_restaurants_by_city(city=city)

#         return Task(
#             description=dedent(
#                 f"""
#                 You will receive a list of available restaurants in JSON format for {city}.
#                 Select three based on the provided criteria: {restaurants}.
#                 Return a dictionary with the key 'restaurants' containing the selected restaurant JSON objects.
#                 Ensure the output is in valid JSON format.
#                 """
#             ),
#             expected_output=dedent(
#                 """Only A dictionary object representing the selected restaurants in valid JSON format. No need for your comments on the result or explanations on the selected result.
#                 Example output:
#                 {
#                     "restaurants": [
#                         {
#                             "name": "Le Cochon à l'Oreille",
#                             "address": "15 Rue Montmartre, 75001 Paris, France",
#                             "website": "https://www.lecochonaloreille.fr",
#                             "phone": "+33 1 40 15 98 24"
#                         },
#                         {
#                             "name": "McDonald's",
#                             "address": "Multiple locations in Paris, France",
#                             "website": "https://www.mcdonalds.com/fr-FR.html",
#                             "phone": "Not Available"
#                         },
#                         {
#                             "name": "Burger King",
#                             "address": "Multiple locations in Paris, France",
#                             "website": "https://www.burgerking.fr/",
#                             "phone": "Not Available"
#                         }
#                     ]
#                 }
#                 """
#             ),
#             output_file="restaurants.json",
#             agent=agent,
#         )


# class AiActivitiesTasks:
#     def __init__(self) -> None:
#         pass

#     def extract_activities_criteria_task(self, criteria: str, agent: Agent) -> Task:
#         return Task(
#             description=dedent(
#                 f"""
#                 You will receive a user's travel plan preferences.
#                 Your task is to identify the criteria related to travel activities, such as sightseeing or outdoor adventures.

#                 Criteria: {criteria}.

#                 If no specific activity preferences are provided, return:
#                 "No specific preferences, suggest popular or recommended activities."

#                 Ensure your response is concise and focused on activity preferences.
#                 """
#             ),
#             expected_output="A concise summary of the user's activity preferences.",
#             agent=agent,
#         )

#     def activities_task(self, city: str, agent: Agent) -> Task:
#         activities = get_activities(city=city)

#         if not activities:
#             activities = [{"name": "No activities available",
#                            "description": "", "pictures": ""}]

#         return Task(
#             description=dedent(f"""
#             You will receive a list of available travel activities in JSON format for {city}.
#             Your task is to select and return the top 10 activities that align with the user's preferences.

#             First, prioritize activities that match the user's preferences (if provided).
#             If there are fewer than 10, complete the list with the highest-rated or most diverse remaining activities.

#             Here is the list of activities in JSON format: {activities}.

#             Please return a JSON object containing exactly 10 activities, without additional comments or explanations.
#             """),
#             expected_output=dedent("""\
#             Only A Dictionary Object of the selected activities, named "activities" without any comments. No need for your comments on the result or explanations on the selected result.
#             Example Output:
#             {
#                 "activities": [
#                     {"name": "Activity 1", "description": "Description 1", "pictures": "Link 1"},
#                     {"name": "Activity 2", "description": "Description 2", "pictures": "Link 2"},
#                     ...
#                     {"name": "Activity 10", "description": "Description 10", "pictures": "Link 10"}
#                 ]
#             }
#             """),
#             output_file="activities.json",
#             agent=agent,
#         )

from crewai import Task, Agent
from textwrap import dedent
from .modules.flights import get_flights_by_city
from .modules.restaurants import get_restaurants_by_city
from .modules.activities import get_activities


class AiFlightsTasks:
    def __init__(self) -> None:
        pass

    def extract_flights_criteria_task(self, criteria: str, agent: Agent):
        return Task(
            description=dedent(
                f"""
                You will receive a text representing the user's travel preferences.
                Your task is to extract the section related to flight options.

                Criteria: {criteria}.

                If no specific flight preferences are mentioned, return: "the best possible".
                Please keep your response concise.
                """
            ),
            expected_output="A summary of the user's flight preferences in text format.",
            agent=agent,
        )

    def flights_task(
        self,
        city_origin: str,
        city_destination: str,
        departure_date: str,
        return_date: str,
        adults: int,
        agent: Agent,
    ):
        flights = get_flights_by_city(
            city_origin=city_origin,
            city_destination=city_destination,
            departure_date=departure_date,
            return_date=return_date,
            adults=adults,
        )

        return Task(
            description=dedent(
                f"""
                You will receive a list of available flights in JSON format from {city_origin} to {city_destination}.
                Select one based on the given criteria.

                Available flights: {flights}.
                Return a dictionary with the key 'flight' containing the selected flight JSON object.
                """
            ),
            expected_output=dedent(
                """A dictionary object representing the selected flight, with no comments or explanations.
                Example response:
                {
                    "flight": {
                        "oneWay": "No",
                        "departure": "2024-09-24T17:10:00",
                        "arrival": "2024-09-25T09:00:00",
                        "price": { "currency": "EUR", "total": "230.32" }
                    }
                }
                """
            ),
            output_file="flight.json",
            agent=agent,
        )


class AiRestaurantsTasks:
    def __init__(self) -> None:
        pass

    def extract_restaurants_criteria_task(self, criteria: str, agent: Agent):
        return Task(
            description=dedent(
                f"""
                You will receive a text representing the user's preferences for dining options.
                Your task is to extract the section related to restaurants.

                Criteria: {criteria}.

                If no specific restaurant preferences are mentioned, return: "the best possible".
                Please keep your response concise.
                """
            ),
            expected_output="A summary of the user's restaurant preferences in text format.",
            agent=agent,
        )

    def restaurants_task(self, city: str, agent: Agent):
        restaurants = get_restaurants_by_city(city=city)

        return Task(
            description=dedent(
                f"""
                You will receive a list of available restaurants in JSON format.
                Please select one based on the provided criteria.

                Available restaurants: {restaurants}.
                Return a dictionary with the key 'restaurants' containing the selected restaurant JSON object.
                """
            ),
            expected_output=dedent(
                """A dictionary object representing three selected restaurants, with no comments or explanations.
                    And make sure it is a json valid.

                Example response:
                {
                    "restaurants": [
                        {
                            "name": "Le Cochon à l'Oreille",
                            "address": "Le Cochon à l'Oreille, 15 Rue Montmartre, 75001 Paris, France",
                            "website": "https://www.lecochonaloreille.fr",
                            "phone": "+33 1 40 15 98 24"
                        },
                        {
                            "name": "McDonald's",
                            "address": "Multiple locations in Paris, France",
                            "website": "https://www.mcdonalds.com/fr-FR.html",
                            "phone": "Not Available"
                        },
                        {
                            "name": "Burger King",
                            "address": "Multiple locations in Paris, France",
                            "website": "https://www.burgerking.fr/",
                            "phone": "Not Available"
                        }
                    ]
                }
                """
            ),
            output_file="restaurants.json",
            agent=agent,
        )


class AiActivitiesTasks:
    def __init__(self) -> None:
        pass

    def extract_activities_criteria_task(self, criteria: str, agent: Agent) -> Task:
        """Create a task to extract travel activity preferences from user criteria."""

        return Task(
            description=dedent(f"""
                You will receive a user's preferences for a travel plan.
                Your task is to identify the part related to travel activities,
                such as sightseeing, outdoor adventures, or cultural experiences.

                Criteria: {criteria}

                If no specific activity preferences are provided, return:
                "No specific preferences; suggest popular or recommended activities."

                Ensure your response is concise and focused on activity preferences.
            """),
            expected_output="A concise summary of the user's activity preferences.",
            agent=agent,
        )

    def activities_task(self, city: str, agent: Agent) -> Task:
        """Create a task to select travel activities based on given criteria."""

        activities = get_activities(city=city)

        return Task(
            description=dedent(f"""
                You will be given a list of available travel activities in JSON format.
                Select 10 based on the given criteria. If fewer than 10 activities are available,
                complete the selection with the best possible activities from the list and don't include restaurants or dining options.

                The list of activities in JSON format: {activities}

                In your response, return only the 10 selected activities in a well-formatted JSON object list,
                with no comments. Ensure to vary the activities.
            """),
            expected_output=dedent("""A JSON object representing the selected activities, with no comments or explanations.
            Example Output:
            {
                "activities": [
                    {"name": "Activity 1", "address": "address 1", "categories" : ["category 1", "category 2"]},
                    {"name": "Activity 2", "address": "address 2", "categories" : ["category 1", "category 2"},
                    ...
                    {"name": "Activity 10", "address": "address 10", "categories" : ["category 1", "category 2"}
                ]
            }
            """),
            agent=agent,
            output_file="activities.json",
        )
