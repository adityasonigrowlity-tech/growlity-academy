const axios = require('axios');

async function testAdminSignup() {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', {
            name: 'Test Admin',
            email: 'testadmin@example.com',
            password: 'password123',
            role: 'admin'
        });
        console.log('Error: Admin signup succeeded when it should have failed.');
        console.log('Response:', response.data);
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.log('Success: Admin signup rejected with 403 as expected.');
            console.log('Message:', error.response.data.message);
        } else {
            console.log('Unexpected error:', error.message);
            if (error.response) console.log('Status:', error.response.status);
        }
    }
}

testAdminSignup();
