import uuid
from fastapi import APIRouter
from app.schemas.ai_schema import AIRequest, AIResponse, SessionResponse
from app.services.ai_service import generate_ai_response
from app.exceptions.ai_exception import AIProcessingException

router = APIRouter()

@router.post("/", response_model=AIResponse)
async def ai_chat(request: AIRequest):
    try:
        return generate_ai_response(session_id=request.session_id, question=request.question)
    except AIProcessingException as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/generate-session", response_model=SessionResponse)
async def generate_session():
    try:
        # Generate a new session ID
        session_id = str(uuid.uuid4())
        return SessionResponse(session_id=session_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
