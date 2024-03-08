import Matches from '../database/models/Matches.model';
import Teams from '../database/models/Teams.model';

// [
//   {
//     "name": "Corinthians",
//     "totalPoints": 6,
//     "totalGames": 2,
//     "totalVictories": 2,
//     "totalDraws": 0,
//     "totalLosses": 0,
//     "goalsFavor": 6,
//     "goalsOwn": 1,
//   },
//   {
//     "name": "Santos",
//     "totalPoints": 9,
//     "totalGames": 3,
//     "totalVictories": 3,
//     "totalDraws": 0,
//     "totalLosses": 0,
//     "goalsFavor": 9,
//     "goalsOwn": 3,
//   },
// ]

const getAllMatches = async () => {
  const matches = await Matches.findAll({
    where: { inProgress: false },
  });
  return matches;
};

const calculateTotalPoints = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (homeTeamGoals > awayTeamGoals) return 3;
  if (homeTeamGoals === awayTeamGoals) return 1;
  return 0;
};

const calculateTotalGames = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (homeTeamGoals > awayTeamGoals) return 1;
  if (homeTeamGoals === awayTeamGoals) return 1;
  return 0;
};

const calculateTotalVictories = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (homeTeamGoals > awayTeamGoals) return 1;
  return 0;
};

const calculateTotalDraws = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (homeTeamGoals === awayTeamGoals) return 1;
  return 0;
};

const calculateTotalLosses = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (homeTeamGoals < awayTeamGoals) return 1;
  return 0;
};

const calculateGoalsFavor = (homeTeamGoals: number, _awayTeamGoals: number) => homeTeamGoals;

const calculateGoalsOwn = (_homeTeamGoals: number, awayTeamGoals: number) => awayTeamGoals;

const getHomeLeaderboard = async () => {
  const matches = await getAllMatches();
  const teams = await Teams.findAll();

  const newMatches = matches.map((match) => {
    const homeTeam = teams.find((team) => team.id === match.homeTeamId);
    return {
      name: homeTeam?.teamName,
      totalPoints: calculateTotalPoints(match.homeTeamGoals, match.awayTeamGoals),
      totalGames: calculateTotalGames(match.homeTeamGoals, match.awayTeamGoals),
      totalVictories: calculateTotalVictories(match.homeTeamGoals, match.awayTeamGoals),
      totalDraws: calculateTotalDraws(match.homeTeamGoals, match.awayTeamGoals),
      totalLosses: calculateTotalLosses(match.homeTeamGoals, match.awayTeamGoals),
      goalsFavor: calculateGoalsFavor(match.homeTeamGoals, match.awayTeamGoals),
      goalsOwn: calculateGoalsOwn(match.homeTeamGoals, match.awayTeamGoals),
    };
  });
  return newMatches;
};

export default { getHomeLeaderboard };
