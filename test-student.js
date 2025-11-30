import axios from 'axios';

const API_URL = 'http://localhost:9000/api';

async function testStudentCreation() {
    try {
        // 1. Login as Sub Admin (HOD)
        console.log('🔑 Logging in as Sub Admin (HOD)...');
        const loginResponse = await axios.post(`${API_URL}/admin/login`, {
            email: 'hod.cs@college.com',
            password: 'HOD@123'
        });

        const token = loginResponse.data.data.token;
        console.log('✅ Login successful! Token received.');

        // 2. Create Student
        console.log('\n👤 Creating Student...');
        const studentData = {
            email: 'student.cs@college.com',
            password: 'Student@123',
            firstName: 'Jane',
            lastName: 'Doe',
            enrollmentNumber: 'CS2023001',
            department: 'Computer Science',
            course: 'B.Tech',
            year: 2,
            semester: 4,
            phoneNumber: '9876543212'
        };

        try {
            const createResponse = await axios.post(`${API_URL}/student`, studentData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('✅ Student created successfully!');
            console.log(createResponse.data);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log('⚠️ Student already exists, proceeding...');
            } else {
                throw error;
            }
        }

        // 3. List Students
        console.log('\n📋 Fetching all Students...');
        const listResponse = await axios.get(`${API_URL}/student`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('✅ Students list:');
        console.log(listResponse.data.data);

        // 4. Login as Student
        console.log('\n🔑 Logging in as Student...');
        const studentLoginResponse = await axios.post(`${API_URL}/student/login`, {
            enrollmentNumber: 'CS2023001',
            password: 'Student@123'
        });

        console.log('✅ Student Login successful!');
        console.log('Role:', studentLoginResponse.data.data.student.roleId); // Assuming roleId is used for student

    } catch (error) {
        console.error('❌ Error:', error.response ? error.response.data : error.message);
    }
}

testStudentCreation();
