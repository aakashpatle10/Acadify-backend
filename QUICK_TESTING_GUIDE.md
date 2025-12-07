# 🎯 Quick Testing Guide - Registration APIs

## Postman/Insomnia me kaise test karein:

### 1️⃣ Student Register karne ke liye:

**Endpoint:** `POST http://localhost:3000/api/students/register`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "rahul.sharma@acadify.com",
  "password": "rahul123",
  "firstName": "Rahul",
  "lastName": "Sharma",
  "enrollmentNumber": "2024CS001",
  "department": "Computer Science",
  "course": "B.Tech",
  "year": 2,
  "semester": 3,
  "phoneNumber": "9876543210"
}
```

---

### 2️⃣ Admin Register karne ke liye:

**Endpoint:** `POST http://localhost:3000/api/admins/register`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "admin.principal@acadify.com",
  "password": "admin123",
  "firstName": "Dr. Rajesh",
  "lastName": "Verma",
  "phoneNumber": "9876543220",
  "department": "Administration",
  "role": "main_admin"
}
```

---

## 🚀 cURL Commands (Terminal se test karne ke liye):

### Student Registration:
```bash
curl -X POST http://localhost:3000/api/students/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"rahul.sharma@acadify.com\",\"password\":\"rahul123\",\"firstName\":\"Rahul\",\"lastName\":\"Sharma\",\"enrollmentNumber\":\"2024CS001\",\"department\":\"Computer Science\",\"course\":\"B.Tech\",\"year\":2,\"semester\":3,\"phoneNumber\":\"9876543210\"}"
```

### Admin Registration:
```bash
curl -X POST http://localhost:3000/api/admins/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin.principal@acadify.com\",\"password\":\"admin123\",\"firstName\":\"Dr. Rajesh\",\"lastName\":\"Verma\",\"phoneNumber\":\"9876543220\",\"department\":\"Administration\",\"role\":\"main_admin\"}"
```

---

## 📝 Available Dummy Data:

### Students (5 ready-to-use):
1. **Rahul Sharma** - CS, 2024CS001
2. **Priya Patel** - EC, 2024EC002
3. **Amit Kumar** - ME, 2024ME003
4. **Sneha Singh** - IT, 2024IT004
5. **Vikram Reddy** - EE, 2024EE005

### Admins (5 ready-to-use):
1. **Dr. Rajesh Verma** - Main Admin (Principal)
2. **Dr. Sunita Gupta** - Main Admin (Director)
3. **Prof. Anil Joshi** - Sub Admin (HOD CS)
4. **Prof. Meera Nair** - Sub Admin (HOD EC)
5. **Prof. Suresh Yadav** - Sub Admin (HOD ME)

**Full data file:** `dummy-registration-data.json`

---

## ✅ Expected Success Response:

### Student Registration Success:
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "enrollmentNumber": "2024CS001",
    "email": "rahul.sharma@acadify.com",
    "firstName": "Rahul",
    "lastName": "Sharma",
    "department": "Computer Science",
    "course": "B.Tech",
    "year": 2,
    "semester": 3,
    "role": "student"
  }
}
```

### Admin Registration Success:
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "email": "admin.principal@acadify.com",
    "firstName": "Dr. Rajesh",
    "lastName": "Verma",
    "role": "main_admin",
    "department": "Administration"
  }
}
```

---

## ❌ Common Errors:

### Duplicate Email/Enrollment:
```json
{
  "success": false,
  "message": "Email already exists" // or "Enrollment number already exists"
}
```

### Validation Error:
```json
{
  "success": false,
  "message": "Email is required, Password must be at least 6 characters long"
}
```

### Server Not Running:
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```
**Solution:** Backend server start karein: `npm run dev`

---

## 🔥 Quick Steps:

1. **Backend start karein:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Postman/Insomnia open karein**

3. **Upar diye gaye endpoints use karein**

4. **Dummy data copy-paste karein**

5. **Send karein aur response check karein!**

---

## 💡 Pro Tips:

- Har student ka **unique enrollment number** hona chahiye
- Har user ka **unique email** hona chahiye
- Password **minimum 6 characters** ka hona chahiye
- Phone number **exactly 10 digits** ka hona chahiye
- Year aur semester **numbers** hone chahiye (strings nahi)

---

**Happy Testing! 🎉**
