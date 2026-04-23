const axios = require('axios');

async function testLogin() {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin'
        });
        console.log('Login Successful:', response.data);
    } catch (error) {
        console.error('Login Failed:', error.response ? error.response.data : error.message);
    }
}

testLogin();
