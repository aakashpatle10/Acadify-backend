import axios from 'axios';

const API_URL = 'http://localhost:9000/api';

async function testTeacherCreation() {
    try {
        // 1. Login as Sub Admin (HOD)
        console.log('🔑 Logging in as Sub Admin (HOD)...');
        const loginResponse = await axios.post(`${API_URL}/admin/login`, {
            email: 'hod.cs@college.com',
            password: 'HOD@123'
        });

        const token = loginResponse.data.data.token;
        console.log('✅ Login successful! Token received.');

        // 2. Create Teacher
        console.log('\n👤 Creating Teacher...');
        const teacherData = {
            email: 'teacher.cs@college.com',
            password: 'Teacher@123',
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '9876543211',
            department: 'Computer Science',
            designation: 'Assistant Professor',
            employeeId: 'CS101'
        };

        try {
            const createResponse = await axios.post(`${API_URL}/teacher`, teacherData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('✅ Teacher created successfully!');
            console.log(createResponse.data);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log('⚠️ Teacher already exists, proceeding...');
            } else {
                throw error;
            }
        }

        // 3. List Teachers
        console.log('\n📋 Fetching all Teachers...');
        const listResponse = await axios.get(`${API_URL}/teacher`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('✅ Teachers list:');
        console.log(listResponse.data.data);

        // 4. Login as Teacher
        console.log('\n🔑 Logging in as Teacher...');
        const teacherLoginResponse = await axios.post(`${API_URL}/teacher/login`, {
            email: 'teacher.cs@college.com',
            password: 'Teacher@123'
        });

        console.log('✅ Teacher Login successful!');
        console.log('Role:', teacherLoginResponse.data.data.teacher.role);

    } catch (error) {
        console.error('❌ Error:', error.response ? error.response.data : error.message);
    }
}

testTeacherCreation();
