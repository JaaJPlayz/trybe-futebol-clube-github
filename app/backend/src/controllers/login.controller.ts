import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import loginService from '../services/login.service';

const INVALID_ERROR = 'Token must be a valid token';
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { status, message, token } = await loginService.login(email, password);
  if (status !== 200) return res.status(status).json({ message });
  return res.status(status).json({ token });
};

const getRole = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  const token = authorization.split(' ')[1];

  try {
    const username = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { username: string };
    if (!username) return res.status(401).json({ message: INVALID_ERROR });
    const role = await loginService.getRole(username.username);
    if (!role) return res.status(401).json({ message: INVALID_ERROR });
    return res.status(200).json({ role });
  } catch (error) {
    return res.status(401).json({ message: INVALID_ERROR });
  }
};

export default { login, getRole };
