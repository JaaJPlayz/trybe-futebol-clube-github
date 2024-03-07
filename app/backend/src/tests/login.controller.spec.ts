import { expect } from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import login from '../services/login.service';
import loginController from '../controllers/login.controller';

describe('loginController', () => {
  it('should return status 200 and token when login is successful', async () => {
    const req: any = { body: { email: 'test@example.com', password: 'password' } } as any;
    const res: any = { status: sinon.stub().returnsThis(), json: sinon.stub() } as unknown as any;
    const loginSrvStub = sinon.stub(login, 'login').resolves({ status: 200, token: 'token' });

    await loginController.login(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ token: 'token' })).to.be.true;
    expect(loginSrvStub.calledWith('test@example.com', 'password')).to.be.true;

    loginSrvStub.restore();
  });

  it('should return error message when login fails', async () => {
    const req: any = { body: { email: 'test@example.com', password: 'password' } } as any;
    const res: any = { status: sinon.stub().returnsThis(), json: sinon.stub() } as unknown as any;
    const loginSrvStub = sinon.stub(login, 'login').resolves({ status: 401, message: 'Invalid credentials' });

    await loginController.login(req, res);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Invalid credentials' })).to.be.true;
    expect(loginSrvStub.calledWith('test@example.com', 'password')).to.be.true;

    loginSrvStub.restore();
  });
});