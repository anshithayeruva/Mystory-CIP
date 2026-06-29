# Academix: College Academic Analytics Portal

This is a production-ready **Next.js 15** academic analytics system built with **TypeScript**, **PostgreSQL**, **Prisma ORM**, **Redis**, and edge-compatible **JWT Authentication**.

---

## 🚀 Collaborator Setup Instructions

When pulling this repository for the first time, follow these steps to set up the development environment on your local machine:

### 1. Install Dependencies
Install all package dependencies defined in the project:
```bash
npm install
```

### 2. Configure Environment Variables
Copy the environment variables template to create your local configurations file:
- **Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```
- **macOS / Linux:**
  ```bash
  cp .env.example .env
  ```

Open the newly created `.env` file and configure it to match your local setup:
- **`DATABASE_URL`**: Update this connection string with your local PostgreSQL credentials (username, password, port, and database name).
- **`REDIS_URL`**: Ensure this points to your local running Redis server (default is `redis://localhost:6379`).
- **`JWT_SECRET`**: You can leave this as default for local testing, or change it to any custom string.

### 3. Initialize the Database
Ensure your local PostgreSQL server is running, then run the database migrations. This creates all the necessary tables (Users, Profiles, Courses, Enrollments, etc.):
```bash
npx prisma migrate dev --name init
```

*Note: This command will automatically run `npx prisma generate` at the end to create local TypeScript types. If you ever modify the schema, run `npx prisma generate` manually.*

### 4. Start the Development Server
Ensure both **PostgreSQL** and **Redis** servers are running on your machine, then spin up the Next.js dev server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the running portal.

---

## 📂 Backend Architecture & Features
For detailed information about the scalable backend directory layout, edge middleware security, and caching strategies, check the architecture documentation at `C:\Users\BHAVYA\.gemini\antigravity\brain\d1b6205a-2a35-4108-8c17-327b736e732e/project_architecture.md`.
