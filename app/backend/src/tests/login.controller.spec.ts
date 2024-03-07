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

  it('should return status 200 and role when token is valid', async () => {
    const req: any = { headers: { authorization: 'Bearer validToken' } } as any;
    const res: any = { status: sinon.stub().returnsThis(), json: sinon.stub() } as unknown as any;
    const lilMocka: any = { username: 'testUser' };
    const jwtVerifyStub = sinon.stub(jwt, 'verify').returns(lilMocka);
    const loginServiceStub = sinon.stub(login, 'getRole').resolves('admin');

    await loginController.getRole(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ role: 'admin' })).to.be.true;
    expect(jwtVerifyStub.calledWith('validToken', 'secret')).to.be.true;
    expect(loginServiceStub.calledWith('testUser')).to.be.true;

    jwtVerifyStub.restore();
    loginServiceStub.restore();
  });

  it('should return status 401 and error message when token is not found', async () => {
    const req: any = { headers: {} } as any;
    const res: any = { status: sinon.stub().returnsThis(), json: sinon.stub() } as unknown as any;

    await loginController.getRole(req, res);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Token not found' })).to.be.true;
  });

  it('should return status 401 and error message when token is invalid', async () => {
    const req: any = { headers: { authorization: 'Bearer invalidToken' } } as any;
    const res: any = { status: sinon.stub().returnsThis(), json: sinon.stub() } as unknown as any;
    const jwtVerifyStub = sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));

    await loginController.getRole(req, res);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Token must be a valid token' })).to.be.true;
    expect(jwtVerifyStub.calledWith('invalidToken', 'secret')).to.be.true;

    jwtVerifyStub.restore();
  });

  it('should return status 401 and error message when role is not found', async () => {
    const req: any = { headers: { authorization: 'Bearer validToken' } } as any;
    const res: any = { status: sinon.stub().returnsThis(), json: sinon.stub() } as unknown as any;
    const lilMocka: any = { username: 'testUser' };
    const jwtVerifyStub = sinon.stub(jwt, 'verify').returns(lilMocka);
    const loginServiceStub = sinon.stub(login, 'getRole').resolves(null);

    await loginController.getRole(req, res);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Token must be a valid token' })).to.be.true;
    expect(jwtVerifyStub.calledWith('validToken', 'secret')).to.be.true;
    expect(loginServiceStub.calledWith('testUser')).to.be.true;

    jwtVerifyStub.restore();
    loginServiceStub.restore();
  });
});