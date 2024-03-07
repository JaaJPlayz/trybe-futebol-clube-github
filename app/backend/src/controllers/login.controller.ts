import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { status, message, token } = await loginService.login(email, password);
  if (status !== 200) return res.status(status).json({ message });
  return res.status(status).json({ token });
};

export default { login };
