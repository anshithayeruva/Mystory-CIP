# Academix: Docker Integration & Project Status Guide

This document provides a summary of the current project status and step-by-step instructions to connect and run your MongoDB database and Redis cache using Docker.

---

## 1. Project Update: Where We Stand

1. **Database Migration Completed**: The project has been fully migrated from PostgreSQL to **MongoDB**.
2. **MongoDB Replica Set Requirement**: The project extensively uses Prisma transactions (`$transaction`), which MongoDB only supports if run as a **Replica Set**. A standalone MongoDB server will throw database error `P2031`.
3. **Database Schema (`prisma/schema.prisma`)**:
   - All models use MongoDB ObjectIds (`String @id @default(auto()) @map("_id") @db.ObjectId`).
   - All relational foreign key fields are mapped using `@db.ObjectId` to match.
   - Redundant indexes (like `@index([email])` on unique fields) have been cleaned up to prevent conflicts in MongoDB.
4. **Environment File Configuration (`.env` and `src/.env`)**:
   - Both environment files are configured to point to MongoDB running on port **`27018`** as a replica set (`rs0`) and Redis running on port **`6379`**:
     ```env
     DATABASE_URL="mongodb://localhost:27018/academix?replicaSet=rs0"
     REDIS_URL="redis://localhost:6379"
     ```

---

## 2. Running MongoDB & Redis in Docker

We have created a `docker-compose.yml` in the `backend/` directory that boots up a fully configured environment.

### Docker Compose Architecture
The compose file includes:
1. **`mongodb`**: The main database running on port **`27018`** inside the container (publishing to `27018` on your host machine) configured as a replica set named `rs0`.
2. **`mongodb-rs-init`**: A temporary helper container that waits for MongoDB to start and automatically runs `rs.initiate()` to configure the replica set.
3. **`redis`**: A Redis cache container running on the default port `6379`.

---

## 3. What You Should Do Now

To get the backend fully connected and running with Docker, execute the following steps:

### Step 1: Start the Docker Containers
In your terminal, navigate to the `backend/` directory (if not already there) and run:
```bash
docker compose up -d
```
*(This will pull the MongoDB 7.0 and Redis alpine images, create the network volumes, and start the services in the background. The replica set will be automatically initiated).*

### Step 2: Push the Database Schema
Synchronize the collections and indexes in MongoDB with your Prisma schema:
```bash
npx prisma db push
```

### Step 3: Seed the Database
Populate the database with the default administrator account:
```bash
npx prisma db seed
```
**Default Admin Credentials:**
- **Email**: `admin@mystory.edu`
- **Password**: `Admin@123`

### Step 4: Run the Development Server
Spin up the Next.js portal locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the portal.
