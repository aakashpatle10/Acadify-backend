import qrService from './src/services/Qr.service.js';

const sessionId = '64f1b2c3e4b0a1a2b3c4d5e6'; // Mock ObjectId

console.log('--- Testing QR Service ---');

// 1. Generate Token
const token = qrService.generateToken(sessionId);
console.log('Generated Token:', token);

// 2. Validate Valid Token
const isValid = qrService.validateToken(token, sessionId);
console.log('Is Token Valid (Immediate):', isValid);

// 3. Validate Invalid Session
const isInvalidSession = qrService.validateToken(token, 'different_session_id');
console.log('Is Token Valid (Wrong Session):', isInvalidSession);

// 4. Validate Expired Token (Simulated)
setTimeout(() => {
    const isExpired = qrService.validateToken(token, sessionId, 1000); // 1s window
    console.log('Is Token Valid (After 2s, 1s window):', isExpired);
}, 2000);
