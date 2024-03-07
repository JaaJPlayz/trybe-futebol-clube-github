import { expect } from 'chai';
import * as sinon from 'sinon';
import Matches from '../database/models/Matches.model';
import Teams from '../database/models/Teams.model';
import getAllMatches from '../services/matches.service';

describe('getAllMatches', () => {
  it('should return an array of matches with team details', async () => {
    const matches: any = [
      {
        id: 1,
        homeTeamId: 1,
        homeTeamGoals: 2,
        awayTeamId: 2,
        awayTeamGoals: 1,
        inProgress: false,
      },
    ];

    const teams:any = [
      {
        id: 1,
        teamName: 'Home Team',
      },
      {
        id: 2,
        teamName: 'Away Team',
      },
    ];

    sinon.stub(Matches, 'findAll').resolves(matches);
    sinon.stub(Teams, 'findAll').resolves(teams);

    const result = await getAllMatches.getAllMatches();

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(matches.length);

    result.forEach((match, index) => {
      expect(match.id).to.equal(matches[index].id);
      expect(match.homeTeamId).to.equal(matches[index].homeTeamId);
      expect(match.homeTeamGoals).to.equal(matches[index].homeTeamGoals);
      expect(match.awayTeamId).to.equal(matches[index].awayTeamId);
      expect(match.awayTeamGoals).to.equal(matches[index].awayTeamGoals);
      expect(match.inProgress).to.equal(matches[index].inProgress);
      expect(match.homeTeam).to.deep.equal({ teamName: teams.find((team: any) => team.id === match.homeTeamId)?.teamName });
      expect(match.awayTeam).to.deep.equal({ teamName: teams.find((team: any) => team.id === match.awayTeamId)?.teamName });
    });

    sinon.restore();
  });
});