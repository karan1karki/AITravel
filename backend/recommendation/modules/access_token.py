import requests
import os
from dotenv import load_dotenv

load_dotenv()  # Make sure it's loaded if not already

def get_access_token():
    data = {
        "grant_type": os.getenv("grant_type"),
        "client_id": os.getenv("client_id"),
        "client_secret": os.getenv("client_secret"),
    }

    print("DEBUG: Sending payload to Amadeus =", data)

    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    response = requests.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        data=data,
        headers=headers,
    )

    print("DEBUG: Response status:", response.status_code)
    print("DEBUG: Response body:", response.text)

    try:
        res = response.json()
        return res.get("access_token")
    except Exception as e:
        print("ERROR: Failed to parse JSON:", str(e))
        return None
