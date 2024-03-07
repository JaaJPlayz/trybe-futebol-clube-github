import { expect } from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import teamsService from '../services/teams.service';
import teamsController from '../controllers/teams.controller';

describe('Teams Controller', () => {
  describe('getAllTeams', () => {
    it('should return all teams', async () => {
      const req = {} as Request;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      } as unknown as any;

      const teams: any = [{ name: '垃圾' }, { name: '草莓' }];
      const getAllTeamsSrvStub: sinon.SinonStub = sinon.stub(teamsService, 'getAllTeams').resolves(teams);

      await teamsController.getAllTeams(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(teams)).to.be.true;
      expect(getAllTeamsSrvStub.calledOnce).to.be.true;

      getAllTeamsSrvStub.restore();
    });
  });

  describe('getTeamById', () => {
    it('should return a team', async () => {
      const req = { params: { id: 1 } } as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      } as unknown as any;

      const team: any = { name: '垃圾' };
      const getTeamByIdSrvStub: sinon.SinonStub = sinon.stub(teamsService, 'getTeamById').resolves(team);

      await teamsController.getTeamById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(team)).to.be.true;
      expect(getTeamByIdSrvStub.calledOnce).to.be.true;

      getTeamByIdSrvStub.restore();
    });
  });
});