from fastapi import APIRouter
from app.services.sales_service import get_all_sales_reps, get_sales_rep_by_id
from app.schemas.sales_schema import SalesRepListResponse, SalesRep

router = APIRouter()

@router.get("/", response_model=SalesRepListResponse)
async def list_sales_reps():
    try:
        return get_all_sales_reps()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{rep_id}", response_model=SalesRep)
async def get_sales_rep(rep_id: int):
    try:
        return get_sales_rep_by_id(rep_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/health")
def health_check():
    return {"status": "healthy"}