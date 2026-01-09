import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET; 
const DEFAULT_EXPIRES = "10s"; 

if (!SECRET) {
  console.warn("JWT_SECRET is not defined. Please set it in your .env");
}

export function signAttendanceToken(payload, expiresIn = DEFAULT_EXPIRES) {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyAttendanceToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return { valid: true, payload: decoded };
  } catch (err) {
    return { valid: false, error: err };
  }
}
