# 🚀 Connection Checklist

Use this checklist to ensure your frontend, backend, and database are properly connected.

## ✅ Prerequisites

- [ ] Java 17+ installed
  ```bash
  java -version
  ```
- [ ] Maven installed
  ```bash
  mvn -version
  ```
- [ ] Node.js 18+ installed
  ```bash
  node -version
  ```
- [ ] PostgreSQL installed and running
  ```bash
  pg_isready
  ```

## ✅ Database Setup

- [ ] PostgreSQL service is running
- [ ] Database `references_db` created
  ```sql
  CREATE DATABASE references_db;
  ```
- [ ] Schema executed (run `db/schema.sql`)
  ```bash
  psql -U postgres -d references_db -f db/schema.sql
  ```
- [ ] Verify table exists
  ```sql
  \c references_db
  \dt
  -- Should show 'preregistrations' table
  ```

## ✅ Backend Configuration

- [ ] Update `java-backend/application.properties`:
  - [ ] PostgreSQL username (line 6)
  - [ ] PostgreSQL password (line 7)
  - [ ] (Optional) Email username (line 19)
  - [ ] (Optional) Email password (line 20)

- [ ] Build backend
  ```bash
  cd java-backend
  mvn clean install
  ```

- [ ] Start backend
  ```bash
  mvn spring-boot:run
  ```

- [ ] Verify backend is running
  - [ ] Check console for "Started PreregistrationApp"
  - [ ] Visit: http://localhost:8080
  - [ ] Should see Whitelabel Error Page (normal for no root endpoint)

## ✅ Frontend Setup

- [ ] Install dependencies
  ```bash
  npm install
  ```

- [ ] Verify `App.tsx` has correct API URL
  - [ ] Line 21 should be: `http://localhost:8080/api/preregister`
  - [ ] ✅ Already updated!

- [ ] Start frontend
  ```bash
  npm run dev
  ```

- [ ] Open browser to http://localhost:5173

## ✅ Connection Testing

### Test 1: Backend Health
```bash
curl http://localhost:8080/api/preregister -X POST -H "Content-Type: application/json" -d "{\"email\":\"test1@example.com\"}"
```
**Expected**: `{"success":true,"message":"Registration successful."}`

### Test 2: Duplicate Check
```bash
curl http://localhost:8080/api/preregister -X POST -H "Content-Type: application/json" -d "{\"email\":\"test1@example.com\"}"
```
**Expected**: `{"success":false,"message":"Email already registered."}`

### Test 3: Database Verification
```sql
SELECT * FROM preregistrations;
```
**Expected**: Should show `test1@example.com`

### Test 4: Frontend Submit
- [ ] Open http://localhost:5173 in browser
- [ ] Enter email: `frontend-test@example.com`
- [ ] Click submit
- [ ] Should see success message

### Test 5: Check Database Again
```sql
SELECT * FROM preregistrations ORDER BY created_at DESC;
```
**Expected**: Should show both test emails

## ✅ Email Testing (Optional)

If you configured email settings:

- [ ] Submit a new email via frontend
- [ ] Check inbox for confirmation email
- [ ] Verify "From" is your configured email
- [ ] Verify subject is "You're on the References waitlist"

## 🐛 Troubleshooting

If tests fail, check these common issues:

### Backend won't start
- [ ] Check Java version: `java -version` (need 17+)
- [ ] Check Maven version: `mvn -version`
- [ ] Port 8080 already in use:
  ```bash
  netstat -ano | findstr :8080
  taskkill /PID <PID> /F
  ```

### Database connection error
- [ ] PostgreSQL running: `pg_isready`
- [ ] Database exists: `psql -U postgres -l | findstr references_db`
- [ ] Correct password in `application.properties`
- [ ] Check backend console for error details

### Frontend won't connect
- [ ] Backend is running (check http://localhost:8080)
- [ ] CORS enabled (already set in `PreregistrationApp.java`)
- [ ] Check browser console (F12) for errors
- [ ] Verify API URL in `App.tsx` is `http://localhost:8080/api/preregister`

### Email not sending
- [ ] Using Google App Password (not regular password)
- [ ] 2FA enabled on Gmail account
- [ ] Correct email in `application.properties`
- [ ] Check backend console for email errors

## ✅ Production Readiness (Before Deployment)

- [ ] Update CORS in `PreregistrationApp.java` from `*` to your domain
- [ ] Move credentials to environment variables
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Add proper error logging
- [ ] Set up database backups
- [ ] Use a production SMTP service (SendGrid, AWS SES, etc.)

## 📚 Documentation

- [README.md](./README.md) - Quick start guide
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed instructions
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture

---

✨ **All checked?** You're ready to go! 🎉
