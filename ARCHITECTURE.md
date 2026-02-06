# Full-Stack Connection Architecture

## System Overview

```mermaid
graph LR
    A[React Frontend<br/>Port 5173] -->|HTTP POST| B[Spring Boot API<br/>Port 8080]
    B -->|JDBC| C[PostgreSQL DB<br/>Port 5432]
    B -->|SMTP| D[Email Service]
    
    style A fill:#61dafb,stroke:#333,stroke-width:2px,color:#000
    style B fill:#6db33f,stroke:#333,stroke-width:2px,color:#000
    style C fill:#336791,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#ea4335,stroke:#333,stroke-width:2px,color:#fff
```

## Data Flow

### Registration Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend<br/>(React)
    participant B as Backend<br/>(Spring Boot)
    participant D as Database<br/>(PostgreSQL)
    participant E as Email Service

    U->>F: Enter email & submit
    F->>F: Validate email format
    F->>B: POST /api/preregister
    B->>D: Check if email exists
    alt Email exists
        D-->>B: Email found
        B-->>F: 400 Bad Request
        F-->>U: "Email already registered"
    else Email new
        D-->>B: Email not found
        B->>D: INSERT new registration
        D-->>B: Success
        B->>E: Send confirmation email
        E-->>B: Email sent
        B-->>F: 200 OK
        F-->>U: "Registration successful"
    end
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 19 + TypeScript + Vite | User interface and form handling |
| **Backend** | Spring Boot 3.2 + Java 17 | REST API and business logic |
| **Database** | PostgreSQL 14+ | Persistent data storage |
| **ORM** | Spring Data JPA (Hibernate) | Database abstraction |
| **Email** | Spring Mail + SMTP | Email notifications |
| **Build Tools** | Maven (Backend), npm (Frontend) | Dependency management |

## File Structure

```
references---global-researcher-network/
│
├── 📁 java-backend/              # Spring Boot Backend
│   ├── PreregistrationApp.java  # Main app + Controllers
│   ├── application.properties   # DB & Email config
│   └── pom.xml                  # Maven dependencies
│
├── 📁 db/                        # Database
│   └── schema.sql               # PostgreSQL schema
│
├── 📁 components/                # React Components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── FeatureSection.tsx
│   └── Footer.tsx
│
├── App.tsx                      # Main React component
├── index.tsx                    # React entry point
├── package.json                 # npm dependencies
│
├── start-backend.bat            # Quick start script
├── start-frontend.bat           # Quick start script
├── SETUP_GUIDE.md              # Detailed setup
└── README.md                    # Quick reference
```

## Connection Points

### 1. Frontend → Backend
- **File**: `App.tsx` (line 19)
- **Method**: HTTP POST with fetch API
- **URL**: `http://localhost:8080/api/preregister`
- **Headers**: `Content-Type: application/json`
- **Body**: `{ "email": "user@example.com" }`

### 2. Backend → Database
- **File**: `application.properties` (lines 5-7)
- **Method**: JDBC via Spring Data JPA
- **URL**: `jdbc:postgresql://localhost:5432/references_db`
- **Driver**: PostgreSQL Driver (auto-loaded from pom.xml)

### 3. Backend → Email Service
- **File**: `application.properties` (lines 17-22)
- **Method**: SMTP via Spring Mail
- **Service**: Gmail or any SMTP server
- **Port**: 587 (TLS)

## API Contract

### Endpoint: POST /api/preregister

**Request**:
```json
{
  "email": "john.doe@example.com"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Registration successful."
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "Email already registered."
}
```

## Database Schema

```sql
CREATE TABLE preregistrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables & Configuration

### Required Configuration

1. **PostgreSQL Credentials** (`application.properties`):
   - `spring.datasource.username`
   - `spring.datasource.password`

2. **Email Settings** (Optional, `application.properties`):
   - `spring.mail.username`
   - `spring.mail.password`

### Default Ports

- Frontend: `5173` (Vite default)
- Backend: `8080` (Spring Boot default)
- PostgreSQL: `5432` (PostgreSQL default)

## Security Notes

- CORS is enabled for all origins (`@CrossOrigin(origins = "*")`) - **Change this for production!**
- Database password is in plaintext - **Use environment variables for production!**
- Email password should use Google App Passwords, not your actual Gmail password

## Next Steps

1. ✅ Configure PostgreSQL credentials
2. ✅ Run database schema
3. ✅ Start backend server
4. ✅ Start frontend server
5. ✅ Test the connection
6. 🔒 Secure for production (CORS, env vars, HTTPS)
