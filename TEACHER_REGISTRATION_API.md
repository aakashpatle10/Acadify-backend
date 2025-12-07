# Teacher Registration API - Testing Documentation

## Endpoint
**POST** `/api/teacher/register`

## Description
Public endpoint for teacher self-registration (created for testing purposes).

## Request Body
```json
{
  "email": "teacher@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "9876543210",
  "department": "Computer Science",
  "designation": "Assistant Professor",
  "employeeId": "EMP001",
  "subject": "Data Structures"
}
```

## Required Fields
- `email` (string, valid email format)
- `password` (string, minimum 6 characters)
- `firstName` (string)
- `lastName` (string)
- `phoneNumber` (string, exactly 10 digits)
- `department` (string)
- `designation` (string)
- `employeeId` (string, must be unique)
- `subject` (string)

## Success Response (201 Created)
```json
{
  "success": true,
  "message": "Teacher registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "teacher@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "employeeId": "EMP001",
    "department": "Computer Science",
    "subject": "Data Structures",
    "role": "teacher"
  }
}
```

## Error Responses

### Validation Error (400 Bad Request)
```json
{
  "success": false,
  "message": "Email is required, Password must be at least 6 characters long"
}
```

### Duplicate Email/Employee ID (409 Conflict)
```json
{
  "success": false,
  "message": "Teacher with this email already exists"
}
```

## Example cURL Request
```bash
curl -X POST http://localhost:5000/api/teacher/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "9876543210",
    "department": "Computer Science",
    "designation": "Assistant Professor",
    "employeeId": "EMP001",
    "subject": "Data Structures"
  }'
```

## Example using Postman/Thunder Client
1. Method: **POST**
2. URL: `http://localhost:5000/api/teacher/register`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON): Use the request body format shown above

## Notes
- This is a **public endpoint** - no authentication required
- Password will be automatically hashed before storing
- `role` field is automatically set to "teacher"
- `createdBy` field is not required for this endpoint (unlike the admin-protected endpoint)
- After registration, use `/api/teacher/login` to authenticate

## Related Endpoints
- **Login**: `POST /api/teacher/login`
- **Get Profile**: `GET /api/teacher/profile` (requires authentication)
