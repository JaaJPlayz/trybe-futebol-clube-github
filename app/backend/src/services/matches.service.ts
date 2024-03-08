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

const equalTeamVerify = async (homeTeamId: number, awayTeamId: number) => {
  if (homeTeamId === awayTeamId) {
    return { status: 422, message: 'It is not possible to create a match with two equal teams' };
  }
  const homeTeam = await Teams.findOne({ where: { id: homeTeamId } });
  const awayTeam = await Teams.findOne({ where: { id: awayTeamId } });
  if (!homeTeam || !awayTeam) {
    return { status: 404, message: 'There is no team with such id!' };
  }
  return { status: 201 };
};

interface IResponse2 {
  status: number | undefined;
  message?: string | undefined;
  match?: {
    id: number;
    homeTeamId: number;
    awayTeamId: number;
    homeTeamGoals: number;
    awayTeamGoals: number;
    inProgress: boolean;
  }
}

const createMatch = async (
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const { status, message }: IResponse2 = await equalTeamVerify(homeTeamId, awayTeamId);
  const allMatches = await Matches.findAll();
  const id = allMatches.length + 1;
  const match = await Matches.create({ id,
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });
  if (status !== 201) return { status, message };
  return { status: 201, match };
};

export default { getAllMatches, getInProgress, finishMatch, updateMatch, createMatch };
