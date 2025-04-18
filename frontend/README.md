# Coding Test Project

This project consists of a **FastAPI** backend and a **Next.js** frontend. You can run them locally using Python and Node.js, or alternatively using Dock

---

# Disclaimer

This project does not use a .env file for configuration. All sensitive or environment-specific settings (such as database credentials, API keys, etc.) are hardcoded directly into the project. This is done to simplify the setup process, making it easier to run locally or in a containerized environment without needing additional configuration files.

---

## 💻 Frontend (Next.js)

### Requirements

- Node.js 20.17.0
- npm

### Steps to Run Locally

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### Access

- App: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker Alternative

### Prerequisites

- Docker
- Docker Compose

### Steps to Run with Docker

1. Navigate to the main project directory:

   ```bash
   cd coding-test
   ```

2. Build and run the containers:
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
│
├── frontend/        # Next.js frontend
│   └── src/          # Frontend source files
│       ├── components/  # React components
│       ├── hooks/       # Custom React hooks
│       ├── pages/       # Next.js pages
│       ├── styles/      # CSS styles
│
│
└── docker-compose.yml
```

---

## 📎 Notes

- Ensure ports **3000** and **8000** are free before running.
- Use Docker for consistent environments and easier deployment.
