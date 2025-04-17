from app.repositories.sales_repository import load_dummy_data
from app.schemas.sales_schema import SalesRepListResponse, SalesRep
from app.exceptions.sales_exception import DataProcessingException

def get_all_sales_reps() -> SalesRepListResponse:
    try :
        data = load_dummy_data()
    except DataProcessingException as e:
        raise DataProcessingException(f"Error loading sales reps: {str(e)}")
    
    return data


def get_sales_rep_by_id(rep_id: int) -> SalesRep:
    try:
        data = load_dummy_data()
        for rep in data.salesReps:
            if rep.id == rep_id:
                return rep
    except DataProcessingException as e:
        raise DataProcessingException(f"Error loading sales reps: {str(e)}")
