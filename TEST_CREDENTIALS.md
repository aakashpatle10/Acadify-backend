# Test Credentials for Acadify

## 🎓 Student Credentials

### Student 1
```json
{
  "email": "student1@acadify.com",
  "password": "Student@123",
  "firstName": "Rahul",
  "lastName": "Sharma",
  "enrollmentNumber": "2024CS001",
  "phoneNumber": "9876543210"
}
```

### Student 2
```json
{
  "email": "student2@acadify.com",
  "password": "Student@123",
  "firstName": "Priya",
  "lastName": "Patel",
  "enrollmentNumber": "2024CS002",
  "phoneNumber": "9876543211"
}
```

### Student 3
```json
{
  "email": "student3@acadify.com",
  "password": "Student@123",
  "firstName": "Amit",
  "lastName": "Kumar",
  "enrollmentNumber": "2024CS003",
  "phoneNumber": "9876543212"
}
```

---

## 👨‍🏫 Teacher Credentials

### Teacher 1 - Computer Science
```json
{
  "email": "rajesh.kumar@acadify.com",
  "password": "Teacher@123",
  "firstName": "Rajesh",
  "lastName": "Kumar",
  "phoneNumber": "9123456789",
  "department": "Computer Science",
  "designation": "Assistant Professor",
  "employeeId": "CS001",
  "subject": "Data Structures and Algorithms"
}
```

### Teacher 2 - Mathematics
```json
{
  "email": "priya.sharma@acadify.com",
  "password": "Teacher@123",
  "firstName": "Priya",
  "lastName": "Sharma",
  "phoneNumber": "9123456790",
  "department": "Mathematics",
  "designation": "Associate Professor",
  "employeeId": "MATH001",
  "subject": "Linear Algebra"
}
```

### Teacher 3 - Physics
```json
{
  "email": "amit.verma@acadify.com",
  "password": "Teacher@123",
  "firstName": "Amit",
  "lastName": "Verma",
  "phoneNumber": "9123456791",
  "department": "Physics",
  "designation": "Professor",
  "employeeId": "PHY001",
  "subject": "Quantum Mechanics"
}
```

---

## 👔 Admin Credentials

### Main Admin
```json
{
  "email": "admin@acadify.com",
  "password": "Admin@123",
  "firstName": "Super",
  "lastName": "Admin",
  "phoneNumber": "9999999999",
  "role": "main_admin"
}
```

### Sub Admin (HOD - Computer Science)
```json
{
  "email": "hod.cs@acadify.com",
  "password": "SubAdmin@123",
  "firstName": "Dr. Suresh",
  "lastName": "Gupta",
  "phoneNumber": "9999999998",
  "role": "sub_admin"
}
```

### Sub Admin (HOD - Mathematics)
```json
{
  "email": "hod.math@acadify.com",
  "password": "SubAdmin@123",
  "firstName": "Dr. Meera",
  "lastName": "Singh",
  "phoneNumber": "9999999997",
  "role": "sub_admin"
}
```

---

## 📝 Registration Endpoints

### Register Student
**POST** `http://localhost:5000/api/student/register`

### Register Teacher
**POST** `http://localhost:5000/api/teacher/register`

### Register Admin
**POST** `http://localhost:5000/api/admin/register`

---

## 🔐 Login Endpoints

### Student Login
**POST** `http://localhost:5000/api/student/login`
```json
{
  "email": "student1@acadify.com",
  "password": "Student@123"
}
```

### Teacher Login
**POST** `http://localhost:5000/api/teacher/login`
```json
{
  "email": "rajesh.kumar@acadify.com",
  "password": "Teacher@123"
}
```

### Admin Login
**POST** `http://localhost:5000/api/admin/login`
```json
{
  "email": "admin@acadify.com",
  "password": "Admin@123"
}
```

---

## 🚀 Quick Setup Steps

1. **Register Users** - Use Postman to register all users using their registration endpoints
2. **Login** - Use the login credentials to get authentication tokens
3. **Test Features** - Use the tokens to test protected endpoints

---

## ⚠️ Important Notes

- All passwords are **minimum 6 characters**
- Phone numbers are **exactly 10 digits**
- Employee IDs and Enrollment Numbers must be **unique**
- After registration, use the **same credentials** to login
- Tokens are stored in **cookies** automatically

---

## 📌 Quick Login Reference

| Role | Email | Password |
|------|-------|----------|
| Student | student1@acadify.com | Student@123 |
| Teacher | rajesh.kumar@acadify.com | Teacher@123 |
| Admin | admin@acadify.com | Admin@123 |
