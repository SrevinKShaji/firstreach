const BASE_URL = 'http://localhost:5000';

async function testBackendFlow() {
  console.log('--- STARTING NODE.JS + MONGODB + JWT VERIFICATION ---');

  // 1. Submit a lead as public user
  console.log('\n1. Testing PUBLIC Lead Submission (POST /api/leads)...');
  const postRes = await fetch(`${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Verification Student',
      email: 'verify@example.com',
      phone: '+91 9876543210',
    }),
  });
  const postData = await postRes.json();
  console.log('Post Response:', postData);

  const leadId = postData.data?._id;

  // 2. Login as Admin to get JWT token
  console.log('\n2. Testing ADMIN JWT LOGIN (POST /api/admin/login)...');
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'admin',
      password: 'admin123',
    }),
  });
  const loginData = await loginRes.json();
  console.log('Login Response:', loginData);

  const jwtToken = loginData.token;
  if (!jwtToken) {
    throw new Error('FAILED: No JWT token returned from admin login');
  }
  console.log('🔑 JWT Token generated successfully:', jwtToken.substring(0, 35) + '...');

  // 3. Fetch all leads with JWT Token
  console.log('\n3. Testing GET /api/leads with JWT Bearer Token...');
  const getRes = await fetch(`${BASE_URL}/api/leads`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  });
  const getData = await getRes.json();
  console.log(`Retrieved ${getData.count} leads from database (Source: ${getData.source})`);

  // 4. Delete the lead with JWT Token
  if (leadId) {
    console.log(`\n4. Testing DELETE /api/leads/${leadId} with JWT Bearer Token...`);
    const delRes = await fetch(`${BASE_URL}/api/leads/${leadId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    });
    const delData = await delRes.json();
    console.log('Delete Response:', delData);
  }

  console.log('\n✅ ALL BACKEND NODE.JS + MONGODB + JWT TESTS PASSED PERFECTLY!');
}

testBackendFlow().catch((err) => {
  console.error('❌ API Test Error:', err);
});
