import json
import os

def load_dummy_data() -> dict:
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        dummy_file = os.path.normpath(os.path.join(current_dir, "./../dummyData.json"))

        with open(dummy_file, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        raise AIProcessingException("Dummy data file not found")
    except json.JSONDecodeError:
        raise AIProcessingException("Error decoding JSON from dummy data file")
    except Exception as e:
        raise AIProcessingException(f"An unexpected error occurred: {str(e)}")