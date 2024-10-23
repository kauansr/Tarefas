import jwt from 'jsonwebtoken';

class AuthMiddleware {
  static verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }

    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenWithoutBearer, 'secret_key', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido.' });
      }


      req.user = decoded;
      next();
    });
  }
}

export default AuthMiddleware;
