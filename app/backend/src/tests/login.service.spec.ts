import { expect } from 'chai';
import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/User.model';
import login from '../services/login.service';


describe('login.service', () => {
  afterEach(sinon.restore);

  it('should return status 400 and error message if email or password is not provided', async () => {
    const result = await login.login('', '');
    expect(result).to.deep.equal({ status: 400, message: 'All fields must be filled' });
  });

  it('should return status 401 and error message if email is invalid', async () => {
    const result = await login.login('invalidemail', 'password');
    expect(result).to.deep.equal({ status: 401, message: 'Invalid email or password' });
  });

  it('should return status 401 and error message if user does not exist', async () => {
    sinon.stub(User, 'findOne').resolves(null);
    const result = await login.login('validemail@example.com', 'password');
    expect(result).to.deep.equal({ status: 401, message: 'Invalid email or password' });
  });

  it('should return status 401 and error message if password is incorrect', async () => {
    const user: any = { email: 'validemail@example.com', password: 'hashedpassword' };
    sinon.stub(User, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compare').resolves(false);
    const result = await login.login('validemail@example.com', 'incorrectpassword');
    expect(result).to.deep.equal({ status: 401, message: 'Invalid email or password' });
  });

  it('should return status 401 and error message if password is less than 6 characters', async () => {
    const user: any = { email: 'validemail@example.com', password: 'hjkl' };
    sinon.stub(User, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compare').resolves(true);
    const result = await login.login('validemail@example.com', 'hjkl');
    expect(result).to.deep.equal({ status: 401, message: 'Invalid email or password' });
  });

  it('should return status 200 and a token if login is successful', async () => {
    const user: any = { email: 'validemail@example.com', password: 'hashedpassword', username: 'username' };
    sinon.stub(User, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compare').resolves(true);
    const mock: any = { status: 200, token: 'token' }
    sinon.stub(login, 'login').returns(mock);
    const result = await login.login('validemail@example.com', 'password');
    expect(result).to.deep.equal(mock);
  });
});