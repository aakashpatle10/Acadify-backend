import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './src/models/students.model.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function createStudent() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB");

        const studentData = {
            enrollmentNumber: '123456',
            email: 'student@test.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'Student',
            phoneNumber: '1234567890'
        };

        // Check if exists
        const exists = await Student.findOne({ enrollmentNumber: studentData.enrollmentNumber });
        if (exists) {
            console.log("Student already exists");
            // Update password
            exists.password = studentData.password;
            await exists.save();
            console.log("Password updated to 'password123'");
        } else {
            const student = new Student(studentData);
            await student.save();
            console.log("Student created successfully");
        }

        console.log("Credentials:");
        console.log("Enrollment Number: 123456");
        console.log("Password: password123");

        process.exit(0);
    } catch (error) {
        console.error("Error creating student:", error);
        process.exit(1);
    }
}

createStudent();
