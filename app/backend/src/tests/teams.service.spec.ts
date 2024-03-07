import * as chai from 'chai';
const { expect } = chai;
import * as sinon from 'sinon';
import Teams from '../database/models/Teams.model';
import teamsService from '../services/teams.service';

describe('teams.service', () => {
  describe('getAllTeamsSrv', () => {
    it('should return all teams', async () => {
      const expectedTeams: any = [{ name: '麵條' }, { name: '馬鈴薯' }];
      const stub = sinon.stub(Teams, 'findAll').resolves(expectedTeams);

      const result = await teamsService.getAllTeams();

      expect(result).to.deep.equal(expectedTeams);

      sinon.restore();
    });
  });

  describe('getTeamByIdSrv', () => {
    it('should return a team', async () => {
      const expectedTeam: any = { name: '麵條' };
      const stub = sinon.stub(Teams, 'findOne').resolves(expectedTeam);

      const result = await teamsService.getTeamById(1);

      expect(result).to.deep.equal(expectedTeam);

      sinon.restore();
    });
  });
});