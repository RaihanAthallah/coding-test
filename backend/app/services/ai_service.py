import os
import json
import logging
import google.generativeai as genai
from app.schemas.ai_schema import AIResponse
from app.exceptions.ai_exception import AIProcessingException
from app.repositories.sales_repository import load_dummy_data

# Initialize Gemini
genai.configure(api_key="AIzaSyAmx6OgjEAtzlU_2KkiLTroG6-BIj8Y3sM")

# Store chat sessions per user/session
chat_sessions = {}

def get_chat_session(session_id: str):
    """Returns a persistent chat session for the given session_id."""
    if session_id not in chat_sessions:
        chat_sessions[session_id] = genai.GenerativeModel('gemini-1.5-pro').start_chat(history=[])
    return chat_sessions[session_id]

def generate_ai_response(session_id: str, question: str) -> AIResponse:
    if not question:
        raise AIProcessingException("Question cannot be empty")

    try:
        dummy_data = load_dummy_data()
        logging.info(f"Dummy data loaded for session {session_id}")

        # Get or create a chat session
        chat = get_chat_session(session_id)

        # Create a conversational prompt
        message = f"""
        Based on the following sales team data:

        {json.dumps(dummy_data, indent=2)}

        QUESTION:
        {question}

        Please answer clearly and concisely based on the following data.
        """

        response = chat.send_message(message)
        return AIResponse(answer=response.text)

    except Exception as e:
        raise AIProcessingException(f"AI error: {str(e)}")
