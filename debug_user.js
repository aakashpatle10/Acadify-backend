import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './src/models/students.model.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function checkStudents() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB");
        console.log("DB Name:", mongoose.connection.name);

        const students = await Student.find({}).select('+password');
        console.log(`Found ${students.length} students`);

        const admins = await mongoose.connection.collection('admins').countDocuments();
        console.log(`Found ${admins} admins`);


        students.forEach(s => {
            console.log(`Enrollment: ${s.enrollmentNumber}, Email: ${s.email}, HasPassword: ${!!s.password}`);
        });

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

checkStudents();
