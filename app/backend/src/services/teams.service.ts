import Teams from '../database/models/Teams.model';

const getAllTeams = async () => {
  const allTeams = await Teams.findAll();
  return allTeams;
};

const getTeamById = async (id: number) => {
  const team = await Teams.findOne({ where: { id } });
  return team;
};

export default { getAllTeams, getTeamById };
