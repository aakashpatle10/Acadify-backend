// Test script for Student and Admin Registration APIs
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Test data
const testStudent = {
    email: 'test.student@acadify.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'Student',
    enrollmentNumber: 'TEST2024001',
    department: 'Computer Science',
    course: 'B.Tech',
    year: 2,
    semester: 3,
    phoneNumber: '9876543210'
};

const testAdmin = {
    email: 'test.admin@acadify.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'Admin',
    phoneNumber: '9876543211',
    department: 'Administration',
    role: 'main_admin'
};

async function testStudentRegistration() {
    console.log('\n=== Testing Student Registration ===');
    try {
        const response = await axios.post(`${API_BASE_URL}/students/register`, testStudent);
        console.log('✅ Student Registration Successful!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.log('❌ Student Registration Failed!');
        if (error.response) {
            console.log('Error:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
        return null;
    }
}

async function testAdminRegistration() {
    console.log('\n=== Testing Admin Registration ===');
    try {
        const response = await axios.post(`${API_BASE_URL}/admins/register`, testAdmin);
        console.log('✅ Admin Registration Successful!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.log('❌ Admin Registration Failed!');
        if (error.response) {
            console.log('Error:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
        return null;
    }
}

async function testStudentLogin(enrollmentNumber, password) {
    console.log('\n=== Testing Student Login ===');
    try {
        const response = await axios.post(`${API_BASE_URL}/students/login`, {
            enrollmentNumber,
            password
        });
        console.log('✅ Student Login Successful!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.log('❌ Student Login Failed!');
        if (error.response) {
            console.log('Error:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
        return null;
    }
}

async function testAdminLogin(email, password) {
    console.log('\n=== Testing Admin Login ===');
    try {
        const response = await axios.post(`${API_BASE_URL}/admins/login`, {
            email,
            password
        });
        console.log('✅ Admin Login Successful!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.log('❌ Admin Login Failed!');
        if (error.response) {
            console.log('Error:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
        return null;
    }
}

async function runTests() {
    console.log('🚀 Starting Student and Admin Registration API Tests...');
    console.log(`API Base URL: ${API_BASE_URL}`);

    // Test Student Registration
    const studentResult = await testStudentRegistration();

    // Test Admin Registration
    const adminResult = await testAdminRegistration();

    // If registration successful, test login
    if (studentResult) {
        await testStudentLogin(testStudent.enrollmentNumber, testStudent.password);
    }

    if (adminResult) {
        await testAdminLogin(testAdmin.email, testAdmin.password);
    }

    console.log('\n✨ Tests completed!');
}

// Run the tests
runTests().catch(console.error);
