# Student and Admin Registration APIs

## Overview
This document describes the public registration APIs for students and admins, created for testing purposes. These APIs follow the same pattern as the teacher registration API.

## Student Registration API

### Endpoint
```
POST /api/students/register
```

### Description
Public endpoint to register a new student. This is for testing purposes only - in production, students should be created through the admin panel.

### Request Body
```json
{
  "email": "student@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "enrollmentNumber": "2024CS001",
  "department": "Computer Science",
  "course": "B.Tech",
  "year": 2,
  "semester": 3,
  "phoneNumber": "1234567890"
}
```

### Validation Rules
- **email**: Required, must be a valid email address
- **password**: Required, minimum 6 characters
- **firstName**: Required, trimmed
- **lastName**: Required, trimmed
- **enrollmentNumber**: Required, trimmed, must be unique
- **department**: Required, trimmed
- **course**: Required, trimmed
- **year**: Required, must be a number
- **semester**: Required, must be a number
- **phoneNumber**: Required, must be exactly 10 digits

### Response
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "enrollmentNumber": "2024CS001",
    "email": "student@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "department": "Computer Science",
    "course": "B.Tech",
    "year": 2,
    "semester": 3,
    "role": "student"
  }
}
```

### Example Usage
```bash
curl -X POST http://localhost:3000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "enrollmentNumber": "2024CS001",
    "department": "Computer Science",
    "course": "B.Tech",
    "year": 2,
    "semester": 3,
    "phoneNumber": "1234567890"
  }'
```

---

## Admin Registration API

### Endpoint
```
POST /api/admins/register
```

### Description
Public endpoint to register a new admin. This is for testing purposes only - in production, admins should be created through secure processes. By default, creates a `main_admin` role unless specified otherwise.

### Request Body
```json
{
  "email": "admin@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith",
  "phoneNumber": "9876543210",
  "department": "Administration",
  "role": "main_admin"
}
```

### Validation Rules
- **email**: Required, must be a valid email address, must be unique
- **password**: Required, minimum 6 characters
- **firstName**: Required, trimmed
- **lastName**: Required, trimmed
- **phoneNumber**: Required, must be exactly 10 digits
- **department**: Required, trimmed
- **role**: Optional, defaults to "main_admin" if not specified

### Response
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "email": "admin@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "main_admin",
    "department": "Administration"
  }
}
```

### Example Usage
```bash
curl -X POST http://localhost:3000/api/admins/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123",
    "firstName": "Jane",
    "lastName": "Smith",
    "phoneNumber": "9876543210",
    "department": "Administration"
  }'
```

---

## Implementation Details

### Files Modified

#### Controllers
1. **student.controller.js**
   - Added `register` method for public student registration

2. **admin.controller.js**
   - Added `register` method for public admin registration

#### Services
1. **student.service.js**
   - Added `registerStudent` method that calls the repository's `createStudent` method

2. **admin.service.js**
   - Added `registerAdmin` method that calls the repository's `createAdmin` method
   - Defaults to `main_admin` role if not specified

#### Routes
1. **student.routes.js**
   - Added `POST /register` route with `createStudentValidator` middleware

2. **admin.routes.js**
   - Added `POST /register` route with `createSubAdminValidator` middleware

### Security Considerations

⚠️ **Important**: These registration endpoints are **PUBLIC** and should only be used for testing purposes.

For production:
- Remove or disable these public registration endpoints
- Implement proper authentication and authorization
- Students should be created by admins/teachers through the admin panel
- Admins should be created through secure, controlled processes
- Consider implementing email verification
- Add rate limiting to prevent abuse

### Testing

You can test these endpoints using:
1. **Postman** or **Insomnia** - Import the curl commands above
2. **Frontend application** - Use the existing login forms as reference
3. **Command line** - Use the curl commands provided in the examples

### Error Handling

Both endpoints will return appropriate error responses:

- **400 Bad Request**: Validation errors (missing fields, invalid format)
- **409 Conflict**: Duplicate email or enrollment number
- **500 Internal Server Error**: Server-side errors

Example error response:
```json
{
  "success": false,
  "message": "Email is required, Password must be at least 6 characters long"
}
```
