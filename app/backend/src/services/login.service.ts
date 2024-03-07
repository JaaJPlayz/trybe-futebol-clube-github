import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/User.model';

const INVALID_ERROR = 'Invalid email or password';
const FIELDS_ERROR = 'All fields must be filled';

const validateEmail = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => password.length > 6;

const searchUser = async (email: string) => User.findOne({ where: { email } });

const checkPass = async (password: string, hash: string) => {
  const check = await bcrypt.compare(password, hash);
  return check;
};

const tokenGenerator = (username: string) => {
  const secret = process.env.JWT_SECRET || 'secret';
  const token = jwt.sign({ username }, secret, { expiresIn: '1d', algorithm: 'HS256' });
  return token;
};

const login = async (email: string, password: string) => {
  if (!email || !password) return { status: 400, message: FIELDS_ERROR };
  const user = await searchUser(email);
  if (!user) return { status: 401, message: INVALID_ERROR };
  const check = await checkPass(password, user.password);
  if (!check) return { status: 401, message: INVALID_ERROR };
  if (!validateEmail(email)) return { status: 401, message: INVALID_ERROR };
  if (!validatePassword(password)) return { status: 401, message: INVALID_ERROR };
  const token = tokenGenerator(user.username);
  return { status: 200, token };
};

const searchUserViaUsername = async (username: string) => User.findOne({ where: { username } });

const getRole = async (username: string) => {
  const user = await searchUserViaUsername(username);
  if (!user) return null;
  return user.role;
};

export default { login, tokenGenerator, searchUser, getRole };
