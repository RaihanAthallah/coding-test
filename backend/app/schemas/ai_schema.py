from pydantic import BaseModel

class AIRequest(BaseModel):
    session_id: str
    question: str

class AIResponse(BaseModel):
    answer: str

class SessionResponse(BaseModel):
    session_id: str