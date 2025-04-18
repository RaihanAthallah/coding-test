# Coding Test Project

This project consists of a **FastAPI** backend and a **Next.js** frontend. You can run them locally using Python and Node.js, or alternatively using Docker for a containerized environment.

---

# Disclaimer

This project does not use a .env file for configuration. All sensitive or environment-specific settings (such as database credentials, API keys, etc.) are hardcoded directly into the project. This is done to simplify the setup process, making it easier to run locally or in a containerized environment without needing additional configuration files.

---

## 🧠 Backend (FastAPI)

### Requirements

- Python 3.12.10
- PIP (Python package manager)

### Steps to Run Locally

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Create a virtual environment:**

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**

   - **Windows:**

     ```bash
     venv\Scripts\activate
     ```

   - **Unix/macOS:**
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

5. **Run the backend server:**
   ```bash
   uvicorn app.main:app --reload
   ```

### Access

- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🐳 Docker Alternative

### Prerequisites

- Docker
- Docker Compose

### Steps to Run with Docker

1. **Navigate to the main project directory:**

   ```bash
   cd coding-test
   ```

2. **Build and run the containers:**
   ```bash
   docker-compose up --build
   ```

### Access

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- Backend: [http://localhost:8000](http://localhost:8000)

---

## 📂 Project Structure

```
coding-test/
│
├── backend/
└── app/
    ├── controllers/
    │   ├── ai_controller.py
    │   └── sales_controller.py
    ├── exceptions/
    │   ├── ai_exception.py
    │   └── sales_exception.py
    ├── repositories/
    │   └── sales_repository.py
    ├── schemas/
    │   ├── ai_schema.py
    │   └── sales_schema.py
    ├── services/
    │   ├── ai_service.py
    │   └── sales_service.py
    ├── dummyData.json
    └── main.py
```

My project folder structure follows a **Clean Architecture** approach, emphasizing separation of concerns, maintainability, and testability. Let’s break down each part of My structure:

### 📁 backend/

- Root folder for the backend codebase. Sometimes used as the Docker context or root workspace folder.

### 📁 app/

- Core of My FastAPI app. This is where all application logic lives.
- Inside, it’s split into layers based on Clean Architecture principles.

---

### Clean Architecture Breakdown:

#### 1. **📁 controllers/** (a.k.a. Routes or Handlers)

- **Role:** Handles HTTP requests/responses. Communicates with the `services` layer.
- **Files:**
  - `ai_controller.py` → Handles endpoints related to handle chatbot integration with LLM.
  - `sales_controller.py` → Handles sales-related endpoints.

#### 2. **📁 services/** (Business Logic Layer)

- **Role:** Contains the **core logic** of My app. It processes data and enforces rules.
- **Files:**
  - `ai_service.py` → Implements How to handle message from user and send the request to LLM APIs.
  - `sales_service.py` → Handles business rules for sales.

#### 3. **📁 repositories/** (Data Access Layer)

- **Role:** Responsible for **reading/writing data** from sources like databases or files.
- **Files:**
  - `sales_repository.py` → Abstracts data access for sales-related information (could read from `dummyData.json` or a DB).

#### 4. **📁 schemas/** (Data Validation / Serialization)

- **Role:** Uses Pydantic models to **define request/response shapes**, ensuring type safety.
- **Files:**
  - `ai_schema.py` → Pydantic models for AI request and response.
  - `sales_schema.py` → Models for sales data.

#### 5. **📁 exceptions/**

- **Role:** Custom exception classes for handling errors cleanly and consistently.
- **Files:**
  - `ai_exception.py` → Specific to AI module error handling.
  - `sales_exception.py` → Error handling for the sales module.

#### 6. **📄 main.py**

- **Role:** Entry point for the FastAPI app.
- It sets up routers, middleware, and app configuration.

---

### ✅ Benefits of This Structure:

- **Modularity:** Easier to debug, test, and replace components.
- **Scalability:** New features can be added without cluttering existing logic.
- **Testability:** Each layer can be unit tested independently but in this case i still unable to perform the unit test because the concern of time completition of this coding test.

---

## 📎 Notes

- Ensure ports **3000** and **8000** are free before running.
- Use Docker for consistent environments and easier deployment.
- If using Docker, ensure My machine has Docker and Docker Compose installed.
- Make sure to configure `.env` for sensitive data such as database credentials, API keys, etc.

---

```

```
