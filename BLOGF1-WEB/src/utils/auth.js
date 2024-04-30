import jwt from 'jsonwebtoken';

const SECRET_KEY = 'charlesleclerc';

// Función para generar un nuevo token
export const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Función para verificar la validez de un token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
};