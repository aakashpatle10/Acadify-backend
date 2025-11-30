import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    enrollmentNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    phoneNumber: String,
    password: String,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    googleId: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function createDemoStudent() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Check if student already exists
        const existingStudent = await User.findOne({ enrollmentNumber: '0133CS231003' });
        if (existingStudent) {
            console.log('⚠️  Student already exists!');
            console.log('Enrollment Number: 0133CS231003');
            console.log('Password: 0133CS231003\n');
            await mongoose.connection.close();
            process.exit(0);
        }

        console.log('🔐 Hashing password...');
        const hashedPassword = await bcrypt.hash('0133CS231003', 10);

        console.log('👤 Creating demo student...');
        const student = await User.create({
            enrollmentNumber: '0133CS231003',
            email: 'demo@student.com',
            firstName: 'Demo',
            lastName: 'Student',
            password: hashedPassword,
            phoneNumber: '9876543210'
        });

        console.log('✅ Demo student created successfully!\n');
        console.log('📋 Student Details:');
        console.log('   Enrollment Number: 0133CS231003');
        console.log('   Password: 0133CS231003');
        console.log('   Email: demo@student.com');
        console.log('   Name: Demo Student\n');

        console.log('🚀 You can now login using:');
        console.log('   POST http://localhost:5000/api/students/login');
        console.log('   Body: { "enrollmentNumber": "0133CS231003", "password": "0133CS231003" }\n');

        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code === 11000) {
            console.log('\n💡 Student with this enrollment number or email already exists.');
        }
        await mongoose.connection.close();
        process.exit(1);
    }
}

createDemoStudent();
