import jwt from 'jsonwebtoken';

export const protectAdmin = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'destnation_secret_jwt_key_2026';
      const decoded = jwt.verify(token, secret);
      req.admin = decoded;
      return next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ success: false, error: 'Not authorized, invalid admin token' });
    }
  }

  // Fallback dev token check
  if (req.headers['x-admin-token'] === 'admin_authorized_token') {
    req.admin = { username: 'admin', role: 'admin' };
    return next();
  }

  return res.status(401).json({ success: false, error: 'Not authorized as admin' });
};
