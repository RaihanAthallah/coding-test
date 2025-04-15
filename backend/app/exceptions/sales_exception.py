from fastapi import HTTPException, status

class DataNotFoundException(HTTPException):
    def __init__(self, detail: str = "Requested data not found"):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)
        
class DataProcessingException(HTTPException):
    def __init__(self, detail: str = "Error while processing data"):
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)
        
class InvalidDataFormatException(HTTPException):
    def __init__(self, detail: str = "Invalid data format"):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)
        