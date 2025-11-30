import axios from 'axios';

const API_URL = 'http://localhost:9000/api/admin';

async function testSubAdminCreation() {
    try {
        // 1. Login as Main Admin
        console.log('🔑 Logging in as Main Admin...');
        const loginResponse = await axios.post(`${API_URL}/login`, {
            email: 'dean@college.com',
            password: 'Admin@123'
        });

        const token = loginResponse.data.data.token;
        console.log('✅ Login successful! Token received.');

        // 2. Create Sub Admin
        console.log('\n👤 Creating Sub Admin (HOD)...');
        const subAdminData = {
            email: 'hod.cs@college.com',
            password: 'HOD@123',
            firstName: 'HOD',
            lastName: 'CS',
            phoneNumber: '9876543210',
            department: 'Computer Science'
        };

        try {
            const createResponse = await axios.post(`${API_URL}/sub-admin`, subAdminData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('✅ Sub Admin created successfully!');
            console.log(createResponse.data);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log('⚠️ Sub Admin already exists, proceeding...');
            } else {
                throw error;
            }
        }

        // 3. List Sub Admins
        console.log('\n📋 Fetching all Sub Admins...');
        const listResponse = await axios.get(`${API_URL}/sub-admins`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('✅ Sub Admins list:');
        console.log(listResponse.data.data);

        // 4. Login as Sub Admin
        console.log('\n🔑 Logging in as Sub Admin...');
        const subAdminLoginResponse = await axios.post(`${API_URL}/login`, {
            email: 'hod.cs@college.com',
            password: 'HOD@123'
        });

        console.log('✅ Sub Admin Login successful!');
        console.log('Role:', subAdminLoginResponse.data.data.admin.role);

    } catch (error) {
        console.error('❌ Error:', error.response ? error.response.data : error.message);
    }
}

testSubAdminCreation();
