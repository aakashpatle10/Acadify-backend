import crypto from 'crypto';
import config from '../config/environment.js';

const ALGORITHM = 'aes-256-cbc';
// Ensure secret is 32 bytes. If not provided, use a fallback (INSECURE for production, but ok for prototype)
const SECRET_KEY = config.QR_SECRET ? crypto.scryptSync(config.QR_SECRET, 'salt', 32) : crypto.scryptSync('default_secret_key_for_prototype', 'salt', 32);
const IV_LENGTH = 16;

class QrService {
    /**
     * Generates an encrypted token for a class session.
     * @param {string} classSessionId 
     * @returns {string} Encrypted token (iv:encryptedData)
     */
    generateToken(classSessionId) {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

        const payload = JSON.stringify({
            sid: classSessionId,
            ts: Date.now(),
            nonce: crypto.randomBytes(4).toString('hex')
        });

        let encrypted = cipher.update(payload, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return `${iv.toString('hex')}:${encrypted}`;
    }

    /**
     * Validates a QR token.
     * @param {string} token - The encrypted token
     * @param {string} classSessionId - The expected session ID
     * @param {number} validityWindowMs - Time window in ms (default 15s)
     * @returns {boolean} True if valid
     */
    validateToken(token, classSessionId, validityWindowMs = 15000) {
        try {
            const [ivHex, encryptedHex] = token.split(':');
            if (!ivHex || !encryptedHex) return false;

            const iv = Buffer.from(ivHex, 'hex');
            const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);

            let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            const payload = JSON.parse(decrypted);

            // 1. Check Session ID
            if (payload.sid !== classSessionId.toString()) {
                return false;
            }

            // 2. Check Timestamp (Expiration)
            const now = Date.now();
            if (now - payload.ts > validityWindowMs) {
                return false; // Token expired
            }

            // 3. Future timestamp check (prevent time travel)
            if (payload.ts > now + 5000) { // Allow 5s clock skew
                return false;
            }

            return true;
        } catch (error) {
            // Decryption failed or JSON parse error
            return false;
        }
    }
}

export default new QrService();
