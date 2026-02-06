# Setup Guide: Connecting Frontend, Backend, and PostgreSQL

This guide will help you connect your React frontend, Spring Boot backend, and PostgreSQL database.

## Prerequisites

- [Java 17+](https://www.oracle.com/java/technologies/downloads/)
- [Maven](https://maven.apache.org/download.cgi)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL 14+](https://www.postgresql.org/download/)

---

## Step 1: PostgreSQL Database Setup

### 1.1 Install PostgreSQL
If you haven't already, install PostgreSQL from the link above.

### 1.2 Create the Database
Open your PostgreSQL command line (psql) or pgAdmin and run:

```sql
CREATE DATABASE references_db;
```

### 1.3 Run the Schema
Navigate to the `db/` folder and execute the schema:

```bash
psql -U postgres -d references_db -f db/schema.sql
```

Or copy the contents of `db/schema.sql` and execute in pgAdmin.

### 1.4 Update Database Credentials
Edit `java-backend/application.properties` and update:

```properties
spring.datasource.username=postgres
spring.datasource.password=YOUR_ACTUAL_PASSWORD
```

Replace `YOUR_ACTUAL_PASSWORD` with your PostgreSQL password.

---

## Step 2: Backend (Spring Boot) Setup

### 2.1 Navigate to Backend Directory
```bash
cd java-backend
```

### 2.2 Build the Project
```bash
mvn clean install
```

### 2.3 Run the Backend
```bash
mvn spring-boot:run
```

The backend should start on **http://localhost:8080**

### 2.4 Verify Backend is Running
Open a browser or use curl:
```bash
curl http://localhost:8080/api/preregister -X POST -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\"}"
```

You should see a success response.

---

## Step 3: Frontend (React + Vite) Setup

### 3.1 Navigate to Project Root
```bash
cd ..
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Run the Frontend
```bash
npm run dev
```

The frontend should start on **http://localhost:5173** (or the port Vite assigns).

---

## Step 4: Test the Full Stack

1. Open the frontend in your browser: **http://localhost:5173**
2. Enter an email address in the registration form
3. Click submit
4. The frontend will send a request to **http://localhost:8080/api/preregister**
5. The backend will save the email to PostgreSQL and send a confirmation email (if email is configured)

---

## Step 5: Email Configuration (Optional)

The email functionality requires a mail server. To use Gmail:

### 5.1 Enable 2-Factor Authentication
Go to your Google Account settings and enable 2FA.

### 5.2 Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Create an app password for "Mail"
3. Copy the generated password

### 5.3 Update `application.properties`
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=YOUR_APP_PASSWORD
```

> **Note**: If you don't configure email, the app will still work but won't send confirmation emails.

---

## Troubleshooting

### Port Already in Use

**Backend (8080)**:
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8080 | xargs kill -9
```

**Frontend (5173)**:
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

### Database Connection Error
- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `application.properties`
- Ensure database `references_db` exists

### CORS Issues
The backend already has `@CrossOrigin(origins = "*")` for development. For production, update this to your frontend domain.

---

## Architecture Overview

```
┌─────────────────┐         HTTP          ┌─────────────────┐         JDBC         ┌─────────────────┐
│                 │  POST /api/preregister │                 │                      │                 │
│  React Frontend ├───────────────────────>│  Spring Boot    ├─────────────────────>│   PostgreSQL    │
│  (Port 5173)    │  <─────────────────────┤  Backend        │  <───────────────────│   Database      │
│                 │    JSON Response       │  (Port 8080)    │    Query Results     │                 │
└─────────────────┘                        └─────────────────┘                      └─────────────────┘
```

---

## Next Steps

- Deploy your application to production
- Add authentication and authorization
- Implement additional features
- Set up CI/CD pipeline

Happy coding! 🚀
