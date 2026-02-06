
# References Pre-Registration App

A full-stack application for global researcher network pre-registration, featuring a React frontend, Spring Boot backend, and PostgreSQL database.

## 🏗️ Architecture

```
Frontend (React + Vite) ←→ Backend (Spring Boot) ←→ Database (PostgreSQL)
     Port 5173                  Port 8080                localhost:5432
```

## 📋 Prerequisites

- **Node.js** (v18+)
- **Java JDK** 17+
- **Maven** 3.6+
- **PostgreSQL** 14+

## 🚀 Quick Start

### Option 1: Using Batch Scripts (Windows)

1. **Start Backend** (in one terminal):
   ```bash
   start-backend.bat
   ```

2. **Start Frontend** (in another terminal):
   ```bash
   start-frontend.bat
   ```

### Option 2: Manual Start

1. **Database Setup**:
   ```bash
   # Create database
   createdb -U postgres references_db
   
   # Run schema
   psql -U postgres -d references_db -f db/schema.sql
   ```

2. **Backend**:
   ```bash
   cd java-backend
   # Update application.properties with your PostgreSQL password
   mvn spring-boot:run
   ```
   Backend runs on: **http://localhost:8080**

3. **Frontend**:
   ```bash
   npm install
   npm run dev
   ```
   Frontend runs on: **http://localhost:5173**

## ⚙️ Configuration

### Database (`java-backend/application.properties`)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/references_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD  # ← Update this
```

### Email (Optional)
To enable confirmation emails, update:
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=YOUR_APP_PASSWORD  # ← Get from Google App Passwords
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/preregister` | Register a new email |

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Success Response**:
```json
{
  "success": true,
  "message": "Registration successful."
}
```

## ✨ Features

- **Modern UI**: Clean, research-focused aesthetic
- **Email Validation**: Prevents duplicates and invalid emails
- **Automated Emails**: Confirmation sent via Spring Boot Mail
- **Full-Stack Integration**: React → Spring Boot → PostgreSQL

## 📚 Documentation

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## 🧪 Testing

Test the backend directly:
```bash
curl -X POST http://localhost:8080/api/preregister \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## 🐛 Troubleshooting

See the [SETUP_GUIDE.md](./SETUP_GUIDE.md#troubleshooting) for common issues and solutions.
