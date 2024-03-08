import { expect } from 'chai';
import * as sinon from 'sinon';
import leaderboardService from '../services/leaderboard.service';
import getHomeLeaderboardController from '../controllers/leaderboard.controller';

describe('Leaderboard Controller', () => {
  describe('getHomeLeaderboardController', () => {
    it('should return the leaderboard data', async () => {
      const req = {} as unknown as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      } as unknown as any;

      const leaderboardData: any = [{ name: 'hjkl', score: 100 }, { name: 'asdf', score: 90 }];
      sinon.stub(leaderboardService, 'getHomeLeaderboard').resolves(leaderboardData);

      await getHomeLeaderboardController.getHomeLeaderboardController(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(leaderboardData)).to.be.true;

      sinon.restore();
    });
  });
});