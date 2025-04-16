import uuid
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from app.schemas.ai_schema import AIRequest, AIResponse, SessionResponse
from app.services.ai_service import generate_ai_response
from app.exceptions.ai_exception import AIProcessingException

router = APIRouter()

@router.post("/", response_model=AIResponse)
async def ai_chat(request: AIRequest):
    try:
        response = await generate_ai_response(session_id=request.session_id, question=request.question)
        return JSONResponse(
            status_code=200,
            content={
                "status_code": 200,
                "data": response.answer
            },
        )
    except AIProcessingException as e:
        return JSONResponse(
            status_code=e.status_code,
            content={
                "status_code": e.status_code,
                "error_message": e.detail
            },
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "status_code": 500,
                "error_message": str(e),
            },
        )
    
@router.get("/generate-session", response_model=SessionResponse)
async def generate_session():
    try:
        # Generate a new session ID
        session_id = str(uuid.uuid4())
        SessionResponse(session_id=session_id)
        return JSONResponse(
            status_code=200,
            content={
                "status_code": 200,
                "data": session_id
            },
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "status_code": 500,
                "error_message": str(e),
            },
        )
