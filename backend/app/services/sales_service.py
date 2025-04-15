from app.repositories.sales_repository import load_dummy_data
from app.schemas.sales_schema import SalesRepListResponse, SalesRep

def get_all_sales_reps() -> SalesRepListResponse:
    return load_dummy_data()


def get_sales_rep_by_id(rep_id: int) -> SalesRep:
    data = load_dummy_data()
    for rep in data.salesReps:
        if rep.id == rep_id:
            return rep
    raise ValueError("Sales rep not found")
