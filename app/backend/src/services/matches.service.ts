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

const getInProgress = async (inProgress: boolean) => {
  const filteredMatches = (
    await getAllMatches()).filter((match) => match.inProgress === inProgress);
  return filteredMatches;
};

const finishMatch = async (id: number) => {
  const finishedMatch = await Matches.update({ inProgress: false }, { where: { id } });
  return finishedMatch;
};

const updateMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
  const updatedMatch = await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return updatedMatch;
};

export default { getAllMatches, getInProgress, finishMatch, updateMatch };
