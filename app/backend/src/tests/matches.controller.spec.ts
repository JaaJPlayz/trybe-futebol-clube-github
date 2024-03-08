import { expect } from 'chai';
import * as sinon from 'sinon';
import matchesService from '../services/matches.service';
import getAllMatchesController from '../controllers/matches.controller';

describe('Matches Controller', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('should return all matches', async () => {
    const req = {
      query: {}
    } as any;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    } as unknown as any;

    const matches: any = ['match1', 'match2'];
    const getAllMatchesStub = sinon.stub(matchesService, 'getAllMatches').resolves(matches);

    await getAllMatchesController.getAllMatchesController(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, matches);

    expect(getAllMatchesStub.calledOnce).to.be.true;

    getAllMatchesStub.restore();
  });

  it('should return matches in progress when inProgress is true', async () => {
    const req = {
      query: {
        inProgress: 'true'
      }
    } as any;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    } as unknown as any;

    const matches: any = ['match1', 'match2'];
    const getInProgressStub = sinon.stub(matchesService, 'getInProgress').resolves(matches);

    await getAllMatchesController.getInProgressController(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, matches);

    expect(getInProgressStub.calledOnceWith(true)).to.be.true;

    getInProgressStub.restore();
  });

  it('should return matches not in progress when inProgress is false', async () => {
    const req = {
      query: {
        inProgress: 'false'
      }
    } as any;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    } as unknown as any;

    const matches: any = ['match3', 'match4'];
    const getInProgressStub = sinon.stub(matchesService, 'getInProgress').resolves(matches);

    await getAllMatchesController.getInProgressController(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, matches);

    expect(getInProgressStub.calledOnceWith(false)).to.be.true;

    getInProgressStub.restore();
  });

  it('should finish a match', async () => {
    const req = {
      params: {
        id: '1'
      }
    } as any;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    } as unknown as any;

    const finishMatchStub = sinon.stub(matchesService, 'finishMatch');

    await getAllMatchesController.finishMatchController(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, { message: 'Finished' });

    expect(finishMatchStub.calledOnceWith(1)).to.be.true;

    finishMatchStub.restore();
  });
  it('should update a match', async () => {
    const req = {
      params: {
        id: '1'
      },
      body: {
        homeTeamGoals: 2,
        awayTeamGoals: 1
      }
    } as any;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    } as unknown as any;

    const updateMatchStub = sinon.stub(matchesService, 'updateMatch');

    await getAllMatchesController.updateMatchController(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, { message: 'Updated Match Successfully' });

    expect(updateMatchStub.calledOnceWith(1, 2, 1)).to.be.true;

    updateMatchStub.restore();
  });

  it('should create a match', async () => {
    const req = {
      body: {
        homeTeamId: '1',
        awayTeamId: '2',
        homeTeamGoals: 2,
        awayTeamGoals: 1
      }
    } as any;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    } as unknown as any;

    const lilMocka: any = {
      status: 200,
      message: '',
      match: { id: '1', homeTeamId: '1', awayTeamId: '2', homeTeamGoals: 2, awayTeamGoals: 1 }
    }

    const createMatchStub: any = sinon.stub(matchesService, 'createMatch').resolves(lilMocka);

    await getAllMatchesController.createMatchController(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, { id: '1', homeTeamId: '1', awayTeamId: '2', homeTeamGoals: 2, awayTeamGoals: 1 });

    expect(createMatchStub.calledOnceWith('1', '2', 2, 1)).to.be.true;

    createMatchStub.restore();
  });
});
