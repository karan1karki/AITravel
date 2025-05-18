import json
import re

json_string_with_single_quotes = "{'flight': {'one Way': 'No', 'departure': '2024-09-30T12:30:00', 'arrival': '2024-10-01T12:30:00', 'price': {'currency': 'EUR', 'total': '587.11', 'note': 'It\'s a good price!'}}}"

# Use a regular expression to replace only single quotes that are not within values
json_string_with_double_quotes = re.sub(r"(?<!\w)'(?!\w)", '"', json_string_with_single_quotes)

print(json_string_with_double_quotes)
