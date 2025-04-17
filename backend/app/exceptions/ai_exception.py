from fastapi import HTTPException, status

class AIProcessingException(HTTPException):
    def __init__(self, detail: str = "Error while processing AI request"):
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)

