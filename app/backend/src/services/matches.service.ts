import Matches from '../database/models/Matches.model';
import Teams from '../database/models/Teams.model';

const getAllMatches = async () => {
  const matches = await Matches.findAll();
  const teams = await Teams.findAll();
  const newMatches = matches.map((match) => {
    const homeTeam = teams.find((team) => team.id === match.homeTeamId);
    const awayTeam = teams.find((team) => team.id === match.awayTeamId);
    return {
      id: match.id,
      homeTeamId: homeTeam?.id,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: awayTeam?.id,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: { teamName: homeTeam?.teamName },
      awayTeam: { teamName: awayTeam?.teamName },
    };
  });
  return newMatches;
};

export default { getAllMatches };
