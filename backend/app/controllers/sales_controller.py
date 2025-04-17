from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from app.services.sales_service import get_all_sales_reps, get_sales_rep_by_id
from app.schemas.sales_schema import SalesRepListResponse, SalesRep
from app.exceptions.sales_exception import DataProcessingException

router = APIRouter()

@router.get("/", response_model=SalesRepListResponse)
async def list_sales_reps():
    try:
        sales_reps = get_all_sales_reps()
        return JSONResponse(
            status_code=200,
            content={
                "status_code": 200,
                "data": sales_reps
            },
        )
    except DataProcessingException as e:
        return JSONResponse(
            status_code=500,
            content={
                "status_code": 500,
                "error_message": str(e)
            },
        )
        

@router.get("/{rep_id}", response_model=SalesRep)
async def get_sales_rep(rep_id: int):
    try:
        sales_rep = get_sales_rep_by_id(rep_id)
        return JSONResponse(
            status_code=200,
            content={
                "status_code": 200,
                "data": sales_rep
            },
        )
    except ValueError as e:
        return JSONResponse(
            status_code=404,
            content={
                "status_code": 404,
                "error_message": str(e)
            },
        )
    except DataProcessingException as e:
        return JSONResponse(
            status_code=500,
            content={
                "status_code": 500,
                "error_message": str(e)
            },
        )
    
    
@router.get("/health")
def health_check():
    return {"status": "healthy"}