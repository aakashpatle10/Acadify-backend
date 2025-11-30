import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './src/models/admin.model.js';

dotenv.config();

async function createMainAdmin() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'dean@college.com' });
        if (existingAdmin) {
            console.log('⚠️  Main Admin already exists!');
            console.log('Email: dean@college.com');
            console.log('Password: Admin@123\n');
            await mongoose.connection.close();
            process.exit(0);
        }

        console.log('👤 Creating Main Admin (Dean)...');
        const admin = new Admin({
            email: 'dean@college.com',
            password: 'Admin@123', // Will be hashed by pre-save hook
            firstName: 'Main',
            lastName: 'Admin',
            role: 'main_admin',
            phoneNumber: '9999999999'
        });

        await admin.save();

        console.log('✅ Main Admin created successfully!\n');
        console.log('📋 Admin Details:');
        console.log('   Email: dean@college.com');
        console.log('   Password: Admin@123');
        console.log('   Role: main_admin\n');

        console.log('🚀 You can now login using:');
        console.log('   POST http://localhost:5000/api/admin/login');
        console.log('   Body: { "email": "dean@college.com", "password": "Admin@123" }\n');

        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
}

createMainAdmin();
