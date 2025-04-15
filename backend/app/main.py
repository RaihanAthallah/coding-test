from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import ai_controller, sales_controller

app = FastAPI(
    title="LLM Integration API",
    description="This API provides endpoints for dummy data and AI responses.",
    version="1.0.0",
    docs_url="/docs",       # Swagger UI (default: /docs)
    redoc_url="/redoc",     # ReDoc UI (default: /redoc)
    openapi_url="/openapi.json"  # OpenAPI schema
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(sales_controller.router, prefix="/api/sales", tags=["sales"])
app.include_router(ai_controller.router, prefix="/api/ai", tags=["AI"])
