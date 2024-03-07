import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenMiddleware;
