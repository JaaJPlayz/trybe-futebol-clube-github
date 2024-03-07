import { expect } from 'chai';
import * as sinon from 'sinon';
import matchesService from '../services/matches.service';
import getAllMatchesController from '../controllers/matches.controller';

describe('Matches Controller', () => {
  describe('getAllMatchesController', () => {
    it('should return all matches', async () => {
      const req = {} as any;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      } as unknown as any;

      const lilMocka: any = ['match1', 'match2'];
      const getAllMatchesStub = sinon.stub(matchesService, 'getAllMatches').resolves(lilMocka);

      await getAllMatchesController.getAllMatchesController(req, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, ['match1', 'match2']);

      expect(getAllMatchesStub.calledOnce).to.be.true;

      getAllMatchesStub.restore();
    });
  });
});